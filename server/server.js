const express = require("express");
const path = require("path");
const cors = require("cors");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");
// const token_secret = require("crypto").randomBytes(64).toString("hex");

const app = express();

const PORT = process.env.PORT;
// コンポーネント
const db = require("./db/db").db;
const { verifyJWT } = require("./middleware/verifyJWT");
const { generateUploadURL } = require("./s3/s3");
// const { truncateSync } = require("fs");

app.use(
  "/static",
  express.static(path.join(__dirname, "../client/build/static"))
);
app.use("/favicon.ico", express.static("../client/build/favicon.ico"));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client/build"),
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [`http://${process.env.PUBLIC_IP}:3000`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);
app.use(
  session({
    key: "resetPassword",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 900, // 15m
    },
  })
);

// routes
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const sqlSelect = "SELECT * FROM users WHERE username = ? OR email = ?";
  const sqlInsert =
    "INSERT INTO users (userId,username,email,password) VALUE (?,?,?,?)";
  await db.query(sqlSelect, [username, email], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (!result.length > 0) {
      // データが返ってこない（同じメールアドレスがない）場合はパスワードをハッシュ化する。
      const userId = require("crypto").randomBytes(16).toString("hex");
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(sqlInsert, [userId, username, email, hash], (err, result) => {
          console.log(err);
        });
      });
      res.json({ result: true });
    } else if (result[0].username === username) {
      res.json({
        result: false,
        msg: "alreadyUsername",
      });
    } else if (result[0].email === email) {
      res.json({
        result: false,
        msg: "alreadyEmail",
      });
    }
  });
});

// jwt検証
app.post("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true });
});

app.post("/loginState", (req, res) => {
  if (req.session.user) {
    // セッション情報。ログインされている状態を表す。
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({
      loggedIn: false,
      message: "sessionTimeOut",
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.clearCookie("token");
  res.json({
    loggedIn: false,
  });
});

app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  const sqlSelect = "SELECT * FROM users WHERE username = ? OR email = ?";
  await db.query(sqlSelect, [username, email], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      // パスワードの比較。→トークン生成→セッションに格納
      bcrypt.compare(password, result[0].password, (err, response) => {
        // response - 一致したらtrue,しなかったらfalse
        if (response) {
          // メールアドレスとパスワードの認証が完了している状態

          // トークンの生成 ↓-------------------------------------------------
          const id = result[0].userId; // DBからuserIdを取得して格納
          // jwt.signで3つの情報(payload,secret,options)をbase64エンコードする
          const token = jwt.sign({ id }, process.env.SECRET_KEY, {
            expiresIn: 300, // 単位（秒）
          });
          // 応答ヘッダーのクッキーにトークンを格納
          res.cookie("token", token, {
            httpOnly: true,
            secure: true, // httpsプロトコル上のリクエストのみ受け付ける。httpには送信しない
            maxAge: 10000,
          });

          // トークンの生成 ↑-------------------------------------------------

          // sessionにユーザー情報を格納
          req.session.user = result;

          res.json({
            auth: true,
            token: token,
            result: result,
          });
        } else {
          res.json({ result: false, msg: "passwordFalse" });
        }
      });
    } else {
      // resultが[]の場合、メールアドレスが見つからなかった事になる。
      res.json({ result: false, msg: "userIsNotFound" });
    }
  });
});

app.post("/getItems", async (req, res) => {
  const { username, shareId } = req.body;

  if (!shareId) {
    const sqlEmailSelect = "SELECT * FROM book_list WHERE username = ?";
    await db.query(sqlEmailSelect, username, (err, result) => {
      if (result.length > 0) {
        res.json({ result, err });
      }
    });
  } else {
    const sqlShareIdSelect = "SELECT * FROM book_list WHERE shareId = ?";
    await db.query(sqlShareIdSelect, shareId, (err, result) => {
      if (result.length > 0) {
        res.json({ result, err });
      }
    });
  }
});

app.post("/getBookContent", async (req, res) => {
  const { bookId } = req.body;
  const sqlSelect = "SELECT * FROM book_content WHERE bookId = ?";
  await db.query(sqlSelect, bookId, (err, result) => {
    res.json({ result, err });
  });
});

app.post("/insert", async (req, res) => {
  const {
    username,
    bookTitle,
    coverImage,
    category,
    bookId,
    bookImage,
    bookVideo,
    bookContentTitle,
    bookContentDesc,
  } = req.body;

  // 作成日
  const createYear = new Date().getFullYear();
  const createMonth = new Date().getMonth();
  const createDate = new Date().getDate();
  const date = `${createYear}/${createMonth + 1}/${createDate}`;

  if (bookTitle) {
    // bookTitleがtrueなら表紙
    const sqlInsert =
      "INSERT INTO book_list (username,bookTitle,coverImage,category,date,favorite,shareId) VALUES (?,?,?,?,?,?,?)";
    // emailは自動で入力される。dateとfavoriteはデフォルト値を設定
    await db.query(
      sqlInsert,
      [
        username,
        bookTitle,
        coverImage,
        category,
        date,
        (favorite = 0),
        (shareId = 0),
      ],
      (err, result) => {
        res.json({ result, err });
      }
    );
  } else {
    const sqlContentInsert =
      "INSERT INTO book_content (bookId,username,bookImage,bookVideo,title,description,date) VALUES (?,?,?,?,?,?,?)";
    await db.query(
      sqlContentInsert,
      [
        bookId,
        username,
        bookImage,
        bookVideo,
        bookContentTitle,
        bookContentDesc,
        date,
      ],
      (err, result) => {
        res.json({ result, err });
      }
    );
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const sqlDelete =
    "DELETE List,Content FROM book_list As List LEFT JOIN book_content As Content ON List.bookId = Content.bookId WHERE List.bookId = ?";

  // book_listとbook_contentから同じbookIdの行を削除

  await db.query(sqlDelete, [id], (err, result) => {
    res.json({ result, err });
  });
});

app.delete("/deletePage/:id", async (req, res) => {
  const { id } = req.params;
  const sqlDeletePage = "DELETE FROM book_content WHERE pageId = ?";

  await db.query(sqlDeletePage, [id], (err, result) => {
    res.json({ result, err });
  });
});

app.post("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.json({ url });
});

app.put("/put", async (req, res) => {
  const { id, num, type, title, description } = req.body;

  const sqlFavoriteUpdate =
    "UPDATE book_list SET favorite = ? WHERE bookId = ?";
  const sqlShareUpdate = "UPDATE book_list SET shareId = ? WHERE bookId = ?";
  const sqlTitleUpdate = "UPDATE book_content SET title = ? WHERE pageId = ?";
  const sqlDescUpdate =
    "UPDATE book_content SET description = ? WHERE pageId = ?";
  const sqlTextUpdate =
    "UPDATE book_content SET title = ?, description = ? WHERE pageId = ?";

  if (type === "editText") {
    await db.query(
      (title && description && sqlTextUpdate) ||
        (title && !description && sqlTitleUpdate) ||
        (!title && description && sqlDescUpdate),
      (title && description && [title, description, id]) ||
        (title && !description && [title, id]) ||
        (!title && description && [description, id]),
      (err, result) => {
        res.json({ result, err });
      }
    );
  } else {
    await db.query(
      (type === "favorite" && sqlFavoriteUpdate) ||
        (type === "share" && sqlShareUpdate),
      [num, id],
      (err, result) => {
        res.json({ result, err });
      }
    );
  }
});

app.listen(PORT);

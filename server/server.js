const express = require("express");
const path = require("path");
const cors = require("cors");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const token_secret = require("crypto").randomBytes(64).toString("hex");

const app = express();

const PORT = process.env.PORT;
// コンポーネント
const db = require("./db/db").db;
const { verifyJWT } = require("./middleware/verifyJWT");
const { genereateUploadURL } = require("./s3/s3");

app.use(
  "/static",
  express.static(path.join(__dirname, "../client/build/static"))
);
app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client/build"),
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://${process.env.PUBLIC_IP}:3000`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// const corsOptions = {
//   origin: `http://${process.env.PUBLIC_IP}:3000`,
//   optionsSuccessStatus: 200,
// };
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1hour
    },
  })
);

// routes
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.json({ result: false, msg: "入力してください" });
  } else {
    const sqlSelect = "SELECT * FROM users WHERE username = ?";
    const sqlInsert = "INSERT INTO users (username,password) VALUE (?,?)";
    await db.query(sqlSelect, [username], (err, result) => {
      if (err) {
        console.log(err);
      }
      if (!result.length > 0) {
        // データが返ってこない（同じユーザー名がない）場合はパスワードをハッシュ化する。
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
          console.log(hash);
          db.query(sqlInsert, [username, hash], (err, result) => {
            console.log(err);
          });
        });
        res.json({ result: true, msg: "新規登録が完了しました。" });
      } else {
        res.json({ result: false, msg: "ユーザー名が重複しています。" });
      }
    });
  }
});

// jwt検証
app.post("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true, msg: "トークンは有効です" });
});

app.post("/loginState", (req, res) => {
  if (req.session.user) {
    // セッション情報。ログインされている状態を表す。
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({
      loggedIn: false,
      message: "セッションがタイムアウトしました。もう一度ログインしてください",
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
  const { username, password } = req.body;

  const sqlSelect = "SELECT * FROM users WHERE username = ?";
  await db.query(sqlSelect, [username], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      // パスワードの比較。→トークン生成→セッションに格納
      bcrypt.compare(password, result[0].password, (err, response) => {
        // response - 一致したらtrue,しなかったらfalse
        if (response) {
          // ユーザー名とパスワードの認証が完了している状態

          // トークンの生成 ↓-------------------------------------------------
          const id = result[0].userId; // DBからuserIdを取得して格納
          // jwt.signで3つの情報(payload,secret,options)をbase64エンコードする
          const token = jwt.sign({ id }, process.env.SECRET_KEY, {
            expiresIn: 300, // 単位（秒）
          });
          // 応答ヘッダーのクッキーにトークンを格納
          res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // httpsプロトコル上のリクエストのみ受け付ける。httpには送信しない
            maxAge: 10000,
            // signed: true,
          });

          // トークンの生成 ↑-------------------------------------------------

          // sessionにユーザー情報を格納
          req.session.user = result;

          res.json({
            auth: true,
            token: token,
            result: result,
            msg: "ログインが完了しました。",
          });
        } else {
          res.json({ result: false, msg: "パスワードが間違っています。" });
        }
      });
    } else {
      // resultが[]の場合、ユーザー名が見つからなかった事になる。
      res.json({ result: false, msg: "ユーザーが見つかりません。" });
    }
  });
});

app.post("/getItems", async (req, res) => {
  const { username, shareId } = req.body;

  if (!shareId) {
    const sqlUsernameSelect = "SELECT * FROM book_list WHERE username = ?";
    await db.query(sqlUsernameSelect, username, (err, result) => {
      if (result.length > 0) {
        res.json({ result: result, err: err });
      }
    });
  } else {
    const sqlShareIdSelect = "SELECT * FROM book_list WHERE shareId = ?";
    await db.query(sqlShareIdSelect, shareId, (err, result) => {
      if (result.length > 0) {
        res.json({ result: result, err: err });
      }
    });
  }
});

app.post("/getBookContent", async (req, res) => {
  const { bookId } = req.body;
  const sqlSelect = "SELECT * FROM book_content WHERE bookId = ?";
  await db.query(sqlSelect, bookId, (err, result) => {
    res.json({ result: result, err: err });
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
      "INSERT INTO book_list (username,bookTitle,coverImage,category,date,favorite) VALUES (?,?,?,?,?,?)";
    // usernameは自動で入力される。dateとfavoriteはデフォルト値を設定
    await db.query(
      sqlInsert,
      [username, bookTitle, coverImage, category, date, (favorite = 0)],
      (err, result) => {
        res.json({ result: result, err: err });
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
        res.json({ result: result, err: err });
      }
    );
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const sqlDelete =
    "DELETE List,Content FROM book_list As List LEFT JOIN book_content As Content ON List.bookId = Content.bookId WHERE List.bookId = ?";
  // book_listとbook_contentから同じbookIdのロウを削除
  await db.query(sqlDelete, [id], (err, result) => {
    res.json({ result: result, err: err });
  });
});

app.post("/s3Url", async (req, res) => {
  const url = await genereateUploadURL();
  res.json({ url });
});

app.put("/put", async (req, res) => {
  const { id, num, type } = req.body;

  const sqlFavoriteUpdate =
    "UPDATE book_list SET favorite = ? WHERE bookId = ?";
  const sqlShareUpdate = "UPDATE book_list SET shareId = ? WHERE bookId = ?";

  await db.query(
    (type === "favorite" && sqlFavoriteUpdate) ||
      (type === "share" && sqlShareUpdate),
    [num, id],
    (err, result) => {
      res.json({ result: result, err: err });
    }
  );
});

app.listen(PORT);

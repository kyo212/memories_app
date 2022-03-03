import { memo, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// アイコン
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowDown } from "react-icons/bs";
// コンポーネント UI系
import { FooterTab } from "../molecles/tabs/FooterTab";
import { Header } from "../organisms/Header";
import { Books } from "../organisms/Books";
import { SuccessMsgWindow } from "../atoms/message/SuccessMsgWindow";
import { Search } from "../atoms/Search";
// コンポーネント 処理系
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
import { AddBookBtn } from "../atoms/button/AddBookBtn";
import { AddBookModal } from "../molecles/modal/AddBookModal";
// カスタムフック
import { useForceUpdate } from "../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../App";

// ------------------------------------------
// ユーザーが認証済みであるときに表示させる内容
// ------------------------------------------

export const Content = memo(() => {
  const navigate = useNavigate();
  // 情報
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("diary");
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  const [bookItems, setBookItems] = useState([]);
  // Toggle
  const [modalToggle, setModalToggle] = useState(false);
  // メッセージ
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  const [sucMsgToggle, setSucMsgToggle] = useState(false);
  // カスタムフック
  const [update, { setUpdate }] = useForceUpdate();
  // コンテキストに渡すstate
  const {
    setDefaultIndex,
    fileUrl,
    setModalImageUrl,
    headerToggle,
    setHeaderToggle,
  } = useContext(Context);

  useEffect(() => {
    // ユーザーネームをセッションから取得
    const getUsername = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { user } = response.data;
        setLoginUser(user[0].username); // セッションに格納されているユーザー情報
      });
    };
    getUsername();
  }, []);

  // ログインしているユーザーを元にデータを取得
  useEffect(() => {
    const getItems = async () => {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/getItems`, {
        username: loginUser,
      }).then((response) => {
        const { result, err } = response.data;
        setBookItems(result);
      });
    };
    getItems();
  }, [loginUser, update]);

  // カテゴリごとにデータを抽出して新しい配列に格納
  const diaryArry = bookItems.filter((item) => item.category === "diary");
  const familyArry = bookItems.filter((item) => item.category === "family");
  const childArry = bookItems.filter((item) => item.category === "child");
  const petArry = bookItems.filter((item) => item.category === "pet");
  const hobyArry = bookItems.filter((item) => item.category === "hoby");
  const friendArry = bookItems.filter((item) => item.category === "friend");
  const loverArry = bookItems.filter((item) => item.category === "lover");
  const travelArry = bookItems.filter((item) => item.category === "travel");
  const portfolioArry = bookItems.filter(
    (item) => item.category === "portfolio"
  );

  // カテゴリごとに抽出したデータの配列を一つの配列にまとめる
  // 構造 → 配列の中に配列、その中にオブジェクト // [[{},{}],[{},{}]]
  const categoryArrays = [
    diaryArry,
    familyArry,
    childArry,
    petArry,
    hobyArry,
    friendArry,
    loverArry,
    travelArry,
    portfolioArry,
  ];
  // 値が1つ以上格納されているカテゴリーを抽出
  const filterCategoryArrays = categoryArrays.filter((item) => item.length > 0);

  const insertItem = async () => {
    // awsのバケットURLを取得
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/s3Url`).then(
      (response) => {
        const { url } = response.data;
        // awsのURLにput
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: fileUrl, // imageUrlを送る
        });
        const coverImage = url.split("?")[0];

        const insert = async () => {
          if (fileUrl !== "" && bookName !== "") {
            // 入力した情報をDBに追加
            console.log(category);
            await Axios.post(
              `http://${process.env.REACT_APP_PUBLIC_IP}/insert`,
              {
                username: loginUser,
                bookName,
                coverImage,
                category,
              }
            ).then((response) => {
              const { result, err } = response.data;
              console.log({ result, err });
              setModalToggle(false); // モーダルを閉じる
              setBookName(""); // タイトルをデフォルト状態に戻す
              setDefaultIndex(true); // タブのアニメーションをデフォルトに戻す
              setSucMsgToggle(true); // 追加完了のメッセージを出す
              setModalImageUrl(""); // 画像プレビューをデフォルト状態に戻す
              // 3秒後にメッセージを閉じる
              setTimeout(() => {
                setUpdate(!update);
                setTimeout(() => {
                  setSucMsgToggle(false);
                  setCategory("diary"); // タブの初期値をデフォルトに戻す
                });
              }, 1000);
            });
          } else {
            setErrMsgToggle(true);
          }
        };
        insert();
      }
    );
  };

  const deleteItem = async (id) => {
    await Axios.delete(
      `http://${process.env.REACT_APP_PUBLIC_IP}/delete/${id}`
    ).then((response) => {
      setBookItems([]); // ステートを初期化してから
      setUpdate(!update); // 情報を取得する
    });
  };

  const favoriteState = async (id, num) => {
    await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
      id,
      num,
    });
    setUpdate(!update);
  };

  return (
    <>
      {/* ヘッダー */}
      <Header root={"/mybooks"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <div className="flex items-center">
          <Search />
          <MenuOpenModal loginUser={loginUser} />
        </div>
      </Header>
      {/* メインコンテンツ */}
      <div className="flex h-screen w-screen snap-y snap-mandatory flex-col overflow-scroll text-center">
        {bookItems.length > 0 ? (
          // bookItems(bookの情報を格納している配列)の中の配列の中にデータが存在しない場合(0の場合)は"まだ何もありません"を表示
          <>
            {filterCategoryArrays.map((item, index) => (
              // filterCategoryArrays → 値が一つ以上格納されているオブジェクトが格納されてる配列
              <>
                <div
                  key={item.bookId}
                  className="h-screen w-screen snap-start snap-always"
                >
                  {/* <p className="">{`${index + 1} / ${filterCategoryArrays.length}`}</p> */}
                  <Books
                    items={item}
                    deleteItem={deleteItem}
                    favoriteState={favoriteState}
                  />
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            <div className="flex h-screen w-screen flex-col items-center justify-around">
              <div className="">
                <p className="text-bold my-2 text-xl font-bold text-slate-500">
                  まだ何もありません
                </p>
                <p className="text-bold text-slate-500">
                  まずは本を追加してみましょう
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-bold my-8 flex items-center text-slate-500">
                  <AiOutlinePlus className="mx-2 text-slate-800" />
                  をクリックして追加
                </p>
                <p className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-slate-400 bg-white text-slate-800 shadow-md">
                  <BsArrowDown />
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* モーダル出現ボタン */}
      <AddBookBtn setModalToggle={setModalToggle} />
      {/* モーダルウィンドウ */}
      <AddBookModal
        bookListItems={{ bookName, category }}
        setBookListItems={{ setBookName, setCategory }}
        toggle={{ modalToggle, setModalToggle }}
        insertItem={insertItem}
        msgShow={{ errMsgToggle, setErrMsgToggle }}
      />
      <SuccessMsgWindow
        msgToggle={sucMsgToggle}
        category={category}
        msgText="に新しく本を追加しました。"
        headerText="成功"
      />
      <FooterTab />
    </>
  );
});

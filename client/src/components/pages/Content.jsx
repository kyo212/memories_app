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
import { Loading } from "../atoms/style/Loading";
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
  const [bookTitle, setBookTitle] = useState("");
  const [category, setCategory] = useState("diary");
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  const [bookItems, setBookItems] = useState([]);
  // Toggle
  const [modalToggle, setModalToggle] = useState(false);
  const [loading, setLoading] = useState(false);
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
    const getUsername = () => {
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/loginState`).then(
        (response) => {
          const { user } = response.data;
          setLoginUser(user[0].username); // セッションに格納されているユーザー情報
        }
      );
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
          if (fileUrl !== "" && bookTitle !== "") {
            // 入力した情報をDBに追加
            console.log(category);
            await Axios.post(
              `http://${process.env.REACT_APP_PUBLIC_IP}/insert`,
              {
                username: loginUser,
                bookTitle,
                coverImage,
                category,
              }
            ).then((response) => {
              const { result, err } = response.data;
              console.log({ result, err });
              setModalToggle(false); // モーダルを閉じる
              setBookTitle(""); // タイトルをデフォルト状態に戻す
              setDefaultIndex(true); // タブのアニメーションをデフォルトに戻す
              setSucMsgToggle(true); // 追加完了のメッセージを出す
              setModalImageUrl(""); // 画像プレビューをデフォルト状態に戻す
              // 3秒後にメッセージを閉じる
              setTimeout(() => {
                setUpdate(!update);
                setTimeout(() => {
                  setSucMsgToggle(false);
                  setCategory("diary"); // タブの初期値をデフォルトに戻す
                }, 2000);
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
    ).then(() => {
      // DBから値を消してもstateには残っているため最後だけ初期化する
      bookItems.length === 1 && setBookItems([]);
      setUpdate(!update);
    });
  };

  const favoriteState = async (id, num) => {
    await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
      id,
      num,
    });
    setUpdate(!update);
  };

  // リロードの間、loading画面を表示させる
  // この記述がないとloadingがすぐtrueになってしまい、"まだなにもありません"が表示されてしまう
  useEffect(() => setTimeout(() => setLoading(true), 1000), []);

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
      <div className="flex h-screen w-screen snap-x snap-mandatory overflow-scroll text-center">
        {bookItems.length > 0 ? (
          // bookItems(bookの情報を格納している配列)の中の配列の中にデータが存在しない場合(0の場合)は"まだ何もありません"を表示
          <>
            {bookItems.map((item, index) => (
              <>
                <div
                  id={index}
                  key={item.bookId}
                  className="h-screen w-screen snap-start snap-always"
                >
                  <Books
                    item={item}
                    index={index}
                    bookItems={bookItems}
                    deleteItem={deleteItem}
                    favoriteState={favoriteState}
                  />
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            {loading ? (
              // リロード中はstateがデフォルト値になるから、stateがデフォルト値(リロード中)の場合はloadingを表示させるようにする処理
              <>
                <div className="w-screen">
                  <div className="fixed bottom-20 flex h-[75%] w-full flex-col items-center justify-around bg-white">
                    <div>
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
                </div>
              </>
            ) : (
              <Loading />
            )}
          </>
        )}
      </div>

      {/* モーダル出現ボタン */}
      <AddBookBtn setModalToggle={setModalToggle} />
      {/* モーダルウィンドウ */}
      <AddBookModal
        bookListItems={{ bookTitle, category }}
        setBookListItems={{ setBookTitle, setCategory }}
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

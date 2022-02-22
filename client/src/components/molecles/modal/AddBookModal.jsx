import { memo, useEffect, useState } from "react";
import Axios from "axios";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
import { useForceUpdate } from "../../custom/useForceUpdate";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Tab } from "../tabs/Tab";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";

export const AddBookModal = memo(({ toggle }) => {
  // 情報
  const [loginUser, setLoginUser] = useState("gest");
  const [bookName, setBookName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  // カスタムフック
  const [update, { setUpdate }] = useForceUpdate();
  const { modalToggle, setModalToggle } = toggle;
  const { modals } = useStyle();
  const { modalAnimation, modalWindowAnimation, modalTabAnimation } = modals;

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

  // 入力した情報をDBに追加
  const insertItem = async () => {
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/insert`, {
      username: loginUser,
      bookName,
      coverImage,
      category,
    }).then((response) => {
      const { result, err } = response.data;
      console.log({ result, err });
      setCoverImage(!update);
      setModalToggle(false);
    });
  };

  return (
    <div
      className={[modalToggle ? modalAnimation.showed : modalAnimation.base]}
    >
      <div
        className={[
          modalToggle ? modalWindowAnimation.showed : modalWindowAnimation.base,
        ]}
      >
        <div className="flex h-[98%] w-[80%] flex-col items-center">
          <div className="my-10 flex flex-col">
            <div className="mb-4">
              <p className="mb-2 border-b text-lg font-bold text-slate-500">
                本のタイトル
              </p>
              <input
                type="text"
                autoFocus
                placeholder="本のタイトルを入力"
                onChange={(e) => setBookName(e.target.value)}
                className="w-full rounded-md border p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 border-b text-lg font-bold text-slate-500">
                表紙
              </p>
              <ImageUrlCreate
                className={"inline-block h-52 w-full bg-gray-100"}
              />
            </div>
            <div>
              <p className="border-b text-lg font-bold text-slate-500">
                カテゴリー
              </p>
              <div className="mt-4 mb-10">
                <Tab
                  hidden={"hidden"}
                  animation={modalTabAnimation}
                  ulClass={"my-2 space-x-2 space-y-2"}
                  setCategory={setCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 追加ボタン */}
      <button
        onClick={insertItem}
        className="absolute bottom-3 rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 font-bold text-white"
      >
        追加する
      </button>
      {/* 閉じるボタン */}
      <span
        className="absolute bottom-0 right-0 inline-block p-4 text-4xl text-white hover:bg-white hover:bg-opacity-40"
        onClick={() => {
          setModalToggle(false);
        }}
      >
        <AiOutlinePlus className="rotate-45 transform" />
      </span>
    </div>
  );
});

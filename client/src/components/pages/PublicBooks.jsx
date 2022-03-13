import { memo, useContext, useEffect, useState } from "react";
import Axios from "axios";
// コンポーネント
import { Header } from "../organisms/Header";
// コンテキスト
import { Context } from "../../App";

export const PublicBooks = memo(() => {
  const [shareItems, setShareItems] = useState([]);
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);

  useEffect(() => {
    const getPublicItems = async () => {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/getItems`, {
        shareId: 1,
      }).then((response) => {
        const { result, err } = response.data;
        setShareItems(result);
      });
    };
    getPublicItems();
  }, []);

  return (
    <>
      <Header root={"/mybooks"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <div className="flex items-center">
          {/* <Search /> */}
          {/* <MenuOpenModal loginUser={loginUser} /> */}
        </div>
      </Header>
      <>
        {shareItems.map((item) => (
          <div key={item.bookId}>
            <div className="">
              <p>{item.bookTitle}</p>
              <p>{item.username}</p>
            </div>
          </div>
        ))}
      </>
    </>
  );
});

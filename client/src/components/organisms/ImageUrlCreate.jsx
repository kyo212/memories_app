import { memo, useContext } from "react";
import { Context } from "../../App";

export const ImageUrlCreate = memo(({ coverImage, imageStyle }) => {
  const { setFileUrl, setModalImageUrl } = useContext(Context);

  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setModalImageUrl(imageUrl);
    setFileUrl(imageFile);
  };

  return (
    // className="inline-block h-52 w-full bg-gray-100"
    // className="h-[60%] w-[90%] border shadow-inner"
    <label className={`${imageStyle}`}>
      <input
        type="file"
        // onClick={() => window.confirm("変更しますか？")}
        onChange={processImage}
        accept="image/*"
        className="hidden"
      />
      <img
        src={coverImage}
        onError={(e) => (e.target.value = "OK")}
        alt="表紙の画像"
        className="h-full w-full object-cover"
      />
    </label>
  );
});

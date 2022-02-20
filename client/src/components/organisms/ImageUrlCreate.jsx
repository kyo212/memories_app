import { useState } from "react";

export const ImageUrlCreate = ({ className }) => {
  const [fileUrl, setFileUrl] = useState("");

  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  return (
    // className="inline-block h-52 w-full bg-gray-100"
    // className="h-[60%] w-[90%] border shadow-inner"
    <label className={className}>
      <input
        type="file"
        // onClick={() => window.confirm("変更しますか？")}
        onChange={(e) => processImage(e)}
        accept="image/*"
        className="hidden"
      />
      <img
        src={fileUrl}
        onError={(e) => (e.target.value = "OK")}
        alt="表紙の画像"
        className="h-full w-full object-cover"
      />
    </label>
  );
};

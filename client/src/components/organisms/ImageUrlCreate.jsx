import { memo, useContext, useState } from "react";
// コンテキスト
import { Context } from "../../App";

export const ImageUrlCreate = memo(
  ({ imageUrl, videoUrl, imageStyle, acceptType }) => {
    // コンテキスト
    const { setFileUrl, setModalImageUrl, setVideoUrl } = useContext(Context);
    // Toggle
    const [imageOrVideo, setImageOrVideo] = useState(false);

    // ファイルを選んだときに呼ばれる関数
    const processImage = (e) => {
      // URLを生成
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);

      if (String(imageFile.type).indexOf("video")) {
        setModalImageUrl(imageUrl); // タイプがimageだった場合
        setImageOrVideo(false);
      } else {
        setVideoUrl(imageUrl); // タイプがvideoだった場合
        setImageOrVideo(true);
      }

      setFileUrl(imageFile);
    };

    return (
      // className="inline-block h-52 w-full bg-gray-100"
      // className="h-[60%] w-[90%] border shadow-inner"
      <label className={`${imageStyle}`}>
        <input
          type="file"
          onChange={processImage}
          accept={acceptType}
          className="hidden"
        />
        {!imageOrVideo ? (
          <img
            src={imageUrl}
            onError={(e) => (e.target.value = "OK")}
            alt="表紙の画像"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={videoUrl}
            controls
            className="h-full w-full object-cover"
          ></video>
        )}
      </label>
    );
  }
);

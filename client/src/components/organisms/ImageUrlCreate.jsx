import { memo, useContext, useState } from "react";
// コンテキスト
import { Context } from "../../App";

export const ImageUrlCreate = memo(
  ({ imageUrl, imageStyle, acceptType, video }) => {
    // props
    const { videoUrl, videoCtrl, videoLoop } = video;
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
            alt="表紙の画像"
            className={[
              imageUrl
                ? "h-full w-full object-cover"
                : "h-full w-full opacity-0",
            ]}
          />
        ) : (
          <video
            src={videoUrl}
            controls={videoCtrl}
            autoPlay
            muted
            playsInline
            loop={videoLoop}
            className="h-full w-full object-cover"
          />
        )}
      </label>
    );
  }
);

import { memo, useContext } from "react";
// コンテキスト
import { Context } from "../../App";

export const ImageUrlCreate = memo(
  ({ imageUrl, imageStyle, acceptType, video }) => {
    // props
    const { videoUrl,videoAutoPlay, videoCtrl, videoLoop } = video;
    // コンテキスト
    const { setImageFileUrl, setVideoFileUrl, setModalImageUrl, setVideoUrl } =
      useContext(Context);

    // ファイルを選んだときに呼ばれる関数
    const processImage = (e) => {
      // URLを生成
      const imageFile = e.target.files[0];
      const mediaUrl = URL.createObjectURL(imageFile);

      if (String(imageFile.type).indexOf("video")) {
        // タイプがimageだった場合
        setVideoUrl(""); // プレビューの初期化
        setVideoFileUrl(""); // DB保存用 初期化
        setModalImageUrl(mediaUrl); // プレビュー用
        setImageFileUrl(imageFile); // DB保存用
      } else {
        // タイプがvideoだった場合
        setModalImageUrl(""); // プレビューの初期化
        setImageFileUrl(""); // DB保存用 初期化
        setVideoUrl(mediaUrl); // プレビュー用
        setVideoFileUrl(imageFile); // DB保存用
      }
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
        {imageUrl ? ( // propsのimageUrlに値が渡ってきた場合
          <img
            src={imageUrl}
            alt="表紙の画像"
            className={[
              imageUrl
                ? "h-full w-full object-cover"
                : "h-full w-full opacity-0",
            ]}
          />
        ) : videoUrl ? ( // propsのvideoUrlに値が渡ってきた場合
          <video
            src={videoUrl}
            controls={videoCtrl}
            autoPlay={videoAutoPlay}
            muted
            playsInline
            loop={videoLoop}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={""}
            alt="表紙の画像"
            className={[
              imageUrl
                ? "h-full w-full object-cover"
                : "h-full w-full opacity-0",
            ]}
          />
        )}
      </label>
    );
  }
);

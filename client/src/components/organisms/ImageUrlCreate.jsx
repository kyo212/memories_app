import { memo, useContext } from "react";
// コンテキスト
import { Context } from "../../App";

export const ImageUrlCreate = memo(
  ({ imageUrl, imageSize, imageStyle, videoStyle , disabled, acceptType, video }) => {
    // props
    const { videoUrl, videoAutoPlay, videoCtrl, videoLoop } = video;
    // コンテキスト
    const { setImageFile, setVideoFile, setImageUrl, setVideoUrl } =
      useContext(Context);

    // ファイルを選んだときに呼ばれる関数
    const processImage = (e) => {
      // URLを生成
      const imageFile = e.target.files[0];
      const mediaUrl = URL.createObjectURL(imageFile);

      if (String(imageFile.type).indexOf("video")) {
        // タイプがimageだった場合
        setVideoUrl(""); // プレビューの初期化
        setVideoFile(""); // DB保存用 初期化
        setImageUrl(mediaUrl); // プレビュー用
        setImageFile(imageFile); // DB保存用
      } else {
        // タイプがvideoだった場合
        setImageUrl(""); // プレビューの初期化
        setImageFile(""); // DB保存用 初期化
        setVideoUrl(mediaUrl); // プレビュー用
        setVideoFile(imageFile); // DB保存用
      }
    };

    return (
      // className="inline-block h-52 w-full bg-gray-100"
      // className="h-[60%] w-[90%] border shadow-inner"
      <label className={`${imageSize}`}>
        <input
          type="file"
          disabled={disabled}
          onChange={processImage}
          accept={acceptType}
          className="hidden"
        />
        {imageUrl ? ( // propsのimageUrlに値が渡ってきた場合
          <img loading="lazy" src={imageUrl} alt="表紙の画像" className={imageStyle} />
        ) : videoUrl ? ( // propsのvideoUrlに値が渡ってきた場合
          <video
            src={videoUrl}
            controls={videoCtrl}
            autoPlay={videoAutoPlay}
            muted
            playsInline
            loop={videoLoop}
            className={videoStyle}
          />
        ) : (
          <img src={""} alt="表紙の画像" className="h-full w-full opacity-0" />
        )}
      </label>
    );
  }
);

import { useLocation } from "react-router-dom";
import { IonButton, IonCard } from "@ionic/react";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface VideoProps {
  setTitle: (title: string) => void;
  setProgress: (progress: number) => void;
}
const Video: React.FC<VideoProps> = ({ setTitle, setProgress }) => {
  const { width, height } = useWindowSize();

  useEffect(() => {
    setTitle("完成");
    setProgress(1);
  }, []);

  const {
    state: { video },
  } = useLocation() as { state: { video: Blob } };

  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    setDownloadUrl(URL.createObjectURL(video));
  }, [video]);

  const handleShare: (video: Blob) => void = (video: Blob) => {
    const shareData = {
      files: [new File([video], "video.mp4", { type: "video/mp4" })],
      text: "這是我的復古回憶！到 https://vintage-adventure.vercel.app/ 一起製作回憶！",
    };

    if (!navigator.canShare) {
      console.log("canShare not supported");
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(video);
      anchor.download = "video.mp4";
      anchor.click();
    } else if (navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(video);
      anchor.download = "video.mp4";
      anchor.click();
    }
  };

  return (
    <>
      <Confetti width={width} height={height} recycle={false} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonCard style={{ maxWidth: "25rem", padding: "0.7rem" }}>
          <video id="video" controls style={{ maxWidth: "100%" }} autoPlay>
            <source src={URL.createObjectURL(video)} type="video/mp4" />
          </video>
        </IonCard>

        <IonButton
          color="secondary"
          expand="block"
          style={{ padding: "1rem 0" }}
          onClick={() => handleShare(video)}
        >
          分享 / 下載
        </IonButton>
      </div>
    </>
  );
};
export default Video;

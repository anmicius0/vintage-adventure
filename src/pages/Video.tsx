import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IonCard } from "@ionic/react";
import confetti from "canvas-confetti";

import Button from "../components/Button";

interface VideoProps {
  setTitle: (title: string) => void;
  setProgress: (progress: number) => void;
}

const Video: React.FC<VideoProps> = ({ setTitle, setProgress }) => {
  // Confetti
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: Object) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  useEffect(() => {
    setTitle("完成");
    setProgress(1);

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const {
    state: { video },
  } = useLocation() as { state: { video: Blob } };

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonCard style={{ maxWidth: "25rem", padding: "0.7rem" }}>
          <video
            src={URL.createObjectURL(video)}
            controls
            autoPlay
            style={{ maxWidth: "100%" }}
          ></video>
        </IonCard>

        <Button text={"分享 / 下載"} clickFunction={() => handleShare(video)} />
      </div>
    </>
  );
};

export default Video;

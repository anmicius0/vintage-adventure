import Layout from "../template/Layout";
import { useLocation } from "react-router-dom";
import { IonButton, IonCard } from "@ionic/react";
import { useEffect, useState } from "react";

const Video: React.FC = () => {
  const {
    state: { video },
  } = useLocation() as { state: { video: Blob } };
  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    setDownloadUrl(URL.createObjectURL(video));
  }, []);

  return (
    <Layout title={"成果"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonCard style={{ maxWidth: "25rem", padding: "0.7rem" }}>
          <video id="video" controls style={{ maxWidth: "100%" }}>
            <source src={URL.createObjectURL(video)} type="video/mp4" />
          </video>
        </IonCard>

        <a href={downloadUrl} download={"video.mp4"}>
          <IonButton
            color="secondary"
            expand="block"
            style={{ padding: "1rem 0" }}
          >
            下載
          </IonButton>
        </a>
      </div>
    </Layout>
  );
};
export default Video;

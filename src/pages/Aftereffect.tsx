import {
  IonButton,
  IonTextarea,
  IonImg,
  IonCard,
  useIonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  image_to_image,
  prompt_to_prompt,
  to_video,
  voice_to_text,
} from "../utils/utils";
import AudioRecorder from "../components/audioRecorder";

interface AftereffectProps {
  setTitle: (title: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

const Aftereffect: React.FC<AftereffectProps> = ({
  setTitle,
  setLoading,
  setProgress,
}) => {
  useEffect(() => {
    setTitle("第三步：說故事");
    setProgress(2 / 3);
  }, []);

  const [prompt, setPrompt] = useState<string>("");
  const [recording, setRecording] = useState<Blob>();
  const [present, dismiss] = useIonLoading();
  const {
    state: { image: originalImg },
  } = useLocation() as { state: { image: Blob } };
  const history = useHistory();

  const stableGen = async () => {
    setLoading(true);
    present("AI施法中...");
    const newPrompt = await prompt_to_prompt(prompt);
    const gen_image = await image_to_image(originalImg, newPrompt);
    const gen_video = await to_video(gen_image, recording!);
    dismiss();
    setLoading(false);
    history.push({
      pathname: "/video",
      state: { video: gen_video },
    });
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
        {originalImg ? (
          <IonCard style={{ maxWidth: "25rem" }}>
            <IonImg src={URL.createObjectURL(originalImg)} />
          </IonCard>
        ) : null}

        {/* Voice  */}
        {prompt ? (
          <>
            <IonTextarea
              label="輸入故事區"
              labelPlacement="floating"
              fill="outline"
              color="secondary"
              placeholder="請說出你的故事"
              value={prompt}
              onChange={e => setPrompt(e.currentTarget.value as string)}
              style={{ maxWidth: "27rem", padding: "1rem" }}
            />

            <IonButton
              color="secondary"
              expand="block"
              onClick={() => stableGen()}
            >
              生成影片
            </IonButton>
          </>
        ) : null}
        <AudioRecorder
          setPrompt={setPrompt}
          setRecording={setRecording}
          recording={recording}
        />
      </div>
    </>
  );
};

export default Aftereffect;

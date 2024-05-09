import {
  IonButton,
  IonTextarea,
  IonText,
  IonImg,
  IonCard,
  IonToggle,
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
import { AudioRecorder } from "react-audio-voice-recorder";
import { SaveSharp } from "react-ionicons";

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
  const [taiwanese, setTaiwanese] = useState<Boolean>(false);
  const [present, dismiss] = useIonLoading();
  const {
    state: { image: originalImg },
  } = useLocation() as { state: { image: Blob } };
  const history = useHistory();

  const processVoice = async (audio: Blob) => {
    present("AI轉文字中...");
    setRecording(audio);
    const transcript = await voice_to_text(audio as Blob, taiwanese);
    setPrompt(transcript);
    dismiss();
  };

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
        {prompt && recording ? (
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
            <IonButton
              color="secondary"
              expand="block"
              fill="outline"
              onClick={() => {
                setRecording(undefined);
                setPrompt("");
              }}
            >
              重錄語音
            </IonButton>
          </>
        ) : (
          <>
            <IonText style={{ fontSize: ".8rem" }}>
              按
              <SaveSharp
                style={{
                  width: "0.8rem",
                  verticalAlign: "text-top",
                  margin: "0.1rem",
                }}
              />
              結束錄音
            </IonText>
            <IonToggle
              color="secondary"
              style={{ margin: "2rem" }}
              onClick={() => setTaiwanese(!taiwanese)}
            >
              台語
            </IonToggle>
            <AudioRecorder
              onRecordingComplete={(audio: Blob) => {
                processVoice(audio);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Aftereffect;

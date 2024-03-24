import { IonButton, IonTextarea, IonImg, IonCard } from "@ionic/react";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  image_to_image,
  prompt_to_prompt,
  to_video,
  voice_to_text,
} from "../utils/utils";
import { AudioRecorder } from "react-audio-voice-recorder";
import Layout from "../template/Layout";

const Aftereffect: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [recording, setRecording] = useState<Blob>();
  const {
    state: { image: originalImg },
  } = useLocation() as { state: { image: Blob } };
  const history = useHistory();

  const processVoice = async (audio: Blob) => {
    setRecording(audio);
    const transcript = await voice_to_text(audio as Blob);
    setPrompt(transcript);
  };

  const stableGen = async () => {
    const newPrompt = await prompt_to_prompt(prompt);
    const gen_image = await image_to_image(originalImg, newPrompt);
    const gen_video = await to_video(gen_image, recording!);
    history.push({
      pathname: "/video",
      state: { video: gen_video },
    });
  };

  return (
    <Layout title="第三步：說故事">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonCard style={{ maxWidth: "25rem" }}>
          <IonImg src={URL.createObjectURL(originalImg)} />
        </IonCard>

        {/* Prompt */}
        <IonTextarea
          label="輸入故事區"
          labelPlacement="floating"
          fill="outline"
          color="secondary"
          placeholder="請說出你的故事"
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value as string)}
          style={{ maxWidth: "27rem", padding: "1rem" }}
        />

        {/* Voice  */}
        {recording ? null : (
          <AudioRecorder
            onRecordingComplete={(audio: Blob) => processVoice(audio)}
          />
        )}

        {prompt ? (
          <IonButton
            color="secondary"
            expand="block"
            onClick={() => stableGen()}
          >
            生成影片
          </IonButton>
        ) : null}
      </div>
    </Layout>
  );
};

export default Aftereffect;

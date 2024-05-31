import { IonButton, IonToggle, useIonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { voice_to_text } from "../utils/utils";

interface Props {
  setPrompt: (prompt: string) => void;
  setRecording: (recording: Blob | undefined) => void;
  recording: Blob | undefined;
}

const AudioRecorder: React.FC<Props> = ({
  setPrompt,
  setRecording,
  recording,
}) => {
  const [taiwanese, setTaiwanese] = useState<Boolean>(false);
  const [present, dismiss] = useIonLoading();

  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, audioRef } = recorderControls;

  useEffect(() => {
    if (!recordedBlob) return;
    setTaiwanese(false);
    processVoice(recordedBlob);
    setRecording(recordedBlob);
  }, [recordedBlob]);

  const processVoice = async (audio: Blob): Promise<void> => {
    await present("AI轉文字中...");
    setRecording(audio);
    const transcript = await voice_to_text(audio as Blob, taiwanese);
    setPrompt(transcript);
    await dismiss();
  };

  return (
    <>
      {recording ? (
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
      ) : (
        <>
          <IonToggle
            color="secondary"
            style={{ marginTop: "1rem" }}
            onClick={() => setTaiwanese(!taiwanese)}
          >
            台語
          </IonToggle>

          <VoiceVisualizer
            // Style
            height="0"
            barWidth={8}
            mainBarColor="#212529"
            secondaryBarColor="#212529"
            controlButtonsClassName="recorder-controls"
            isDefaultUIShown={false}
            isProgressIndicatorShown={false}
            // Functionality
            ref={audioRef}
            controls={recorderControls}
            onlyRecording={true}
          />
        </>
      )}
    </>
  );
};

export default AudioRecorder;

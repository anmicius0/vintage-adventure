import { IonToggle, useIonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";

import { voice_to_text } from "../utils/utils";

interface Props {
  setTargetText: (text: string) => void;
  setRecording?: (recording: Blob | undefined) => void;
}

const AudioRecorder: React.FC<Props> = ({ setTargetText, setRecording }) => {
  const [taiwanese, setTaiwanese] = useState<boolean>(false);
  const [present, dismiss] = useIonLoading();

  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, audioRef } = recorderControls;

  useEffect(() => {
    if (recordedBlob) {
      processVoice(recordedBlob);
    }
  }, [recordedBlob]);

  const processVoice = async (audio: Blob): Promise<void> => {
    await present("AI轉文字中...");
    if (setRecording) {
      setRecording(audio);
    }
    const transcript = await voice_to_text(audio, taiwanese);
    setTargetText(transcript);
    await dismiss();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <IonToggle
        color="secondary"
        style={{ marginTop: "1rem" }}
        checked={taiwanese}
        onIonChange={() => setTaiwanese(!taiwanese)}
      >
        台語
      </IonToggle>
      <VoiceVisualizer
        height="0"
        controlButtonsClassName="recorder-controls"
        isDefaultUIShown={false}
        isProgressIndicatorShown={false}
        ref={audioRef}
        controls={recorderControls}
        onlyRecording
      />
    </div>
  );
};

export default AudioRecorder;

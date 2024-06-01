import React from "react";
import { IonButton } from "@ionic/react";

interface Props {
  text: string;
  clickFunction: () => void;
  color?: string;
}

const Button: React.FC<Props> = ({
  text,
  clickFunction,
  color = "secondary",
}) => {
  return (
    <IonButton
      color={color}
      expand="block"
      onClick={clickFunction}
      style={{
        maxWidth: "40rem",
        margin: "0 auto",
        padding: "1rem 1rem",
        fontFamily: '"Noto Sans TC", sans-serif',
        fontWeight: 300,
      }}
    >
      {text}
    </IonButton>
  );
};

export default Button;

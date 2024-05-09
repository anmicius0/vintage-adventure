import React, { useEffect, useState } from "react";
import { IonButton, IonText, IonSearchbar } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { find_place } from "../utils/utils";

interface HomeProps {
  setTitle: (title: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

const Home: React.FC<HomeProps> = ({ setTitle, setLoading, setProgress }) => {
  useEffect(() => {
    setTitle("第一步：找地點");
    setProgress(0);
  }, []);

  const [query, setQuery] = useState<string>("");
  const history = useHistory();
  const search = async (query: string) => {
    setLoading(true);
    const location = await find_place(query);
    setLoading(false);
    history.push(`/streetview?${new URLSearchParams(location).toString()}`);
  };

  return (
    <>
      <IonText style={{ textAlign: "center" }}>
        <h1 style={{ margin: "5rem 0", fontWeight: "700" }}>
          美好的旅程從這開始
        </h1>
      </IonText>

      <IonSearchbar
        value={query}
        autocapitalize="on"
        showClearButton="focus"
        onIonChange={e => setQuery(e.detail.value as string)}
        style={{
          maxWidth: "40rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      />
      <IonButton
        color="secondary"
        expand="block"
        onClick={() => {
          if (query) search(query);
        }}
        style={{ maxWidth: "40rem", margin: "0 auto", padding: "1rem 1rem" }}
      >
        搜尋地點
      </IonButton>
    </>
  );
};

export default Home;

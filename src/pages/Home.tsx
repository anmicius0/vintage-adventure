import React, { useEffect, useState } from "react";
import { IonText, IonSearchbar } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { find_place } from "../utils/utils";
import Button from "../components/Button";

interface HomeProps {
  setTitle: (title: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

const Home: React.FC<HomeProps> = ({ setTitle, setLoading, setProgress }) => {
  useEffect(() => {
    setTitle("第一步：找地點");
    setProgress(0);
  }, [setTitle, setProgress]);

  const [query, setQuery] = useState<string>("");
  const history = useHistory();
  const search = async (query: string) => {
    try {
      setLoading(true);
      const location = await find_place(query);
      history.push(`/streetview?${new URLSearchParams(location).toString()}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          fontFamily: "Noto Sans TC",
          fontWeight: "300",
        }}
      />
      <Button
        text={"搜尋地點"}
        clickFunction={() => {
          if (query) search(query);
        }}
      />
    </>
  );
};

export default Home;

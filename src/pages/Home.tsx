import React, { useState } from "react";
import { IonButton, IonText, IonSearchbar } from "@ionic/react";
import Layout from "../template/Layout";
import { useHistory } from "react-router-dom";
import { find_place } from "../utils/utils";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const history = useHistory();
  const search = async (query: string) => {
    const location = await find_place(query);
    history.push(`/streetview?${new URLSearchParams(location).toString()}`);
  };

  return (
    <Layout title="第一步：搜尋地點">
      <IonText style={{ textAlign: "center" }}>
        <h1 style={{ margin: "5rem 0" }}>美好的旅程從這開始</h1>
      </IonText>

      <IonSearchbar
        value={query}
        showClearButton="focus"
        onIonChange={(e) => setQuery(e.detail.value as string)}
        style={{
          maxWidth: "40rem",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      />
      <IonButton
        color="secondary"
        expand="block"
        onClick={() => search(query)}
        style={{ maxWidth: "40rem", margin: "0 auto", padding: "1rem 1rem" }}
      >
        搜尋地點
      </IonButton>
    </Layout>
  );
};

export default Home;

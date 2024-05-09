import React, { Suspense, useState, useMemo } from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

const Home = React.lazy(() => import("./pages/Home"));
const Streetview = React.lazy(() => import("./pages/Streetview"));
const Aftereffect = React.lazy(() => import("./pages/Aftereffect"));
const Video = React.lazy(() => import("./pages/Video"));

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const setTitleMemo = useMemo(() => setTitle, []);
  const setLoadingMemo = useMemo(() => setLoading, []);
  const setProgressMemo = useMemo(() => setProgress, []);

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>{title}</IonTitle>
            <IonProgressBar
              type={loading ? "indeterminate" : "determinate"}
              value={progress}
              color="secondary"
            />
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonReactRouter>
            <IonRouterOutlet>
              <Suspense fallback={<div>載入中...</div>}>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <Home
                      setTitle={setTitleMemo}
                      setLoading={setLoadingMemo}
                      setProgress={setProgressMemo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/streetview"
                  component={() => (
                    <Streetview
                      setTitle={setTitleMemo}
                      setLoading={setLoading}
                      setProgress={setProgressMemo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/aftereffect"
                  component={() => (
                    <Aftereffect
                      setTitle={setTitleMemo}
                      setLoading={setLoadingMemo}
                      setProgress={setProgressMemo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/video"
                  component={() => (
                    <Video
                      setTitle={setTitleMemo}
                      setProgress={setProgressMemo}
                    />
                  )}
                />
              </Suspense>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;

import { IonButton, IonCard } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import { get_street_view } from "../utils/utils";

interface StreetviewProps {
  setTitle: (title: string) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
}

const Streetview: React.FC<StreetviewProps> = ({
  setTitle,
  setLoading,
  setProgress,
}) => {
  const history = useHistory();
  const location = useLocation<string>();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat")!;
  const lng = searchParams.get("lng")!;

  const [panoID, setPanoID] = useState<string>("");
  const [heading, setHeading] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);

  const onCapture = async () => {
    setLoading(true);
    const image = await get_street_view(panoID, heading, pitch);
    setLoading(false);
    history.push({
      pathname: "/aftereffect",
      state: { image: image },
    });
  };
  useEffect(() => {
    setTitle("第二步：拍照");
    setProgress(1 / 3);

    const loader = new Loader({
      apiKey: (import.meta as any).env.VITE_GMAPS_KEY,
      version: "weekly",
    });

    const init = async () => {
      const { StreetViewPanorama } = await loader.importLibrary("streetView");
      const panoCanvas = document.getElementById("pano") as HTMLElement;
      const panoOption = {
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
      };
      const panorama = new StreetViewPanorama(panoCanvas, panoOption);
      panorama.addListener("pano_changed", () => {
        setPanoID(panorama.getPano());
      });
      panorama.addListener("pov_changed", () => {
        setHeading(panorama.getPov().heading);
        setPitch(panorama.getPov().pitch);
      });
    };

    init().catch(error => {
      console.error("Error initializing StreetViewPanorama:", error);
    });
  }, []);

  return (
    <>
      <IonCard>
        <div id="pano" style={{ height: "500px" }}></div>
      </IonCard>

      <IonButton
        color={"secondary"}
        expand={"block"}
        onClick={onCapture}
        style={{
          maxWidth: "40rem",
          margin: "0 auto",
          padding: "1rem 1rem",
          fontFamily: "Noto Sans TC",
          fontWeight: "300",
        }}
      >
        截圖
      </IonButton>
    </>
  );
};

export default React.memo(Streetview);

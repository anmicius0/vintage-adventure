import { IonButton, IonCard } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Loader } from "@googlemaps/js-api-loader";
import { get_street_view, resizeImage } from "../utils/utils";
import Layout from "../template/Layout";

const Streetview: React.FC = () => {
  const history = useHistory();

  const location = useLocation<string>();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat")!;
  const lng = searchParams.get("lng")!;

  const [panoID, setPanoID] = useState<string>("");
  const [heading, setHeading] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);

  const onCapture = async () => {
    let image = await get_street_view(panoID, heading, pitch);
    image = await resizeImage(image);
    history.push({
      pathname: "/aftereffect",
      state: { image: image },
    });
  };

  useEffect(() => {
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

    init().catch((error) => {
      console.error("Error initializing StreetViewPanorama:", error);
    });
  }, []);

  return (
    <Layout title="第二步：拍照">
      <IonCard>
        <div>
          <div id="pano" style={{ height: "500px" }}></div>
        </div>
      </IonCard>

      <IonButton
        color={"secondary"}
        expand={"block"}
        onClick={onCapture}
        style={{ maxWidth: "20rem", margin: "0 auto", padding: "1rem 1rem" }}
      >
        截圖
      </IonButton>
    </Layout>
  );
};

export default Streetview;

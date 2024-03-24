const API_URL = (import.meta as any).env.VITE_API_URL;

// Home.tsx
export const find_place = async (query: string): Promise<string> => {
  const res = await fetch(`${API_URL}/find-place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const { location }: { location: string } = await res.json();
  return location;
};

// Streetview.tsx
export const get_street_view = async (
  panoID: string,
  heading: number,
  pitch: number,
): Promise<Blob> => {
  const res = await fetch(`${API_URL}/static-streetview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      panoID: panoID,
      heading: heading.toString(),
      pitch: pitch.toString(),
    }),
  });
  return new Blob([await res.arrayBuffer()], { type: "image/jpeg" });
};

// Aftereffect.tsx
export const voice_to_text = async (audio: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("audio", audio, "audio.ogg");
  const res = await fetch(`${API_URL}/stt`, {
    method: "POST",
    body: formData,
  });
  const { transcript } = await res.json();
  return transcript;
};

export const prompt_to_prompt = async (text: string): Promise<string> => {
  const res = await fetch(`${API_URL}/prompt-gen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  });
  const { prompt } = await res.json();
  return prompt;
};

export const image_to_image = async (
  image: Blob,
  prompt: string,
): Promise<Blob> => {
  const formData = new FormData();
  formData.append("image", image, "image.jpeg");
  formData.append("prompt", prompt);
  const res = await fetch(`${API_URL}/image-to-image`, {
    method: "POST",
    body: formData,
  });
  return new Blob([await res.arrayBuffer()], { type: "image/png" });
};

export const to_video = async (image: Blob, audio: Blob): Promise<Blob> => {
  const formData = new FormData();
  formData.append("image", image, "image.png");
  formData.append("audio", audio, "audio.ogg");
  const res = await fetch(`${API_URL}/to-video`, {
    method: "POST",
    body: formData,
  });
  return new Blob([await res.arrayBuffer()], { type: "video/mp4" });
};

export const resizeImage = (imageBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1024;
      canvas.height = 1024;
      ctx!.drawImage(img, 0, 0, 1024, 1024);
      canvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        "image/jpeg",
        1,
      );
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
};

import React from "react";


export const useImageLoadingTracker = (imageSrc: string) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if(!imageSrc) {
      setReady(true);
      return;
    };
    const buffer = new Image();
    buffer.onload = () => setReady(true);
    buffer.src = imageSrc;
  }, [imageSrc])

  return ready;
}
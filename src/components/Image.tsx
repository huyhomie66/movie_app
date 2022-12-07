import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import NextImage, { ImageProps } from "next/image";
import { IMAGE_URL } from "src/config";

const errorUrl =
  "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-red-error-icon-image_2248553.jpg";

export default function Image(props: ImageProps) {
  const [ready, setReady] = useState(false);

  const handleLoad = (event) => {
    event.persist();
    if (event.target.srcset) {
      setReady(true);
    }
  };
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    setSrc(`${IMAGE_URL}${props.src}`);
  }, [props.src]);

  const onError = () => {
    if (ready) {
      setSrc(errorUrl);
    }
  };
  const imageStyle = { borderRadius: "4px" };
  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity .1s ease-in-out"
      }}
    >
      <NextImage
        {...props}
        style={imageStyle}
        src={src}
        loading="lazy"
        onLoad={handleLoad}
        onError={onError}
      />
      {!props.src && <Skeleton style={imageStyle} height={120} width={120} />}
    </div>
  );
}

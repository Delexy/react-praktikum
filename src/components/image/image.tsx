import { FC, useCallback, useState } from "react";
import placeholder from "@images/placeholder.png";

interface Props {
  src?: string;
  alt?: string;
}

export const Image: FC<Props> = ({ src, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  const onError = useCallback(() => {
    setCurrentSrc(placeholder);
  }, [setCurrentSrc]);

  return <img src={currentSrc} onError={onError} alt={alt} />;
};

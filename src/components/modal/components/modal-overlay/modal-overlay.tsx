import { FC } from "react";

import classes from "./modal-overlay.module.css";

interface Props {
  closePopup: () => void;
}

export const ModalOverlay: FC<Props> = ({ closePopup }) => {
  return <div className={classes.overlay} onClick={closePopup}></div>;
};

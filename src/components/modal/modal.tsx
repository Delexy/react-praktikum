import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { ModalOverlay } from "./components";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./modal.module.css";

export interface ModalProps {
  children?: ReactNode;
  closePopup: () => void;
}

export const Modal: FC<ModalProps> = ({ children, closePopup }) => {
  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closePopup]);

  return createPortal(
    <>
      <div className={classes.modal}>
        <button className={classes.close} onClick={closePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup} />
    </>,
    document.getElementById("modals-container") as HTMLElement
  );
};

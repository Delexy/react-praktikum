import { FC } from "react";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./element.module.css";

interface Props {
  isDragable?: boolean;
  text: string;
  thumbnail: string;
  price: number;
  type?: "top" | "bottom";
  isLocked?: boolean;
  extraClass?: string;
  handleClose?: () => void;
}

export const Element: FC<Props> = ({ isDragable = true, ...props }) => (
  <li className={classes.element}>
    <div className={`${classes.icon} ${isDragable && classes.dragable}`}>
      {isDragable && <DragIcon type="primary" />}
    </div>
    <ConstructorElement {...props} />
  </li>
);

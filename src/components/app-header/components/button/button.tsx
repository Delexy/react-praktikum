import { FC, ReactElement } from "react";

import classes from "./button.module.css";

interface Props {
  Icon?: ReactElement;
  text?: string;
  className?: string;
}

export const Button: FC<Props> = ({ Icon, text, className }) => {
  return (
    <a
      className={`text_type_main-default pt-4 pb-4 pr-5 pl-5 ${classes.link} ${className}`}
    >
      {Icon ? Icon : null}
      {text}
    </a>
  );
};

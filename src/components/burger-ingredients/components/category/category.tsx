import { FC } from "react";
import { Ingredient } from "../ingredient";

interface Props {
  title: string;
}

export const Category: FC<Props> = ({ title }) => {
  return (
    <div>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul
        className="pl-4 pt-6 pr-4"
        style={{
          display: "grid",
          gap: "32px 24px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </ul>
    </div>
  );
};

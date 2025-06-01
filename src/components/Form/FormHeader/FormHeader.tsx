import { container, heading } from "./FormHeader.css";

type FormHeaderProps = {
  headline: string;
  subline?: string;
  textAlign?: "default" | "center";
};

export const FormHeader = ({
  headline,
  subline,
  textAlign,
}: FormHeaderProps) => {
  return (
    <div
      className={container}
      style={{ textAlign: textAlign === "center" ? "center" : "initial" }}
    >
      <h3 className={heading}>{headline}</h3>
      {subline && <p>{subline}</p>}
    </div>
  );
};

export default FormHeader;

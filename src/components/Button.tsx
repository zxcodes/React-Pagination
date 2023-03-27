import React, { CSSProperties } from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
};

type StyleProps = {
  button: CSSProperties;
};

const styles: StyleProps = {
  button: {
    padding: "0.625rem 1.25rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "0.625rem",
    color: "#242424",
    border: "none",
    fontSize: "1.0625rem",
    fontWeight: "bold",
  },
};

const Button = ({ text, onClick, disabled, style }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles.button,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : "initial",
        ...style,
      }}
    >
      {text}
    </button>
  );
};

export default Button;

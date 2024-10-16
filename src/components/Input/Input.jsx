import clsx from "clsx";
import cn from "./style.module.scss";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, className, defaultValue, placeholder, onChange } = props;

  return (
    <input
      type={type ? type : "text"}
      className={cn[clsx("input", className)]}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default Input;

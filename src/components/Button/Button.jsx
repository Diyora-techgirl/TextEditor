import clsx from "clsx";
import cn from "./style.module.scss";
function Button(props) {
  const { children, type, className, onClick, ...rest} = props;

  return (
    <button
      type={type ? type : "button"}
      className={cn[clsx("button", className)]}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

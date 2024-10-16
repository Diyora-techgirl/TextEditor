import clsx from "clsx";
import cn from "./style.module.scss";

function Loading() {
  return <div className={cn[clsx("spinner")]}></div>;
}

export default Loading;

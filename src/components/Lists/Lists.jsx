import clsx from "clsx";
import cn from "./style.module.scss";
import List from "./List";
import useData from "../../store/useData";

function Lists({ onEdit, onDelete }) {
  const { data } = useData();

  return (
    <ul className={cn[clsx("ul")]}>
      {data.map((list) => (
        <List key={list.id} list={list} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default Lists;

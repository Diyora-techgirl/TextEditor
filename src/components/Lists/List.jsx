import React, { useState, useEffect } from "react";
import clsx from "clsx";
import cn from "./list.module.scss";
import Button from "../Button/Button";

function List(props) {
  const { list, onEdit, onDelete } = props;
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setDescription(list.description);
    setTitle(list.title);
  }, [list.description, list.title]);

  const handleEdit = () => {
    onEdit(list); // Pass the entire list object to the onEdit function
  };

  const handleDelete = () => {
    onDelete(list.id);
  };

  return (
    <li className={cn[clsx("li")]}>
      <div className={cn[clsx("todo-list")]}>
        <span>{title}</span>
        <p dangerouslySetInnerHTML={{ __html: description }}></p> {/* Render description as HTML */}
        <div className={cn[clsx("buttons")]}>
          <Button className={cn[clsx('edit')]} onClick={handleEdit}>Edit</Button>
          <Button className={cn[clsx('delete')]} onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </li>
  );
}

export default List;

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "./services/api";
import useData from "./store/useData";
import Loading from "./components/Loading/Loading";
import "./Todo.scss";
import Button from "./components/Button/Button";
import TextEditor from "./components/TextEditor/TextEditor";
import Input from "./components/Input/Input";
import useDate from "./hooks/useDate";
import Lists from "./components/Lists/Lists";
import { queryClient } from "./main";

async function fetchData() {
  const res = await api.get("todos");
  return res.data;
}

async function postData(data) {
  const res = await api.post("todos", data);
  return res.data;
}

async function updateData({ id, data }) {
  const res = await api.put(`todos/${id}`, data);
  return res.data;
}

async function deleteData(id) {
  const res = await api.delete(`todos/${id}`);
  return res.data;
}

function Todo() {
  const { data, isLoading, isRefetching } = useQuery("todos", fetchData);
  const date = useDate();
  const { mutate: postMutate } = useMutation(postData, {
    onSuccess: () => {
      console.log("Success");
      inputRef.current.value = "";
      textEditorRef.current.innerHTML = "";
      queryClient.invalidateQueries("todos");
    },
  });
  const { mutate: updateMutate } = useMutation(updateData, {
    onSuccess: () => {
      console.log("Update Success");
      inputRef.current.value = "";
      textEditorRef.current.innerHTML = "";
      setEditingTodoId(null);
      queryClient.invalidateQueries("todos");
    },
  });
  const { mutate: deleteMutate } = useMutation(deleteData, {
    onSuccess: () => {
      console.log("Delete Success");
      queryClient.invalidateQueries("todos");
    },
  });
  const { setData } = useData();
  const inputRef = useRef(null);
  const textEditorRef = useRef(null);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setData(data);
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current && textEditorRef.current) {
      const title = inputRef.current.value || "Untitled";
      const description = textEditorRef.current.innerHTML.trim(); // Trim to remove whitespace

      if (!description) {
        alert("Please fill in the editor.");
        return;
      }

      const todoData = {
        title: title,
        description: description,
        date: date,
      };

      if (editingTodoId) {
        updateMutate({ id: editingTodoId, data: todoData });
      } else {
        postMutate(todoData);
      }
    }
  };

  const onEdit = (todo) => {
    setEditingTodoId(todo.id);
    inputRef.current.value = todo.title;
    textEditorRef.current.innerHTML = todo.description;
  };

  const onDelete = (id) => {
    deleteMutate(id);
  };

  if (isLoading || isRefetching) {
    return (
      <div className="box_loading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="todo">
      <div>
        <form className="form" id="form" onSubmit={onSubmit}>
          <Input type="text" placeholder="Title" defaultValue="Untitled" ref={inputRef} />
          <TextEditor ref={textEditorRef} />
          <Button type="submit">Send</Button>
        </form>
      </div>
      <div className="lists">
        <Lists onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default Todo;

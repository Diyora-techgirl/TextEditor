import React from "react";
import ReactDOM from "react-dom/client";
import Todo from "./Todo.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  </React.StrictMode>
);

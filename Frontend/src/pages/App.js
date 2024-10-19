import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import TaskList from "./task/TaskList";
import AddTask from "./task/AddTask";
import TaskDetail from "./task/TaskDetail";
import EditTask from "./task/EditTask";

const authLoader = () => {
  const userId = localStorage.getItem("USER_ID");
  return userId ? userId : redirect("/");
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<TaskList />} loader={authLoader} />
      <Route path="/tasks/add" element={<AddTask />} loader={authLoader} />
      <Route
        path="/tasks/:taskId"
        element={<TaskDetail />}
        loader={authLoader}
      />
      <Route
        path="/tasks/:taskId/edit"
        element={<EditTask />}
        loader={authLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

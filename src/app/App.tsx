import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function App() {

  useEffect(() => {
    Clarity.init("wuxtps2hvw");
  }, []);

  return <RouterProvider router={router} />;
}
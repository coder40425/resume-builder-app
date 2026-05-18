import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { BuilderPage } from "./pages/BuilderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/templates",
    Component: TemplatesPage,
  },
  {
    path: "/builder/:templateId",
    Component: BuilderPage,
  },
]);

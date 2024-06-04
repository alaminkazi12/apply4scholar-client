import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className=" max-w-[1440px] mx-auto mt-4">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);

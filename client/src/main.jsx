import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import Appcontainer from "./Appcontainer";
 
ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <Appcontainer />
    </ThemeProvider>
);
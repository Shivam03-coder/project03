import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./configs/Toastconfigs";

function Appcontainer() {
  return (
    <div className="App select-none">
      <Provider store={Store}>
        <ToastContainer {...toastConfig} />
        <App />
      </Provider>
    </div>
  );
}

export default Appcontainer;

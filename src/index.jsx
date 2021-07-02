import React from "react";
import { render } from "react-dom";
import App from "./containers/app/App";
import { pdfjs } from "react-pdf";
import * as serviceWorker from "./serviceWorker";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

render(<App />, document.getElementById("root"));
serviceWorker.unregister();

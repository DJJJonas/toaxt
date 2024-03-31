import Toaxt, { ToaxtConfig } from "./toaxt";
import * as Monaco from "monaco-editor";

const toaxt = new Toaxt();

const successTest = document.querySelector("#successTest") as HTMLButtonElement;
const errorTest = document.querySelector("#errorTest") as HTMLButtonElement;
const infoTest = document.querySelector("#infoTest") as HTMLButtonElement;
const warningTest = document.querySelector("#warningTest") as HTMLButtonElement;
const customTest = document.querySelector("#customTest") as HTMLButtonElement;

// Configure Monaco Editor to load additional modules from CDN
self.MonacoEnvironment = {
  getWorkerUrl: () => {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = { baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.0/min/' };
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.0/min/vs/base/worker/workerMain.min.js');
    `)}`;
  },
};

const editor = Monaco.editor.create(document.querySelector("#editor")!, {
  value: `{
  "icon": "<i class='fa fa-smile-o'></i>",
  "text": "Try to customize this toaxt",
  "duration": 20000,
  "style": {
    "background": "linear-gradient(90deg, #004369, #DB1F48)"
  },
  "iconStyle": {
    "fontSize": "3rem"
  },
  "textStyle": {
    "fontSize": "1rem",
    "fontWeight": "600",
    "color": "transparent",
    "background": "linear-gradient(90deg, #FF6C8B, #7ACD2E) text"
  }
}`,
  language: "json",
  theme: "vs-dark",
  minimap: { enabled: false },
  lineNumbersMinChars: 3,
  folding: false,
  tabSize: 2,
});

successTest.onclick = () => {
  toaxt.new({
    text: "You are a successful person!",
    icon: '<i class="fa fa-check-circle"></i>',
    style: Toaxt.success,
  });
};
errorTest.onclick = () => {
  toaxt.new({
    text: "Oh no, something wrong just happened",
    icon: '<i class="fa fa-exclamation-circle"></i>',
    style: Toaxt.error,
  });
};
infoTest.onclick = () => {
  toaxt.new({
    text: "Did you know?<br>Baby sloths are addicted to cuddling",
    icon: '<i class="fa fa-info-circle"></i>',
    style: Toaxt.info,
  });
};
warningTest.onclick = () => {
  toaxt.new({
    text: "Careful not to overcomplicate things",
    icon: '<i class="fa fa-warning"></i>',
    style: Toaxt.warning,
  });
};
customTest.onclick = () => {
  const config = JSON.parse(editor.getValue()) as ToaxtConfig;
  toaxt.new(config);
};

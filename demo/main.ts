import Toaxt, { ToaxtConfig, ToaxtStyles } from "../src/toaxt.ts";

const toaxt = new Toaxt();

const successTest = document.querySelector("#successTest") as HTMLButtonElement;
const errorTest = document.querySelector("#errorTest") as HTMLButtonElement;
const infoTest = document.querySelector("#infoTest") as HTMLButtonElement;
const warningTest = document.querySelector("#warningTest") as HTMLButtonElement;
const customTest = document.querySelector("#customTest") as HTMLButtonElement;
const customEditor = document.querySelector(
  "#customEditor"
) as HTMLButtonElement;

customEditor.value = `{
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
}`;

const { success, error, info, warning } = ToaxtStyles;
successTest.onclick = () => {
  toaxt.new({
    text: "You are a successful person!",
    icon: '<i class="fa fa-check-circle"></i>',
    style: success,
  });
};

errorTest.onclick = () => {
  toaxt.new({
    text: "Oh no, something wrong just happened",
    icon: '<i class="fa fa-exclamation-circle"></i>',
    style: error,
  });
};

infoTest.onclick = () => {
  toaxt.new({
    text: "Did you know?<br>Baby sloths are addicted to cuddling",
    icon: '<i class="fa fa-info-circle"></i>',
    style: info,
  });
};

warningTest.onclick = () => {
  toaxt.new({
    text: "Careful not to overcomplicate things",
    icon: '<i class="fa fa-warning"></i>',
    style: warning,
  });
};

customTest.onclick = () => {
  const config = JSON.parse(customEditor.value) as ToaxtConfig;
  toaxt.new(config);
};

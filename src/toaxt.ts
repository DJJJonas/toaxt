const ToaxtBoxCSS = `z-index:9999;box-sizing:border-box;position:fixed;font-family:sans-serif;transition:.3s;right:min(15px,4%);max-width:min(40%,300px);display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;gap:15px;height:fit-content`;
const ToaxtWrapperCSS = `border-radius:2px;width:fit-content;display:grid;background:#232627;grid-template-columns:auto 1fr auto;box-shadow:#000000a0 0 1px 4px;color:#dbdbdb`;
const ToaxtIconCSS = `padding:0 .7rem;align-self:center;font-size:1.5rem`;
const ToaxtTextCSS = `font-size:.9rem;overflow-y:auto;padding:.5rem`;
const ToaxtCloseCSS = `font-weight:300;cursor:pointer;font-size:1.4rem;padding:0 .5rem;background:#1a1a1a1a;height:100%;display:flex;align-items:center;transition:.3s`;

export interface ToaxtConfig {
  text: string;
  icon?: string | Node;
  style?: Partial<CSSStyleDeclaration>;
  duration?: number;

  iconStyle?: Partial<CSSStyleDeclaration>;
  textStyle?: Partial<CSSStyleDeclaration>;
  closeStyle?: Partial<CSSStyleDeclaration>;

  onClose?: ((ev: MouseEvent) => any) | null;
}

export const ToaxtStyles: {
  [key: string]: Partial<CSSStyleDeclaration>;
} = {
  success: {
    background: "#14b845",
  },
  error: {
    background: "#b81414",
  },
  info: {
    background: "#628bee",
  },
  warning: {
    background: "#c8a20f",
  },
};

export default class Toaxt {
  private _boxDiv: HTMLDivElement;
  defaultDurationMS: number = 6000;

  constructor() {
    this._boxDiv = document.createElement("div");
    this._boxDiv.style.cssText = ToaxtBoxCSS;
    this._boxDiv.style.bottom = "15px";

    document.body.appendChild(this._boxDiv);
  }

  new(config: ToaxtConfig) {
    if (!config.duration) config.duration = this.defaultDurationMS;
    const toaxt = createToast(config);
    this._boxDiv.appendChild(toaxt);
  }
}

function createToast(config: ToaxtConfig) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.style.cssText = ToaxtWrapperCSS;
  const iconSpan = document.createElement("span");
  if (config.icon) iconSpan.style.cssText = ToaxtIconCSS;
  const textSpan = document.createElement("span");
  textSpan.style.cssText = ToaxtTextCSS;
  const closeSpan = document.createElement("span");
  closeSpan.style.cssText = ToaxtCloseCSS;
  closeSpan.innerHTML = "&times;";

  const duration = config.duration;
  const timeoutID = setTimeout(closeToaxt, duration);

  function closeToaxt(ev: MouseEvent) {
    wrapperDiv.animate(
      { transform: ["translateX(0)", "translateX(calc(100% + 15px))"] },
      { duration: 250, easing: "ease" }
    ).onfinish = () => {
      clearTimeout(timeoutID);
      wrapperDiv.remove();
      if (config.onClose) config.onClose(ev);
    };
  }

  closeSpan.onclick = closeToaxt;

  wrapperDiv.appendChild(iconSpan);
  wrapperDiv.appendChild(textSpan);
  wrapperDiv.appendChild(closeSpan);

  textSpan.innerHTML = config.text;

  if (config.icon) {
    if (typeof config.icon === "string") iconSpan.innerHTML = config.icon;
    else iconSpan.append(config.icon);
  }

  if (config.style) Object.assign(wrapperDiv.style, config.style);
  if (config.iconStyle) Object.assign(iconSpan.style, config.iconStyle);
  if (config.textStyle) Object.assign(textSpan.style, config.textStyle);
  if (config.closeStyle) Object.assign(closeSpan.style, config.closeStyle);

  wrapperDiv.animate(
    { transform: ["translateY(100%)", "translateY(0)"] },
    { duration: 400, easing: "ease-out" }
  );
  return wrapperDiv;
}

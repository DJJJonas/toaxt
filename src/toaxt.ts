document.head.append(
  (() => {
    const e = document.createElement("style");
    e.innerHTML = `.toaxt-box{z-index:9999;box-sizing:border-box;position:fixed;font-family:sans-serif;transition:.3s;right:min(15px,4%);max-width:min(40%,300px);animation:.3s toastFadein;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;gap:15px;height:fit-content}.toaxt-box>div{border-radius:2px;width:fit-content;display:grid;background:#232627;grid-template-columns:auto 1fr auto;box-shadow:#000000a0 0 1px 4px;color:#dbdbdb}.toaxt-box>div>span:first-child:not(:empty){padding:0 .7rem;align-content:center;font-size:1.5rem}.toaxt-box>div>span:nth-child(2){font-size:.9rem;overflow-y:auto;padding:.5rem}.toaxt-box>div>span:nth-child(3){font-weight:300;cursor:pointer;font-size:1.4rem;padding:0 .5rem;background:#1a1a1a1a;height:100%;align-content:center;transition:.3s}`;
    return e;
  })()
);

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

export default class Toaxt {
  private boxDiv: HTMLDivElement;

  public static readonly success: Partial<CSSStyleDeclaration> = {
    background: "#14b845",
  };

  public static readonly error: Partial<CSSStyleDeclaration> = {
    background: "#b81414",
  };

  public static readonly info: Partial<CSSStyleDeclaration> = {
    background: "#628bee",
  };

  public static readonly warning: Partial<CSSStyleDeclaration> = {
    background: "#c8a20f",
  };

  constructor() {
    this.boxDiv = document.createElement("div");
    this.boxDiv.classList.add("toaxt-box");
    this.boxDiv.style.bottom = "15px";

    document.body.appendChild(this.boxDiv);
  }

  new(config: ToaxtConfig) {
    const toaxt = this.createToast(config);
    this.boxDiv.appendChild(toaxt);
  }

  private createToast(config: ToaxtConfig) {
    const wrapperDiv = document.createElement("div");
    const iconSpan = document.createElement("span");
    const textSpan = document.createElement("span");
    const closeSpan = document.createElement("span");
    closeSpan.innerHTML = "&times;";

    const duration = config.duration ? config.duration : 6000;
    const timeoutID = setTimeout(closeToaxt, duration);

    function closeToaxt(ev: MouseEvent) {
      wrapperDiv.animate(
        { transform: ["translateX(0)", "translateX(calc(100% + 15px))"] },
        { duration: 250, easing: "ease" }
      ).onfinish = () => {
        clearTimeout(timeoutID);
        wrapperDiv.remove();
        if (config.onClose) {
          config.onClose(ev);
        }
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
}

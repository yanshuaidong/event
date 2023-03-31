// 1、定义了一个名为PopUpInfo的类，该类继承了HTMLElement类。
// 这个类可以用来创建自定义元素，可以在HTML中使用。

class PopUpInfo extends HTMLElement {
  constructor() {
    // 3、super()方法用于调用父类的构造函数，从而访问父类的属性和方法
    super();

    // 4、attachShadow()方法用于将一个shadow DOM树附加到指定的元素，并返回对其ShadowRoot的引用。
    // 在这里，我们使用{mode: "open"}作为参数来创建一个开放的shadow DOM。
    // 这意味着我们可以使用JavaScript来访问和操作该元素的shadow DOM。
    const shadow = this.attachShadow({ mode: "open" });

    // 5、创建元素
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    const info = document.createElement("span");
    info.setAttribute("class", "info");
    const text = this.getAttribute("data-text");
    info.textContent = text;
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/logo.png";
    }
    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);
    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;
    // 6、将创建的元素添加到shadow DOM中 组装成这个样子
    // <popup-info img="img/logo.png" data-text="仅支持大陆手机号码"> shadow host
    //   <style></style>
    //     <span class="wrapper">
    //       <span class="icon" tabindex="0">
    //       <img src="img/logo.png">
    //     </span>
    //     <span class="info">仅支持大陆手机号码</span>
    //   </span>
    // </popup-info>

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}
// 2、customElements是一个全局对象，它的define()方法用于定义自定义元素。
// 在这里，我们使用define()方法来定义名为“popup-info”的自定义元素，并将其与PopUpInfo类关联。
// 这样，我们就可以在HTML中使用<popup-info>标签来创建该元素的实例。
customElements.define("popup-info", PopUpInfo);

customElements.define(
  "open-shadow",
  class extends HTMLElement {
    constructor() {
      super();
      let pElem = document.createElement("p");
      pElem.textContent = this.getAttribute("text");
      pElem.addEventListener("click", () => {
        pElem.dispatchEvent(
          new CustomEvent("divEvent", {
            bubbles: true,
            composed: true,
            detail: { text: "Hello World" },
          })
        );
      });
      this.attachShadow({ mode: "open" }).appendChild(pElem);
    }
  }
);
customElements.define(
  "closed-shadow",
  class extends HTMLElement {
    constructor() {
      super();
      let pElem = document.createElement("p");
      pElem.textContent = this.getAttribute("text");
      pElem.addEventListener("click", () => {
        pElem.dispatchEvent(
          new CustomEvent("divEvent", {
            bubbles: true,
            composed: false,
            detail: { text: "Hello World" },
          })
        );
      });
      this.attachShadow({ mode: "open" }).appendChild(pElem);
    }
  }
);

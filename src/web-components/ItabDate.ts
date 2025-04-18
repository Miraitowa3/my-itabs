class ItabDate extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // 创建 Shadow DOM
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.classList.add("wallpaper");

        if (this.hasAttribute("url")) {
            div.style.backgroundImage = `url(${this.getAttribute("url")})`;
            this.removeAttribute("url");
        }

        style.textContent = `
     .wallpaper{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            transition:background .3s,transform .3s, height .3s;
            background-size: cover;
            background-position: 50%;
            z-index:0;
        }
        .wallpaper.change {
            transform:scale(1.1)
        }
        .wallpaper:after{
            content:'';
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            backdrop-filter:blur(var(--wall-blur));
            -webkit-backdrop-filter: blur(var(--wall-blur));
            background-color:rgba(0,0,0,var(--wall-mask));
        }
        .wallpaper .wallpaper-video{
            position: relative;
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: .3s;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        `;
        shadow.appendChild(div);
        shadow.appendChild(style);
    }
}
// 注册自定义元素
customElements.define("itab-date", ItabDate);

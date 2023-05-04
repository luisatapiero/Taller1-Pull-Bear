import getData from "../../json.js";

const url = window.location.href;
const page = url.split("/");
let productname = "";
if (page[4] !== "Secondpage.html") {
  const urlNew = window.location.search;
  const pageNew = urlNew.split("/")
  const searchparas = new URLSearchParams(pageNew[0]);
  const id = searchparas.get("id");
  if (id) {
    productname = decodeURIComponent(id);
    //productname = id.replace('"', "");
    
  }
  console.log(productname);
}


class InfoComponent extends HTMLElement {
  static get observedAttributes() {
    return ["class"];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
    this.list = [];
    this.productDetail = null; // Initialize productDetail to null
  }
  connectedCallback() {
    this.printData();
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/infoComponent/infoComponent.css">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    `;
  }

  attributeChangeCallback(propName, oldValue, newValue) {
    this[propName] = newValue;
    this.printData();
  }

  render() {
    // Only render if productDetail exists
    if (!this.productDetail) {
      return;
    }

    const product = document.createElement("detail-product");
    product.innerHTML = `
      <app-productinfo 
        name="${this.productDetail.name}" 
        type="${this.productDetail.type}" 
        url_1="${this.productDetail.url_1}" 
        url_2="${this.productDetail.url_2}" 
        url_3="${this.productDetail.url_3}" 
        url_4="${this.productDetail.url_4}" 
        url_5="${this.productDetail.url_5}" 
        description="${this.productDetail.description}" 
        category="${this.productDetail.category}" 
        price="${this.productDetail.price}"
        color1="${this.productDetail.color1}"
        color2="${this.productDetail.color2}"
        color3="${this.productDetail.color3}">

      </app-productinfo>
    `;

    this.shadowRoot.appendChild(product);


  }



  printData() {
    getData().then((a) => {
      this.list = a;
      this.productDetail = this.list.find((item) => {
        const itemCompare = item.name.replaceAll(" ", "-");
        return itemCompare === productname;
      });
      console.log(this.productDetail);
      this.render();
    });
  }
}

customElements.define("app-infoproduct", InfoComponent);
export default InfoComponent;

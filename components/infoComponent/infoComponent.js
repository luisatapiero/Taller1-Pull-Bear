import getData from "../../json.js";

const url = window.location.href;
const page = url.split("/")
let productname;
if (page[4] !== "Secondpage.html"){
    
const urlNew = window.location.search;
const pageNew = urlNew.split("/")
const searchparas = new URLSearchParams(pageNew[0]);
 productname = searchparas.get("id").replace('"', "")
console.log(productname);
}



class InfoComponent extends HTMLElement {
    static get observedAttributes() {
        return ['class']
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.list = [];
        this.productDetail;
    }
    connectedCallback() {
        this.printData()
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/infoComponent/infoComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="title">
        <h3 class="title-text">Detalle de producto</h3>
        </div>
        `
}

    attributeChangeCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.printData();
    }

    render() {

       /* console.log(this.productDetail.name);
        let product = this.shadowRoot.createElement("detail-product");
        product.innerHTML = '';
        product.innerHTML += `            
                   
                
        <app-productinfo 
            name="${this.productDetail.name}" 
            type="${item.type}" 
            url="${item.url}" 
            description="${item.description}" 
            price="${item.price}"
            color="${item.color}">
        </app-productinfo>  
    `*/

    let product = document.createElement("detail-product");
    product.innerHTML = `
      <app-productinfo 
        name="${this.productDetail.name}" 
        type="${this.productDetail.type}" 
        url="${this.productDetail.url}" 
        description="${this.productDetail.description}" 
        price="${this.productDetail.price}"
        color="${this.productDetail.color}">
      </app-productinfo>
    `;
    this.shadowRoot.appendChild(product);
  }


    printData() {
        getData().then((a) => {
            this.list = a
            this.productDetail = this.list.find((item) => {
                let itemCompare = item.name.replaceAll(" ", "-")
                return itemCompare === productname;
            });
            console.log(this.productDetail);
            this.render()
        })
    }

}

customElements.define("app-infoproduct", InfoComponent);
export default InfoComponent;
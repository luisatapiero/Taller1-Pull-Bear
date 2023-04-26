class CardComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'type', 'name', 'description', 'price'];
    }
    constructor() {
        super();
        this.url = this.getAttribute('url');
        this.type = this.getAttribute('type');
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.price = this.getAttribute('price');

        this.attachShadow({
            mode: 'open'
        })
    }
    connectedCallback() {
        this.render();
    }
    attributeChangeCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    render() {

        let namenospaces = this.name.replaceAll(" ", "-")

        let url = "./Thirdpage.html?id=" + namenospaces
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/cardComponent/cardComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="card">
            <div class="img-container"> 
                <img src="${this.url}" class="image">

            </div>
                
            <div class="content">
                <p class="tag">${this.type}</p>
                <h3 class="title">${this.name}</h3>
                <p class="description">${this.description}</p>
                <p class="price">Price $${this.price}</p>
                <a href=${url}><button class="buy-btn">BUY NOW</button></a> 
            </div>
        </div>
        `;
    }
 
    set url(val) {
        this.setAttribute('url', val);
    }

    get url() {
        return this.getAttribute('url');
    }
}
customElements.define("app-card", CardComponent);
export default CardComponent;
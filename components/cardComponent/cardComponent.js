class CardComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'type', 'name', 'description', 'price','color1', 'color2','color3'];
    }
    constructor() {
        super();
        this.url_1 = this.getAttribute('url_1');
        this.type = this.getAttribute('type');
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.price = this.getAttribute('price');
        this.color1 = this.getAttribute('color1');
        this.color2 = this.getAttribute('color2');
        this.color3 = this.getAttribute('color3');


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

        let url = "./Thirdpage.html?id=" + namenospaces;

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/cardComponent/cardComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="card">
            <div class="img-container"> 
                <img src="${this.url_1}" class="image">
            </div>
                
            <div class="content">
                <p class="tag">${this.type}</p>
                <div class="title-wrapper">
                    <h3 class="title">${this.name}</h3>
                    <p class="price">$${this.price}</p>
                </div>
                <a href=${url} class="buy-btn-link"><button class="buy-btn">VIEW DETAILS</button></a> 
            </div>

            <button class="like-btn">
                <img src="./icons/heart.png" alt="Like">
            </button>
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
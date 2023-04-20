import * as components from "./components/index.js"
class AppContainer extends HTMLElement{
    constructor (){
        super();
        this.attachShadow({mode:'open'})
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
        <app-header class="componet"></app-header>
        `
    }
}
customElements.define('app-container', AppContainer)
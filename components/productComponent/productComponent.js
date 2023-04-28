class ProductComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url_1', 'url_2', 'url_3', 'url_4', 'url_5', 'type', 'name', 'description', 'price', 'color'];
    }
    constructor() {
        super();
        this.url_1 = this.getAttribute('url_1');
        this.url_2 = this.getAttribute('url_2');
        this.url_3 = this.getAttribute('url_3');
        this.url_4 = this.getAttribute('url_4');
        this.url_5 = this.getAttribute('url_5');
        this.type = this.getAttribute('type');
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.price = this.getAttribute('price');
        this.color = this.getAttribute('color');

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
        console.log('esta es la' + this.url_1);
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/productComponent/productComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <!-- <div class="card">
            <div class="img-container"> 
                <img src="${this.url}" class="image">

            </div>
                
            <div class="content">
                <p class="tag">${this.type}</p>
                <h3 class="title">${this.name}</h3>
                <p class="description">${this.description}</p>
                <p class="price">Price $${this.price}</p>
                <p class="color">${this.color}</p>
                <button class="buy-btn">BUY NOW</button> 
            </div>
        </div> -->

        <div class="container-back-button">Producto</div>


        <main>
            

        <div class = "card-wrapper">
  <div class = "card-principal">
    <!-- card left -->
    <div class = "product-imgs">
      <div class = "img-display">

        <div class = "img-showcase">
          <img src = "${this.url_1}" alt = "">
        </div>
        

        
      </div>
      <div class = "img-select">
        <div class = "img-item">
          <a href = "#" data-id = "1">
            <img src = "${this.url_2}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "2">
            <img src = "${this.url_3}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "3">
            <img src = "${this.url_4}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "4">
            <img src = "${this.url_5}" alt = "">
          </a>
        </div>
      </div>
    </div>

        <div class="container-info-product">
            <div class="container-price">
            <h2>${this.name}</h2>
            <span>$${this.price}</span>
            </div>

            <div class="container-details-product">
            <div class="form-group">
                <label for="colour">Color</label>
                <select name="colour" id="colour">
                <option disabled selected value="">Choose an option</option>
                <option value="Color1">${this.color.color}</option>
                <option value="Yellow">Yellow</option>
                <option value="Blue">Blue</option>
                </select>
            </div>

            <div class="form-group">
                <label for="size">Size</label>
                <select name="size" id="size">
                <option disabled selected value="">Choose an option</option>
                <option value="S">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                </select>
            </div>
            </div>

            <div class="container-add-cart">
            <div class="container-quantity">
                <input
                type="number"
                name=""
                id=""
                placeholder="1"
                value="1"
                min="1"
                class="input-quantity"
                />

                <div class="btn-increment-decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="increment"><path fill="#0092E4" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="decrement"><path fill="#0092E4" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
            </div>

            <button class="btn-add-to-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="shopping-bag"><path fill="#0092E4" d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path></svg>
                ADD TO BAG
            </button>
            </div>

            <div class="container-description">
            <div class="title-description">
                <h4>Description</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0092E4" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            
            <div class="text-description"><p>${this.description}</p></div>
            </div>

            <div class="container-additional-information">
            <div class="title-additional-information">
                <h4>Addtional information</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0092E4" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            <div class="text-additional-information hidden">
                <p>-------------------------</p>
            </div>
            </div>

            <div class="container-reviews">
                <div class="title-reviews">
                <h4>Reviews</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0092E4" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
                <div class="text-reviews hidden">
                <p>-------------------------</p>
                </div>
            </div>

            <div class="container-social">
                <span>Compartir</span>
                <div class="container-buttons-social">
                    <a href="#"><!-- aqui va icono --></a>
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                </div>
            </div>
        </div>


        
        </main>

        <section class="container-related-products">
        <h2>You might also like</h2>
        <div class="card-list-products">
            <div class="card">
                <div class="card-img">
                    <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80" alt="">
                </div>
                <div class="info-card">
                    <div class="text-product">
                        <h3>Nike - Roshe Run</h3>
                        <p class="category">Footwear, Sneakers</p>
                    </div>
                    <div class="price">$85.00</div>
                </div>
            </div>

            <div class="card">
                <div class="card-img">
                    <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80" alt="">
                </div>
                <div class="info-card">
                    <div class="text-product">
                        <h3>Nike - Roshe Run</h3>
                        <p class="category">Footwear, Sneakers</p>
                    </div>
                    <div class="price">$85.00</div>
                </div>
            </div>

            <div class="card">
                <div class="card-img">
                    <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="">
                </div>
                <div class="info-card">
                    <div class="text-product">
                        <h3>Nike - Roshe Run</h3>
                        <p class="category">Footwear, Sneakers</p>
                    </div>
                    <div class="price">$85.00</div>
                </div>
            </div>

            <div class="card">
                <div class="card-img">
                    <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="">
                </div>
                <div class="info-card">
                    <div class="text-product">
                        <h3>Nike - Roshe Run</h3>
                        <p class="category">Footwear, Sneakers</p>
                    </div>
                    <div class="price">$85.00</div>
                </div>
            </div>
        </div>
    </section>


        `;

        const inputQuantity = this.shadowRoot.querySelector('.input-quantity');
        const btnIncrement = this.shadowRoot.querySelector('#increment');
        const btnDecrement = this.shadowRoot.querySelector('#decrement');

        let valueByDefault = parseInt(inputQuantity.value);

        btnIncrement.addEventListener('click', () => {
            valueByDefault += 1;
            inputQuantity.value = valueByDefault;
        });

        btnDecrement.addEventListener('click', () => {
            if (valueByDefault === 1) {
                return
            }
            valueByDefault -= 1;
            inputQuantity.value = valueByDefault;
        });

        const toggleDescription = this.shadowRoot.querySelector('.title-description');
        const toggleAdditionalInformation = this.shadowRoot.querySelector('.title-additional-information');
        const toggleReviews = this.shadowRoot.querySelector('.title-reviews');

        const contentDescription = this.shadowRoot.querySelector('.text-description');
        const contentAdditionalInformation = this.shadowRoot.querySelector('.text-additional-information');
        const contentReviews = this.shadowRoot.querySelector('.text-reviews');

        toggleDescription.addEventListener('click', () => {
            contentDescription.classList.toggle('hidden');
        });

        toggleAdditionalInformation.addEventListener('click', () => {
            contentAdditionalInformation.classList.toggle('hidden');
        });

        toggleReviews.addEventListener('click', () => {
            contentReviews.classList.toggle('hidden');
        });



        const imgs = this.shadowRoot.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        let imgId = 1;

        imgBtns.forEach((imgItem) => {
            imgItem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgItem.dataset.id;
                slideImage();
            });
        });

        function slideImage() {
            const displayWidth = this.shadowRoot.querySelector('.img-showcase img:first-child').clientWidth;

            this.shadowRoot.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
        }

        window.addEventListener('resize', slideImage);
    }



    set url(val) {
        this.setAttribute('url', val);
    }

    get url() {
        return this.getAttribute('url');
    }
}

customElements.define("app-productinfo", ProductComponent);
export default ProductComponent;

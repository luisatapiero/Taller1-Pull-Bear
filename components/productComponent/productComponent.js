class ProductComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url_1', 'url_2', 'url_3', 'url_4', 'url_5', 'type', 'name', 'description', 'category', 'price', 'color'];
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
        this.category = this.getAttribute('category');
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

        <div class="container-back-button" href="Secondpage.html">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-left"><path fill="#0a0a0a" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
            <a href="Secondpage.html">Back</a>

        </div>


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
                <option value="${this.color}">${this.color}</option>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="increment"><path fill="#0a0a0a" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="decrement"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
            </div>

            <button class="btn-add-to-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="shopping-bag"><path fill="#0a0a0a" d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path></svg>
                ADD TO BAG
            </button>
            </div>

            <div class="container-description">
            <div class="title-description">
                <h4>Description</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            
            <div class="text-description"><p>${this.description}</p></div>
            </div>

            <div class="container-additional-information">
            <div class="title-additional-information">
                <h4>Addtional information</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            <div class="text-additional-information hidden">
                <p>Category: ${this.category} <br> Type: ${this.type} </p>
            </div>
            </div>

            <div class="container-reviews">
                <div class="title-reviews">
                <h4>Reviews</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
                <div class="text-reviews hidden">
                <p>-------------------------</p>
                </div>
            </div>

            <div class="container-social">
                <span>Compartir</span>
                <div class="container-buttons-social">
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="facebook-f"><path fill="#0a0a0a" d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z"></path></svg></a>
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="twitter"><path fill="#0a0a0a" d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"></path></svg></a>
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="instagram"><path fill="#0a0a0a" d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg></a>
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

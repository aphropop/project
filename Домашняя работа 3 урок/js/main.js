const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class CartItem extends ProductItem {
    constructor(id, title, price, img, quantity, subtotal) {
        super(id, title, price, img, quantity);
        this.subtotal = this.price * this.quantity;
        this.render();
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img class="cart-item__img" src="${this.img}" alt="Some img">
                <div class="cart-item__txt">
                <h3 class="cart-item__h">${this.title}</h3>
                <p>${this.price} рублей</p>
                </div>
            </div>`;
    }

}


class Cart {
    constructor(container = ".cart") {
        this.container = container;
        this.goods = [];
        this.allItems = [];
        this._getCart()
            .then(data => {
                this.goodsAmount = data.amount;
                this.goodsCount = data.countGoods;
                this.goods = [...data.contents];
                this.render();
            });

    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new CartItem(product);
            this.allItems.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());

        }
    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error:', error);
            });
    }
}

const cart = new Cart();
class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
        this.sumOrder = 0;
        for(let i = 0;i < this.goods.length;i++){
            this.sumOrder += this.goods[i].price;
        }
        console.log(`Стоимость всех товаров на сайте: ${this.sumOrder}`);
    }

    
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//           block.innerHTML += item.render();
        }
        
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
           return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
    


}

class Cart{ 
    constructor() {
        // Массив с добавленными товарами
        this.addGoods = [];
    }

    addToCart() {} // Добавление в корзину
    deleteFromCart() {} // Удаление из корзины
    openCart() {} //Открытие корзины

}

class CartProduct extends ProductItem {
    constructor(title, img, price, quantity, sum) {
        super(title,img);
        this.price = price;
        this.quantity = quantity; // Количество товаров
        this.sum = 0; // Сумма заказа
    }
    render(){
        return `<div class="cart-item">
             <img src="${this.img}">
             <h3>${this.title}</h3>
             <p>${this.quantity}</p>
             <p>${this.price} * ${this.quantity}</p>
             <p>${this.sum}</p>
             <button class="buy-btn">Купить</button>
         </div>`
 }
}





let list = new ProductList();



//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);
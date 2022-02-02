"use strict";

const products = [
    { id: 1, title: 'Notebook', price: 2000},
    { id: 2, title: 'Mouse', price: 20},
    { id: 3, title: 'Keyboard', price: 200},
    { id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = (item, img="img/2.jpg") => 
            `<div class="product-item data-id=${item.id}">
                <img src="${img}" alt="1">
                <div class="card_desc">
                    <h3>${item.title}</h3>
                    <p>${item.price}</p>
                    <button class="by-btn">Добавить</button>
                </div>
            </div>`;


const renderPage = list => {
    
    document.querySelector('.products').insertAdjacentHTML("beforeend", list.map((item) => renderProduct(item)).join(''));
    
};

renderPage(products);

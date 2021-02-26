/* eslint-disable eqeqeq */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const cartBtn = document.querySelector('.shop-product-wrap');
const cartItem = document.querySelector('.cart-item')
const cartHover = document.querySelectorAll('.product-hover-icons');
const tbody = document.querySelector('.tbody');

for (let i = 0; i < cartBtn.children.length; i++) {
  const cart = cartBtn.children[
    i
  ].lastElementChild.lastElementChild.lastElementChild.firstElementChild.firstElementChild.classList.contains(
    'icon_cart_alt',
  );

  if (cart) {
    const child =
      cartBtn.children[i].lastElementChild.lastElementChild.lastElementChild
        .firstElementChild.firstElementChild;

    child.addEventListener('click', () => console.log('you are mad'));
  }
}

const cartArr = [];
cartHover.forEach(function (item) {
  cartArr.push(item.id);
});

let b;
cartBtn.addEventListener('click', function (e) {
  e.preventDefault()
  b = e.target.id;
  getProduct(b);

});



async function getProduct(b) {
  // try {
    const response = await fetch(`/products/${b}`);
    const product = await response.json();
    const newCart = checkForProduct();

    let count = cartItem.textContent + 1
    
    count = newCart.length
    console.log(count)
    cartItem.innerHTML = `${count} -items`


    const exist = newCart.find((item) => item._id == b);

    if (exist) {
    } else {
      newCart.push(product);

      saveCartToLocalStorage('product', JSON.stringify(newCart));
    }
  
}


const checkForProduct = () => {
  // console.log('to store');
  const localStorageProduct = localStorage.getItem('product');
  const newProduct =
    localStorageProduct === null ? [] : JSON.parse(localStorageProduct);
    return newProduct;

};

const deleteTaskFromLocalStorage = (valueId) => {
  const todoList = checkForTodo();
  todoList.splice(valueId, 1);
  saveCartToLocalStorage('product', JSON.stringify(todoList));
};

const saveCartToLocalStorage = (product, obj) => {
  if (obj) {
    localStorage.setItem(product, obj);
    return;
  }
  return;
};

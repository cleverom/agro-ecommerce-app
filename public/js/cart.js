/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const container = document.querySelector('.container');
const table = document.querySelector('.table');
const pro_title = document.querySelector('.pro-title');
const tbody = document.querySelector('tbody');
const pro_price = document.querySelector('.pro-price');
const pro_quantity = document.querySelector('.pro-quantity');
const inc = document.querySelectorAll('.inc');
const dec = document.querySelectorAll('.dec');
const pro_subtotal = document.querySelectorAll('.pro-subtotal');
// const pro_remove = document.querySelectorAll('.pro-remove');
const nice_select = document.getElementsByClassName('nice-select');
const inputEstimate = document.querySelector('.row');
const cart_summary = document.querySelector('.cart-summary');
const para = document.querySelector('.cart-summary-wrap');
const check_out = document.querySelector('.checkout-btn');
const update_out = document.querySelector('.update-btn');
const submit_btn = document.querySelector('#submit-btn');
function addToCart() {
  const value = checkForProduct();

  let html = '';
  value.forEach((product) => {
    html += ` <tr id="${product._id}">
    <td class="pro-thumbnail"><a href=""><img src="${product.image}" class="img-fluid" alt="Product"></a></td>
      <td class="pro-title"><a href="">${product.description}</a></td>
      <td class="pro-price"><span class="price" >${product.price}</span></td>
      <td class="pro-quantity"><a><button class="minus">-<button></a><div class="pro-qty"><input class="val" type="text" value="0"><a><button class="add">+</button></a></div></td>
      <td class="pro-subtotal"><span>0.00</span></td>
      <td class="pro-remove" id="${product._id}"><a href=""><i class="fa fa-trash-o" id="${product._id}"></i></a></td>
  </tr>`;
  });
  // console.log(html);
  tbody.innerHTML = html;
  const pro_qty = document.querySelector('.val');
  console.log(pro_qty);
  const minus_btn = document.querySelectorAll('.minus');
  const add_btn = document.querySelectorAll('.add');
  minus_btn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const num =
        e.target.parentElement.nextElementSibling.lastElementChild
          .firstElementChild;
      if (e.target.classList.contains('minus') && num.value > 0) {
        num.value--;
      } else {
        num.value = 0;
      }
    });
  });
  add_btn.forEach((val) => {
    val.addEventListener('click', (e) => {
      e.preventDefault();
      const b =
        e.target.parentElement.previousElementSibling.lastElementChild
          .firstElementChild;

      if (e.target.classList.contains('add')) {
        b.value++;
      }
    });
  });


  for (let i = 0; i < add_btn.length; i++) {
    const item = add_btn[i];
    item.addEventListener('click', function (e) {
      if (e.target.classList.contains('add')) {
        const multiple =
        e.target.parentElement.previousElementSibling.lastElementChild
        .firstElementChild.value;
         console.log(multiple)
        const cost = e.target.parentElement.parentElement.previousElementSibling.firstElementChild
        let price = +cost.textContent

         const total = multiple * price;
         console.log(total)

        let amount = e.target.parentElement.parentElement.nextElementSibling.firstElementChild

        amount.innerHTML = total

         addCartSummary(price);

      }
    });
  }
  for (let j = 0; j < minus_btn.length; j++) {
    const item = minus_btn[j];
    item.addEventListener('click', function (e) {
      const target = e.target;

      let amount
      let num
      let price
      if (e.target.classList.contains('minus')) {

        const cost = e.target.parentElement.parentElement.previousElementSibling.firstElementChild

        price = +cost.textContent

        amount = e.target.parentElement.parentElement.nextElementSibling.firstElementChild

       num = +amount.textContent
        console.log(num)

        if(num > 0 ){

          amount.innerHTML = num - price;
        }else{
          amount.innerHTML = 0;
        }

      }
        subCartSummary(price)
    });
  }
  const pro_remove = document.querySelectorAll('.pro-remove');
  for (let k = 0; k < pro_remove.length; k++) {
    let removed = pro_remove[k];
    removed.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log("remove")
      if(e.target.classList.contains('fa-trash-o')) {
        e.target.parentElement.parentElement.parentElement.remove()
        let value = e.target.getAttribute("id")
        deleteTaskFromLocalStorage(value)
      }
    })
  }
}
const checkForProduct = () => {
  // eslint-disable-next-line no-undef
  const localStorageProduct = localStorage.getItem('product');
  const newProduct =
    localStorageProduct === null ? [] : JSON.parse(localStorageProduct);
  return newProduct;
};

const deleteTaskFromLocalStorage = (valueId) => {
  const cart = checkForProduct();
  console.log(cart)
  cart.splice(valueId, 1);
  saveCartToLocalStorage('product', JSON.stringify(cart));
};

const saveCartToLocalStorage = (product, obj) => {
  if (obj) {
    localStorage.setItem(product, obj);
    return;
  }
  return;
};


let sum = 0;
for (let k = 1; k < pro_subtotal.length; k++) {
  const slit = pro_subtotal[k].textContent;
  // eslint-disable-next-line no-unused-vars
  sum += Number(slit.slice(1));
}

function addCartSummary(val) {
  let setNumber = Number(
    para.firstElementChild.nextElementSibling.firstElementChild.innerHTML.slice(
      1,
    ),
  );
  setNumber += Number(val);
  para.firstElementChild.nextElementSibling.firstElementChild.innerHTML = `$${setNumber}`;
}

function subCartSummary(val) {
  let setNumber = Number(
    para.firstElementChild.nextElementSibling.firstElementChild.innerHTML.slice(
      1,
    ),
  );

  if(setNumber > 0){
    setNumber -= Number(val);
    para.firstElementChild.nextElementSibling.firstElementChild.innerHTML = `$${setNumber}`;
  }else {
    setNumber = 0
    para.firstElementChild.nextElementSibling.firstElementChild.innerHTML = `$${setNumber}`;

  }
}
const shipCost = para.lastElementChild.previousElementSibling.firstElementChild.innerHTML = `$${1000}`
let estimate = document.querySelector('.estimate')
console.log(para.firstElementChild.nextElementSibling.firstElementChild.innerHTML)
let grandTotal = para.lastElementChild.firstElementChild;

estimate.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.classList.contains('estimate')) {
    console.log("am here 2")
    let sumTotal = Number(shipCost.slice(1)) + Number(para.firstElementChild.nextElementSibling.firstElementChild.innerHTML.slice(1))
    grandTotal.innerHTML = `$${sumTotal}`
  }
})


document.addEventListener('DOMContentLoaded', () => {
  addToCart();
});

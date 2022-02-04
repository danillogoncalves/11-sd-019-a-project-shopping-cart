const ButtonEmptyCart = document.querySelector('.empty-cart');
const cartItemsClass = '.cart__items';
const totalPriceClass = '.total-price';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getPrice = async () => {
  const liCartItem = [...document.querySelectorAll('.cart__item')];
  let total = 0;
  await Promise.all(liCartItem.map(async (item) => {
    const id = item.innerHTML.split(' ')[1];
    const { price } = await fetchItem(id);
    total += price;
  }));
  return +total.toFixed(2);
};

const createSubtotal = async () => {
  const span = document.createElement('span');
  span.classList.add('subtotal');
  span.innerHTML = await getPrice();
  document.querySelector(totalPriceClass).appendChild(span);
};

async function cartItemClickListener(event) {
  // coloque seu código aqui
  const olShowItems = document.querySelector(cartItemsClass);
  event.target.remove();
  saveCartItems(olShowItems.innerHTML);
  document.querySelector(totalPriceClass).innerHTML = '';
  await createSubtotal();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
// Imar Mendes - Turma 19 - Tribo A, me ajudou a arrumar os problemas como Lint.
const getProduct = async (product) => {
  const { results } = await fetchProducts(product);
  results.forEach((item) => {
    const { id, title, thumbnail } = item;
    const sectionItens = document.querySelector('.items');
    const createItens = createProductItemElement({ sku: id, name: title, image: thumbnail });

    sectionItens.appendChild(createItens);
  });
};

const getItem = async (event) => {
  const item = event.target.parentNode;
  const idItem = getSkuFromProductItem(item);
  const { id, title, price } = await fetchItem(idItem);
  const createShowItems = createCartItemElement({ sku: id, name: title, salePrice: price });
  const olShowItems = document.querySelector(cartItemsClass);
  olShowItems.appendChild(createShowItems);
  saveCartItems(olShowItems.innerHTML);
  document.querySelector(totalPriceClass).innerHTML = '';
  await createSubtotal();
};

const emptyCart = async () => {
  console.log('oi');
  const olShowItems = document.querySelector(cartItemsClass);
  olShowItems.innerHTML = '';
  saveCartItems(olShowItems.innerHTML);
  document.querySelector(totalPriceClass).innerHTML = '';
  await createSubtotal();
};

ButtonEmptyCart.addEventListener('click', emptyCart);

window.onload = async () => {
  const olShowItems = document.querySelector(cartItemsClass);
  olShowItems.innerHTML = getSavedCartItems();
  await getProduct('computador');
  const buttonAdd = document.querySelectorAll('.item__add');
  const cartItem = document.querySelectorAll('.cart__item');
  cartItem.forEach((item) => item.addEventListener('click', cartItemClickListener));
  buttonAdd.forEach((add) => add.addEventListener('click', getItem));
  await createSubtotal();
};

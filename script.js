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

const getItem = (idItem) => {
  fetchItem(idItem).then((items) => {
    const { id, title, price } = items;
    const olShowItems = document.querySelector('.cart__items');
    const createShowItems = createCartItemElement({ sku: id, name: title, salePrice: price });
    olShowItems.appendChild(createShowItems);
  });
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const item = event.target.parentNode;
  const idItem = getSkuFromProductItem(item);
  getItem(idItem);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', cartItemClickListener);

  return section;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getProduct = async (product) => {
  fetchProducts(product).then(({ results }) => results.forEach((item) => {
    const { id, title, thumbnail } = item;
    const sectionItens = document.querySelector('.items');
    const createItens = createProductItemElement({ sku: id, name: title, image: thumbnail });
    sectionItens.appendChild(createItens);
  }));
};

window.onload = async () => {
  await getProduct('computador');
};

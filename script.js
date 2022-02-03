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

function cartItemClickListener(event) {
  // coloque seu código aqui
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
  const olShowItems = document.querySelector('.cart__items');
  const createShowItems = createCartItemElement({ sku: id, name: title, salePrice: price });
  olShowItems.appendChild(createShowItems);
};

window.onload = async () => {
  await getProduct('computador');
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((add) => add.addEventListener('click', getItem));
};

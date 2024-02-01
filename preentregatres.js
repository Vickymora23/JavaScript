const titulo = document.querySelector("texto1");
const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const cartSum = document.querySelector('#cartSum');
const inputSearch = document.querySelector('#inputSearch');
const listProducts = document.querySelector("#listProducts");
const selectCategory = document.querySelector('#selectCategory');
const modalListProducts = document.querySelector('#modalListProducts');
const btnClose = document.querySelector('#btnClose');
const btnSave = document.querySelector('#btnSave');
const btnOrder =document.querySelector('#btnOrder');
const btnOrder2 =document.querySelector('#btnOrder2');

const listCart = JSON.parse( localStorage.getItem('cart')) || [] ;
const cart = new Cart(listCart);

btnModalCarrito.addEventListener('click', function(){
  const list = cart.getProducts(); 
  cartSum.innerText = cart.getSum();
  
  renderCart(list);

  
  modal.show();
})

btnClose.addEventListener('click', ()=>{
  modal.hide();
})

inputSearch.addEventListener('input', (event) => {
const search = event.target.value;
const newList = products.filter( (product) => product.name.toLowerCase().includes(search.toLowerCase() ));
renderProducts(newList);
})

selectCategory.addEventListener('click', (event) => {
  const seleccionar = event.target.value;
  const secondList = products.filter( (product) => product.category === category );
  return product;
  renderProducts(secondList);
  })

  btnOrder.addEventListener('click', () =>{
    products.sort ( (a, b) => {
      if (a.price < b.price){
        return -1
      }
      if (a.price > b.price){
        return 1
      }
      return 0
    })
    renderProducts (products)
  })

  btnOrder2.addEventListener('click', () =>{
    products.sort ( (a, b) => {
      if (a.price < b.price){
        return 1
      }
      if (a.price > b.price){
        return -1
      }
      return 0
    })
    renderProducts (products)
  })

//recorro el array
const renderProducts = (list) =>{
 listProducts.innerHTML = '';

list.forEach((products) => {
  // creo los elementos html
  listProducts.innerHTML += //html
                     `<div class="card">
                         <div class="card-header">
                                <img src="${products.img}" alt="HTML" class="imagenes">
                         </div>                         <div class="card-body">
                         <h4> ${products.name} </h4>
                             <p> $${products.price}</p>
                             <button id="${products.id} " type="button" class="btn btn-primary btnAddCart">
                             <i class="fa-solid fa-cart-plus"></i> Agregar
                    </button>
                             </div>
                        </div>`;
});

const btns = document.querySelectorAll('.btnAddCart');
btns.forEach(btn => {
  btn.addEventListener('click', addToCart);
  
});

}

// cart

const addToCart = ( e )=> {
  const id = e.target.id;
  const product = products.find ( item => item.id == id);
  console.table(product);
  cart.addToCart ( product );
  cartCount.innerText = cart.getCount();
  
}

const renderCart = (list) =>{
  modalListProducts.innerHTML = '';
  list.forEach( product => {
    modalListProducts.innerHTML += //html
    ` <tr>
           <td>${product.name}</td>
           <td>${product.units}</td>
           <td>${product.price}</td>
           <td>${product.price * product.units}</td>           
       
      </tr> `


  });

}
renderProducts (products);

// cartCount.innerText = cart.getCount();
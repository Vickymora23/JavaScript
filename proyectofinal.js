const titulo = document.querySelector("#texto1");
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

let products_list = []
let products = []

const listCart = JSON.parse( localStorage.getItem('cart')) || [] ;
const cart = new Cart(listCart);

btnModalCarrito.addEventListener('click', function(){
  const list = cart.getProducts(); 
  cartSum.innerText = cart.getSum();
  
  renderCart(list);

  
  modal.show();
})

btnSave.addEventListener('click', ()=> {

  modal.hide();
  Swal.fire({
    title: "Carrito de Compras",
    text: "Compra realizada con éxito",
    icon: "success"
  });

  localStorage.removeItem('cart');
})

btnClose.addEventListener('click', ()=>{
  modal.hide();
})

inputSearch.addEventListener('input', (event) => {
const search = event.target.value;
const newList = products_list.filter( (product) => product.name.toLowerCase().includes(search.toLowerCase() ));
renderProducts(newList);
})

 selectCategory.addEventListener('change', (event) => {
  const id_category = selectCategory.value;
   
       filtroCategoria( id_category)
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

  const filtroCategoria = ( id_category ) => {
    const newList = products_list.filter ( (product) => product.id_category == id_category );
    renderProducts(newList);
  }

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
                             <button id="${products.id_product} " type="button" class="btn btn-primary btnAddCart">
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
  const product = products.find ( item => item.id_product == id);
  console.table(product);
  cart.addToCart ( product );
  cartCount.innerText = cart.getCount();

  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    }).showToast();
  
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

const renderCategory = (list) => {
  selectCategory.innerHTML = '';
  list.forEach(category => {
    selectCategory.innerHTML += //html
    ` <option value="${category.id_category}">${category.name}</option> `
    
  });
}

//hacemos una solicitud AJAX--> FETCH
const getProducts = async () => {
  
  try {
       const endPoint = "data.json";
       const resp = await fetch (endPoint);
       const json = await resp.json();

       const {products, category} = json;
       products_list = products;

       console.table (category)

       renderProducts (products);  
       renderCategory (category)

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error.",
      text: "Ocurrio un error al cargar la pagina",
      confirmButtonText: 'Aceptar'
       });
  }



 //

}
getProducts();


// cartCount.innerText = cart.getCount();
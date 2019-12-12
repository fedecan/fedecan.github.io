console.log("Super lista!")

let listaproductos = [
    { nombre: 'Pan', cantidad: 2, precio: 12.34 },
    { nombre: 'Carne', cantidad: 3, precio: 34.56 },
    { nombre: 'Leche', cantidad: 4, precio: 56.10 },
    { nombre: 'Fideos', cantidad: 5, precio: 15.34 }
]

/* document.querySelector("#ingreso-producto").addEventListener("input",e=>{
    console.log(e.target.value);
}); */

let iniRenderLista = true;
let ul;

function configurarListeners()
{
    document.querySelector("#btn-entrada-producto").addEventListener("click",e=>{
        let input = document.querySelector("#ingreso-producto");
        let producto = input.value;
        if(producto!=""){
            console.log(producto);
            listaproductos.push({
                nombre: producto, cantidad: 1, precio: 0
            })
            input.value="";
            renderLista();
        }
    })

    document.querySelector("#btn-borrar-productos").addEventListener("click",e=>{
        listaproductos = [];
        renderLista();
    })
}

function borrarProd(index){
    listaproductos.splice(index,1);
    renderLista();
}

function cambiarCantidad(index,e){
    let cantidad = parseInt(e.value);
    console.log("cambiando Cantidad ", index, cantidad)
    listaproductos[index].cantidad = cantidad;
}

function cambiarPrecio(index,e){
    let precio = Number(e.value);
    console.log("cambiando Precio ", index, precio)
    listaproductos[index].precio = precio;
}

function renderLista()
{
    if(iniRenderLista){
        ul = document.createElement('ul');
        ul.classList.add('demo-list-item', 'mdl-list')    
    }
    
    ul.innerHTML = '';
    listaproductos.forEach((prod, index) => {
        ul.innerHTML += `
                <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons"> shopping_cart </i>
                </span>
                <span class="mdl-list__item-primary-content w-30">
                
                    ${prod.nombre}
                </span>
                <span class="mdl-list__item-primary-content w-20">

                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="sample-cant-${index}"
                        onchange="cambiarCantidad(${index}, this)">
                        <label class="mdl-textfield__label" for="sample-cant-${index}">${prod.cantidad}</label>
                    </div>
                    
                </span>
                <span class="mdl-list__item-primary-content w-20 ml-item">

                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input" type="text" id="sample-precio-${index}"
                        onchange="cambiarPrecio(${index}, this)">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">${prod.precio}</label>
                    </div>

                </span>
                <span class="mdl-list__item-primary-content w-20 ml-item md-18">
                    <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onclick="borrarProd(${index})">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>
            </li>
    `
    })

    let lista = document.querySelector('#lista');
    lista.appendChild(ul);

    if(!iniRenderLista) //Lo aplica a partir de la segunda Renderizacion, sino da error
    {
        //Resetea los elementos y les vuelve a ejecutar su javascript para mantener los estilos
        componentHandler.upgradeElements(ul);
    } 
    else   
        iniRenderLista = false;
    
}

function configurarSW()
{
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js")
        .then(reg => {
            console.log("SW registrado exitosamente!", reg)
        })
        .catch( err =>{
            console.log("ERROR! registro service worker", err)
        })
    }
}

function start()
{   
    configurarListeners()
    renderLista()

    //Configuracion del Service Worker
    configurarSW()
}

//-----------------------------------
//----EJECUCION-----------------------
//-----------------------------------

window.onload = start;
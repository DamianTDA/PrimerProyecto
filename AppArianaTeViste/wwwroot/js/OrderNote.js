// IMPORTAR FUNCIONES
import { GetId, GetDesc, enviarDatos } from "../js/Services/Products.js"
import { Producto  } from "../js/Class/LibraryClass.js"
import { mostrarFechaHora } from "../js/Services/DateTime.js"

const btnCodigo = document.getElementById('btnCodigo');
const btnDescripcion = document.getElementById('btnDescripcion');
const btnBorrar = document.getElementById('btnBorrar');
const btnAgregar = document.getElementById('btnAgregar')
const btnGrabar = document.getElementById('btnGrabar')
const inpCodigo = document.getElementById("InpCodigo");
const inpDetalle = document.getElementById('inpDetalle');
const inpDescripcion = document.getElementById('InpDescripcion')
const inpCantidad = document.getElementById('inpCantidad')
const modalProductos = document.getElementById('modalProductos')
const modalContent = document.getElementById("modalContent");
const tbody = document.getElementById("tableBody");
const tfootElement = document.getElementById("tfoot1");
const expCantidad = /^(?!0$)[0-9]+$/;
const expCodigo = /^(?!0$)[0-9]+$/;
const producto = {
    IdProducto: inpCodigo.value,
    codSecundario: "",
    Descripcion: inpDescripcion.value,
    Sexo: "",
    Temporada: "",
    Estilo: "",
    FechaDeAlta: "",
    FechaActualizacion: "",
    Color: "",
    talle: "",
    proveedor: "",
    PrecioCompra: 0,
    PrecioVenta: 0,
    cantidad: 0,
    cantidadVendida: 0
}
const validationIcon = document.getElementById('validationIcon');
const mdc = document.getElementById("modalColor");



let productoSeleccionado = [];
let contarLinea = 0;
let totalImporte = 0;
let importeT = 0;
let identificador = 0;
inpDetalle.value = "";

const fechaHoraString = mostrarFechaHora();
document.getElementById("DateTime").textContent = fechaHoraString;


inpDescripcion.addEventListener('input', function () {
    var inputValue = inpDescripcion.value;
    var pattern = /^[a-zA-Z]+$/;
    var isValid = pattern.test(inputValue);
    validationIcon.className = '';
    validationIcon.classList.add(isValid ? 'valid' : 'invalid');
});

//inpDescripcion.addEventListener('input', validarDescripcion());
btnCodigo.addEventListener('click', procesarEventoCodigo);
inpCodigo.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        procesarEventoCodigo();
    }
});
btnDescripcion.addEventListener('click', procesarEventoDescripcion);
btnBorrar.addEventListener('click', clearInput);
btnAgregar.addEventListener('click', procesarEventoAgregar);

btnGrabar.addEventListener('click', function (e) {
    e.preventDefault();
    comprobarArray()
    
})

const comprobarArray = () => {
    if (productoSeleccionado.length > 0) {
        Datos(productoSeleccionado)
    }
    else alert("NO HAY DATOS PARA GRABAR")
};



function limpiarArray() {
    productoSeleccionado = [];
    vendidos = [];
}

function respuesta(data) {
    if (data.valor == 0) {
        mdc.classList.remove("show");
        mdc.style.display = "none";
        Swal.fire("Listo!","VENTA GRABADA" , "success");
        contarLinea = 0;
        totalImporte = 0;
        importeT = 0;
        tfootElement.innerHTML = '';
        tbody.innerHTML = '';
        limpiarArray()
    }
    else {
        alert("Debe eliminar el producto con el Codigo : " + data.valor + "no tiene el stock para realizar la operacion")
        console.log(productoSeleccionado);
        RedibujarTabla(productoSeleccionado);
        vendidos = [];
        
    }
}


let vendidos = [];
async function Datos(productoSeleccionado) {
    
    productoSeleccionado.forEach((p) => {
        const venta = {
            IdVenta: 0,
            IdProductoVendido: p.IdProducto,
            CantidadVendida: p.CantidadVendida,
            PrecioVenta: p.PrecioVenta,
            FechaVenta: fechaHoraString
        }
        vendidos.push(venta);
    })
    const datos = await enviarDatos(vendidos)
     respuesta(datos)
};


function procesarEventoCodigo() {
    identificador = inpCodigo.value;
    if (validarCodigo()) {
        return;
    }        ;
    if (consultaExistencia(identificador)) {
        inpCodigo.value = "";
        return; // Salir del evento en caso de error
    }
    consultProduct(identificador);
    inpDetalle.value = producto.descripcion;
}




function validarCodigo() {
    let codigoInvalido = false;
    if (expCodigo.test(inpCodigo.value)) {
    }
    else {
        alert('El codigo no debe ser "0"')
        clearInput();
        codigoInvalido = true;
        return codigoInvalido;
    }

}

function consultaExistencia(id) {
    let productoExistente = false;
    productoSeleccionado.forEach((p) => {
        if (p.IdProducto == parseInt(id)) {
            alert("ESTE PRODUCTO YA ESTÁ CARGADO");
            productoExistente = true;
        }
    });
    return productoExistente;

}


//CONSULTA POR DESCRIPCION
   

function procesarEventoDescripcion() {
    const desc = inpDescripcion.value;
    consultProductDesc(desc);
}



function clearInput() {
    inpCodigo.value = "";
    inpDetalle.value = "";
    inpCantidad.value = "";
    inpDescripcion.value = "";
}





function procesarEventoAgregar() {
    if (consultaExistencia(producto.IdProducto)) {
        inpCodigo.value = "";
        return; 
    }
    if (!controlarStock()) {
        return; // Salir del evento en caso de error
    }
    producto.cantidadVendida = parseInt(inpCantidad.value);
    const productoTabla = new Producto(producto);
    productoSeleccionado.push(productoTabla);
    RedibujarTabla(productoSeleccionado);
    clearInput();
}

function controlarStock() {

    if (!expCantidad.test(inpCantidad.value)) {
        alert("La cantidad debe ser mayor a 0")
        inpCantidad.value = "";
        return false
    }

    if (parseInt(inpCantidad.value) > producto.cantidad) {
        alert("La cantidad ingresada es mayor al stock existente " + "(STOCK EXIST" + " " + producto.cantidad + ")")
        inpCantidad.value = "";
        return false
    }
    return true;
}

async function consultProductDesc(desc) {
    const productoJson = await GetDesc(desc);
    MostrarModal(productoJson)
}

// MUESTRA TABLA DENTRO DEL MODAL
async function MostrarModal(productoJson) {
    modalContent.innerHTML = `
    <table id="tablaProducto" class="table table-hover">
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Talle</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            ${productoJson.map(p => `
      <tr>
        <td>${p.idProducto}</td>
        <td>${p.descripcion}</td>
        <td>${p.talle.descripcion}</td>
        <td>${p.precioVenta.toFixed(2)}</td>
      </tr>
      `).join('')}
        </tbody>
    </table>
    `
    modalProductos.classList.add("show");
    modalProductos.style.display = "block";
    //Obtén la tabla dentro del modal por su ID
    const tabla = document.getElementById("tablaProducto");
    // Envolver la llamada a manejarClicFila en una función anónima
    const manejarClicFilaWrapper = (event) => {
        //const productoSeleccion = productoJson;
        manejarClicFila(event, productoJson);
    };

    // Agrega el evento de clic a cada fila de la tabla
    tabla.addEventListener("click", manejarClicFilaWrapper);

   //capturarDatosFila()
}


 //Variable para almacenar la fila seleccionada
let filaSeleccionada = null;

// Función para resaltar la fila seleccionada
  function resaltarFila(fila) {
    // Quita la clase "fila-seleccionada" de la fila previamente seleccionada
    if (filaSeleccionada) {
        filaSeleccionada.classList.remove("fila-seleccionada");
    }

    // Establece la fila actual como la fila seleccionada
    filaSeleccionada = fila;

    // Agrega la clase "fila-seleccionada" a la fila seleccionada
    filaSeleccionada.classList.add("fila-seleccionada");
}

// Función para manejar el evento de clic en las filas
function manejarClicFila(event, productoJson) {
    
    const fila = event.target.closest("tr");

    if (fila && fila.closest("table")) {
        // Llama a la función para resaltar la fila seleccionada
        resaltarFila(fila);

        // Accede a los datos de la fila seleccionada
        const codigo = parseInt(fila.cells[0].innerText);
        const descripcion = fila.cells[1].innerText;
        //const talle = fila.cells[2].innerText;
        //const precio = fila.cells[3].innerText;
        const productoFiltrado = filtrarPorIdProducto(productoJson, codigo)
        cargarProductoJson(productoFiltrado)
        if (consultaExistencia(codigo)) {
            inpCodigo.value = "";
            modalProductos.classList.remove("show");
            modalProductos.style.display = "none";
            return; // Salir del evento en caso de error
        }else 
        //cargarProductoFiltrado(productoFiltrado)
        inpDetalle.value = descripcion;
        modalProductos.classList.remove("show");
        modalProductos.style.display = "none";
    }
}

 function filtrarPorIdProducto(productoJson, codigo) {
    return productoJson.find(producto => producto.idProducto === codigo);
}

//CONSULTAR POR ID
async function consultProduct(identificador) {
    const productoJson = await GetId(identificador);
    cargarProductoJson(productoJson);
    producto.descripcion = productoJson.descripcion;
    inpDetalle.value = producto.descripcion;
}


 const cargarProductoJson = (productoJson) => {

    producto.IdProducto = productoJson.idProducto;
    producto.codSecundario = productoJson.codSecundario;
    producto.Descripcion = productoJson.descripcion;
    producto.Sexo = productoJson.sexo;
    producto.Temporada = productoJson.temporada;
    producto.Estilo = productoJson.estilo.descripcion;
    producto.FechaDeAlta = productoJson.fechaDeAlta;
    producto.FechaActualizacion = productoJson.fechaActualizacion;
    producto.Color = productoJson.color.descripcion;
    producto.talle = productoJson.talle.descripcion;
    producto.proveedor = productoJson.proveedor.razonSocial;
    producto.PrecioCompra = productoJson.precioCompra;
    producto.PrecioVenta = productoJson.precioVenta;
    producto.cantidad = productoJson.cantidad;
    producto.Stock = inpCantidad.value;
    
}



//REDIBUJAR LA TABLA
function RedibujarTabla(productoSeleccionado) {
    contarLinea = 0;
    totalImporte = 0;
    importeT = 0;
    tfootElement.innerHTML = '';
    tbody.innerHTML = '';
    productoSeleccionado.forEach((p) => {
        var tr = document.createElement("tr");
        contarLinea++
        p.contLinea = contarLinea;
        insertarTableData(p.IdProducto, tr)
        insertarTableData(p.CantidadVendida, tr)
        insertarTableData(p.Descripcion, tr);
        insertarTableData(p.talle, tr);
        insertarTableData(p.PrecioVenta.toFixed(2), tr)
        importeT = p.PrecioVenta * p.CantidadVendida;
        insertarTableData(importeT.toFixed(2), tr)
        insertarAcciones(p.IdProducto, tr)
        totalImporte = totalImporte + importeT;
        
        tbody.appendChild(tr);
        
    })
    insertarFoot(totalImporte.toFixed(2));
}

const insertarFoot = (importe) =>{
    
    tfootElement.innerHTML = '';
    const tr = document.createElement("tr");
    const thE = document.createElement("th");
    const th = document.createElement("th");
    thE.colSpan = 3
    th.colSpan = 2;
    th.innerText = 'Total Importe = ';
    tr.appendChild(thE);
    tr.appendChild(th);
    const td = document.createElement("td");
    td.colSpan = 1;
    td.innerText = importe;
    tr.appendChild(td);
    tfootElement.appendChild(tr);
}





//INSERTAR EN LA TABLA DE DATOS
function insertarTableData(info, tr) {
    let td = document.createElement("td");
    td.innerText = info;
    tr.appendChild(td);
}



function eliminarProducto(productos, id) {
    return productos.filter(function (producto) {
        return producto.IdProducto !== id;
    });
}


//INSERTAR ACCIONES
function insertarAcciones(id, tr) {
    let td = document.createElement("td");
    let buttonEliminar = document.createElement("button")
    buttonEliminar.textContent = "Eliminar";
    buttonEliminar.classList.add("Eliminar");
    buttonEliminar.classList.add("btn", "btn-danger");
    buttonEliminar.dataset.id = id;
    buttonEliminar.onclick = () => {
        const productosFiltrados = eliminarProducto(productoSeleccionado, id)
        productoSeleccionado = productosFiltrados;
        RedibujarTabla(productosFiltrados)
    }
    td.append(buttonEliminar);
    tr.append(td);
}

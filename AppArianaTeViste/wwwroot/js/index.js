import { GetColor, CrearColor, GetColorId, updateColor, deleteColor } from "../js/services/Colores.js"



var closeModalBtn = document.getElementById('closeModalBtn');
const mdc = document.getElementById("modalColor");
const modalColor = document.querySelector("#modalColor");
const txtDescripcion = document.getElementById("txtColor");
const btnNuevo = document.getElementById("boton-nuevo-color");
const btnGuardar = document.getElementsByClassName("btn-guardar-color")[0];
const contenido = document.getElementById("contenido");



const modeloColor = {
    idColor: 0,
    descripcion: ""
}

// MOSTRAR COLORES
RedibujarTabla();



//REDIBUJAR LA TABLA
async function RedibujarTabla() {
    let colorJson = await GetColor();

    contenido.innerHTML = `
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Descripcion</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      ${colorJson.map(c => `
      <tr>
        <td>${c.idColor}</td>
        <td>${c.descripcion}</td>
        <td>
          <button class="btnEdit btn btn-primary" data-idcolor="${c.idColor}">Editar</button>
          <button class="btnDel btn btn-danger" data-nombre="${c.descripcion}" data-idcolor="${c.idColor}">Borrar</button>
        </td>
      </tr>
      `).join('')}
    </tbody>
  </table>`
    contenido.querySelector('table').addEventListener('click', handleClick)
}

// FUNCION ELIMINAR Y EDITAR
async function handleClick(e) {
    e.stopImmediatePropagation()
    const elem = e.target
    if (elem.classList.contains('btnEdit')) {
        const { idcolor } = elem.dataset
        MostrarModal(idcolor)
    }

    // ELIMINAR
    if (elem.classList.contains('btnDel')) {
        if (confirm(`Desea eliminar el color '${elem.dataset.nombre}'?`))
        {
            const { idcolor } = elem.dataset
            modalColor.idColor = idcolor
            const respuesta = await deleteColor(modalColor.idColor)
            console.log(respuesta)
            if (respuesta.valor){
                RedibujarTabla()
            }
            else
                Swal.fire("Lo sentimos", "No se puedo crear", "error");
            
        }
        
    }
}





btnNuevo.addEventListener("click", function () {
    modeloColor.idColor = 0;
    modeloColor.descripcion = "";
    txtDescripcion.value = "";
    console.log(txtDescripcion);
    MostrarModal();
});


// MUESTRA EL MODAL COLOR
async function MostrarModal(id) {
    if (id) {
        const color = await GetColorId(id)
        modeloColor.idColor = id
        txtDescripcion.value = color.descripcion
        mdc.classList.add("show");
        mdc.style.display = "block";
       

    }
    
    modeloColor.descripcion = txtDescripcion;
    mdc.classList.add("show");
    mdc.style.display = "block";
}


//GUARDAR COLOR
btnGuardar.addEventListener("click", function () {

    modeloColor.descripcion = txtDescripcion.value

    if (modeloColor.idColor == 0) {
        NuevoColor(modeloColor);
        RedibujarTabla();
    }
    else {
        Editar(modeloColor);

    }
})


//NUEVO COLOR
async function NuevoColor(modeloColor) {
    const data = await CrearColor(modeloColor);
    console.log(data);
    if (data.valor) {
        alert('aca estoy')
        mdc.classList.remove("show");
        mdc.style.display = "none";
        //Swal.fire("Listo!", "COLOR fue creado", "success");
        RedibujarTabla();
    } else {
        Swal.fire("Lo sentimos", "No se pudo crear", "error");
    }
}

//EDITAR COLOR
async function Editar(color) {
    const data = await updateColor(color);
    console.log(data);
    if (data.valor) {
        mdc.classList.remove("show");
        mdc.style.display = "none";
        Swal.fire("Listo!", "COLOR fue editado", "success");
        RedibujarTabla();
    } else {
        Swal.fire("Lo sentimos", "No se pudo crear", "error");
    }
}


var closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', function () {
    mdc.classList.remove("show");
    mdc.style.display = "none";
});


const url = "Home/ListaColor"

export async function GetColor() {
    const r = await fetch(url)
    const colores = await r.json()
    return colores;
}

export async function GetColorId(id) {
    const r = await fetch("Home/ConsultaColorPorId" + '/' + id)
    return await r.json()
}



export async function CrearColor(modeloColor) {
    const url = 'Home/guardarColor';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modeloColor)
    });

    return await response.json();
}

export async function updateColor(color) {
    const r = await fetch("Home/EditarColor",{
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(color)
    });
    return await r.json()
}

export async function deleteColor(id) {
    const r = await fetch("Home/EliminarColor"+'/'+id,{
        method: 'DELETE'
    })
    return await r.json()
}


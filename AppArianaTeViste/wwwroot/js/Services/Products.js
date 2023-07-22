

export async function GetId(id) {
    const r = await fetch("Details" + '/' + id)
    return await r.json()
}


/*export async function enviarDatos(Venta) {
    const url = "/Productos/EditarVentas";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Venta)
    });
    console.log(Venta);
    return await response.json();
}*/



export async function enviarDatos(Venta) {
  //  if (!Array.isArray(productoSeleccionado) || productoSeleccionado.length === 0) {
   //     console.log("El array productoSeleccionado es inválido o está vacío.");
 //       return;
  //  }

    const url = "/Ventas/EditarVentas";

    try {
        var miCadena = Venta;
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(miCadena)
        });

        console.log(JSON.stringify(miCadena));

        if (respuesta.ok) {
            const data = await respuesta.json();
            console.log(data);
            return  data;
        } else {
            const dataError = await respuesta.json();
            console.log(dataError);
            return dataError;
        }
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}


export async function GetDesc(producto) {
    try {
        var miCadena = producto; // Cadena que deseas enviar
        // Objeto de configuración de la solicitud
        var config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido como texto plano
            },
            body: JSON.stringify(miCadena) // Establece el cuerpo de la solicitud como la cadena
        };
        // Realizar la solicitud Fetch
        var response = await fetch('ListaDesc', config);
        const lista = await response.json()
        // Verificar si la respuesta es exitosa
        if (response.ok) {
            //var data = await response.text();
            // Manejar los datos de respuesta del servidor
            //console.log(data);
            
            return lista;
        } else {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
    } catch (error) {
        // Manejar los errores de la solicitud
        console.log('Error:', error);
        alert('ERROR');
    }
}




export function mostrarFechaHora() {
    // Obtener la fecha y hora actual del sistema
    let fechaHora = new Date();

    // Formatear los componentes de la fecha y hora
    let dia = fechaHora.getDate();
    let mes = fechaHora.getMonth() + 1; // Los meses empiezan en 0, por lo que se suma 1
    let año = fechaHora.getFullYear();
    let horas = fechaHora.getHours();
    let minutos = fechaHora.getMinutes();
    let segundos = fechaHora.getSeconds();

    // Asegurarse de que los componentes tengan 2 dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;

    // Construir la cadena de fecha y hora
    let fechaHoraString = dia + '/' + mes + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;

    // Mostrar la fecha y hora en el elemento con el ID "fecha-hora"
    
    return fechaHoraString;
}

// Llamar a la función cada segundo
setInterval(mostrarFechaHora, 1000);



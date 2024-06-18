var g_id_resultado = "";

/**
 * LISTAR
 */

function listarResultado() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila);
            $('#tbl_resultados').DataTable({
                language: {
                  url: '../js/es-ES.json',
              }
              });
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
function completarFila(element, index, arr) {

    var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

    arr[index] = document.querySelector("#tbl_resultados tbody").innerHTML +=
        `<tr>
    <td>${element.id_resultado}</td>
    <td>${element.nombre_resultado}</td>
    <td>${fechaHoraFormateada}</td>
    <td>
    <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning'>Actualizar</a> 
    <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger'>Eliminar</a> 
    </td>
    </tr>`
}

/**
 * CREAR
 */

function agregarResultado() {

    var form = document.getElementById('form');

    if (form.checkValidity() === false) {
        // Si el formulario no es válido, mostrar mensajes de error
        form.classList.add('was-validated');
        return false;
    }

    //Obtenemos el tipo de gestión que ingresa el usuario
    var id = document.getElementById("txt_id_resultado").value;
    var nombre = document.getElementById("txt_nombre").value;

    //Encabezado de la solicitud
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var fechaHoraActual = obtenerFechaHora();

    //Carga útil de datos
    const raw = JSON.stringify({
        "id_resultado": id,
        "nombre_resultado": nombre,
        "fecha_registro": fechaHoraActual
    });

    //Opciones de solicitud
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
        .then((response) => {
            if (response.status == 200) {
                alert("creado");
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

/**
 * ELIMINAR
 */

function obtenerIdEliminar() {
    //obtener datos de la solicitud
    const queryString = window.location.search;
    //obtenemos todos los parámetros
    const parametros = new URLSearchParams(queryString);
    //Nos posicionamos sobre un parámetro y obtenemos su valor actual
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosEliminar(p_id_resultado);

}
function obtenerDatosEliminar(p_id_resultado) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + p_id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiqueta))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function completarEtiqueta(element, index, arr) {
    var nombre = element.nombre_resultado;
    document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el Resultado? <b>" + nombre + "</b>";


}

function eliminarResultado() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Opciones de solicitud
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/resultado/" + g_id_resultado, requestOptions)
        .then((response) => {

            //Cambiar por elementos de bootstrap
            if (response.status == 200) {
                alert("eliminado");
                location.href = "listar.html";
            }
            if (response.status == 400) {
                alert("No es posible eliminar. Registro está siendo utilizado.");
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

/**
 * ACTUALIZAR
 */

function obtenerIdRelleno() {
    //obtener datos de la solicitud
    const queryString = window.location.search;
    //obtenemos todos los parámetros
    const parametros = new URLSearchParams(queryString);
    //Nos posicionamos sobre un parámetro y obtenemos su valor actual
    const p_id_resultado = parametros.get('id');
    g_id_resultado = p_id_resultado;
    obtenerDatosRelleno(p_id_resultado);

}
function obtenerDatosRelleno(p_id_resultado) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado/" + p_id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarRelleno))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function completarRelleno(element, index, arr) {
    document.getElementById('txt_id_resultado').value = element.id_resultado;
    document.getElementById('txt_nombre').value = element.nombre_resultado;
}

function actualizarResultado() {

    var form = document.getElementById('form');

    if (form.checkValidity() === false) {
        // Si el formulario no es válido, mostrar mensajes de error
        form.classList.add('was-validated');
        return false;
    }

    //Obtenemos el tipo de gestión que ingresa el usuario
    var id = document.getElementById("txt_id_resultado").value;
    var nombre = document.getElementById("txt_nombre").value;


    //Encabezado de la solicitud
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var fechaHoraActual = obtenerFechaHora();

    //Carga útil de datos
    const raw = JSON.stringify({
        "id_resultado": id,
        "nombre_resultado": nombre,
        "fecha_registro": fechaHoraActual
    });

    //Opciones de solicitud
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/resultado/" + g_id_resultado, requestOptions)
        .then((response) => {
            if (response.status == 200) {
                alert("actualizado");
                location.href = "listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

/**
* DATES
*/

function obtenerFechaHora() {
    var fechaHoraActual = new Date();
    var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
    return fechaHoraFormateada;
}
function formatearFechaHora(fecha_registro) {
    var fechaHoraActual = new Date(fecha_registro);
    var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
    return fechaHoraFormateada;
}

/**
 * solo numeros
 */

function enforceNumericInput(inputId, errorMessageId) {
    const inputElement = document.getElementById(inputId);
    const errorMessageElement = document.getElementById(errorMessageId);

    inputElement.addEventListener('input', function (e) {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, '');


        if (value !== numericValue) {
            errorMessageElement.style.display = 'inline';
            e.target.classList.add('error');
        } else {
            errorMessageElement.style.display = 'none';
            e.target.classList.remove('error');
        }


        e.target.value = numericValue;
    });
}


document.addEventListener('DOMContentLoaded', function () {
    enforceNumericInput('txt_id_resultado', 'error-message-id');

});
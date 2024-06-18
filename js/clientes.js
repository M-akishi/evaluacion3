var g_id_clientes = "";

//listar
function listarCliente() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_clientes').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element, index, arr) {

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_clientes tbody").innerHTML +=
    `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${fechaHoraFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a> 
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a> 
  </td>
  </tr>`
}

//crear
function agregarCliente() {

  var form = document.getElementById('form');

  if (form.checkValidity() === false) {
    // Si el formulario no es válido, mostrar mensajes de error
    form.classList.add('was-validated');
    return false;
  }

  //Obtenemos el tipo de gestión que ingresa el usuario
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv_cliente = document.getElementById("txt_dv").value;
  var nombre_cliente = document.getElementById("txt_nombre").value;
  var apellido_ciente = document.getElementById("txt_apellido").value;
  var email_cliente = document.getElementById("txt_email").value;
  var celular_cliente = document.getElementById("txt_celular").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaHoraActual = obtenerFechaHora();

  //Carga útil de datos
  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv_cliente,
    "nombres": nombre_cliente,
    "apellidos": apellido_ciente,
    "email": email_cliente,
    "celular": celular_cliente,
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
  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//eliminar

function obtenerIdEliminar() {
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_clientes = parametros.get('id');
  g_id_clientes = p_id_clientes;
  obtenerDatosEliminar(p_id_clientes);

}
function obtenerDatosEliminar(p_id_clientes) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/" + p_id_clientes, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function completarEtiqueta(element, index, arr) {
  var nombre_tipo_gestion = element.nombres + ' ' + element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el Cliente? <b>" + nombre_tipo_gestion + "</b>";


}

function eliminarCliente() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/" + g_id_clientes, requestOptions)
    .then((response) => {

      //Cambiar por elementos de bootstrap
      if (response.status == 200) {
        location.href = "listar.html";
      }
      if (response.status == 400) {
        alert("No es posible eliminar. Registro está siendo utilizado.");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//actualizar

function obtenerIdRelleno() {
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_clientes = parametros.get('id');
  g_id_clientes = p_id_clientes;
  obtenerDatosRelleno(p_id_clientes);

}
function obtenerDatosRelleno(p_id_clientes) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/" + p_id_clientes, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarRelleno))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function completarRelleno(element, index, arr) {
  document.getElementById('txt_id_cliente').value = element.id_cliente;
  document.getElementById('txt_dv').value = element.dv;
  document.getElementById('txt_nombre').value = element.nombres;
  document.getElementById('txt_apellido').value = element.apellidos;
  document.getElementById('txt_email').value = element.email;
  document.getElementById('txt_celular').value = element.celular;


}

function actualizarCliente() {
  //Obtenemos el tipo de gestión que ingresa el usuario
  var dv_cliente = document.getElementById("txt_dv").value;
  var nombre_cliente = document.getElementById("txt_nombre").value;
  var apellido_ciente = document.getElementById("txt_apellido").value;
  var email_cliente = document.getElementById("txt_email").value;
  var celular_cliente = document.getElementById("txt_celular").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaHoraActual = obtenerFechaHora();

  //Carga útil de datos
  const raw = JSON.stringify({
    "dv": dv_cliente,
    "nombres": nombre_cliente,
    "apellidos": apellido_ciente,
    "email": email_cliente,
    "celular": celular_cliente,
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
  fetch("http://144.126.210.74:8080/api/cliente/" + g_id_clientes, requestOptions)
    .then((response) => {
      if (response.status == 200) {
        location.href = "listar.html";
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//solo numeros
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
  enforceNumericInput('txt_celular', 'error-message-phone');
  enforceNumericInput('txt_id_cliente', 'error-message-id');

});

//dates

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



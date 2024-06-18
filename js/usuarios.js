var g_id_usuario = "";


/**
 * LISTAR
 */

function listarUsuario() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuarios').DataTable({
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

  arr[index] = document.querySelector("#tbl_usuarios tbody").innerHTML +=
    `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${fechaHoraFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a> 
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a> 
  </td>
  </tr>`
}

/**
 * CREAR
 */

function agregarUsuario() {

  var form = document.getElementById('form');

  if (form.checkValidity() === false) {
    // Si el formulario no es válido, mostrar mensajes de error
    form.classList.add('was-validated');
    return false;
  }

  //Obtenemos el tipo de gestión que ingresa el usuario
  var id = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombre = document.getElementById("txt_nombre").value;
  var apellido = document.getElementById("txt_apellido").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;

  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaHoraActual = obtenerFechaHora();

  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario": id,
    "dv": dv,
    "nombres": nombre,
    "apellidos": apellido,
    "email": email,
    "celular": celular,
    "username": username,
    "password" : password,
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
  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
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
 * ACTUALIZAR
 */

function obtenerIdRelleno() {
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosRelleno(p_id_usuario);

}
function obtenerDatosRelleno(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarRelleno))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function completarRelleno(element, index, arr) {
  document.getElementById('txt_id_usuario').value = element.id_usuario;
  document.getElementById('txt_dv').value = element.dv;
  document.getElementById('txt_nombre').value = element.nombres;
  document.getElementById('txt_apellido').value = element.apellidos;
  document.getElementById('txt_email').value = element.email;
  document.getElementById('txt_celular').value = element.celular;
  document.getElementById('txt_username').value = element.username;
  document.getElementById('txt_password').value = element.password;
}

function actualizarUsuario() {

var form = document.getElementById('form');

  if (form.checkValidity() === false) {
    // Si el formulario no es válido, mostrar mensajes de error
    form.classList.add('was-validated');
    return false;
  }

  //Obtenemos el tipo de gestión que ingresa el usuario
  var id = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombre = document.getElementById("txt_nombre").value;
  var apellido = document.getElementById("txt_apellido").value;
  var email = document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var username = document.getElementById("txt_username").value;
  var password = document.getElementById("txt_password").value;


  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaHoraActual = obtenerFechaHora();

  //Carga útil de datos
  const raw = JSON.stringify({
    "id_usuario": id,
    "dv": dv,
    "nombres": nombre,
    "apellidos": apellido,
    "email": email,
    "celular": celular,
    "username": username,
    "password" : password,
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
  fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
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
 * ELIMINAR
 */

function obtenerIdEliminar() {
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(p_id_usuario) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}

function completarEtiqueta(element, index, arr) {
  var nombre = element.nombres + ' ' + element.apellidos;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el Usuario? <b>" + nombre + "</b>";


}

function eliminarUsuario() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Opciones de solicitud
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/" + g_id_usuario, requestOptions)
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
  enforceNumericInput('txt_celular', 'error-message-phone');
  enforceNumericInput('txt_id_usuario', 'error-message-id');

});
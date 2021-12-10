//const { response } = require("express");

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error('Something went wrong!')
        error.data = errResData;
        throw error;
      })
    }
    return response.json();
  })
}

var modal = document.getElementById("registerModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("btn-close")[0];

var submitBtn = document.getElementsByClassName("btn btn-primary")[0]

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const sendData = () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  sendHttpRequest('POST', 'http://localhost:8080/register', {
    "username": username,
    "password": password,
  })
    .then(responseData => {
      console.log(responseData);
      console.log(username);
      console.log(password);
    })
    .catch(err => {
      console.log(err);
    })
}

submitBtn.addEventListener('click', sendData);

// function validaRegisto() {
//   const username = document.getElementById("username").value; // email é validado pelo próprio browser
//   const password = document.getElementById("password").value; // tem de ter uma senha
//   const statReg = document.getElementById("statusRegistar");

//   if (username && password !== null) {
//     console.log(username);
//     console.log(password);
//     fetch(`${urlBase}/register`, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//       body: `username=${username}&password=${password}`,
//     })
//       .then(async (response) => {
//         if (!response.ok) {
//           erro = response.statusText;
//           statReg.innerHTML = response.statusText;
//           throw new Error(erro);
//         }
//         result = await response.json();
//         console.log(result.message);
//         statReg.innerHTML = result.message;
//       })
//       .catch((error) => {
//         document.getElementById(
//           "statusRegistar"
//         ).innerHTML = `Pedido falhado: ${error}`;
//       });
//   }
// }


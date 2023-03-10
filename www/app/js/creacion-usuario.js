(() => {
    let baseURL = 'http://localhost:3005/api/';
    let txtNumero = document.getElementById("txtcodigo");
    let txttipousuario = document.getElementById("txttipousuario");
    let txtestatus = document.getElementById("txtestatus");
    let txtnombre = document.getElementById("txtnombre");
    let txtCedula = document.getElementById("txtCedula");
    let txtusuario = document.getElementById("txtusuario");
    let txtcontraseña = document.getElementById("txtcontraseña");
    let txtapellido = document.getElementById("txtapellido");
    let txtdireccion = document.getElementById("txtdireccion");
    let txtemail = document.getElementById("txtemail");
    let txtconfircontraseña = document.getElementById("txtconfircontraseña");

    //botones
    let btnGuardar = document.getElementById("btnGuardar");

    //
    let objeto = {}

    /////////////////////////////////////Limpiar todos los input/////////////////////
    function clearAll() {
        txtcodigo.value = "";
        txttipousuario.value = "";
        txtestatus.value = "";
        txtnombre.value = "";
        txtCedula.value = "";
        txtusuario.value = "";
        txtcontraseña.value = "";
        txtapellido.value = "";
        txtdireccion.value = "";
        txtemail.value = "";
    }

     //Modal
     let modalContainer = document.getElementById("modalContainer");

     var showModal = () => {
         modalContainer.style.opacity = 1;
         modalContainer.style.pointerEvents = "unset";
     };

     var hideModal = () => {
         modalContainer.style.opacity = 0;
         modalContainer.style.pointerEvents = "none";
     };
     closeModalAction.addEventListener("click", hideModal);

    ////////////////////////////////////////Alerta inferior derecha////////////////////////
    let alertBannerContainer = document.getElementById('alertBannerContainer');
    let iconAlert = document.getElementById('icon-alert');
    let alertExitButton = document.getElementById('alert-exit-button');
    let alertText = document.getElementById('alert-text');

    var showAlertModal = (mode, text) => {
        let exitP = alertExitButton.querySelector('p')

        alertBannerContainer.className = '';
        exitP.className = '';
        iconAlert.className = '';
        alertText.className = '';

        alertBannerContainer.classList.add('alert-banner', 'show-alert', `alert-${mode}`);
        alertText.classList.add(`alert-text-${mode}`);
        exitP.classList.add(`alert-text-${mode}`);
        alertText.textContent = text;

        switch (mode) {
            case 'danger':
                iconAlert.className = '';
                iconAlert.classList.add('fa-solid', 'fa-circle-xmark', 'alert-text-danger');
                break;
            case 'warning':
                iconAlert.className = '';
                iconAlert.classList.add('fa-solid', 'fa-circle-exclamation', 'alert-text-warning');
                break;
            case 'success':
                iconAlert.className = '';
                iconAlert.classList.add('fa-solid', 'fa-circle-check', 'alert-text-success');
                break;
        }
    }
    var hideAlertModal = () => {
        alertBannerContainer.classList.remove('show-alert')
    }
    alertExitButton.addEventListener('click', hideAlertModal);


    //Renderizacion de la tabla de los Usuarios
     //let allDataUser;
//     try {
//         fetch(`${baseURL}user`)
//             .then(res => {
//                 if (res.status >= 400) throw new Error('Error')
//    return res.json()
//            })
//            .then(res => {
//                console.log(res);
//                allDataUser = res;
//                console.log(allDataUser);
//                for (let key in allDataUser) {
//                    let row = document.createElement('div');
//                    row.classList.add('tr-cuerpo');
//                    row.setAttribute('data-key', key);
//                    let td = `
//                            <div class="td-cuerpo">${allDataUser[key].Nombre}</div>
//                            <div class="td-cuerpo">${allDataUser[key].Apellido}</div>
//                            <div class="td-cuerpo">${allDataUser[key].Direccion}</div>
//                            <div class="td-cuerpo">${allDataUser[key].Email}</div>
  //                          <div class="td-cuerpo">${allDataUser[key].Usuario}</div>
//                            <div class="td-cuerpo">${allDataUser[key].codigo_user}</div>
//                            <div class="td-cuerpo">${allDataUser[key].contraseña}</div>
//                            <div class="td-cuerpo">${allDataUser[key].estatus}</div>
//                            <div class="td-cuerpo">${allDataUser[key].tipo_user}</div>
//                            `;
//                    row.insertAdjacentHTML('beforeend', td);
//                    tbodyUser.insertAdjacentElement('beforeend', row);

//                }
//         })
 //} catch (error) {

   //  }

    btnGuardar.addEventListener("click", function () {

        if (txtNumero.value != "") {
            if (txttipousuario.options.selectedIndex != "") {
                if (txtusuario.value != "") {
                    if (txtnombre != "") {
                        if (txtestatus.options.selectedIndex != "") {
                            if (txtCedula.value != "") {
                                if (txtcontraseña.value != "") {
                                    if (txtapellido.value != "") {
                                        if (txtdireccion.value != "") {
                                            if (txtemail.value != "") {


                                                objeto = {
                                                    "Nombre": txtnombre.value,
                                                    "Apellido": txtapellido.value,
                                                    "Cedula": txtCedula.value,
                                                    "Direccion": txtdireccion.value,
                                                    "email": txtemail.value,
                                                    "usuario": txtusuario.value,
                                                    "codigo_user": txtcodigo.value,
                                                    "tipo_user": txttipousuario.value,
                                                    "contraseña": txtcontraseña.value,
                                                    "estatus": txtestatus.value

                                                }
                                                try {
                                                    fetch(`${baseURL}user`, {
                                                        method: 'POST',
                                                        body: JSON.stringify(objeto),
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                    })
                                                        .then(res => {
                                                            console.log(res.status);
                                                            if (res.status < 400) {
                                                                clearAll()
                                                                showAlertModal('success', 'Usuario agregado correctamente')
                                                            } else {
                                                                showAlertModal('danger', 'Error al guardar el documento');
                                                            }
                                                        })
                                                } catch (error) {
                                                }


                                            } else {
                                                showAlertModal('warning', 'Debe llenar el campos de');
                                                txtemail.focus();
                                            }
                                        } else {
                                            showAlertModal('warning', 'Debe llenar el campos de');
                                            txtdireccion.focus();
                                        }
                                    } else {
                                        showAlertModal('warning', 'Debe llenar el campos de');
                                        txtapellido.focus();
                                    }
                                } else {
                                    showAlertModal('warning', 'Debe llenar el campos de');
                                    txtcontraseña.focus();
                                }
                            } else {
                                showAlertModal('warning', 'Debe llenar el campos de');
                                txtCedula.focus();
                            }
                        } else {
                            showAlertModal('warning', 'Debe llenar el campos de');
                            txtestatus.focus();
                        }
                    } else {
                        showAlertModal('warning', 'Debe llenar el campos de');
                        txtnombre.focus();
                    }
                } else {
                    showAlertModal('warning', 'Debe llenar el campos de');
                    txtusuario.focus();
                }
            } else {
                showAlertModal('warning', 'Debe llenar el campos de');
                txttipousuario.focus();
            }
        } else {
            showAlertModal('warning', 'Debe llenar el campos de');
            txtNumero.focus();

        }
    })

    btnbuscar.addEventListener("click", function () {

        showModal();
    })


})()
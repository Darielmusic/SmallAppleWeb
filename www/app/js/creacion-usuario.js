(() => {
    let baseURL = 'http://10.0.0.46:3005/api/';
    let txtcodigo = document.getElementById("txtcodigo");
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
    let tbodyUser = document.getElementById("tbodyUser");
    let userId;
    let statusPeticion = 'POST';

    //botones
    let btnGuardar = document.getElementById("btnGuardar");
    let btnlimpiar = document.getElementById("btnlimpiar");

    //
    let objeto = {}



    /////////////////////////////////////Limpiar todos los input/////////////////////
function clearAll(){
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
    txtconfircontraseña.value = "";
    tbodyUser.value = "";
}

    btnlimpiar.addEventListener("click", function () {
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
        txtconfircontraseña.value = "";
        tbodyUser.value = "";
    })




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
        console.log('aja')
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
    let allDataUser;
    try {
        fetch(`${baseURL}user`)
            .then(res => {
                if (res.status >= 400) throw new Error('Error')
                return res.json()
            })
            .then(res => {
                console.log(res);
                allDataUser = res;
                console.log(allDataUser);
                for (let key in allDataUser) {
                    let row = document.createElement('div');
                    row.classList.add('tr-cuerpo');
                    row.setAttribute('data-key', key);
                    let td = `
                            <div class="td-cuerpo">${allDataUser[key].Nombre}</div>
                            <div class="td-cuerpo">${allDataUser[key].Apellido}</div>
                            <div class="td-cuerpo">${allDataUser[key].Cedula}</div>
                            <div class="td-cuerpo">${allDataUser[key].email}</div>
                            <div class="td-cuerpo">${allDataUser[key].usuario}</div>
                            <div class="td-cuerpo">${allDataUser[key].codigo_user}</div>
                            <div class="td-cuerpo">${allDataUser[key].tipo_user}</div>
                            <div class="td-cuerpo">${allDataUser[key].contraseña}</div>
                            <div class="td-cuerpo">${allDataUser[key].estatus}</div>
                             <div class="td-cuerpo">${allDataUser[key].Direccion}</div>
                            
                            
                            
                           
                           
                           
                           `;
                    row.insertAdjacentHTML('beforeend', td);
                    tbodyUser.insertAdjacentElement('beforeend', row);

                }
            })
    } catch (error) {

    }

    btnGuardar.addEventListener("click", function () {

        if (txtcodigo.value != "") {
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
                                                    "codigo_user": 25634,
                                                    "tipo_user": txttipousuario.value,
                                                    "usuario": txtusuario.value,
                                                    "Nombre": txtnombre.value,
                                                    "estatus": txtestatus.value,
                                                    "Cedula": txtCedula.value,
                                                    "contraseña": txtcontraseña.value,
                                                    "Apellido": txtapellido.value,
                                                    "Direccion": txtdireccion.value,
                                                    "email": txtemail.value

                                                }
                                                console.log(objeto);

                                                // cosaa

                                                if (statusPeticion == 'POST') {
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
                                                                    showAlertModal('success', 'Producto agregado correctamente');
                                                                   
                                                                } else {
                                                                    showAlertModal('danger', 'Error al guardar el documento');
                                                                }
                                                            })
                                                    } catch (error) {
                                                    }
                                                } else {
                                                    try {
                                                        fetch(`${baseURL}user/${userId}`, {
                                                            method: 'PUT',
                                                            body: JSON.stringify(objeto),
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                        })
                                                            .then(res => {
                                                                console.log(res.status);
                                                                if (res.status < 400) {
                                                                    console.log("si");
                                                                    clearAll()
                                                                    showAlertModal('success', 'Usuario modificado correctamente')
                                                                } else {
                                                                    showAlertModal('danger', 'Error al modificar el documento');
                                                                }
                                                            })
                                                    } catch (error) {
                                                    }
                                                }

                                                //fin cosa

                                                /* try {
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
                                                } */


                                            } else {
                                                showAlertModal('warning', 'Debe llenar el campos de email');
                                                txtemail.focus();
                                            }
                                        } else {
                                            showAlertModal('warning', 'Debe llenar el campos de direccion');
                                            txtdireccion.focus();
                                        }
                                    } else {
                                        showAlertModal('warning', 'Debe llenar el campos de apellido');
                                        txtapellido.focus();
                                    }
                                } else {
                                    showAlertModal('warning', 'Debe llenar el campos de contrasena');
                                    txtcontraseña.focus();
                                }
                            } else {
                                showAlertModal('warning', 'Debe llenar el campos de cedula');
                                txtCedula.focus();
                            }
                        } else {
                            showAlertModal('warning', 'Debe llenar el campos de estado');
                            txtestatus.focus();
                        }
                    } else {
                        showAlertModal('warning', 'Debe llenar el campos de nombre');
                        txtnombre.focus();
                    }
                } else {
                    showAlertModal('warning', 'Debe llenar el campos de usuario');
                    txtusuario.focus();
                }
            } else {
                showAlertModal('warning', 'Debe llenar el campos de tipo usuario');
                txttipousuario.focus();
            }
        } else {
            showAlertModal('warning', 'Debe llenar el campos de codigo');
            txtcodigo.focus();

        }
    })

    btnbuscar.addEventListener("click", function () {

        showModal();
    })

    tbodyUser.addEventListener('click', function (e) {
        console.log(e);
        if (e.target.matches('.tr-cuerpo') || e.target.matches('.td-cuerpo')) {
            let key1 = e.target.parentElement.getAttribute('data-key');
            let key2 = e.target.getAttribute('data-key');
            let key = key1 || key2
            statusPeticion = 'PUT';
            productId = allDataUser[key].id;

            txtcodigo.value = allDataUser[key].codigo_user
            txttipousuario.options.selectedIndex = allDataUser[key].tipo_user
            txtusuario.value = allDataUser[key].usuario
            txtnombre.value = allDataUser[key].Nombre
            txtestatus.options.selectedIndex = allDataUser[key].estatus
            txtCedula.value = allDataUser[key].Cedula
            txtcontraseña.value = allDataUser[key].contraseña
            txtapellido.value = allDataUser[key].Apellido
            txtdireccion.value = allDataUser[key].Direccion
            txtemail.value = allDataUser[key].email



            hideModal();
        }
    })


})()
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

    // //Modal
    // let modalContainer = document.getElementById("modalContainer");

    // var showModal = () => {
    //     modalContainer.style.opacity = 1;
    //     modalContainer.style.pointerEvents = "unset";
    // };

    // var hideModal = () => {
    //     modalContainer.style.opacity = 0;
    //     modalContainer.style.pointerEvents = "none";
    // };
    // closeModalAction.addEventListener("click", hideModal);

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


    //Renderizacion de la tabla de los productos
    // let allDataProduct;
    // try {
    //     fetch(`${baseURL}product`)
    //         .then(res => {
    //             if (res.status >= 400) throw new Error('Error')
    //             return res.json()
    //         })
    //         .then(res => {
    //             console.log(res);
    //             allDataProduct = res;
    //             console.log(allDataProduct);
    //             for (let key in allDataProduct) {
    //                 let row = document.createElement('div');
    //                 row.classList.add('tr-cuerpo');
    //                 row.setAttribute('data-key', key);
    //                 let td = `
    //                         <div class="td-cuerpo">${allDataProduct[key].id}</div>
    //                         <div class="td-cuerpo">${allDataProduct[key].barcode}</div>
    //                         <div class="td-cuerpo">${allDataProduct[key].article}</div>
    //                         <div class="td-cuerpo">${allDataProduct[key].description}</div>
    //                         <div class="td-cuerpo">${allDataProduct[key].price}</div>
    //                         `;
    //                 row.insertAdjacentHTML('beforeend', td);
    //                 tbodyProduct.insertAdjacentElement('beforeend', row);

    //             }
    //         })
    // } catch (error) {

    // }

    btnGuardar.addEventListener("click", function () {

        if (txtNumero.value != "") {
            if (txttipousuario.value != "") {
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
                                                    "Direccion": txtEstatus.value,
                                                    "email": txtCategoria.value,
                                                    "usuario": txtusuario.value,
                                                    "codigo_user": txtcodigo.value,
                                                    "tipo_user": txttipousuario.value,
                                                    "contraseña": txtcontraseña.value,
                                                    "estatus": txtestatus.value

                                                }
                                                try {
                                                    fetch(`${baseURL}produc`, {
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
                                                                showAlertModal('success', 'Producto agregado correctamente')
                                                            } else {
                                                                showAlertModal('danger', 'Error al guardar el documento');
                                                            }
                                                        })
                                                } catch (error) {
                                                }


                                            } else {
                                                alert("todos los campos deben de ser rellenados");
                                                txtemail.focus();
                                            }
                                        } else {
                                            alert("todos los campos deben de ser rellenados");
                                            txtdireccion.focus();
                                        }
                                    } else {
                                        alert("todos los campos deben de ser rellenados");
                                        txtapellido.focus();
                                    }
                                } else {
                                    alert("todos los campos deben de ser rellenados");
                                    txtcontraseña.focus();
                                }
                            } else {
                                alert("todos los campos deben de ser rellenados");
                                txtCedula.focus();
                            }
                        } else {
                            alert("todos los campos deben de ser rellenados");
                            txtestatus.focus();
                        }
                    } else {
                        alert("todos los campos deben de ser rellenados");
                        txtnombre.focus();
                    }
                } else {
                    alert("todos los campos deben de ser rellenados");
                    txtusuario.focus();
                }
            } else {
                showAlertModal('warning', 'Debe llenar el campo de tipo de usuario')
                ;
                txttipousuario.focus();
            }
        } else {
            showAlertModal('warning', 'Debe llenar el campo de tipo de usuario')
            txtNumero.focus();

        }
    })

    btnBuscar.addEventListener("click", function () {

        showModal();
    })

})()
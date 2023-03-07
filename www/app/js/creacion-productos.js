(() => {
    let baseURL = 'http://localhost:3005/api/';
    let txtId = document.getElementById("txtId");
    let txtArticulo = document.getElementById("txtArticulo");
    let txtCodigo = document.getElementById("txtCodigo");
    let txtPrecio = document.getElementById("txtPrecio");
    let txtCategoria = document.getElementById("txtCategoria");
    let txtDescripcion = document.getElementById("txtDescripcion");
    let txtEstatus = document.getElementById("txtEstatus");
    let btnBuscar = document.getElementById("btnBuscar");
    let tbodyProduct = document.getElementById("tbodyProduct");
    let statusPeticion = 'POST';
    let productId;
    //botones
    let btnGuardar = document.getElementById("btnGuardar");

    //
    let objeto = {}

    /////////////////////////////////////Limpiar todos los input/////////////////////
    function clearAll() {
        txtArticulo.value = "";
        txtCodigo.value = "";
        txtPrecio.value = "";
        txtCategoria.value = "";
        txtDescripcion.value = "";
        txtEstatus.value = "";
        btnBuscar.value = "";
        tbodyProduct.value = "";
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


    //Renderizacion de la tabla de los productos
    let allDataProduct;
    try {
        fetch(`${baseURL}product`)
            .then(res => {
                if (res.status >= 400) throw new Error('Error')
                return res.json()
            })
            .then(res => {
                allDataProduct = res;
                for (let key in allDataProduct) {
                    let row = document.createElement('div');
                    row.classList.add('tr-cuerpo');
                    row.setAttribute('data-key', key);
                    row.classList.add('cursor-pointer');
                    let td = `
                            <div class="td-cuerpo">${allDataProduct[key].id}</div>
                            <div class="td-cuerpo">${allDataProduct[key].barcode}</div>
                            <div class="td-cuerpo">${allDataProduct[key].article}</div>
                            <div class="td-cuerpo">${allDataProduct[key].description}</div>
                            <div class="td-cuerpo">${allDataProduct[key].price}</div>
                            `;
                    row.insertAdjacentHTML('beforeend', td);
                    tbodyProduct.insertAdjacentElement('beforeend', row);

                }
            })
    } catch (error) {

    }
    btnGuardar.addEventListener("click", function () {

        if (txtId.value != "") {
            if (txtArticulo.value != "") {
                if (txtCodigo.value != "") {
                    if (txtPrecio.value != "") {
                        if (txtCategoria.options.selectedIndex != "") {
                            if (txtDescripcion.value != "") {
                                if (txtEstatus.options.selectedIndex != "") {
                                    objeto = {
                                        "article": txtArticulo.value,
                                        "barcode": txtCodigo.value,
                                        "description": txtDescripcion.value,
                                        "statusId": Number(txtEstatus.value),
                                        "categoryId": Number(txtCategoria.value),
                                        "price": Number(txtPrecio.value)
                                    }

                                    if(statusPeticion == 'POST'){
                                        try {
                                            fetch(`${baseURL}product`, {
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
                                    }else{
                                        try {
                                            fetch(`${baseURL}product/${productId}`, {
                                                method: 'PUT',
                                                body: JSON.stringify(objeto),
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            })
                                                .then(res => {
                                                    console.log(res.status);
                                                    if (res.status < 400) {
                                                        clearAll()
                                                        showAlertModal('success', 'Producto modificado correctamente')
                                                    } else {
                                                        showAlertModal('danger', 'Error al modificar el documento');
                                                    }
                                                })
                                        } catch (error) {
                                        }
                                    }
                                }
                            } else {
                                showAlertModal('warning', 'Debe llenar es campos de estatus');
                                txtEstatus.focus();

                            }
                        } else {
                            showAlertModal('warning', 'Debe llenar es campos de descripción');
                            txtDescripcion.focus();
                        }
                    } else {
                        showAlertModal('warning', 'Debe llenar es campos de categoría');
                        txtCategoria.focus();

                    }
                } else {
                    showAlertModal('warning', 'Debe llenar es campos de precio');
                    txtPrecio.focus();
                }
            } else {
                showAlertModal('warning', 'Debe llenar es campos de codigo de barra');
                txtCodigo.focus();
            }
        } else {
            showAlertModal('warning', 'Debe llenar es campos de articulo');
            txtArticulo.focus();
        }
  
    })

btnBuscar.addEventListener("click", function () {
    showModal();
})

tbodyProduct.addEventListener('click', function (e) {
    console.log(e);
    if (e.target.matches('.tr-cuerpo') || e.target.matches('.td-cuerpo')) {
        let key1 = e.target.parentElement.getAttribute('data-key');
        let key2 = e.target.getAttribute('data-key');
        let key = key1 || key2
        statusPeticion = 'PUT';
        productId = allDataProduct[key].id;
        txtId.value = allDataProduct[key].id
        txtArticulo.value = allDataProduct[key].article
        txtCodigo.value = allDataProduct[key].barcode
        txtPrecio.value = allDataProduct[key].price
        txtCategoria.options.selectedIndex = allDataProduct[key].categoryId
        txtDescripcion.value = allDataProduct[key].description
        txtEstatus.options.selectedIndex = allDataProduct[key].statusId

        hideModal();
    }
})

}) ()
(() => {

    let txtId = document.getElementById("txtId");
    let txtArticulo = document.getElementById("txtArticulo");
    let txtCodigo = document.getElementById("txtCodigo");
    let txtPrecio = document.getElementById("txtPrecio");
    let txtCategoria = document.getElementById("txtCategoria");
    let txtDescripcion = document.getElementById("txtDescripcion");
    let txtEstatus = document.getElementById("txtEstatus");
    let btnBuscar = document.getElementById("btnBuscar");




    


    //botones
    let btnGuardar = document.getElementById("btnGuardar");

    //
    let objeto = {}

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

    btnGuardar.addEventListener("click", function () {

        console.log(txtEstatus.value);
        console.log(txtId.value);
        console.log(txtCodigo.value);
        console.log(txtArticulo.value);
        console.log(txtCategoria.value);
        console.log(txtEstatus.value);
        console.log(txtDescripcion.value);

        debugger

        if (txtId.value != "") {
            if (txtArticulo.value != "") {
                if (txtCodigo.value != "") {
                    if (txtPrecio!= "") {
                        if (txtCategoria.options.selectedIndex != "") {
                            if (txtDescripcion.value != "") {
                                if (txtEstatus.options.selectedIndex != "") {
                                    objeto = {
                                        "article": txtArticulo.value,
                                        "barcode": txtCodigo.value,
                                        "description": txtDescripcion.value,
                                        "statusId": txtEstatus.value,
                                        "categoryId": txtCategoria.value,
                                        "price": txtPrecio.value
                                    }

                                    console.log(objeto);
                                }else{ alert("todos los campos deben de ser rellenados");
                                txtId.focus();}
                            }else{ alert("todos los campos deben de ser rellenados");
                            txtId.focus();}
                        }else{ alert("todos los campos deben de ser rellenados");
                        txtId.focus();}
                    }else{ alert("todos los campos deben de ser rellenados");
                    txtId.focus();}
                }else{ alert("todos los campos deben de ser rellenados");
                txtId.focus();}
            }else{ alert("todos los campos deben de ser rellenados");
            txtId.focus();}
        } else {
            alert("todos los campos deben de ser rellenados");
            txtId.focus();

        }
    })

    btnBuscar.addEventListener("click",function(){

        showModal();
    })

})()
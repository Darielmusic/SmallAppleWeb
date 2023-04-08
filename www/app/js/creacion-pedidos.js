(() => {
  let baseURL = "http://10.0.0.46:3005/api/";
  let txtcodigo = document.getElementById("txtcodigo");
  let txtcodbarra = document.getElementById("txtcodbarra");
  let txtarticulo = document.getElementById("txtarticulo");
  let txtprecio = document.getElementById("txtprecio");
  let txtdescripcion = document.getElementById("txtdescripcion");
  let txtcantidad = document.getElementById("txtcantidad");

  let tbody = document.getElementById("tbodydespacho");

  let list = [
    {
      articleId: 1,
      codbarra: "256985",
      articulo: "Mouse Logitech",
      precio: "770",
      descripcion: "Mouse marca Logitech con diferentes cambios de dpi",
      cantidad: "5",
    },

    {
      articleId: 2,
      codbarra: "121341",
      articulo: "Leche Listamilk",
      precio: "85",
      descripcion: "Leche marca Rica 100% leche de vaca",
      cantidad: "4",
    },

    {
      articleId: 3,
      codbarra: "146893",
      articulo: "Pelota de Basketball",
      precio: "450",
      descripcion: "Pelota de basketball marca Spallding color naranja",
      cantidad: "1",
    },
  ];

  let obj = {
    pedidoId: 5,
    Cantsolicitada: 5,
    Cantdespachada: 6,
    Descripcion: "Productos marca Logitech",
    Fecha: "3/21/2023",
    Detalles: list,
  };
  console.log(obj);

  txtcodigo.addEventListener("change", function () {
    txtcantidad.value = obj.Cantsolicitada;
  });

  txtcodbarra.addEventListener("change", function () {
    let data = obj.Detalles;
    for (let key in data) {
      if (list[key].codbarra == txtcodbarra.value) {
        txtarticulo.value = data[key].articulo;
        txtprecio.value = data[key].precio;
        txtdescripcion.value = data[key].descripcion;
      }
    }
  });

  let cont = 0
  txtcantidad.addEventListener("change", function () {
      let row = document.createElement("tr");
      row.classList.add("tr-cuerpo");
    row.setAttribute("data-key", cont);
    row.classList.add("cursor-pointer");

    let td = `
        <td class="td-cuerpo">${txtcodigo.value}</td>
        <td class="td-cuerpo">${txtcodbarra.value}</td>
        <td class="td-cuerpo">${txtarticulo.value}</td>
        <td class="td-cuerpo">${txtprecio.value}</td>
        <td class="td-cuerpo">${txtdescripcion.value}</td>
        <td class="td-cuerpo"><input value="${txtcantidad.value}" class="input-table" type="text" /></td>
  `;
    row.insertAdjacentHTML("beforeend", td);
    tbody.insertAdjacentElement("beforeend", row);

    cont++
});

})();

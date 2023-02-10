

window.addEventListener('load', function(){

    new Glider(document.querySelector('.carousel-list'), {
        slidesToShow: 7,
        slidesToScroll: 6,
        arrows: {
          prev: '.carousel-previus',
          next: '.carousel-next'
        }
      });

      
});




(function(){

var actualizarhora = function(){

    var fecha = new Date(),
        hora = fecha.getHours(),
        minutos = fecha.getMinutes(),
        ampm,
        segundos = fecha.getSeconds(),
        diaSemana = fecha.getDay(),
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        year = fecha.getFullYear();

        var phoras = document.getElementById("horas"),
        pampm = document.getElementById("ampm"),
         pminutos = document.getElementById("minutos"),
         psegundos = document.getElementById("segundos"),
         pdiasemana = document.getElementById("diasemana"),
         pdia = document.getElementById("dia"),
         pmes = document.getElementById("mes"),
         pyear = document.getElementById("year");

         var semana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
         pdiasemana.textContent = semana[diaSemana];

         pdia.textContent = dia;

         var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre", "Octubre","Noviembre","Diciembre"];
         pmes.textContent = meses[mes];

         pyear.textContent = year;


         if(hora >= 12){
            hora = hora -12;
            ampm = "PM";
         }else{
            ampm = "AM";
         };

         if(hora == 0){
            hora =12;

         };

         phoras.textContent = hora;
         pampm.textContent = ampm;

         

         if(minutos<10){
            minutos =  "0" + minutos
         };

         if(segundos<10){
            segundos = "0" + segundos};

        pminutos.textContent=minutos;
         psegundos.textContent=segundos;

};

actualizarhora();
var intervalo = setInterval(actualizarhora, 1000);

}())
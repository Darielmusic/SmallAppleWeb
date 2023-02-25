let openmodal = document.getElementById("openmodal");
let modalhelp = document.getElementById("modal");
let closemodal = document.getElementById("close");

// abrir modal

openmodal.onclick = function(){
    modalhelp.style.visibility= "visible";
}

//cerrar modal
closemodal.onclick=function(){
    modalhelp.style.visibility="hidden";
}

// cerrar en entana


modalhelp.onclick = function(){
modalhelp.style.visibility="hidden";
}
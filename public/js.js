let coluna = document.getElementById("coluna");

function showInfoMovie(){
    if(coluna.classList.contains("hide")){
        coluna.classList.remove("hide");
        coluna.classList.add("show");
    }else if(coluna.classList.contains("show")){
        coluna.classList.remove("show");
        coluna.classList.add("hide");
    }
}

let colunaSerie = document.getElementById("colunaSerie");
function showInfoTVShow(){
    if(colunaSerie.classList.contains("hide")){
        colunaSerie.classList.remove("hide");
        colunaSerie.classList.add("show");
    }else if(colunaSerie.classList.contains("show")){
        colunaSerie.classList.remove("show");
        colunaSerie.classList.add("hide");
    }
}

//let titulofilme = document.querySelector("#titulo");
//titulofilme.innerHTML = "titulo do filme";
//let filmedescricao = document.querySelector("#descricao");
//filmedescricao.innerHTML = "descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao descriçao";
//let filmeurl = document.querySelector("#filmeurl");


let botaoaleatorio = document.getElementById("botaoaleatorio");
let divaleatorio = document.getElementById("divaleatorio");

function aleatorio(){
    let html ='';
    let min = Math.ceil(0);
    let max = Math.floor();
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    html+= '<h1>' + num + '</h1>';
    divaleatorio.innerHTML = html; 
}

function exibir(){
    let numero = aleatorio;
    let html='';
    
}

botaoaleatorio.onclick = aleatorio;
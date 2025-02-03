let segon = document.getElementById("segon");
console.log("Hei!");
segon.innerHTML = "Hola <b>món</b>!";
segon.innerText="Hola <b>món</b>!";
segon.style.color = "red";
document.body.style.backgroundColor = "lightblue";

let nodeAnterior = segon.previousSibling;
let liAnterior = segon.previousElementSibling;
liAnterior.style.color = "green";
let quartLi = segon.nextElementSibling.nextElementSibling;
quartLi.id = "quart";
quartLi.className = "resaltat important";

let titol = document.body.firstElementChild;
// titol.onclick=function(){ 
//     alert("Has fet clic sobre l'element h1");
// }
// titol.onclick=function(){
//     alert("Segon click");
// }
titol.addEventListener("click",creaNouLi)
function creaNouLi(){
    let nouLi=document.createElement("li");
    nouLi.innerHTML="Nou element";
    nouLi.style.color="blue";
    quartLi.parentNode.appendChild(nouLi);
    nouLi.addEventListener("click",esborraLiClicat)
}
function esborraLiClicat(event){
    event.target.remove();
}
document.body.addEventListener("click",function(event){
    let lis = document.querySelectorAll("li");
    lis.forEach(function(li){
        li.style.backgroundColor="lightgreen";
    })
},true)

let tercerLi = document.querySelector("li:nth-child(3)");
tercerLi.addEventListener("click",function(event){
    event.target.style.backgroundColor="yellow";
    event.stopPropagation();
})

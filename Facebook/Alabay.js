let tabId;
chrome.tabs.query(
    {active:true,currentWindow:true},
    function(tabs){
    tabId = tabs[0].id;
    console.log("tabId: "+tabId);
});


//Cambiar color de fondo
document.getElementById("btn_1").addEventListener("click", hola)
    function hola(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:changeColor,
        args:["red"]
    });
}
    
function changeColor(color){
    document.body.style.backgroundColor = color;
}

//Cambiar color de links
document.getElementById("btn_2").addEventListener("click", changeLinkColor);
function changeLinkColor(){
    color = document.getElementById("selectedcolor").value;
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:setLinkColor,
        args:[color]
    });
}
function setLinkColor(color){
    var links = document.querySelectorAll("a");
    links.forEach(function(a, index, l){
        l[index].style.color = color;
    })
}

//Borrar imagenes
document.getElementById("btn_3").addEventListener("click", deleteImages);
function deleteImages(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:setDeleteImages
    })
}
function setDeleteImages(){
    var imgs = document.querySelectorAll("img");
    imgs.forEach(function(a, index, i){
        i[index].style.display = "none"
    })
}

//Mostrar ocultar contraseña

document.getElementById("btn_4").addEventListener("click", showHidePasswords);
function showHidePasswords(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function: setShowHidePasswords
    })
}
function setShowHidePasswords(){
    var passwordform = document.querySelectorAll('input[type = "password"]');
    passwordform.forEach(function(a, index, p){
        if(p[index].is_pass == false || p[index].is_pass == null){
            p[index].type = "text";
            p[index].is_pass = true;
        }
    });
    var passwordform = document.querySelectorAll('input[type = "text"]');
    passwordform.forEach(function(a, index, p){
        if(p[index].is_pass == true){
            p[index].type = "password";
            p[index].is_pass = false;
        }
    })
}

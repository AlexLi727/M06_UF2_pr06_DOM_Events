let tabId;
chrome.tabs.query(
    {active:true,currentWindow:true},
    function(tabs){
    tabId = tabs[0].id;
    console.log("tabId: "+tabId);
});

document.getElementById("stickymenu").addEventListener("click", stickyMenu);
function stickyMenu(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:setStickyMenu,
    });
}
function setStickyMenu(){
    var section = document.createElement("section");
    section.style.height = "100vh";
    section.style.width = "250px";
    section.style.background = "#F0F0F0";
    section.style.position = "fixed";
    section.style.top = "0px";
    section.style.right = "0px";
    section.style.float = "right";
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.justifyContent = "center";
    section.style.alignItems = "center";
    document.body.appendChild(section);

    var button1 = document.createElement("button");
    var button2 = document.createElement("button");
    section.appendChild(button1)
    section.appendChild(button2);

    button1.innerHTML = "Informació imatges";
    button2.innerHTML = "Preu més petit";

    button1.style.margin = "5px";
    button2.style.margin = "5px";

    button1.style.height = "50px";
    button2.style.height = "50px";

    button1.style.background = "rgb(245, 245, 245)";
    button2.style.background = "rgb(245, 245, 245)";

    button1.addEventListener("mouseover", function(){
        this.style.background = "aquamarine";
    });
    button1.addEventListener("mouseout", function(){
        this.style.background = "rgb(245, 245, 245)";
    })

    button2.addEventListener("mouseover", function(){
        this.style.background = "aquamarine";
    });
    button2.addEventListener("mouseout", function(){
        this.style.background = "rgb(245, 245, 245)";
    })

    button1.addEventListener("click", setImgInfo);
    button2.addEventListener("click", searchMostCheap);

    function setImgInfo(){
        var img = document.querySelectorAll("img");
        img.forEach(function(a, index, i){
            i[index].addEventListener("mouseover", function(){
                var div = document.createElement("div");
                div.innerText = this.alt
                this.insertAdjacentElement("beforebegin", div);
            })
            i[index].addEventListener("mouseout", function(){
                this.previousSibling.remove();
                
            })
            
        })
    }
    function searchMostCheap(){
        var price = document.querySelectorAll('span[class = "_cDEzb_p13n-sc-price_3mJ9Z"]');
        var CheapestProduct;
        var CheapestProductElement;
        price.forEach(function(a, index, p){
            var price = p[index].innerText
            price = price.substring(0, price.indexOf(",")) + "." + price.substring(price.indexOf(",")+1, price.length);
            price = parseFloat(price);
            console.log(price);
            if(CheapestProduct > price || CheapestProduct == null){
                CheapestProduct = price;
                CheapestProductElement = p[index];
            }
        })
        CheapestProductElement.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        var productImg = CheapestProductElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;
        productImg.style.border = "2px solid black";
        productImg.style.background = "blue";
    }
}

let tabId;
chrome.tabs.query(
    {active:true,currentWindow:true},
    function(tabs){
    tabId = tabs[0].id;
    console.log("tabId: "+tabId);
});

document.getElementById("btn_1").addEventListener("click", imgInfo);
function imgInfo(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:setImgInfo,
    });
}
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

document.getElementById("btn_2").addEventListener("click", mostCheap);
function mostCheap(){
    chrome.scripting.executeScript({
        target:{tabId:tabId},
        function:searchMostCheap,
    });
}

function searchMostCheap(){
    var price = document.querySelectorAll('span[class = "_cDEzb_p13n-sc-price_3mJ9Z"]');
    var CheapestProduct;
    price.forEach(function(a, index, p){
        console.log(parseFloat(p[index].innerText).toFixed(2));
    })
}

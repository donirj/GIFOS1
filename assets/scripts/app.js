function toggleClass(){
    let menu = document.querySelector(".mainMenu");
    menu.classList.toggle("toggleCls")
}


const APIKEY = "XPopyBNaDradpd7pMdSPbu2jJBntPNKW"
const ENDPOINT = {
    trending: '/trending', 
    search: '/search'    
}


const trendingContainer = document.querySelector('#trending');

function get(endPoint, callback){
fetch('https://api.giphy.com/v1/gifs'+ endPoint + '?api_key=' + APIKEY + '&limit=3')
.then( dataType  => dataType.json() )
.then( apiResponse => callback(apiResponse))

};

const getTrending = () => {
    get(ENDPOINT.trending, (apiReturn) => {
       const {data} = apiReturn;
console.log(data)
console.log(data[5]) 

    data.forEach( gifItem => {
        const{
            title,
            images,
        } = gifItem

        const imagesUrl = images.original.url

        const template =  `
    
        <img style="width: 100%; height: 100%; object-fit: cover;"  src=" ${imagesUrl}">
        
        `
    ;

    const gifContainer = document.createElement('div');
    gifContainer.innerHTML = template;
    trendingContainer.appendChild(gifContainer)
  
    });
});
}

getTrending();

const dark = document.querySelector('.dark')
 dark.addEventListener('click', function(){
     console.log("hola")
    var element = document.body;
    element.classList.toggle("darkmode");
var colordetexto = document.querySelectorAll('.colordetexto')
    
    for(let i = 0; i < colordetexto.length; i++){
        
        colordetexto[i].classList.toggle("textonoche")   
       
    }
})
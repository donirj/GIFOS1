
/*************************dark mode****************************/ 
const dark = document.querySelector('.dark')
 dark.addEventListener('click', function(){
    var element = document.body;
    element.classList.toggle("darkmode");
    var colordetexto = document.querySelectorAll('.colordetexto')
    var lighttrending = document.querySelector('.lighttrending')
    var lightbars = document.querySelector('.lightbars')
    

    lighttrending.classList.toggle("darktrending")
    lightbars.classList.toggle("darkbars")
    
    
   
    
    for(let i = 0; i < colordetexto.length; i++){
        
        colordetexto[i].classList.toggle("textonoche")   
       
    }

})


/*************************change nocturno/diurno****************************/ 
function changeText(idElement) {
    var element = document.getElementById('element' + idElement);
    if (idElement === 1 || idElement === 2) {
        if (element.innerHTML === 'Modo Diurno') element.innerHTML = 'Modo Nocturno';
        else {
            element.innerHTML = 'Modo Diurno';
        }
    }
}

/***********************Crear Gifos start*******************/ 
function myFunction(){
    var text1 = "<div class='acceso3' id='acceso2' >¿Nos das acceso a tu camara?</div>";
    var text2 = "<div class='acceso3' id='acceso'>El acceso a tu camara será valido sólo por el tiempo en el que estés creando el GIFO</div>";
    var text3 = text1 + text2;
    document.getElementById("acceso3").innerHTML
 
    = text3;


}

/*************************Key****************************/ 
const searchbox = document.querySelector('#search')

const APIKEY = "XPopyBNaDradpd7pMdSPbu2jJBntPNKW"
const ENDPOINT = {
    trending: '/trending', 
    search: '/search',    
    autocomplete: '/search/tags',
}


/*************************Trending****************************/ 
const trendingContainer = document.querySelector('#trending');

function get(endPoint, callback) {
    fetch('https://api.giphy.com/v1/gifs' + endPoint + '?api_key=' + APIKEY + '&limit=3')
        .then(dataType => dataType.json())
        .then(apiResponse => callback(apiResponse))
};

const getTrending = () => {
    get(ENDPOINT.trending, (apiReturn) => {
        const { data } = apiReturn;
        console.log('linea 27', data)
        console.log(data[5])

        data.forEach(gifItem => {
            const {
                title,
                username,
                images,
            } = gifItem

            const imagesUrl = images.original.url

            const template = `
        
        
                <img class="GIFSS" id="GIFSS" style="width: 100%; height: 100%; object-fit: cover;"  src=" ${imagesUrl}">
                <div class="cuadromorado">
            
                <div class="heart" onmouseover="setNewImage()" onmouseout="setOldImage()" ><img id="heart" src="/assets/scripts/icon-fav.svg" alt=""></div>
                <div class="save" onmouseover="setNewImage1()" 
                onmouseout="setOldImage1()"> <img  id="download1"  src="/assets/scripts/icon-download.svg" alt=""> </div>
                <div class="expandir" onmouseover="setNewImage2()" onmouseout="setOldImage2()"> <img id="exp1" src="/assets/scripts/icon-max-normal.svg" alt=""> </div>
                <p class="usar">${username}</p>
                <p class="titulogifo" id="titulogifo">${title}</p>
                
                </div>
                `
                ;

            const gifContainer = document.createElement('div');
            gifContainer.classList.add("gifContainer");
            gifContainer.innerHTML = template;
            trendingContainer.appendChild(gifContainer)

            const savebtn = document.createElement('div');
            savebtn.classList.add("savebtn");
            savebtn.innerHTML = template;


        });

        const hovergif = document.querySelectorAll('.GIFSS')
        const cuadromorado = document.querySelectorAll(".cuadromorado")

        for (let i = 0; i < 3; i++) {

            hovergif[i].addEventListener("mouseover", () => {
                cuadromorado[i].style.display = "flex";
                let heartbtn = document.querySelector('#heart')
                console.log("boton", heartbtn)
                heartbtn.addEventListener("click", () => {
                    console.log("heart")

                })
            })
            cuadromorado[i].addEventListener("mouseout", () => {
                cuadromorado[i].style.display = "none";
            })
        }


        //////hovers para botones (no los he hecho)////


    });
}

getTrending();


/*************************GIF****************************/ 

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search')
const resultsEl = document.getElementById('searchList')

searchForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const q = searchInput.value
  search(q)
})

function search(q) {
    const APIKEY = 'XPopyBNaDradpd7pMdSPbu2jJBntPNKW'
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&Q=${q}`;
        

    fetch(path).then(function (res) {
        return res.json()
    }).then(function (json) {
        console.log(json.data[0].images.fixed_width.url)

        let resultsHTML = ''

        json.data.forEach(function (obj) {
            console.log(obj)

            const url = obj.images.fixed_width.url
            const width = obj.images.fixed_width.width
            const height = obj.images.fixed_width.height
            const title = obj.title
            const username = obj.username

            resultsHTML += `
        
        <img class="item" src="${url}" width="${width}" height="${height}" alt="${title}"
        <div class="cuadromorado2">
       


        <div class="hovertitulo">
        <div class="heart2" onmouseover="setNewImage()" onmouseout="setOldImage()" ><img id="heart" src="/assets/scripts/icon-fav.svg" alt=""></div>
        <div class="save2" onmouseover="setNewImage1()" 
        onmouseout="setOldImage1()"> <img  id="download1"  src="/assets/scripts/icon-download.svg" alt=""> </div>
        <div class="expandir2" onmouseover="setNewImage2()" onmouseout="setOldImage2()"> <img id="exp1" src="/assets/scripts/icon-max-normal.svg" alt=""> </div>
        <p class="usar2">${username}</p>
        <p class="titulogifo2" id="titulogifo2">${title}</p>
        </div>
        `;


        
        });
        

        resultsEl.innerHTML = resultsHTML
    }).catch(function (err) {
        console.log(err.message)

    


    })
}


/***********************autocomplete*******************/ 


function getAuto(endPoint, callback){
    fetch('https://api.giphy.com/v1/gifs'+ endPoint + '?api_key=' + APIKEY + '&q=' + searchbox.value + '&limit=4')
    .then( dataType  => dataType.json())
    .then( apiResponse => callback(apiResponse))
    };
        
    const getAutocomplete  = () => {
        getAuto(ENDPOINT.autocomplete, (apiReturn) => {
            const {data} = apiReturn;
            console.log(data);
            console.log(data[2])  

        
            const searchInput = document.querySelector('.searchbox');
            const suggestionsPanel = document.querySelector('.suggestions');

            searchInput.addEventListener('keyup', function (){
            const input = searchInput.value;
            console.log(input)
            
            suggestionsPanel.innerHTML = '';


    data.forEach(function(suggested){
        const div = document.createElement('div');
        
        div.innerHTML = suggested.name;
        div.classList.add('complete');
        suggestionsPanel.appendChild(div);
        /*********************Adding Onclick******************/
        div.addEventListener('click', change => {
            const palabra = div.textContent
            search(palabra)

            while (suggestionsPanel.firstChild) {
                suggestionsPanel.removeChild(suggestionsPanel.firstChild);
            }
            
            searchInput.value = suggested.name
            dosearch()
        }) 
        
    }) 
    if (input === ''){
        suggestionsPanel.innerHTML = '';   
    }


})
             
})
}



searchbox.addEventListener('input', getAutocomplete)


/**********************search suggestion*******************************/ 


/*************************Menu responsive****************************/ 
function toggleClass(){
    let menu = document.querySelector(".mainMenu");
    menu.classList.toggle("toggleCls")

}

/*************************burger menu****************************/ 

var bur = document.getElementById('burger');

bur.addEventListener('click', function(bur){
    bur.target.classList.toggle('burger-on');
})

/*************************burger menu****************************/ 


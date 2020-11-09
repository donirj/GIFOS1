// SEARCH
class Giphy{
    constructor(keyword){
    this.keyword = keyword;
    this.endpoint = "http://api.giphy.com/v1/gifs";
    this.api_key = "sNj47myMsfDsWA0YBBrXUzI12ohFWqRj";
    this.endpoint2 ="api.giphy.com/v1/gifs/search/tags"
    
}



getGIFUrl(callback){
    var xhr = new XMLHttpRequest();

    xhr.open("GET",
    this.endpoint+"/translate?api_key="+this.api_key+"&s="+this.keyword
    );

     xhr.responseType = "json";  
  
     xhr.onload = function(){
        callback(this.response.data.images.original.mp4);
     }
     xhr.send();
}
 
    static getUrlAsync(keyword,callback){
        return new Giphy(keyword).getGIFUrl(callback);
    }
} 






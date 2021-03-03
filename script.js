let quoteData = [];
let quoteNum = 0;

let quoteCategory = [];

let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let currentCat = '';

function fil(obj){
    var newObj = {}
    for (i in obj['quotes']){
        //console.log(obj['quotes'][i].tag);
        if(obj['quotes'][i].tag === currentCat){
            return obj['quotes'][i].text;
        
            
        } 
    }
    
}





function selectQuote(arr, number){
    
    
    if(currentCat === ''){
        return arr['quotes'][number].text;
    }

    else if(arr['quotes'][number].tag === currentCat){
        return arr['quotes'][number].text;
    }
    
    else {
        return fil(quoteData);
        
        
        
    }


}

function selectAuthor(arr, number){
    
    return arr['quotes'][number].author;
}

//Get Quote from API
async function getQuote(){
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const api = 'https://goquotes-api.herokuapp.com/api/v1/random?count=100';
    
    

try {
    const response = await fetch(api);
    quoteData = await response.json();
    
   
    
    
    quoteNum = Math.floor(Math.random() * 100);
    quoteText.innerText = selectQuote(quoteData, quoteNum);
    authorText.innerText = selectAuthor(quoteData, quoteNum);
    

    
} catch (error) {
    console.log('Sorry did not get a quote ', error);
}


}


async function getTypes(){
    const type = 'https://goquotes-api.herokuapp.com/api/v1/all/tags';

    try {
        const response = await fetch(type);
        quoteData = await response.json();
        quoteCategory = (quoteData['tags']);
        displayCategories(quoteCategory);
        
        
    } catch (error) {
        console.log('Sorry did not get a quote ', error);
    }
    
}



function displayCategories(arr){
    for(i in quoteCategory){
        var test = document.createElement("li");
        test.classList.add('inactive-li');
        test.innerText = arr[i].name;
        catList.appendChild(test);
    }
}


function filterByCategory(){
    t = document.getElementById("category-list").childNodes;
    //t.classList.toggle('active-li');
    for(i = 1; i < t.length; i++){
        console.log(t[i]);
        t[i].classList.remove('active-li');
    }
    
    var target = event.target;
    currentCat = target.innerText;
    target.classList.toggle('active-li');
    
    console.log(target);
    
}





document.getElementById("category-list").addEventListener("click", filterByCategory);
let catList = document.getElementById('category-list');

function showCategories(){
    catList.classList.toggle('show-list');
}



getQuote();
getTypes();

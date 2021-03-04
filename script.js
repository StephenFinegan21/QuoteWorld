let quoteData = []; //Will hold list of all quotes
let quoteNum = 0;   //Number which will select the index the quote is located at
let quoteCategory = []; //To store the list of different categories
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let currentCategory = '';




//Get Quote from API
async function getQuote(){
    
    //API object that holds the Quote data
    const api = 'https://goquotes-api.herokuapp.com/api/v1/random?count=100';
    
    try {
    const response = await fetch(api);
    quoteData = await response.json(); //Wait until the data has been fully loaded before setting variables
    quoteNum = Math.floor(Math.random() * 100);// This number will be used to choose the random quote
    
    //Populates the data into our HTML elements for quote and author
    quoteText.innerText = selectQuote(quoteData, quoteNum);
    //authorText.innerText = selectAuthor(quoteData, quoteNum); //quoteData is entire list, quoteNum randomly chooses an index
    } catch (error) {
    console.log('Sorry did not get a quote ', error);
    }


}






/**
 * Async function which gets the category type of the quotes
 */

async function getTypes(){
    //API object that holds the category data
    const type = 'https://goquotes-api.herokuapp.com/api/v1/all/tags';

    try {
        const response = await fetch(type);
        quoteData = await response.json();
        
        
        quoteCategory = (quoteData['tags']); //Gets tthe list of different category tags
        displayCategories(quoteCategory);    //Passes data to a function which will display these   
        
        } catch (error) {
        console.log('Sorry did not get a quote ', error);
    }
    
}



/**
 * 
 * @param  quoteData our passed in data of all quotes/authors
 * @param  quoteNum  random number used to select quote at an index 
 */
function selectQuote(quoteData, quoteNum){
    console.log(quoteData['quotes'][quoteNum].text)
    //If a category has not been chosen, return the quote, no need to check against category
    if(currentCategory === ''){
        quoteData['quotes'][quoteNum].text;
        return quoteData['quotes'][quoteNum].text;
        
    }

    //if the chosen quotes tag matches the current category, retun the quote
    else if(quoteData['quotes'][quoteNum].tag === currentCategory){
        
        return quoteData['quotes'][quoteNum].text;
    }
    
    //Otherwise filter the data to only return a quote that matches the current category
    else {
        console.log(filterListData(quoteData))
        if(typeof filterListData(quoteData) != 'undefined'){
            return filterListData(quoteData);
        }
        else{
            getQuote();
        }
        
        
    }
}


/**
 * 
 * @param  quoteData our passed in data of all quotes/authors
 * @param  quoteNum  random number used to select quote/author
 */
function selectAuthor(quoteData, quoteNum){
    return quoteData['quotes'][quoteNum].author;
}








function filterListData(obj){
    var newObj = {}
    for (i in obj['quotes']){
        
        if(obj['quotes'][i].tag === currentCategory){
            authorText.innerText = selectAuthor(quoteData, i);
            return obj['quotes'][i].text;
        
            
        } 
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
        t[i].classList.remove('active-li');
    }
    
    var target = event.target;
    currentCategory = target.innerText;
    target.classList.toggle('active-li');
    
    
    
}





document.getElementById("category-list").addEventListener("click", filterByCategory);
let catList = document.getElementById('category-list');

function showCategories(){
    catList.classList.toggle('show-list');
}



//getQuote();
getTypes();

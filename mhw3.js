
const API_KEY = '76ba17ccdb439da7f6d049db05e9bf18';
const BIBLE_ID = '41f25b97f468e10b-01';


function onJson_book(json){
    console.log('JSON bibbia ricevuto');
    console.log(json);
    const library = document.querySelector("#bible-view");
    library.classList.remove('hidden');
    library.innerHTML='';
    const results = json.verses;
    const nascondi = document.querySelector('#nascondi');
    for(result of results){
        console.log(result + 'questo è un result');
        nascondi.classList.remove('hidden');
    }

    

    if(results.lenght == 0)
    {
        const errore = document.createElement("h1")
        const messaggio = document.createTextNode("mi spiace, capitolo non trovato");
        errore.appendChild(messaggio);
        library.appendChild(errore);
    }
    for(result of results){
        const versi = result.text;
        const cap = document.createElement('div');
        cap.classList.add('capitolo');
        const testo = document.createElement('p');
        testo.textContent = versi;
        cap.appendChild(testo);
        library.appendChild(cap);
    }

    

}

function onResponse(response){
    console.log('risposta ricevuta');
    return response.json();
}



function search (event)
{
    event.preventDefault();
    window.scrollTo(0,585);
    const content_input_a = document.querySelector("#content-bible").value;
    const content_value_a = encodeURIComponent(content_input_a);
    const tipo = document.querySelector("#type").value;
    console.log("il tipo selezionato è: " + tipo);
    
      fetch('https://www.abibliadigital.com.br/api/verses/' + 'nvi/' + tipo + '/' + content_value_a )
      .then(onResponse).then(onJson_book);
      
}


function onClick(event){
    event.preventDefault();
    const nascondi = document.querySelector("#bible-view");
    nascondi.classList.add('hidden');
    const tasto = document.querySelector("#nascondi");
    tasto.classList.add('hidden');
    window.scrollTo({top:200});
}

function Bible_click(event){
    event.preventDefault();
    const tipo = document.querySelector('#bibbia');
    tipo.classList.remove('hidden');
}

function onJson_search(json){
    console.log('JSON search ricevuto');
    console.log(json);
    const library = document.querySelector("#search-view");
    library.classList.remove('hidden');
    library.innerHTML='';
    const results = json.verses;
    for(result of results){
        console.log(result + 'questo è un result del search');
    }
    if(results.lenght == 0)
    {
        const errore = document.createElement("h1")
        const messaggio = document.createTextNode("mi spiace, capitolo non trovato");
        errore.appendChild(messaggio);
        library.appendChild(errore);
    }
    for(result of results){
        const versi = result.text;
        const cap = document.createElement('div');
        cap.classList.add('capitolo');
        const testo = document.createElement('p');
        testo.textContent = versi;
        cap.appendChild(testo);
        library.appendChild(cap);
    }
}

function search_word(event){
    event.preventDefault();
    const content_input = document.querySelector("#content").value;
    const content_value= encodeURIComponent(content_input);

    fetch('https://api.scripture.api.bible/v1/bibles/41f25b97f468e10b-01/search?'+ 'api-key=' + API_KEY + 'query=' + content_value + '&sort=relevance')
    .then(onResponse).then(onJson_search);
}



const form = document.querySelector("#bible-content");
form.addEventListener("submit", search);

const form_search = document.querySelector('#search-content');
form_search.addEventListener("submit", search_word);

const bible = document.querySelector("#bible");
bible.addEventListener("click", Bible_click);

const nascondi = document.querySelector("#nascondi")
nascondi.addEventListener("click", onClick);


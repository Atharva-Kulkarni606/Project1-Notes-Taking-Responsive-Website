let btn = document.getElementById('btn1');
showNote();
btn.addEventListener('click', AddNote);


function AddNote() {
    let inputText = document.getElementById('note1');
    let inputTitle=document.getElementById('title-ip');
    notes = localStorage.getItem('notes');

    let inputObj={
        title: inputTitle.value,
        text :inputText.value
    }
    if (notes == null) {
        ArrayObj = []
    }else{
        ArrayObj = JSON.parse(notes);
    }
    let blankIndex= ArrayObj.indexOf("");
    if(ArrayObj.length >= 1 || inputObj.title != "" && inputObj.text != ""){
        ArrayObj.push(inputObj);
    }
    if(ArrayObj.includes("")){
        ArrayObj.splice(blankIndex,1);
    }
    localStorage.setItem('notes', JSON.stringify(ArrayObj));
    inputText.value = null;
    inputTitle.value=null;
    showNote();
}

//Reads data from Local Storage and displays it 
function showNote() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        ArrayObj = [];
    } else {
        ArrayObj = JSON.parse(notes);
    }
    let string1 = "";
    ArrayObj.forEach(function (element, index) {
        string1 += `
        <div class="n-note">
        <h2 class="n-note-heading">${element.title}</h2>
        <p class="n-para">${element.text}</p>
        <button id="${index}" onclick="deleteNode(this.id)" class="n-btn">Delete Node</button>
    </div>
        `
    });

    let Text = document.getElementById('Note');
    if (ArrayObj.length != 0) {
        Text.innerHTML = string1;
    }else{
        Text.innerHTML=`<h2>Nothing to show.Use Above Section To Add Notes.</h2>`
    }

}


//Function That will delete the node
function deleteNode(index){
    notes = localStorage.getItem('notes');
    if (notes == null) {
        ArrayObj = []
    } else {
        ArrayObj = JSON.parse(notes);
    }
   ArrayObj.splice(index,1);
   localStorage.setItem('notes',JSON.stringify(ArrayObj));
   showNote();
}

let searchText= document.getElementById('s-input');
searchText.addEventListener('input',function(){
let variable1=searchText.value.toLowerCase();
let noteCollection= document.getElementsByClassName('n-note');
Array.from(noteCollection).forEach(function(element){
    let variable2= element.getElementsByTagName('p')[0].innerText;
    if(variable2.includes(variable1)){
        element.style.display="block";
    }else{
        element.style.display="none";
    }
});
});


//To clear the  text on the search bar when one clicks on it
let searchbtn=document.getElementById('search-btn');
searchbtn.addEventListener('click',function(){
    let textInSearchBar= document.getElementById('s-input');
    textInSearchBar.value=null;
})

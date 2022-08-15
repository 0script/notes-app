const addbtn=document.getElementById('add');
const reloadbtn=document.getElementById('reload');

reloadTab();

addbtn.addEventListener('click',()=>addNewNote());
reloadbtn.addEventListener('click',()=>reloadTab());

function addNewNote(text=''){

    const note=document.createElement('div');

    note.classList.add('note');
    note.innerHTML=`
    <div class="tools">
				
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
        <button class="close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <div class="main ${text?'':'hidden'}"></div>
    <textarea class="${text?'hidden':''}"></textarea>
    `;

    const editbtn=note.querySelector('.edit');
    const deletebtn=note.querySelector('.delete');
    const closebtn=note.querySelector('.close');
    const main=note.querySelector('.main');
    const textarea_=note.querySelector('textarea');
    
    textarea_.value=text;
    main.innerHTML=marked.parse(text);

    deletebtn.addEventListener('click',()=>{

        let confirmation=confirm(`Do you want to delete the text "${textarea_.value}" ?`);

        if(confirmation){
            let text=getlocalstorage();
            text.splice(text.indexOf(textarea_.value),1);
            textarea_.value='';
            main.innerHTML='';
            localStorage.setItem('notes',JSON.stringify(text));
        }
        
    });

    editbtn.addEventListener('click',()=>{

        main.classList.toggle('hidden');
        textarea_.classList.toggle('hidden');
    });

    closebtn.addEventListener('click',()=>{

        note.remove();
    });

    textarea_.addEventListener('input',(e)=>{

        const {value}=e.currentTarget;//get value attribute from the element

        main.innerHTML=marked.parse(value);
        updatelocalstorage();
    });

    document.body.appendChild(note);

}

function reloadTab(){
    let notes=JSON.parse(localStorage.getItem('notes'));
    let tabs=document.querySelectorAll('.note');
    
    if(tabs){
        tabs.forEach(tab => {
            console.log(`removing ${tab}`);
            tab.remove();
            
        });
    }

    if(notes){
        notes.forEach(note => addNewNote(note));
    }
}

function updatelocalstorage(){
    
    const notestext=document.querySelectorAll('textarea');
    const notes=[];
    
    notestext.forEach(note => notes.push(note.value));
    
    localStorage.setItem('notes',JSON.stringify(notes));
    
}

function getlocalstorage(){
    return JSON.parse(localStorage.getItem('notes'));
}
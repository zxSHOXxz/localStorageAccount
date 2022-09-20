let inputs = document.querySelectorAll(".modal-body form input");
let archiveCardBtn = document.querySelectorAll("button.archive");
let removeCardBtn = document.querySelectorAll("button.remove");
let cardParent = document.querySelector(".cards");
let btn = document.querySelector(".modal-footer button")
let job = document.querySelector(".jopb")
// let svChng = document.querySelector(".sv_chng")
let memebership = document.querySelector(".memebershipp")
let img_input = document.querySelector(".modal-body #imgForm");
let modalBody = document.querySelector(".archive_modal .modal-body");
let offCanvasBody = document.querySelector(".trash__offcanvas");
let trash_RemoveBtn = document.querySelectorAll(".offcanvas button.remove");
let archive_ArchiveBtn = document.querySelectorAll(".offcanvas button.archive");
let trash_ArchiveBtn = document.querySelectorAll(".trash__offcanvas button.archive");
let archive_RemoveBtn = document.querySelectorAll(".archive_modal button.remove");
let img_uploded = ""

console.log(img_input);
console.log(img_input.value);
img_input.addEventListener("change" ,function(){
    let reader = new FileReader();
    reader.addEventListener("load", ()=>{img_uploded = reader.result})
    reader.readAsDataURL(this.files[0])
})
btn.addEventListener("click", _ =>{
    cardParent.innerHTML += `
                <div class="d-flex flex-wrap py-5 gap-2 card-parent cardsss col">
                <div class="card text-bg-primary my-5 two">
                    <div class="card-header d-flex align-items-center justify-content-center">
                        <img src="${img_uploded}" alt="img" class="img-fluid w-25 rounded-circle">
                        <div class="namess d-flex flex-column text-center mx-auto">
                            <p class="username fs-5">${inputs[0].value}</p>
                            <p class="text-warning fs-5 cups">${memebership.value}</p>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-danger mt-1 mb-3">${job.value}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk
                            of the
                            card's content.</p>
                        <div class="control__card__button d-flex justify-content-between align-items-center gap-2">
                            <button type="button" class="btn btn-success flex-grow-1 archive" >Archive</button>
                            <button type="button" class="btn btn-danger flex-grow-1 remove" >Remove</button>
                        </div>
                    </div>
                </div>
                </div>
    `
    archiveCardBtn = document.querySelectorAll("button.archive");
    removeCardBtn = document.querySelectorAll(".control__card__button button.remove");
    ref()
    inputs.forEach(element => {
        element.value = ""
    });
    job.value = "defult";
    memebership.value = "defult";
    
})
ref()

function ref() {
    archiveCardBtn.forEach(element => {
        element.addEventListener("click", e=>{
            const cardpParent = e.target.closest(".card-parent");
            modalBody.appendChild(cardpParent.cloneNode(true));   
            archive_ArchiveBtn = document.querySelectorAll(".archive_modal button.archive");
            archive_RemoveBtn = document.querySelectorAll(".archive_modal button.remove");            
            archive_RemoveBtn.forEach(e=>{
                e.onclick = _ =>{    
                    e.closest(".card-parent").classList.add("d-none")
                    offCanvasBody.appendChild(cardpParent.cloneNode(true));
                    trash_RemoveBtn = document.querySelectorAll(".offcanvas button.remove");
                    trash_ArchiveBtn = document.querySelectorAll(".trash__offcanvas button.archive");
                    trash_RemoveBtn.forEach(e=>{
                        e.onclick = _ =>{    
                            cardpParent.classList.remove("d-none");
                            e.closest(".card-parent").classList.add("d-none")
                        }
                        addToArchiveFromTrask()
                    })
                }
            })
            archive_ArchiveBtn.forEach(e=>{
                e.classList.add("d-none")
            })
        })
    });    
    removeCardBtn.forEach(element => {
        element.addEventListener("click", e=>{
            const cardpParent = e.target.closest(".card-parent");
            offCanvasBody.appendChild(cardpParent.cloneNode(true));
            trash_RemoveBtn = document.querySelectorAll(".offcanvas button.remove");
            cardpParent.classList.add("d-none");
            trash_RemoveBtn.forEach(e=>{
                e.onclick = _ =>{    
                    cardpParent.classList.remove("d-none");
                    e.closest(".card-parent").classList.add("d-none")
                }
            })
        })
    });
    
}


function addToArchiveFromTrask() {
    trash_ArchiveBtn.forEach(element => {
    element.addEventListener("click", _ =>{
        const cardpParent = element.closest(".card-parent");
        modalBody.appendChild(cardpParent.cloneNode(true));
        cardpParent.parentNode.removeChild(cardpParent);
        
    }) 
    });
}
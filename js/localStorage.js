let inputs = document.querySelectorAll(".add__form .modal-body form input");
let inputsEdit = document.querySelectorAll(".edit .modal-body form input");
let cardParent = document.querySelector(".hero .cards");
let btn = document.querySelector("#modal .modal-footer button");
var btnEdit = document.querySelector("#edit .modal-footer button");
let job = document.querySelector(".add__form .jopb");
let jobEdit = document.querySelector(".edit .jopb");
let memebership = document.querySelector(".add__form .memebershipp");
let memebershipEdit = document.querySelector(".edit .memebershipp");
let img_input = document.querySelector(".add__form .modal-body #imgForm");
let img_inputEdit = document.querySelector(".edit .modal-body #imgForm");
let modalBody = document.querySelector(".archive_modal .modal-body");
let offCanvasBody = document.querySelector(".trash__offcanvas");
let archive_ArchiveBtn = document.querySelectorAll(".offcanvas button.archive");
let trash_ArchiveBtn = document.querySelectorAll(".trash__offcanvas button.archive");
let archive_RemoveBtn = document.querySelectorAll(".archive_modal button.remove");
let img_uploded = "";
let img_uplodedEdit = "";
let trash_RemoveBtn;
let arrayOfCards = [];
let arrayOfCardsOfTrash = [];
let arrayOfCardsOfArchive = [];

if (localStorage.getItem("card")) {
    arrayOfCards = JSON.parse(localStorage.getItem("card"));
}
if (localStorage.getItem("trash")) {
    arrayOfCardsOfTrash = JSON.parse(localStorage.getItem("trash"));
}
if (localStorage.getItem("archive")) {
    arrayOfCardsOfArchive = JSON.parse(localStorage.getItem("archive"));
}
getDataFromLocalStorage();
getDataFromLocalStorageTrash();
getDataFromLocalStorageArchive();
img_input.addEventListener("change", function () {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        img_uploded = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});
img_inputEdit.addEventListener("change", function () {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        img_uplodedEdit = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});
btn.addEventListener("click", (_) => {
    for (let i = 0; i < arrayOfCards.length; i++) {
        if (arrayOfCards[i].name.toLowerCase() == (inputs[0].value + " " + inputs[1].value).toLowerCase() ||
            arrayOfCards[i].name.toLowerCase() == (inputs[1].value + " " + inputs[0].value).toLowerCase()) {
            return
        }
    }
    addCardToArray(
        img_uploded,
        inputs[0].value + " " + inputs[1].value,
        memebership.value,
        job.value
    );
});

function addCardToArray(imgSrc, userNameFun, memeberShipFun, jobFun) {
    // card Data
    const card = {
        id: Date.now(),
        img: imgSrc,
        name: userNameFun,
        memebership: memeberShipFun,
        job: jobFun,
    };
    // Push card To Array Of card
    arrayOfCards.push(card);
    // Add card To Page
    addElementsToPageFrom(arrayOfCards);
    // Add card To Local Storage
    addDataToLocalStorageFrom(arrayOfCards);
}

function creatCardTrash(card) {
    // Creat Card
    let div = document.createElement("div");
    div.setAttribute("data-id", card.id);
    div.setAttribute(
        "class",
        "d-flex flex-wrap py-5 gap-2 card-parent cardsss col"
    );
    let divTow = document.createElement("div");
    divTow.setAttribute("class", "card text-bg-primary my-5 two");
    let divThree = document.createElement("div");
    divThree.setAttribute(
        "class",
        "card-header d-flex align-items-center justify-content-center"
    );
    let divFour = document.createElement("div");
    divFour.setAttribute(
        "class",
        "namess d-flex flex-column text-center mx-auto"
    );
    let divFourPone = document.createElement("p");
    divFourPone.setAttribute("class", "username fs-5");
    divFourPone.innerText = card.name;
    let divFourPtow = document.createElement("p");
    divFourPtow.setAttribute("class", "text-warning fs-5 cups");
    divFourPtow.innerText = card.memebership;
    let imgD = document.createElement("img");
    imgD.setAttribute("class", "img-fluid w-25 rounded-circle");
    imgD.src = `${card.img}`;
    divThree.appendChild(imgD);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardBodyH5 = document.createElement("h5");
    cardBodyH5.setAttribute("class", "card-title text-danger mt-1 mb-3");
    cardBodyH5.innerText = card.job;
    let cardBodyP = document.createElement("p");
    cardBodyP.setAttribute("class", "card-text");
    cardBodyP.innerText =
        "Some quick example text to build on the card title and make up the bulk of the card's content.";
    let divBtnOfBodyCreatedCard = document.createElement("div");
    divBtnOfBodyCreatedCard.setAttribute(
        "class",
        "control__card__button d-flex justify-content-between align-items-center gap-2"
    );
    let buttonTowOfBodyCreatedCard = document.createElement("button");
    buttonTowOfBodyCreatedCard.setAttribute(
        "class",
        "btn btn-danger flex-grow-1 remove"
    );
    buttonTowOfBodyCreatedCard.innerText = "Remove";
    let returnToPageFromTrash = document.createElement("button");
    returnToPageFromTrash.setAttribute(
        "class",
        "btn btn-success  flex-grow-1 return remove"
    );
    returnToPageFromTrash.innerText = "Return";
    // Append Child To Page
    offCanvasBody.appendChild(div);
    div.appendChild(divTow);
    divTow.appendChild(divThree);
    divThree.appendChild(divFour);
    divFour.appendChild(divFourPone);
    divFour.appendChild(divFourPtow);
    divTow.appendChild(cardBody);
    cardBody.appendChild(cardBodyH5);
    cardBody.appendChild(cardBodyP);
    cardBody.appendChild(divBtnOfBodyCreatedCard);
    divBtnOfBodyCreatedCard.appendChild(buttonTowOfBodyCreatedCard);
    divBtnOfBodyCreatedCard.appendChild(returnToPageFromTrash);

    // Inputs Form Empty
    // img_input.value = null
    // inputs[0].value = ""
    // inputs[1].value = ""
    // memebership.value = "defult"
    // job.value = "defult"
    returnFromTrash();
    removeFromTrash();
}

function createCardArchive(card) {
    let div = document.createElement("div");
    div.setAttribute("data-id", card.cardID);
    div.setAttribute(
        "class",
        "d-flex flex-wrap py-5 gap-2 card-parent cardsss col"
    );
    let divTow = document.createElement("div");
    divTow.setAttribute("class", "card text-bg-primary my-5 two");
    let divThree = document.createElement("div");
    divThree.setAttribute(
        "class",
        "card-header d-flex align-items-center justify-content-center"
    );
    let divFour = document.createElement("div");
    divFour.setAttribute(
        "class",
        "namess d-flex flex-column text-center mx-auto"
    );
    let divFourPone = document.createElement("p");
    divFourPone.setAttribute("class", "username fs-5");
    divFourPone.innerText = card.cardName;
    let divFourPtow = document.createElement("p");
    divFourPtow.setAttribute("class", "text-warning fs-5 cups");
    divFourPtow.innerText = card.cardMemmperShip;
    let imgD = document.createElement("img");
    imgD.setAttribute("class", "img-fluid w-25 rounded-circle");
    imgD.src = `${card.cardImg}`;
    divThree.appendChild(imgD);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardBodyH5 = document.createElement("h5");
    cardBodyH5.setAttribute("class", "card-title text-danger mt-1 mb-3");
    cardBodyH5.innerText = card.cardJob;
    let cardBodyP = document.createElement("p");
    cardBodyP.setAttribute("class", "card-text");
    cardBodyP.innerText =
        "Some quick example text to build on the card title and make up the bulk of the card's content.";
    let divBtnOfBodyCreatedCard = document.createElement("div")
    divBtnOfBodyCreatedCard.setAttribute("class", "control__card__button d-flex justify-content-between align-items-center gap-2")
    let buttonOneOfBodyCreatedCard = document.createElement("button")
    buttonOneOfBodyCreatedCard.setAttribute("class", "btn btn-success flex-grow-1 return")
    buttonOneOfBodyCreatedCard.innerText = "Return"
    modalBody.appendChild(div);
    div.appendChild(divTow);
    divTow.appendChild(divThree);
    divThree.appendChild(divFour);
    divFour.appendChild(divFourPone);
    divFour.appendChild(divFourPtow);
    divTow.appendChild(cardBody);
    cardBody.appendChild(cardBodyH5);
    cardBody.appendChild(cardBodyP);
    cardBody.appendChild(divBtnOfBodyCreatedCard)
    divBtnOfBodyCreatedCard.appendChild(buttonOneOfBodyCreatedCard)
}

function creatCard(card) {
    // Creat Card
    let div = document.createElement("div");
    div.setAttribute("data-id", card.id);
    div.setAttribute(
        "class",
        "d-flex flex-wrap py-5 gap-2 card-parent cardsss col"
    );
    let divTow = document.createElement("div");
    divTow.setAttribute("class", "card text-bg-primary my-5 two");
    let divThree = document.createElement("div");
    divThree.setAttribute(
        "class",
        "card-header d-flex align-items-center justify-content-center"
    );
    let divFour = document.createElement("div");
    divFour.setAttribute(
        "class",
        "namess d-flex flex-column text-center mx-auto"
    );
    let divFourPone = document.createElement("p");
    divFourPone.setAttribute("class", "username fs-5");
    divFourPone.innerText = card.name;
    let divFourPtow = document.createElement("p");
    divFourPtow.setAttribute("class", "text-warning fs-5 cups");
    divFourPtow.innerText = card.memebership;
    let imgD = document.createElement("img");
    imgD.setAttribute("class", "img-fluid w-25 rounded-circle");
    imgD.src = `${card.img}`;
    divThree.appendChild(imgD);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardBodyH5 = document.createElement("h5");
    cardBodyH5.setAttribute("class", "card-title text-danger mt-1 mb-3");
    cardBodyH5.innerText = card.job;
    let cardBodyP = document.createElement("p");
    cardBodyP.setAttribute("class", "card-text");
    cardBodyP.innerText =
        "Some quick example text to build on the card title and make up the bulk of the card's content.";
    let divBtnOfBodyCreatedCard = document.createElement("div");
    divBtnOfBodyCreatedCard.setAttribute(
        "class",
        "control__card__button row row-cols-3 d-flex justify-content-between align-items-center gap-2"
    );
    let buttonOneOfBodyCreatedCard = document.createElement("button");
    let buttonTowOfBodyCreatedCard = document.createElement("button");
    let buttonThreeOfBodyCreatedCard = document.createElement("button");
    buttonOneOfBodyCreatedCard.setAttribute(
        "class",
        "btn btn-success col flex-grow-1 archive"
    );
    buttonOneOfBodyCreatedCard.innerText = "Archive";
    buttonTowOfBodyCreatedCard.setAttribute(
        "class",
        "btn btn-danger col flex-grow-1 remove"
    );
    buttonTowOfBodyCreatedCard.innerText = "Remove";
    buttonThreeOfBodyCreatedCard.setAttribute(
        "class",
        "btn btn-info col flex-grow-1 edit"
    );
    buttonThreeOfBodyCreatedCard.setAttribute(
        "data-bs-target",
        "#edit"
    );
    buttonThreeOfBodyCreatedCard.setAttribute(
        "data-id",
        `${card.id}`
    );
    buttonThreeOfBodyCreatedCard.setAttribute(
        "data-bs-toggle",
        "modal"
    );
    buttonThreeOfBodyCreatedCard.innerText = "Edit";

    buttonThreeOfBodyCreatedCard.addEventListener("click", _ => {
        console.log("element click");
        let name = card.name.split(" ")
        inputsEdit[0].value = name[0]
        inputsEdit[1].value = name[1]
        memebershipEdit.value = card.memebership
        jobEdit.value = card.job
        img_uplodedEdit = card.img
        btnEdit.setAttribute("card-id", buttonThreeOfBodyCreatedCard.getAttribute("data-id"))
    });



    // Append Child To Page
    cardParent.appendChild(div);
    div.appendChild(divTow);
    divTow.appendChild(divThree);
    divThree.appendChild(divFour);
    divFour.appendChild(divFourPone);
    divFour.appendChild(divFourPtow);
    divTow.appendChild(cardBody);
    cardBody.appendChild(cardBodyH5);
    cardBody.appendChild(cardBodyP);
    cardBody.appendChild(divBtnOfBodyCreatedCard);
    divBtnOfBodyCreatedCard.appendChild(buttonOneOfBodyCreatedCard);
    divBtnOfBodyCreatedCard.appendChild(buttonTowOfBodyCreatedCard);
    divBtnOfBodyCreatedCard.appendChild(buttonThreeOfBodyCreatedCard);
    // Inputs Form Empty
}

function addElementsToPageFrom(arrayOfCards) {
    // Empty Tasks Div
    cardParent.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfCards.forEach((card) => {
        creatCard(card);
    });
    let thisId;
    let thisImg;
    let thisName;
    let thisMemmperShip;
    let thisJob;
    reomveCardBtn();
    addToArchive();
    // edit()

}

function addDataToLocalStorageFrom(arrayOfCards) {
    window.localStorage.setItem("card", JSON.stringify(arrayOfCards));
}

function addDataToLocalStorageFromTrash(arrayOfCardsOfTrash) {
    window.localStorage.setItem("trash", JSON.stringify(arrayOfCardsOfTrash));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("card");
    if (data) {
        let cards = JSON.parse(data);
        addElementsToPageFrom(cards);
    }
}

function getDataFromLocalStorageTrash() {
    let data = window.localStorage.getItem("trash");
    if (data) {
        let trash = JSON.parse(data);
        addElementsToPageFromTrash(trash);
    }
}

function getDataFromLocalStorageArchive() {
    let data = window.localStorage.getItem("archive");
    if (data) {
        let archive = JSON.parse(data);
        addElementsToPageFromArchive(archive);
    }
}

function addElementsToPageFromTrash(arrayOfCardsOfTrash) {
    arrayOfCardsOfTrash.forEach((trashCard) => {
        creatCardTrash(trashCard);
    });
    removeFromTrash();
}

function addDataToLocalStorageFromArchive(arrayOfCardsOfArchive) {
    localStorage.setItem("archive", JSON.stringify(arrayOfCardsOfArchive));
}

function addElementsToPageFromArchive(arrayOfCardsOfArchive) {
    arrayOfCardsOfArchive.forEach((thisDataArchiveCard) => {
        createCardArchive(thisDataArchiveCard);
    });
    returnFromArchive()
}

function reomveCardBtn() {
    let removeCardBtn = document.querySelectorAll(".hero button.remove");
    removeCardBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
            let cardParentRemove = e.target.closest(".card-parent");
            let dataIdCardParent = cardParentRemove.dataset.id;
            let data = localStorage.getItem("card");
            let parsData = JSON.parse(data);
            parsData.forEach((element) => {
                if (element.id == dataIdCardParent) {
                    thisId = element.id;
                    thisImg = element.img;
                    thisName = element.name;
                    thisMemmperShip = element.memebership;
                    thisJob = element.job;
                }
            });
            let trashCard = {
                id: thisId,
                img: thisImg,
                name: thisName,
                memebership: thisMemmperShip,
                job: thisJob,
            };
            arrayOfCardsOfTrash.push(trashCard);
            addDataToLocalStorageFromTrash(arrayOfCardsOfTrash);
            arrayOfCards = arrayOfCards.filter((card) => card.id != thisId);
            addDataToLocalStorageFrom(arrayOfCards);
            cardParentRemove.parentNode.removeChild(cardParentRemove);
            creatCardTrash(trashCard);
        });
    });
}

function removeFromTrash() {
    trash_RemoveBtn = document.querySelectorAll(".offcanvas button.remove");
    trash_RemoveBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
            let cardParentTrash = e.target.closest(".card-parent");
            let cardRemovedFromTrashId = cardParentTrash.dataset.id;
            let data = localStorage.getItem("trash");
            let parsData = JSON.parse(data);
            let thisId;
            parsData.forEach((element) => {
                if (element.id == cardRemovedFromTrashId) {
                    thisId = cardRemovedFromTrashId;
                }
            });
            arrayOfCardsOfTrash = arrayOfCardsOfTrash.filter((e) => e.id != thisId);
            addDataToLocalStorageFromTrash(arrayOfCardsOfTrash);
            cardParentTrash.parentNode.removeChild(cardParentTrash);
        });
    });
}

function returnFromTrash() {
    let returnFromTrashBtn = document.querySelectorAll(
        ".offcanvas button.return"
    );
    returnFromTrashBtn.forEach((element) => {
        element.addEventListener("click", (_) => {
            returnedCradParent = element.closest(".card-parent");
            let returnId = returnedCradParent.dataset.id;
            let returnIMG;
            let returnName;
            let returnMemmpership;
            let returnJob;
            let dataTrash = JSON.parse(localStorage.getItem("trash"));
            console.log(dataTrash);
            dataTrash.forEach((element) => {
                if (element.id == returnId) {
                    returnId = element.id;
                    returnIMG = element.img;
                    returnName = element.name;
                    returnMemmpership = element.memebership;
                    returnJob = element.job;
                }
                let returnCard = {
                    id: returnId,
                    img: returnIMG,
                    name: returnName,
                    memebership: returnMemmpership,
                    job: returnJob,
                }
                arrayOfCards.push(returnCard)
            });
            addDataToLocalStorageFrom(arrayOfCards)
            addElementsToPageFrom(arrayOfCards);
        });
    });
}

function returnFromArchive() {
    let returnFromTrashBtn = document.querySelectorAll(".archive_modal button.return");
    returnFromTrashBtn.forEach((element) => {
        element.addEventListener("click", (_) => {
            returnedCradParent = element.closest(".card-parent");
            let returnId = returnedCradParent.dataset.id;
            let returnIMG;
            let returnName;
            let returnMemmpership;
            let returnJob;
            let dataTrash = JSON.parse(localStorage.getItem("archive"));
            dataTrash.forEach((element) => {
                if (element.cardID == returnId) {
                    returnId = element.cardID;
                    returnIMG = element.cardImg;
                    returnName = element.cardName;
                    returnMemmpership = element.cardMemmperShip;
                    returnJob = element.cardJob;
                }
            });
            let returnCard = {
                id: returnId,
                img: returnIMG,
                name: returnName,
                memebership: returnMemmpership,
                job: returnJob,
            }
            arrayOfCards.push(returnCard)
            addDataToLocalStorageFrom(arrayOfCards)
            addElementsToPageFrom(arrayOfCards);
            arrayOfCardsOfArchive = arrayOfCardsOfArchive.filter((e) => e.cardID != returnId);
            addDataToLocalStorageFromArchive(arrayOfCardsOfArchive);
            returnedCradParent.parentNode.removeChild(returnedCradParent);
        });
    });
}

function addToArchive() {
    let archiveCardBtn = document.querySelectorAll(".hero button.archive");
    archiveCardBtn.forEach((element) => {
        element.addEventListener("click", (e) => {
            let cardParentToArchive = e.target.closest(".card-parent");
            let cardParentToArchiveId = cardParentToArchive.dataset.id;
            let data = JSON.parse(localStorage.card);
            let thisDataArchiveCard;
            data.forEach((e) => {
                if (e.id == cardParentToArchiveId) {
                    thisDataArchiveCard = {
                        cardID: e.id,
                        cardImg: e.img,
                        cardName: e.name,
                        cardMemmperShip: e.memebership,
                        cardJob: e.job,
                    };
                }
            });
            arrayOfCardsOfArchive.push(thisDataArchiveCard);
            addDataToLocalStorageFromArchive(arrayOfCardsOfArchive);
            modalBody.innerHTML = "";
            addElementsToPageFromArchive(arrayOfCardsOfArchive);
            arrayOfCards = arrayOfCards.filter((card) => card.id != cardParentToArchiveId);
            addDataToLocalStorageFrom(arrayOfCards);
            cardParentToArchive.parentNode.removeChild(cardParentToArchive);

        });
    });
}


function saveChanges() {
    let element = document.querySelector(`.card-parent[data-id="${btnEdit.getAttribute("card-id")}"]`);
    for (let i = 0; i < arrayOfCards.length; i++) {
        if (arrayOfCards[i].name.toLowerCase() == (inputsEdit[0].value + " " + inputsEdit[1].value).toLowerCase() ||
            arrayOfCards[i].name.toLowerCase() == (inputsEdit[1].value + " " + inputsEdit[0].value).toLowerCase()) {
            window.alert("Enter Primary Value")
            return false;
        }
    }
    let cardNeedEdit = element.closest(".card-parent")
    let cardNeedEditId = cardNeedEdit.dataset.id;
    let data = JSON.parse(localStorage.getItem("card"));
    arrayOfCards = [...data]
    let clonedData = data.filter((e) => e.id == cardNeedEditId);
    cardNeedEdit.querySelector(".username").textContent = clonedData.name = inputsEdit[0].value + " " + inputsEdit[1].value;
    cardNeedEdit.querySelector(".cups").textContent = clonedData.memebership = memebershipEdit.value;
    cardNeedEdit.querySelector(".card-title").textContent = clonedData.job = jobEdit.value;
    cardNeedEdit.querySelector("img").src = clonedData.img = img_uplodedEdit;
    data.forEach(element => {
        if (element.id == cardNeedEditId) {
            element.name = clonedData.name
            element.memebership = clonedData.memebership
            element.job = clonedData.job
            element.img = clonedData.img
        }
    });
    localStorage.setItem("card", JSON.stringify(data))

}

btnEdit.addEventListener("click", _ => {
    saveChanges()
});

let web = document.querySelector(".web")
let desktop = document.querySelector(".desktop")
let mobile = document.querySelector(".mobile")

web.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.job != "web")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });

})
desktop.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.job != "desktop")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });
})
mobile.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.job != "mobile")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });
})

let bronze = document.querySelector(".bronze")
let platinum = document.querySelector(".platinum")
let gold = document.querySelector(".gold")

bronze.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.memebership != "bronze")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });

})
platinum.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.memebership != "platinum")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });

})
gold.addEventListener("click", _ => {
    let inn = arrayOfCards
    inn.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.remove("d-none")
    });
    let out = arrayOfCards.filter(element => element.memebership != "gold")
    out.forEach(e => {
        let element = document.querySelector(`.card-parent[data-id="${e.id}"]`);
        element.classList.add("d-none")
    });
})


let lastCreate = document.querySelector(".lastCreate")
let firstCreate = document.querySelector(".firstCreate")
let arrayOfCardsId = []
let sortedArrayCardsArrey = []
let cardParentBody = document.querySelector(".hero .cards")
lastCreate.addEventListener("click", _ => {
    arrayOfCards.forEach(element => {
        arrayOfCardsId.push(element.id)
    });
    sortedArrayCardsArrey = arrayOfCardsId.sort().reverse()
    console.log(sortedArrayCardsArrey);
    let bodyCards = Array.from(cardParentBody.children)
    console.log(bodyCards);
    bodyCards.forEach(element => {
        const idB = element.dataset.id
        element.setAttribute("style", `order : ${sortedArrayCardsArrey.indexOf(parseInt(idB))}`)
    });
})
firstCreate.addEventListener("click", _ => {
    arrayOfCards.forEach(element => {
        arrayOfCardsId.push(element.id)
    });
    sortedArrayCardsArrey = arrayOfCardsId.sort()
    console.log(sortedArrayCardsArrey);
    let bodyCards = Array.from(cardParentBody.children)
    console.log(bodyCards);
    bodyCards.forEach(element => {
        const idB = element.dataset.id
        element.setAttribute("style", `order : ${sortedArrayCardsArrey.indexOf(parseInt(idB))}`)
    });
})




// window.location.reload()
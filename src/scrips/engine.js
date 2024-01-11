const states = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprints:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides:{
        player1:"player-cards",
        computerBOX: document.getElementById("player-cards"),
        computer: "computer-cards",
        player1BOX: document.getElementById("computer-cards"),

    },
    action:{
        button: document.getElementById("next-duel"),
    },
    
};



const pathImages = "./src/assets/icons/";

const cardDate = [
   {
    id: 0,
    name: "Blue Eyes Wihite Dragon",
    type: "Paper",
    img: `${pathImages} + "dragon.png`,
    WinOf:[1],
    LoseOf:[2],

   }, 
   {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: `${pathImages} + "magician.png`,
    WinOf:[2],
    LoseOf:[0],

   },
   {
    id: 2,
    name: "Exordia",
    type: "Scossors",
    img: `${pathImages} + "exodia.png`,
    WinOf:[0],
    LoseOf:[1],
   },

];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardDate.length);
    return cardDate[randomIndex].id;

}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src","./src/essets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1) {

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);

        });

        cardImage.addEventListener("click",() => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        
    }
    
    return cardImage;
}
async function setCardsField(cardId){

    await removeAllCardsImagens();

    let computerCardId = await getRandomCardId();
    
    await ShowHiddenCardFildsImages(true);
    
    await hiddenCardsDetails();
    await drawCardsInfield(cardId, computerCardId);

    let duelResult = await checkDuelResult(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult);

}

async function drawCardsInfield(cardId, computerCardId){
    states.fieldCards.player.src = cardDate[cardId].img;
    states.fieldCards.computer.src = cardDate[computerCardId].img;
}

async function ShowHiddenCardFildsImages(value){
    if(value === true){
    states.fieldCards.player.style.display = "block";
    states.fieldCards.computer.style.display = "block";
    }

    if(value === false){
        states.fieldCards.player.style.display = "none";
        states.fieldCards.computer.style.display = "none";
    }
}


async function hiddenCardsDetails(){
    states.cardSprints.avatar.src = "";
    states.cardSprints.name.innerText = "";
    states.cardSprints.type.innerText = "";

}

async function updateScore(){

    states.score.scoreBox.innerText = `Win:${states.score.playerScore} | Lose:${states.score.computerScore}`
}

async function drawButton(text){
    states.button.innerText = text.toUpperCase();
    states.button.style.display = "block";

}

async function checkDuelResult(){
    let duelResults = "Draw"
    let playerCards = cardDate[playerCardId];
    if(playerCards.WinOf.includes(computerCardId)){
        duelResults = "win"

        states.score.playerScore++; 
    }

    if(playerCards.LoseOf.includes(computerCardId)){
        duelResults = "lose"

        states.score.computerScore++;
    }

    await playerAudio(duelResults);

    return duelResults;
}


async function removeAllCardsImagens(){
    let {computerBOX,player1BOX} = states.playerSides
    
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());



}

async function drawSelectCard(index){
    states.cardSprints.avatar.src = cardDate[index].img;
    states.cardSprints.name.innerText = cardDate[index].name;
    states.cardSprints.type.innerHTML = "Attibute" + cardDate[index].type;



}


async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++) {
        const IdCard = await getRandomCardId();
        const cardImage = await createCardImage(IdCard,
        fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);

    }


};
async function resetDuel(){
    states.cardSprints.avatar.src = "";
    states.action.button.style.display = "none";
    states.fildeCards.player.style.display = "none";
    states.fildeCards.computer.style.display = "none";


    init()

}

async function playerAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
  
    try{
        audio.play();
   }
   catch{

   }
    
}


function init(){

    ShowHiddenCardFildsImages(false);
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);
    
    const bgm = document.getElementById("bgm");
    bgm.play();
};
init();
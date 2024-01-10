const states = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_point"),
    },
    cardSprints:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fildeCards:{
        player: documet.getElementById("player-filde-card"),
        computer: documet.getElementById("computer-filde-card"),
    },
    playerSides:{
        player1:"player-cards",
        computerBOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        player1BOX: document.querySelector("#computer-cards"),
        
    },
    action:{
        button: document.getElementById("next-duel"),
    },
    
};



const pathImages = "./src/assets/icons/";

const cardDate = [
   {
    id: 0,
    name: "Blue Eyes Dragon",
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
    img: `${pathImages} + "exordia.png`,
    WinOf:[0],
    LoseOf:[1],
   },

];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardDate.length);
    return cardDate[randomIndex].id;

}

async function creatCardImage(IdCard, fildSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("heigth", "100px");
    cardImage.setAttribute("src", "./src/essets/icons/card-back.png");
    cardImage.setAttribute("data-id",IdCard);
    cardImage.classList.add("card");

    if(fildSide === playerSides.player1) {

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
    states.fildeCards.player.style.display = "block";
    states.fildeCards.computer.style.display = "block";

    states.fildeCards.player.src = cardDate[cardId].img;
    states.fildeCards.computer.src = cardDate[computerCardId].img;

    let duelResult = await checkDuelResult(cardId, computerCardId);

   await updateScore();
    await drawButton(duelResult);

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
        await playerAudio(duelResults)
        states.score.playerScore++; 
    }

    if(playerCards.LoseOf.includes(computerCardId)){
        duelResults = "lose"
        await playerAudio(duelResults)
        states.score.computerScore++;
    }

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


async function drawCards(cardNumbers, fildSide){
    for(let i = 0; i < cardNumbers, i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await creatCardImage(randomIdCard,
        fildSide);

        document.getElementById(fildSide).appendChild(cardImage);

    }


};
async function resetDuel{
    states.cardSprints.avatar.src = "";
    states.action.button.style.display = "none";
    states.fildeCards.player.style.display = "none";
    states.fildeCards.computer.style.display = "none";

    init()

}

async function playerAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    audio.play();
}


function init(){
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);

};
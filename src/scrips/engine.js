const states = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_point"),
    },
    cardSprints:{
        avatat: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fildeCards:{
        player: documet.getElementById("player-filde-card"),
        computer: documet.getElementById("computer-filde-card"),
    },
    action:{
        button: document.getElementById("next-duel"),
    },
    
};

const playerSides = {
    player1:"player-field-card",
    computer: "computer-field-card",
    
}

const pathImages = ".src/assets/icons/";

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


async function drawCards(cardNumbers, fildSide){
    for(let i = 0; i < cardNumbers, i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await creatCardImage(randomIdCard,
        fildSide);

        document.getElementById(fildSide).appendChild(cardImage);

    }


};

function init(){
    drawCards(5,playerSides.player1);
    drawCards(5,playerSides.computer);

};
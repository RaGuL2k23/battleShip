//when u want module like this not only export
//but also to take care of html etc use .js
import { GameboardUi, GameboardUiComputer } from "./gameBoardUi.js";

//create game logic/play logic
//player vs computer;
let player = new GameboardUi('player');
let computer = new GameboardUiComputer('computer');

function giveAttackingPower(player) {
    
    computer.Contaniner.addEventListener("click", (e) => {
    console.log(e.target);
    try {
      let [x, y] = e.target.dataset.id.split(",");
      computer.receiveAttack(x, y); 
      //computer posses attack after our attack
      computerAttack();
      console.log(x, y, e.target.dataset.shipId);
    } catch {
      console.log("already attacked   ");
    }
  });
} 
//1.place sships
 

// console.log(player.placeOccupied);
//   player.placeShip({ length: 3 }, 4, 3);
 

//   player.placeShip({ length: 2, place: "sf" }, 1, 2);
//   player.placeShip({ length: 2, place: "sf" }, 6, 2);
 
 
function placeRandom(toWhom) {
    const shipLengths = [3,4,  2, 4, 1];
    const boardSize = 9;

    shipLengths.forEach(length => {
        let x, y;
        let overlap = false;
      

        do {
            // Generate random coordinates within the board boundaries
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);

            // Check if the ship fits within the board boundaries
            if (x + length <= boardSize && y + length <= boardSize) {
                // Check for overlap with existing ships
                overlap = checkOverlap(toWhom, x, y, length);
            } else {
                overlap = true; // Regenerate coordinates if the ship exceeds the boundaries
            }
           
        } while (overlap);//do this again if overlay
       
        // Place the ship
        toWhom.placeShip({ length: length }, x, y);
    });
}

function checkOverlap(toWhom, x, y, length) {//algorithm only for vertical
    for (let i = 0; i < length; i++) {
        if (toWhom.placeOccupied.has([x + i, y].toString())) {
            return true; // Overlapping ship found
        }
    }
    return false; // No overlap
}
console.log(player.Contaniner)
function placePlayerRandom(player) {
    const shipLengths = [3, 4, 2, 4, 1];
    const boardSize = 9;

    // Clear existing ships from the player's board
    player.placeOccupied.clear();

    // Remove visual indication and reset dataset.shipId for existing ships
    player.Contaniner.querySelectorAll('.ship').forEach(shipCell => {
        shipCell.classList.remove('ship');
        shipCell.dataset.shipId = null;
    });

    shipLengths.forEach(length => {
        let x, y;
        let overlap = false;

        do {
            // Generate random coordinates within the board boundaries
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);

            // Check if the ship fits within the board boundaries
            if (x + length <= boardSize && y + length <= boardSize) {
                // Check for overlap with existing ships
                overlap = checkOverlap(player, x, y, length);
            } else {
                overlap = true; // Regenerate coordinates if the ship exceeds the boundaries
            }
        } while (overlap);

        // Place the ship for the player
        player.placeShip({ length: length }, x, y);
    });
}

// ... (checkOverlap function remains the same)


 


//add event listnrs to listenh to recieve attack
giveAttackingPower(player); 


//game starts here

//computer randomize it's board and blur it 
placeRandom(computer);
placePlayerRandom(player);//sigle time only;
document.querySelector('button').addEventListener('click',()=> { 
    placePlayerRandom(player)
})
computer.Contaniner.childNodes.forEach(c =>{
    if(c.classList.contains('ship')){
        c.classList.add('hideShip')
    }
});
let attackedCoorSet = new Set();
let smartAttackQ = [];     //ai becomes smarter
//really blasting tbh wow 


function computerAttack(){ 
    console.log(player.allShipSunked())
    if(player.allShipSunked()){alert('computer won')};
    if(computer.allShipSunked()){alert('player won')}
    document.querySelector('button').style.display = "none" //no longer needed random btn;

    let x,y ;
    x = Math.floor(Math.random()*10);y = Math.floor(Math.random()*10);
    if(smartAttackQ.length>0){
          [x,y] = smartAttackQ.shift();//
          x++;//attacks the next upcoming part's of ship
          
    }
   

      if(!attackedCoorSet.has([x,y].toString())){
        //prooceed attack on new coord 
       let attackStatus =  player.receiveAttack(x,y);
        if(attackStatus == 'hit'){
            smartAttackQ.push([x,y])
        }

    }
    else  {
        computerAttack();
    }
    attackedCoorSet.add([x,y].toString());
}

// setTimeout(() => {
//     let i = 0;
//     while(i<400){
// i++;player.receiveAttack(Math.floor(Math.random()*10),Math.floor(Math.random()*10))
//     }
// }, 1000);
 
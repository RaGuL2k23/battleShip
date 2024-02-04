//when u want module like this not only export
//but also to take care of html etc use .js
import { GameboardUi, GameboardUiComputer } from './gameBoardUi.js'

//create game logic/play logic
//player vs computer;
let player = new GameboardUi('player')
let computer = new GameboardUiComputer('computer')
const waitSec = 1.5;


function giveAttackingPower(toplayer) {
    let canAttack = true
    computer.Contaniner.addEventListener('click', async (e) => {
        if (canAttack) {
            try {
                canAttack = false //stps further incoming
                let [x, y] = e.target.dataset.id.split(',')
                computer.receiveAttack(x, y)
                //computer posses attack after our attack
                await wait(waitSec)
                computerAttack()
                console.log(x, y, e.target.dataset.shipId)
            } catch {
                console.log('already attacked   ')
            }
        }
        await wait(waitSec);//wait for computr to finish
        canAttack = true;
    })
}

function wait(ms) {
    return new  Promise(resolve => setTimeout(resolve, ms*1000) );
}
//1.place sships
const shipsAvailable = [3, 4, 2, 1, 1]

function placeRandom(toWhom, plc) {
    const shipLengths = shipsAvailable
    const boardSize = 9

    shipLengths.forEach((length) => {
        let x, y
        let overlap = false

        do {
            // Generate random coordinates within the board boundaries
            x = Math.floor(Math.random() * boardSize)
            y = Math.floor(Math.random() * boardSize)

            // Check if the ship fits within the board boundaries
            if (x + length <= boardSize && y + length <= boardSize) {
                // Check for overlap with existing ships
                overlap = checkOverlap(toWhom, x, y, length)
            } else {
                overlap = true // Regenerate coordinates if the ship exceeds the boundaries
            }
        } while (overlap) //do this again if overlay

        // Place the ship
        plc = plc == 'vertical' ? 'h' : 'vertical'
        console.log(plc)
        toWhom.placeShip({ length: length, place: plc }, x, y, 'd')
    })
}

function checkOverlap(toWhom, x, y, length) {
    //algorithm only for vertical

    for (let i = 0; i < length; i++) {
        if (
            toWhom.placeOccupied.has([x + i, y].toString()) || // boundary cross check
            toWhom.placeOccupied.has([x, y + i].toString()) || // if 9,9 then 9,10 is not valid so check it
            toWhom.placeOccupied.has([x, y].toString()) || //check x&y itself
            toWhom.placeOccupied.has([x + i, y + 1].toString()) || //check adjacent right
            toWhom.placeOccupied.has([x + i, y - 1].toString()) || // for ver adj left
            toWhom.placeOccupied.has([x - 1, y + i].toString()) || //check upward ovrlap for hor
            toWhom.placeOccupied.has([x + 1, y + i].toString()) //downwared ovrlap fr hor
        ) {
            return true // Overlapping ship found
        }
    }
    return false // No overlap
}
console.log(player.Contaniner)
function placePlayerRandom(player, plc) {
    const shipLengths = shipsAvailable
    const boardSize = 9

    // Clear existing ships from the player's board
    player.placeOccupied.clear()

    // Remove visual indication and reset dataset.shipId for existing ships
    player.Contaniner.querySelectorAll('.ship').forEach((shipCell) => {
        shipCell.classList.remove('ship')
        shipCell.dataset.shipId = null
    })

    shipLengths.forEach((length) => {
        let x, y
        let overlap = false

        do {
            // Generate random coordinates within the board boundaries
            x = Math.floor(Math.random() * boardSize)
            y = Math.floor(Math.random() * boardSize)

            // Check if the ship fits within the board boundaries
            if (x + length <= boardSize && y + length <= boardSize) {
                // Check for overlap with existing ships
                overlap = checkOverlap(player, x, y, length)
            } else {
                overlap = true // Regenerate coordinates if the ship exceeds the boundaries
            }
        } while (overlap)

        // Place the ship for the player
        plc = plc == 'vertical' ? 'h' : 'vertical'
        player.placeShip({ length: length, place: plc }, x, y)
    })
}

//add event listnrs to listenh to recieve attack
giveAttackingPower(player)

//game starts here

//computer randomize it's board and blur it
placeRandom(computer)
placePlayerRandom(player) //sigle time only;
document.querySelector('button').addEventListener('click', () => {
    placePlayerRandom(player)
})
computer.Contaniner.childNodes.forEach((c) => {
    if (c.classList.contains('ship')) {
        c.classList.add('hideShip')
    }
})
let attackedCoorSet = new Set()
let smartAttackQ = [] //ai becomes smarter
//really blasting tbh wow

 
function computerAttack() {
    console.log(player.allShipSunked())
    document.querySelector('button').style.display = 'none' //no longer needed random btn;

    let x, y
    x = Math.floor(Math.random() * 10)
    y = Math.floor(Math.random() * 10)
    if (smartAttackQ.length > 0) {
        ;[x, y] = smartAttackQ.shift() //
        x++ //attacks the next upcoming part's of ship
    }

    if (!attackedCoorSet.has([x, y].toString())) {
        //prooceed attack on new coord
        let attackStatus = player.receiveAttack(x, y)
        //check after attacking
        if (player.allShipSunked()) {
            alert('computer won')
            throw new console.error('gameend')
        } else if (computer.allShipSunked()) {
            alert('player  won Hoo')
            throw new console.error('gameend')
        }

        if (attackStatus == 'hit') {
            smartAttackQ.push([x, y])
        } else {
        }
    } else {
        computerAttack()
    }
    attackedCoorSet.add([x, y].toString())
}

// setTimeout(() => {
//     let i = 0;
//     while(i<199){
// i++;player.receiveAttack(Math.floor(Math.random()*10),Math.floor(Math.random()*10))
//     }
// }, 100000);

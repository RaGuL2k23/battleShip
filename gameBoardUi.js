import { Gameboard, Ship } from './battleShip.js'
let p1gmb, computer

let strikeSound = document.querySelector('.strike')
let shipAttacked = document.querySelector('.attacked')
let sunkSound = document.querySelector('.sunksound')
class GameboardUi extends Gameboard {
    constructor(name) {
        super(4)
        this.name = name
        this.count = 0
        this.Contaniner = document.createElement('div')
        this.gridUi = this.#createGrids()
    }

    #createGrids() {
        this.Contaniner.classList.add('hero_container')
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let div = document.createElement('div')
                div.classList.add('box')

                this.grid[i][j] = div

                div.dataset.id = [i, j].toString()
                this.Contaniner.appendChild(div)
            }
        }
        document.querySelector('.cont').append(this.Contaniner)
    }

    static #createShips(length, place, instance) {
        // 4, 4, 3,3, 2,2 ,1,1
        // this function is just providing length values
        //and placing value for adding appropriate class to ships
        let ship = new Ship(length, place)

        //overwrite ship id;
        ship.id =
            Date.now().toString() +
            Math.random() * ((500000 / 431) * Math.random()).toString()
        //now each ship will have their dedicated id's ;
        //placed coordinates ids have same shipid as dataset.shipId

        instance.ships.push(ship)
        return ship
    }

    placeShip(shipPara, xCoordinate, yCoordinate) {
        let ship = GameboardUi.#createShips(
            shipPara.length,
            shipPara.place,
            this
        )

        if (
            ship.length == 1 ||
            (ship.length > 1 &&
                !this.placeOccupied.has([xCoordinate, yCoordinate].toString()))
        ) {
            let i = 0
            let cvrHrz = 0,
                cvrVer = 0 //cover extra horizontal & vertical

            for (i = 0; i < ship.length; i++) {
                ship.place == 'vertical' ? (cvrHrz = i) : (cvrVer = i)

                this.grid[xCoordinate + cvrHrz][
                    yCoordinate + cvrVer
                ].dataset.shipId = ship.id
                this.placeOccupied.add(
                    // adds occupied array to set
                    [xCoordinate + cvrHrz, yCoordinate + cvrVer].toString()
                )
                //add ship class
                this.grid[xCoordinate + cvrHrz][
                    yCoordinate + cvrVer
                ].classList.add('ship')
            }
        }

        return this.placeOccupied
    }

    revealAttackedShip(attackedCoordinateIdValue) {
        let attackedShip = null
        this.ships.forEach((s) => {
            if (s.id == attackedCoordinateIdValue) {
                // console.log("hit", s);
                attackedShip = s
                s.hit() //hits or increments hit count;
            }
        })
        return attackedShip
    }

    receiveAttack(xCoordinate, yCoordinate) {
        if (
            this.placeOccupied.has([xCoordinate, yCoordinate].toLocaleString())
        ) {
            //checks the set for "is there a ship in x,y cordinate"
            //find which ship is there and health --

            let attackedCoordinateShipIdValue =
                this.grid[xCoordinate][yCoordinate].dataset.shipId

            let attackedShip = this.revealAttackedShip(
                attackedCoordinateShipIdValue
            )

            //attach hit class to hit box;
            this.grid[xCoordinate][yCoordinate].classList.add('hit')
            //hit music
            strikeSound.currentTime = 0
            strikeSound.play()

            shipAttacked.play()

            // this.grid[xCoordinate][yCoordinate].textContent = "❌💥";

            //check for ship sunked status
            if (attackedShip.isSunk()) {
              //add some sunkin sound
      sunkSound.currentTime=5;
      sunkSound.play();
                this.shipSunked(attackedShip)
            }
            // log(attackedShip.id, "attackedShip", this.ships);
            return 'hit'
        }

        //looking forwa music audio
        strikeSound.currentTime = 0
        strikeSound.play();

        this.grid[xCoordinate][yCoordinate].classList.add('miss')

        // this.grid[xCoordinate][yCoordinate].textContent= "💦"
        return 'miss'
    }

    shipSunked(ship) {
      

        let sunkedShipCoordinates = document.querySelectorAll(
            `[data-ship-id="${ship.id}"]`
        )
        ship.sunked = true
        sunkedShipCoordinates.forEach((coor) => {
            coor.classList.add('sunked')
            coor.style.backgroundColor = 'red'
        })
         
        

        alert(
            `destroyed ${++this.count} ${this.name} ship completely ${this.ships.length - this.count}remaining`
        )
    } // ui logic ends;

    allShipSunked() {
        let allSunked = true
        this.ships.forEach((s) => {
            // console.log(s.sunked)
            if (!s.sunked) {
                allSunked = false
            } //even if s.sunked = false allsunked is false
            // console.log(s.sunked,'df')
        })
        if (allSunked) {
            GameboardUi.#endGame(this)
        }
        return allSunked //to return player , status of gamedone const[player,status]
    }

    static #endGame(instance) {
        console.log('hi')
        alert('all ship sunked ')
        instance.Contaniner.style.opacity = 0.1
    }
}

class GameboardUiComputer extends GameboardUi {
    constructor(name) {
        super(4)
        this.count = 0
        this.name = name
    }
}

export { p1gmb, computer, GameboardUi, GameboardUiComputer }
 
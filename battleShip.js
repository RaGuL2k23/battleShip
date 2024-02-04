class Ship {
    constructor(length, place = 'vertical') {
        this.id = Date.now().toString()
        this.place = place //
        this.hitCount = 0
        this.length = length
        this.sunked = false
    }
    hit() {
        this.hitCount++
    }

    isSunk() {
        return this.hitCount === this.length ? true : false
    }
}

class Gameboard {
    constructor(shipCount) {
        this.noOfShips = shipCount
        this.ships = []
        this.grid = Array.from({ length: 10 }, () => [
            Array.from({ length: 10 }, () => []),
        ])
        this.placeOccupied = new Set() //set to contain occupied gameboard area
    }
    static #createShips(length, place, instance) {
        // 4, 4, 3,3, 2,2 ,1,1

        let ship = new Ship(length, place)

        instance.ships.push(ship)
        return ship
    }

    placeShip(shipPara, xCoordinate, yCoordinate) {
        let ship = Gameboard.#createShips(shipPara.length, shipPara.place, this)
        try {
            if (ship.length == 1) {
                this.grid[xCoordinate][yCoordinate] = ship.id
                this.placeOccupied.add([xCoordinate, yCoordinate].toString()) // adds occupied array to set
            } else if (ship.length > 1) {
                let i = 0
                let cvrHrz = 0,
                    cvrVer = 0 //cover extra horizontal & vertical

                for (i = 0; i < ship.length; i++) {
                    ship.place == 'vertical' ? (cvrHrz = i) : (cvrVer = i)

                    this.grid[xCoordinate + cvrHrz][yCoordinate + cvrVer] =
                        ship.id
                    this.placeOccupied.add(
                        // adds occupied array to set
                        [xCoordinate + cvrHrz, yCoordinate + cvrVer].toString()
                    )
                }
            }

            return this.placeOccupied
        } catch {
            console.log('already place occupied ')
        }
    }

    revealAttackedShip(attackedCoordinateIdValue) {
        let attackedShip
        this.ships.forEach((s) => {
            if (s.id == attackedCoordinateIdValue) {
                console.log('hit', s)
                attackedShip = s
                s.hit()
            }
        })
        return attackedShip
    }

    receiveAttack(xCoordinate, yCoordinate) {
        if (
            this.placeOccupied.has([xCoordinate, yCoordinate].toLocaleString())
        ) {
            //find which ship is there and health --
            let attackedCoordinateIdValue = this.grid[xCoordinate][yCoordinate]
            let attackedShip = this.revealAttackedShip(
                attackedCoordinateIdValue
            )

            return 'hit'
        }
        return 'miss'
    }
}

const g = new Gameboard()
console.log(g.placeShip({ length: 4, place: 'vertical' }, 4, 6), g.ships, 'df')
console.log(g.revealAttackedShip('4'), g.ships)
export { Gameboard, Ship, g }

var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Predator extends LiveForm{

    constructor(x,y){
        super(x,y);
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var z = Math.round(Math.random()) ;
        var newCell = random(this.chooseCell(z));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            if(z==1) { matrix[this.y][this.x] = 1;}
            else if(z==0) { matrix[this.y][this.x] = 0;}

            matrix[newY][newX] = 3;
            
            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
        eat() {
            var newCell = random(this.chooseCell(3));
            var EnergyPlus;
            if(weather == 4 || weather == 0){ EnergyPlus = 1;}
            else EnergyPlus = 2;

            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
    
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3;
    
                for (var i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.energy += 2;

                if(this.energy > 10){
                    this.mul();
                }
    
            }else
            {
                if(this.energy >= 0){
                    this.move();
                }else{
                    this.die();
                    }
            }
        }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let predator = new Predator(x, y);
            predatorArr.push(predator);

            this.energy = 5;
            predatorCount++;
        }
    }
   die() 
      {
            matrix[this.y][this.x] = 0;
              for (var i in predatorArr) {
                  if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                      predatorArr.splice(i, 1);
                      break;
                  }
              }
            
                
    }
}
var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Bomb extends LiveForm {

    constructor(x, y) {
        super(x, y);
        this.time = 10000;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }


    Explosion() {
        var z = Math.floor(Math.random() * 2);
        var newCell = random(this.chooseCell(z));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 3;
            var pr = new Predator(this.x, this.y);
            predatorArr.push(pr);
            predatorCount++;
            matrix[newY][newX] = 0;

            for (var i in bombArr) {
                bombArr.splice(i, 1);
                break;
            }
            this.time = 0;
           // console.log("Boom");
        }
    }

    Timeminus(){
        for (var i = 10000; i >= 0; i--) {
            this.time--;
            if(this.time <= 0){
                this.Explosion();
                break;
            }
        }

    }
   /* Timer() {
    
        if (this.time <= 0) {
            this.Explosion();
           // console.log("Boom")
        }
       
    }*/
}
var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Rock extends LiveForm {

    constructor(x, y) {
        super(x, y);
       
    }
   Crack(){
        matrix[this.y][this.x] = 0;

        for (let i in rockArr) {
           // if (rockArr[i].x == this.x && rockArr[i].y == this.y) {
                rockArr.splice(i, 1)
           // }
        }
   }
}


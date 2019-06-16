var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Rock extends LiveForm {

    constructor(x, y) {
        super(x, y);
       
    }
   Crack(){
        matrix[this.y][this.x] = 0;
        for (var i in rockArr) {
        if (this.x == rockArr[i].x && this.y == rockArr[i].y) {
            rockArr.splice(i, 1);
            break;
        }
    }
   }
   
}


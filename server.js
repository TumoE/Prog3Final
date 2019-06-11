
//! Requiring modules  --  START
Grass = require("./modules/Grass.js");
GrassEater = require("./modules/GrassEater.js");
Predator = require("./modules/Predator.js")
Alien = require("./modules/Alien.js");
Bomb = require("./modules/Bomb.js");
random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
alienArr = [];
bombArr = [];
matrix = [];

 grassHashiv = 0;
 grassEaterCount = 0;
 predatorCount = 0;
 alienCount = 0;
 bombCount = 0;

//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, alien, bomb) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < alien; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 1 , 5 ,5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterCount++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if(matrix[y][x] == 3){
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorCount++;
            } else if(matrix[y][x] == 4){
                var alien = new Alien(x, y);
                alienArr.push(alien);
                alienCount++;
            }else if(matrix[y][x] == 5){
                var bomb = new Bomb(x, y);
                bombArr.push(bomb);
                bombCount++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    //if(predatorArr[0] !== undefined){
        for (var i in predatorArr) {
            predatorArr[i].eat();
            predatorArr[i].mul();
        }
  //  }
    if(alienArr[0] !== undefined){
        for (var i in alienArr) {
            alienArr[i].eat();
            alienArr[i].CountDown();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)
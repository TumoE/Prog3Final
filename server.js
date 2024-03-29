

Grass = require("./modules/Grass.js");
GrassEater = require("./modules/GrassEater.js");
Predator = require("./modules/Predator.js")
Alien = require("./modules/Alien.js");
Bomb = require("./modules/Bomb.js");
Rock = require("./modules/Rock.js");
random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
alienArr = [];
bombArr = [];
rockArr = [];
matrix = [];




 grassHashiv = 0;
 grassEaterCount = 0;
 predatorCount = 0;
 alienCount = 0;
 bombCount = 0;
 rockCount = 0;

 weather = -1;


function matrixGenerator(matrixSize, grass, grassEater, predator, alien, bomb,rock) {
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
    for (let i = 0; i < rock; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
        if(customY == 0 && customX == 0)
        {
        matrix[customY][customX+1] = 6;
        matrix[customY+1][customX] = 6;
        matrix[customY+1][customX+1] = 6; 
        }else if(customX == matrixSize-1 && customY == 0)
        {
        matrix[customY][customX-1] = 6;
        matrix[customY+1][customX] = 6;
        matrix[customY+1][customX-1] = 6; 
        }else if(customX == 0 && customY == matrixSize-1)
        {
        matrix[customY-1][customX] = 6;
        matrix[customY-1][customX+1] = 6;
        matrix[customY][customX+1] = 6; 
        }
        else if(customX == matrixSize-1 && customY == matrixSize-1)
        {
        matrix[customY-1][customX] = 6;
        matrix[customY-1][customX-1] = 6;
        matrix[customY][customX-1] = 6; 
        }
        else if(customX < matrixSize-2 && customY < matrixSize-2 && customY > 1 && customX > 1){
        matrix[customY-1][customX] = 6;
        matrix[customY-1][customX-1] = 6;
        matrix[customY][customX-1] = 6; 
        }
    }
}
matrixGenerator(20, 15,10, 3,0,0,2);
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
            else if(matrix[y][x] == 6){
                var rock = new Rock(x, y);
                rockArr.push(rock);
                rockCount++;
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
           // predatorArr[i].mul();
        }
  //  }
    if(alienArr[0] !== undefined){
        for (var i in alienArr) {
            alienArr[i].eat();
           //alienArr[i].CountDown();
        }
    }

    if(bombArr[0] !== undefined){
    for (var i in bombArr) 
    {
        bombArr[i].Timeminus();
    }
    }

    if(rockArr[0] !== undefined){
    for (var i in rockArr) 
    {
        if(weather >= 0)
        {
        rockArr[i].Crack();
        }
    }
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterCount,
        predatorCounter: predatorCount,
        alienCounter: alienCount,
        bombCounter: bombCount,
        rockCounter: rockCount,
        weatherIndex: weather
        //grassEaterArrRev: grassEaterArr,
       // predatorArrRev: predatorArr

    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)



function RandomBombMatrix() {
    if(weather == 1 || weather == 2){
    var x = Math.floor(Math.random() * matrix.length);
    var y = Math.floor(Math.random() * matrix.length);
    matrix[y][x] = 5;
    var bo = new Bomb(x, y);
    bombArr.push(bo)
    bombCount++;
    }
    setTimeout(RandomBombMatrix, 5000);
}
RandomBombMatrix();


function RandomAllenMatrix() {
    if(weather == 1 || weather == 2){
    var x = Math.floor(Math.random() * matrix.length);
    var y = Math.floor(Math.random() * matrix.length);
    matrix[y][x] = 4;
    var al = new Alien(x, y);
    alienArr.push(al);
    alienCount++;
    }      
    setTimeout(RandomAllenMatrix, 5000);
}
RandomAllenMatrix();




function RandomRockMatrix() {
    if(weather == 0){
    var x = Math.floor(Math.random() * matrix.length);
    var y = Math.floor(Math.random() * matrix.length);
    matrix[y][x] = 6;
    }
    setTimeout(RandomRockMatrix, 5000);
}
RandomRockMatrix();



function weatherChange(){
    weather++;
    if(weather > 3) weather = 0;
   // console.log(weather);
    setTimeout(weatherChange, 10000);
}
weatherChange();


function reverseFunc(){
    var x = [];
    x = grassEaterArr;
    grassEaterArr = predatorArr;
    predatorArr = x;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
                    if(matrix[y][x] == 2)
                    {
                     matrix[y][x] = 3;
                    }
                    else if (matrix[y][x] == 3)
                    {
                    matrix[y][x] = 2;
                    }      
        }
    }
}
function removeRocks(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
                    if(matrix[y][x] == 6)
                    {
                     matrix[y][x] = 0;
                     for(var i in rockArr){
                        rockArr.splice(i, 1);
                     }
                    }
        }
    }
}
function AddRandomGrassEater(){
    let NewX = Math.floor(random(20));
    let NewY = Math.floor(random(20));

     matrix[NewX][NewY] = 2;
     let NewGrassEater = new GrassEater(NewX,NewY);
     grassEaterArr.push(NewGrassEater);
}
function addNewRock(){
    let NewX = Math.floor(random(20));
    let NewY = Math.floor(random(20));
     matrix[NewX][NewY] = 6;
     let NewRock = new Rock(NewX,NewY);
     rockArr.push(NewRock);
}
io.on('connection', function (socket) {
    socket.on("matrixy pokhi",reverseFunc)
    socket.on("RemoveAllRocks",removeRocks)
    socket.on("AddRandomGrassEater",AddRandomGrassEater)
    socket.on("AddNewRock",addNewRock)
 });
 

//grassEaterArr = [];
//predatorArr = [];
matrix = [];

//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    


    var ground = loadImage('img/Ground.png');
    var bomb = loadImage('img/bomb.png');
    var grass = loadImage('img/Grass.png');
    var cow = loadImage('img/Cow.png');
    var wolf = loadImage('img/Wolf.png');
    var alien = loadImage('img/alien.png');
    var rock = loadImage('img/Rock.png');

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let alienCounttElement = document.getElementById('alienCount');
    let bombCountElement = document.getElementById('bombCount');
    let rockCountElement = document.getElementById('rockCount');
    let Body = document.body;
    let WeatherTxT = document.getElementById('WeatherH2');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        alienCounttElement.innerText = data.alienCounter;
        bombCountElement.innerText = data.bombCounter;
        rockCountElement.innerText = data.rockCounter;


        //grassEaterArr = data.grassEaterArrRev;
        //predatorArr = data.predatorArrRev;


        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('green');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    //fill("green");
                    image(grass,j * side, i * side, side, side)
                    //rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    // fill("orange");
                    // rect(j * side, i * side, side, side);
                    image(cow,j * side, i * side, side, side)

                } else if (matrix[i][j] == 0) {
                    // fill('#acacac');
                    // rect(j * side, i * side, side, side);
                    image(ground,j * side, i * side, side, side)
                } else if (matrix[i][j] == 3) {
                    // fill('red');
                    // rect(j * side, i * side, side, side);
                    image(wolf,j * side, i * side, side, side)
                } else if (matrix[i][j] == 4) {
                    // fill('blue');
                    // rect(j * side, i * side, side, side);
                    image(alien,j * side, i * side, side, side)
                } else if (matrix[i][j] == 5) {
                    // fill('yellow');
                    // rect(j * side, i * side, side, side);
                    image(bomb,j * side, i * side, side, side)
                }
                 else if (matrix[i][j] == 6) {
                    // fill('yellow');
                    // rect(j * side, i * side, side, side);
                    image(rock,j * side, i * side, side, side)
                }
            }
        }
         if(data.weatherIndex == 0 ) { Body.style.background = "#757a9f"; WeatherTxT.innerText = "Եղանակ։Ձմեռ";}
         if(data.weatherIndex == 1 ) { Body.style.background = "#b8e08d"; WeatherTxT.innerText = "Եղանակ։Գարուն";}
         if(data.weatherIndex == 2 ) { Body.style.background = "#FFFE6F"; WeatherTxT.innerText = "Եղանակ։Ամառ";}
         if(data.weatherIndex == 3 ) { Body.style.background = "#e59d34"; WeatherTxT.innerText = "Եղանակ։Աշուն";}

    }

    let ReverseButton = document.getElementById("Rev");
    ReverseButton.addEventListener("click", rev);

    let RemoveRocksButton = document.getElementById("RemoveRocks");
    RemoveRocksButton.addEventListener("click", RemoveRocks);
    
    let SpawnRocks = document.getElementById("SpawnRocks");
    SpawnRocks.addEventListener("click", AddRock);

    let GrassEaterAdderButton = document.getElementById("GrassEaterAdder");
    GrassEaterAdderButton.addEventListener("click", AddGrassEater);

    function rev(){
        socket.emit("matrixy pokhi");
    }
    function RemoveRocks(){
        socket.emit("RemoveAllRocks");
    }
    function AddGrassEater(){
        socket.emit("AddRandomGrassEater");
    }
    function AddRock(){
        socket.emit("AddNewRock");
    }


}







var tileClass = "ttt-tile";
var tiles = [];

var player1 = {
    name: "",
    piece: "X",
    isCPU: false
};

var player2 = {
    name: "",
    piece: "O",
    isCPU: true
};

var currentPlayer = player1;
var gameOver = false;
var draw = false;

$(document).ready(function () {
    initPlayerPicker();
});

function initPlayerPicker() {
    $("#playerDiv").show();
    $("#gameDiv").hide();
    if (player2.isCPU) player2.name = "";
    $("#player1Name").val(player1.name);
    $("#player2Name").val(player2.name);

    $("#buttonStartGame").click(function () {
        tryStartGame();
    });

    $("#checkboxCPU").change(function () {
        if (this.checked) {
            $("#player2Div").hide();
        } else {
            $("#player2Div").show();
        }
    });
}

function tryStartGame() {
    $(".invalid-feedback").removeClass("d-block");
    let playVersusCPU = $("#checkboxCPU:checked").length > 0;
    let player1Name = $("#player1Name").val().trim();
    let player2Name = $("#player2Name").val().trim();

    if (player1Name.length == 0) {
        $("#error-text-player1").addClass("d-block");
        return;
    }

    if (player2Name.length == 0 && playVersusCPU == false) {
        $("#error-text-player2").addClass("d-block");
        return;
    }

    player1.name = player1Name;
    if (!playVersusCPU) {
        player2.name = player2Name
        player2.isCPU = false;
    } else {
        player2.name = "CPU";
        player2.isCPU = true;
    }

    initGame();
    $("#playerDiv").hide();
    $("#gameDiv").show();
}

function initGame() {
    initTilesArray();
    initClickHandling();
    displayPlaying();

    $("#buttonRestart").click(function () {
        initPlayerPicker();
    });
    $("#victory").hide();
    $("#victoryText").css("color", "green");
    gameOver = false;
    draw = false;
    currentPlayer = player1;

}

function renderGame() {
    displayPlaying();
}

function isVictory() {
    let count;
    //Checking X
    for (var row = 0; row <= 6; row += 3) {
        count = 0;
        for (var x = 0; x < 3; x++) {
            if (tiles[row + x].pickedBy == currentPlayer) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        }
    }

    //Checking Y
    for (var x = 0; x < 3; x++) {
        count = 0;
        for (var y = 0; y <= 6; y += 3) {
            if (tiles[x + y].pickedBy == currentPlayer) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        }
    }

    //Left to right diagonal
    if (tiles[0].pickedBy == currentPlayer && tiles[4].pickedBy == currentPlayer && tiles[8].pickedBy == currentPlayer) {
        return true;
    }

    if (tiles[2].pickedBy == currentPlayer && tiles[4].pickedBy == currentPlayer && tiles[6].pickedBy == currentPlayer) {
        return true;
    }


    for (let tile of tiles) {
        if (tile.pickedBy == null) {
            return false;
        }
    }

    draw = true;
    $("#victoryText").css("color", "red");
    return true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playAI() {
    await sleep(1500);
    var count = 0;
    var freetile;
    var goodTileSpots = [];


    // Try to win

    for (var row = 0; row <= 6; row += 3) {
        count = 0;
        freetile = null;
        for (var x = 0; x < 3; x++) {
            if (tiles[row + x].pickedBy == player2) {
                count++;
            } else if (tiles[row + x].pickedBy == null) {
                freetile = tiles[row + x];
            }
        }
        if (count == 2 && freetile != null) {
            goodTileSpots.push(freetile);
        }
    }


    for (var x = 0; x < 3; x++) {
        count = 0;
        freetile = null;
        for (var y = 0; y <= 6; y += 3) {
            if (tiles[x + y].pickedBy == player2) {
                count++;
            } else if (tiles[x + y].pickedBy == null) {
                freetile = tiles[x + y];
            }
        }
        if (count == 2 && freetile != null) {
            goodTileSpots.push(freetile);
        }
    }

    if (goodTileSpots.length > 0) {
        pick(getRandom(goodTileSpots));
        return;
    }

    goodTileSpots = [];

    //Try to anticipate diagonal wins by opponent

    var diagonalSpots = [[tiles[0], tiles[4], tiles[8]], [tiles[2], tiles[4], tiles[6]]]

    for (let tileArray of diagonalSpots) {
        count = 0;
        freetile = null;
        for (let tile of tileArray) {
            if (tile.pickedBy == player1) {
                count++;
            } else if (tile.pickedBy == null) {
                freetile = tile;
            }
        }

        if (count == 2 && freetile != null) {
            goodTileSpots.push(freetile);
        }
    }

    //Try to anticipate wins by opponent


    for (var row = 0; row <= 6; row += 3) {
        count = 0;
        freetile = null;
        for (var x = 0; x < 3; x++) {
            if (tiles[row + x].pickedBy == player1) {
                count++;
            } else if (tiles[row + x].pickedBy == null) {
                freetile = tiles[row + x];
            }
        }
        if (count == 2 && freetile != null) {
            goodTileSpots.push(freetile);
        }
    }


    for (var x = 0; x < 3; x++) {
        count = 0;
        freetile = null;
        for (var y = 0; y <= 6; y += 3) {
            if (tiles[x + y].pickedBy == player1) {
                count++;
            } else if (tiles[x + y].pickedBy == null) {
                freetile = tiles[x + y];
            }
        }
        if (count == 2 && freetile != null) {
            goodTileSpots.push(freetile);
        }
    }

    if (goodTileSpots.length > 0) {
        pick(getRandom(goodTileSpots));
        return;
    }

    //Try to place at decent location
    let checkedTiles = [];
    let directions = [-3, 3, -1, 1];
    let pickedTile;
    while (checkedTiles.length != tiles.length) {
        pickedTile = getRandom(tiles);
        while (checkedTiles.includes(pickedTile)) {
            pickedTile = getRandom(tiles);
        }
        checkedTiles.push(pickedTile);
        if (pickedTile.pickedBy == player1) {
            var index = tiles.indexOf(pickedTile);
            for (var i = 0; i < directions.length; i++) {
                let newIndex = index + directions[i];
                if (newIndex >= 0 && newIndex < tiles.length) {
                    pick(tiles[newIndex]);
                    return;
                }
            }
        }
    }
    checkedTiles = [];
    while (checkedTiles.length != tiles.length) {
        pickedTile = getRandom(tiles);
        while (checkedTiles.includes(pickedTile)) {
            pickedTile = getRandom(tiles);
        }
        checkedTiles.push(pickedTile);
        if (pickedTile.pickedBy == null) {
            pick(pickedTile);
            return;
        }
    }

}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}



function switchPlayer() {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    renderGame();
}

function pick(tile) {
    $("#" + tile.id).text(currentPlayer.piece);
    tile.pickedBy = currentPlayer;
    if (isVictory()) {
        gameOver = true;
        let winnerText = "VINNARE: " + currentPlayer.name;
        if (draw) {
            winnerText = "INGEN VANN";
        }
        $("#victoryText").text(winnerText);
        $("#victory").show();
    } else {
        switchPlayer();
        if (currentPlayer == player2 && player2.isCPU) {
            playAI();
        }
    }
}

function initClickHandling() {
    $("." + tileClass).unbind();
    $("." + tileClass).click(function () {
        if (gameOver) return;

        if (currentPlayer.isCPU == false) {
            let clickedId = this.id;
            for (let tile of tiles) {
                if (tile.id == clickedId) {
                    if (tile.pickedBy == null) {
                        pick(tile);
                        return;
                    }
                }
            }
        }
    });
}

function displayPlaying() {
    $("#currentlyPlaying").text(currentPlayer.name);
}

function initTilesArray() {
    $(".ttt-tile").empty();
    tiles = [];
    for (var i = 1; i <= 9; i++) {
        tiles.push({
            id: 'tile-' + i,
            pickedBy: null
        });
    }
}

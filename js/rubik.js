/**
 * Created by Simon on 23/02/2016.
 */

function  newPiece(colorX, colorY, colorZ) {
    return [colorX, colorY, colorZ]
}


function  clonePiece(piece) {
    return piece.slice();
}


function newCube(n) {
    // TODO: check n
    var colorX = Array(n);
    colorX[0] = 'B';
    colorX[n-1] = 'F';
    var colorY = Array(n);
    colorY[0] = 'L';
    colorY[n-1] = 'R';
    var colorZ = Array(n);
    colorZ[0] = 'D';
    colorZ[n-1] = 'U';

    var cube = Array(n);
    for (var i=0; i<n; i++) {
        cube[i] = Array(n);
        for (var j = 0; j < n; j++) {
            cube[i][j] = Array(n);
          for (var k = 0; k < n; k++) {
              cube[i][j][k] = newPiece(colorX[i], colorY[j], colorZ[k]);
            }
        }
    }
    return cube;
}


function cloneCube(cube) {
    var n = cube.length;
    var clone = Array(n);
    for (var i=0; i<n; i++) {
        clone[i] = Array(n);
        for (var j = 0; j < n; j++) {
            clone[i][j] = Array(n);
          for (var k = 0; k < n; k++) {
              clone[i][j][k] = clonePiece(cube[i][j][k]);
            }
        }
    }
    return clone;
}


function flipPiece(piece, axis) {
    switch(axis) {
        case 0:
            return newPiece(piece[0], piece[2], piece[1]);
        case 1:
            return newPiece(piece[2], piece[1], piece[0]);
        case 2:
            return newPiece(piece[1], piece[0], piece[2]);
    }
}


function flipCube(cube, axis, slice, clockwise) {
    var flipped = cloneCube(cube);
    var n = cube.length;
    if (typeof(clockwise)=='undefined')
        clockwise = true;

    for (var i=0; i<n; i++) {
        for (var j=0; j<n; j++) {
            switch(axis) {
                case 0:
                    if (clockwise)
                        flipped[slice][j][-i+n-1] = flipPiece(cube[slice][i][j], axis);
                    else
                        flipped[slice][-j+n-1][i] = flipPiece(cube[slice][i][j], axis);
                    break;
                case 1:
                    if (clockwise)
                        flipped[-j+n-1][slice][i] = flipPiece(cube[i][slice][j], axis);
                    else
                        flipped[j][slice][-i+n-1] = flipPiece(cube[i][slice][j], axis);
                    break;
                case 2:
                    if (clockwise)
                        flipped[j][-i+n-1][slice] = flipPiece(cube[i][j][slice], axis);
                    else
                        flipped[-j+n-1][i][slice] = flipPiece(cube[i][j][slice], axis);
                    break;
            }
        }
    }
    return flipped;
}


function flipNCube(cube, axis, slice, clockwise, n) {
    var flipped = cloneCube(cube);
    for (var i=0; i<n; i++) {
        flipped = flipCube(flipped, axis, slice, clockwise);
    }
    return flipped;
}


function getFace(cube, name) {
    var n = cube.length;
    var face = Array(n);

    for(var i = 0; i < n; i++) {
        face[i] = Array(n);
        for(var j = 0; j< n; j++ ) {
            switch(name) {
                case 'B':
                    face[i][j] = cube[0][n-1-j][n-1-i][0];
                    break;
                case 'F':
                    face[i][j] = cube[n-1][j][n-1-i][0];
                    break;
                case 'L':
                    face[i][j] = cube[j][0][n-1-i][1];
                    break;
                case 'R':
                    face[i][j] = cube[n-1-j][n-1][n-1-i][1];
                    break;
                case 'D':
                    face[i][j] = cube[n-1-i][j][0][2];
                    break;
                case 'U':
                    face[i][j] = cube[i][j][n-1][2];
                    break;
            }
        }
    }

    return face;
}


function printFace(face, colors) {
    var table = "<table class='rb-face'>\n";
    for(var i = 0; i < face.length; i++) {
        table += "<tr>";
        for(var j = 0; j < face[i].length; j++) {
            table += "<td style=\"background-color: " + colors[face[i][j]] + ";\">" + "" + "</td>"
        }
        table += "</tr>\n";
    }
    table += "</table>";
    return table;
}


function printCube(cube, colors) {
    var out = "<div><div class='rb-face'></div>" + printFace(getFace(cube, 'U'), colors) + "</div>";
    out += "<div>";
    out += printFace(getFace(cube, 'L'), colors);
    out += printFace(getFace(cube, 'F'), colors);
    out += printFace(getFace(cube, 'R'), colors);
    out += printFace(getFace(cube, 'B'), colors);
    out += "</div>";
    out += "<div><div class='rb-face'></div>" + printFace(getFace(cube, 'D'), colors) + "</div>";
    return out;
}


function moveCube(cube, move) {
    var n = cube.length;
    switch(move) {
        case "B":
            return flipCube(cube, 0, 0, false);
        case "B'":
            return flipCube(cube, 0, 0, true);
        case "F":
            return flipCube(cube, 0, n-1, true);
        case "F'":
            return flipCube(cube, 0, n-1, false);
        case "L":
            return flipCube(cube, 1, 0, false);
        case "L'":
            return flipCube(cube, 1, 0, true);
        case "R":
            return flipCube(cube, 1, n-1, true);
        case "R'":
            return flipCube(cube, 1, n-1, false);
        case "D":
            return flipCube(cube, 2, 0, false);
        case "D'":
            return flipCube(cube, 2, 0, true);
        case "U":
            return flipCube(cube, 2, n-1, true);
        case "U'":
            return flipCube(cube, 2, n-1, false);
    }
}


function randomMove() {
    var moves = ["B", "B'", "F", "F'", "L", "L'", "R", "R'", "D", "D'", "U", "U'"];
    var ind = Math.floor(Math.random() * moves.length);
    return moves[ind];
}


function shuffleCube(cube, n, moves) {
    var shuffled = cloneCube(cube);
    moves = Array(n);
    for (var i=0; i<n; i++) {
        moves[i] = randomMove();
        shuffled = moveCube(shuffled, moves[i]);
    }
    return shuffled;
}


function printSettings() {
    var out = "<div class='rb-face'>";
    out += "<button onclick='reset(n);'>Reset</button>";
    out += "</div>";
    out += "<div class='rb-face'></div>";
    out += "<div class='rb-face'>";
    out += "<button onclick='shuffle(nshuffle);'>Shuffle</button>"
    out += "</div>";
    return out;
}


function printMoveFace(mv) {
    var out = "<div class='rb-face'>";
    out += "<button onclick='move(&quot;" + mv + "&quot;);'>" + mv + "</button>";
    out += "<button onclick='move(&quot;" + mv + "&apos;&quot;);'>" + mv + "&apos;</button>";
    out += "</div>";
    return out;
}


function printMoves() {
    var out = "<div class='rb-face'></div>";
    out += printMoveFace('U');
    out += "<div>";
    out += printMoveFace('L');
    out += printMoveFace('F');
    out += printMoveFace('R');
    out += printMoveFace('B');
    out += "</div>";
    out += "<div class='rb-face'></div>";
    out += printMoveFace('D');
    return out;
}


function refresh() {
    document.getElementById('cube').innerHTML = printCube(cube, colors);
}

function reset(n) {
    cube = newCube(n);
    refresh();
}

function shuffle(n) {
    cube = shuffleCube(cube, 20);
    refresh();
}

function move(mv) {
    cube = moveCube(cube, mv);
    refresh();
}

/**
 * Created by Simon on 23/02/2016.
 */
function newPiece(colors) {
    var object = {colorX:colors[0], colorY:colors[1], colorZ:colors[2]};
    return object;
}

function clonePiece(piece) {
    var clone =  newPiece([piece.colorX, piece.colorY, piece.colorZ]);
    return clone;
}

function newCube() {
    var cube = [];
    for (var i=0; i<3; i++) {
        cube[i] = [];
        for (var j = 0; j < 3; j++) {
            cube[i][j] = [null, null, null];
        }
    }
    // bottom stage
    var z = 'yellow';
    var y = 'green';
    cube[0][0][0] = newPiece(['orange',y,z]);
    cube[1][0][0] = newPiece([null,y,z]);
    cube[2][0][0] = newPiece(['red',y,z]);
    y = null;
    cube[0][1][0] = newPiece(['orange',y,z]);
    cube[1][1][0] = newPiece([null,y,z]);
    cube[2][1][0] = newPiece(['red',y,z]);
    y = 'blue';
    cube[0][2][0] = newPiece(['orange',y,z]);
    cube[1][2][0] = newPiece([null,y,z]);
    cube[2][2][0] = newPiece(['red',y,z]);

    // middle stage
    z = null;
    y = 'green';
    cube[0][0][1] = newPiece(['orange',y,z]);
    cube[1][0][1] = newPiece([null,y,z]);
    cube[2][0][1] = newPiece(['red',y,z]);
    y = null;
    cube[0][1][1] = newPiece(['orange',y,z]);
    cube[1][1][1] = newPiece([null,y,z]);
    cube[2][1][1] = newPiece(['red',y,z]);
    y = 'blue';
    cube[0][2][1] = newPiece(['orange',y,z]);
    cube[1][2][1] = newPiece([null,y,z]);
    cube[2][2][1] = newPiece(['red',y,z]);

    // top stage
    z = 'white';
    y = 'green';
    cube[0][0][2] = newPiece(['orange',y,z]);
    cube[1][0][2] = newPiece([null,y,z]);
    cube[2][0][2] = newPiece(['red',y,z]);
    y = null;
    cube[0][1][2] = newPiece(['orange',y,z]);
    cube[1][1][2] = newPiece([null,y,z]);
    cube[2][1][2] = newPiece(['red',y,z]);
    y = 'blue';
    cube[0][2][2] = newPiece(['orange',y,z]);
    cube[1][2][2] = newPiece([null,y,z]);
    cube[2][2][2] = newPiece(['red',y,z]);

    return cube;
}

function cloneCube(cube) {
    var clone = [];

    for (var i=0; i<cube.length; i++) {
        clone[i] = [];
        for (var j = 0; j < cube[i].length; j++) {
            clone[i][j] = [];
            for (var k = 0; k < cube[i][j].length; k++) {
                clone[i][j][k] = clonePiece(cube[i][j][k]);
            }
        }
    }
    return clone;
}

function getFace(cube, axis, coord) {
    var face = [];
    var i;
    var j;
    switch(axis) {
        case 'x':
            for(i = 0; i < 3; i++) {
                face[i] = [];
                for(j = 0; j< 3; j++ ) {
                    if (coord==2)
                        face[i][j] = cube[coord][j][2-i].colorX;
                    else
                        face[i][j] = cube[coord][j][i].colorX;
                }
            }
            break;

        case 'y':
            for(i = 0; i < 3; i++) {
                face[i] = [];
                for(j = 0; j< 3; j++ ) {
                    if (coord==2)
                        face[i][j] = cube[i][coord][2-j].colorY;
                    else
                        face[i][j] = cube[i][coord][j].colorY;
                }
            }
            break;

        case 'z':
            for(i = 0; i < 3; i++) {
                face[i] = [];
                for(j = 0; j< 3; j++ ) {
                    if (coord==0)
                        face[i][j] = cube[2-i][j][coord].colorZ;
                    else
                        face[i][j] = cube[i][j][coord].colorZ;
                }
            }
            break;
    }

    return face;
}

function printFace(face) {

    var table = "<table class='face'>";
    for(var i = 0; i < face.length; i++) {
        table += "<tr>";
        for(var j = 0; j < face[i].length; j++) {
            table += "<td style=\"background-color: " + face[i][j] + ";\"></td>"
        }
        table += "</tr>";
    }
    table += "</table>";

    return table;
}


function flipPiece(piece, axis) {
    var flipped = clonePiece(piece);
    switch(axis) {
        case 'x':
            flipped.colorY = piece.colorZ;
            flipped.colorZ = piece.colorY;
            break;
        case 'y':
            flipped.colorZ = piece.colorX;
            flipped.colorX = piece.colorZ;
            break;
        case 'z':
            flipped.colorY = piece.colorX;
            flipped.colorX = piece.colorY;
            break;
    }

    return flipped;
}

function flipCube(cube, axis, coord) {
    var flipped = cloneCube(cube);

    switch(axis) {
        case 'x':
            for (var i=0; i<3; i++) {
                for (var j=0; j<3; j++) {
                    flipped[coord][j][-(i-1)+1] = flipPiece(cube[coord][i][j], axis);
                }
            }
            break;

        case 'y':
            for (var i=0; i<3; i++) {
                for (var j=0; j<3; j++) {
                    flipped[-(j-1)+1][coord][i] = flipPiece(cube[i][coord][j], axis);
                }
            }
            break;

        case 'z':
            for (var i=0; i<3; i++) {
                for (var j=0; j<3; j++) {
                    flipped[j][-(i-1)+1][coord] = flipPiece(cube[i][j][coord], axis);
                }
            }
            break;
    }

    return flipped;
}


function flipNCube(cube, axis, coord, n) {
    var flipped = cloneCube(cube);
    for (var i=0; i<n; i++) {
        flipped = flipCube(flipped, axis, coord);
    }
    return flipped;
}



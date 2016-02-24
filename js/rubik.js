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
    var table = "<table class='face'>";
    for(var i = 0; i < face.length; i++) {
        table += "<tr>";
        for(var j = 0; j < face[i].length; j++) {
            table += "<td style=\"background-color: " + colors[face[i][j]] + ";\"></td>"
        }
        table += "</tr>";
    }
    table += "</table>";

    return table;
}

function printCube(mycube, colors) {
    var div = "<div class='cube'>\n";
    div += "<div id='faceU' class='face-decal'>" + printFace(getFace(mycube, 'U'), colors) + "</div>\n"
    div += "<div id='faceL' class='face-inline'>" + printFace(getFace(mycube, 'L'), colors) + "</div>\n"
    div += "<div id='faceF' class='face-inline'>" + printFace(getFace(mycube, 'F'), colors) + "</div>\n"
    div += "<div id='faceR' class='face-inline'>" + printFace(getFace(mycube, 'R'), colors) + "</div>\n"
    div += "<div id='faceB' class='face-inline'>" + printFace(getFace(mycube, 'B'), colors) + "</div>\n"
    div += "<div id='faceD' class='face-decal'>" + printFace(getFace(mycube, 'D'), colors) + "</div>\n"
    div += "</div>\n";
    return div;
}

/**
 * Created by Simon on 23/02/2016.
 */
function newPiece(colors) {
    var object = {colorX:colors[0], colorY:colors[1], colorZ:colors[2]};
    return object;
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



/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var size = 3;
var myCube = new Cube(size);
var varname = 'myCube'
var myIds = Cube.ids('my-cube', 'my-moves', 'my-nshuf', 'my-txtmov');

myCube.refresh(myIds.cube, myIds.moves);
document.getElementById('my-ctrl').innerHTML = Cube.movesCtrlHTML(varname, myIds) + Cube.playCtrlHTML(varname, myIds);

var moveKeys = {
    66: "B",
    70: "F",
    82: "R",
    76: "L",
    68: "D",
    85: "U"
}

document.addEventListener('keydown', function(e) {
    var key = moveKeys[e.keyCode];
    if (key != undefined) {
        if (e.shiftKey)
            key += e.ctrlKey ? "2" : "'";
        else if (e.ctrlKey)
            return false;
        myCube.move(key).refresh('my-cube', 'my-moves');
    }
    return false;
});

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

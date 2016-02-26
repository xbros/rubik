/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var myCube = new Cube(n);
var varname = 'myCube'
var ids = Cube.ids('my-cube', 'my-moves', 'my-nshuf', 'my-txtmov');
myCube.refresh(ids);
document.getElementById('my-ctrl').innerHTML = Cube.movesCtrlHTML(varname, ids) + Cube.playCtrlHTML(varname, ids);

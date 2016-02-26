/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var cube = new Cube(n);
var varname = 'cube'
var ids = Cube.ids('rb-cube', 'rb-moves', 'rb-nshuf', 'rb-txtmov');
cube.refresh(ids);
document.getElementById('rb-ctrl').innerHTML = Cube.movesCtrlHTML(varname, ids) + Cube.playCtrlHTML(varname, ids);

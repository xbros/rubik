/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var cube = new Cube(n);
var varname = 'cube'
var ids = Cube.ids('cube', 'moves', 'nshuf', 'strmov');
cube.refresh(ids);
document.getElementById('controls').innerHTML = Cube.movesCtrlHTML(varname, ids) + Cube.playCtrlHTML(varname, ids);

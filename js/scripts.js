/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var nshuffle = 20;
var cube = newCube(n);
var colors = {U:'#FFF', L:'#0F0', F:'#F00', R:'#00F', B:'#F0F', D:'#FF0'};

refresh();
document.getElementById('settings').innerHTML = printSettings();
document.getElementById('moves').innerHTML = printMoves();

/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var mycube = newCube(n);
mycube = flipCube(mycube, 0, n-1);
mycube = flipCube(mycube, 1, n-1, false);
mycube = flipNCube(mycube, 2, 0, true, 2);

var colors = {U:'#FFF', L:'#0F0', F:'#F00', R:'#00F', B:'#F0F', D:'#FF0'};
document.getElementById('cube').innerHTML = printCube(mycube, colors);

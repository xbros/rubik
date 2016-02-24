/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var n = 3;
var mycube = newCube(n);
mycube = flipCube(mycube, 0, n-1);
mycube = flipCube(mycube, 1, n-1, false);
mycube = flipNCube(mycube, 2, 0, true, 2);

var colors = {U:'white', L:'green', F:'red', R:'blue', B:'orange', D:'yellow'};
document.getElementById('cube').innerHTML = printCube(mycube, colors);

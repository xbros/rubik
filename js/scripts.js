/**
 * Created by Simon on 22/02/2006.
 * scripts test
 */

var mycube = newCube();

mycube = flipNCube(mycube, 'y', 2, 3);

document.getElementById('facew').innerHTML = printFace(getFace(mycube, 'z', 2));
document.getElementById('facer').innerHTML = printFace(getFace(mycube, 'x', 2));
document.getElementById('faceb').innerHTML = printFace(getFace(mycube, 'y', 2));
document.getElementById('faceo').innerHTML = printFace(getFace(mycube, 'x', 0));
document.getElementById('faceg').innerHTML = printFace(getFace(mycube, 'y', 0));
document.getElementById('facey').innerHTML = printFace(getFace(mycube, 'z', 0));
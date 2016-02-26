/**
 * Created by Simon on 23/02/2016.
 */

var Cube = (function() {

    // TODO: check arguments

    var _colors = {U:'#FFF', L:'#0F0', F:'#F00', R:'#00F', B:'#F0F', D:'#FF0'};

    var _moves = ["B", "B'", "B2",
        "F", "F'", "F2",
        "L", "L'", "L2",
        "R", "R'", "R2",
        "D", "D'", "D2",
        "U", "U'", "U2"];

    var _moveIndices = {
        "B": 0, "B'": 1, "B2": 2,
        "F": 3, "F'": 4, "F2": 5,
        "L": 6, "L'": 7, "L2": 8,
        "R": 9, "R'": 10, "R2": 11,
        "D": 12, "D'": 13, "D2": 14,
        "U": 15, "U'": 16, "U2": 17
    };

    var _inverseIndices = [1, 0, 2, 4, 3, 5, 7, 6, 8, 10, 9, 11, 13, 12, 14, 16, 15, 17];

    var _moveFuns = {
          "B": function(cube) { return _rotate(cube, 0, 0, false); },
          "B'": function(cube) { return _rotate(cube, 0, 0, true); },
          "B2": function(cube) { return _rotate(cube, 0, 0, true, 2); },
          "F": function(cube) { return _rotate(cube, 0, cube.size-1, true); },
          "F'": function(cube) { return _rotate(cube, 0, cube.size-1, false); },
          "F2": function(cube) { return _rotate(cube, 0, cube.size-1, false, 2); },
          "L": function(cube) { return _rotate(cube, 1, 0, false); },
          "L'": function(cube) { return _rotate(cube, 1, 0, true); },
          "L2": function(cube) { return _rotate(cube, 1, 0, true, 2); },
          "R": function(cube) { return _rotate(cube, 1, cube.size-1, true); },
          "R'": function(cube) { return _rotate(cube, 1, cube.size-1, false); },
          "R2": function(cube) { return _rotate(cube, 1, cube.size-1, false, 2); },
          "D": function(cube) { return _rotate(cube, 2, 0, false); },
          "D'": function(cube) { return _rotate(cube, 2, 0, true); },
          "D2": function(cube) { return _rotate(cube, 2, 0, true, 2); },
          "U": function(cube) { return _rotate(cube, 2, cube.size-1, true); },
          "U'": function(cube) { return _rotate(cube, 2, cube.size-1, false); },
          "U2": function(cube) { return _rotate(cube, 2, cube.size-1, false, 2); }
    }

    function _Piece(other) {
        other = other || [undefined, undefined, undefined];
        this.init(other);
    }

    _Piece.prototype.init = function(other) {
        this[0] = other[0];
        this[1] = other[1];
        this[2] = other[2];
        return this;
    };

    _Piece.prototype.rotate = function(axis) {
        var tmp;
        switch(axis) {
            case 0:
                tmp = this[1]; this[1] = this[2]; this[2] = tmp; break;
            case 1:
                tmp = this[0]; this[0] = this[2]; this[2] = tmp; break;
            case 2:
                tmp = this[0]; this[0] = this[1]; this[1] = tmp; break;
            default:
                throw('Invalid axis' + axis);
        }
        return this;
    };

    function Cube(n) {
        this.resize(n).reset();
    }

    Cube.prototype.resize = function(n) {
        if (typeof n == 'undefined')
            n = 3;
        this.size = n;
        this.state = Array(n);
        this.buffer = Array(n); // to avoid allocating new cube for each move
        for (var i=0; i<n; i++) {
            this.state[i] = Array(n);
            this.buffer[i] = Array(n);
            for (var j = 0; j < n; j++) {
                this.state[i][j] = Array(n);
                this.buffer[i][j] = Array(n);
                    for (var k = 0; k < n; k++) {
                        this.state[i][j][k] = new _Piece();
                        this.buffer[i][j][k] = new _Piece();
                }
            }
        }
        return this.reset();
    }

    Cube.prototype.reset = function() {
        var n = this.size;
        var colX = Array(n); colX[0] = 'B'; colX[n-1] = 'F';
        var colY = Array(n); colY[0] = 'L'; colY[n-1] = 'R';
        var colZ = Array(n); colZ[0] = 'D'; colZ[n-1] = 'U';
        for (var i=0; i<n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++)
                    this.state[i][j][k].init([colX[i], colY[j], colZ[k]]);
            }
        }
        this.moves = [];
        return this;
    };

    Cube.prototype.init = function(other) {
        if (!other)
            return this.reset();

        if (this.size != other.size)
            this.resize(other.size);

        var n = this.size;
        for (var i=0; i<n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {
                    this.state[i][j][k].init(other.state[i][j][k]);
                }
            }
        }
        this.moves = other.moves.slice();
        return this;
    };

    Cube.prototype.bufferize = function() {
        var n = this.size;
        for (var i=0; i<n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {
                    this.buffer[i][j][k].init(this.state[i][j][k]);
                }
            }
        }
        return this;
    };

    Cube.prototype.swap = function() {
        var tmp = this.state;
        this.state = this.buffer;
        this.buffer = tmp;
        return this;
    };

    Cube.prototype.clone = function() {
        var clone = new Cube(this.size);
        return clone.init(this);
    };

    function _rotate(cube, axis, slice, clockwise, num) {
        if (typeof clockwise == 'undefined')
            clockwise = true;
        if (typeof num == 'undefined')
            num = 1;

        var n = cube.size;
        for (var k=0; k<num; k++) {
            cube.bufferize();
            for (var i=0; i<n; i++) {
                for (var j=0; j<n; j++) {
                    switch(axis) {
                        case 0:
                            if (clockwise)
                                cube.buffer[slice][j][-i+n-1].init(cube.state[slice][i][j]).rotate(axis);
                            else
                                cube.buffer[slice][-j+n-1][i].init(cube.state[slice][i][j]).rotate(axis);
                            break;
                        case 1:
                            if (clockwise)
                                cube.buffer[-j+n-1][slice][i].init(cube.state[i][slice][j]).rotate(axis);
                            else
                                cube.buffer[j][slice][-i+n-1].init(cube.state[i][slice][j]).rotate(axis);
                            break;
                        case 2:
                            if (clockwise)
                                cube.buffer[j][-i+n-1][slice].init(cube.state[i][j][slice]).rotate(axis);
                            else
                                cube.buffer[-j+n-1][i][slice].init(cube.state[i][j][slice]).rotate(axis);
                            break;
                    }
                }
            }
            cube.swap();
        }
        return cube;
    };

    Cube.prototype.move = function(moves) {
        var n = this.size;
        moves = Cube.parseMoves(moves);
        for (var i = 0; i<moves.length; i++) {
            if (!moves[i])
                continue;
            (_moveFuns[moves[i]])(this);
            this.moves.push(moves[i]);
        }
        return this;
    };

    Cube.parseMoves = function(moves) {
        if (!moves)
            return moves;
        if (typeof moves == 'string')
            moves = moves.trim().split(/ +/);
        var ind;
        for (var i=0; i<moves.length; i++) {
            if (!moves[i])
                continue;
            ind = _moveIndices[moves[i]];
            if (ind === undefined) {
                alert('Invalid move ' + moves[i]);
                throw('Invalid move ' + moves[i]);
            }
        }
        return moves;
    }

    Cube.inverse = function(moves) {
        if (!moves)
            return moves;
        var inv = Cube.parseMoves(moves);
        for (var i=0; i<inv.length; i++) {
            if (!inv[i])
                continue;
            inv[i] = _moves[_inverseIndices[_moveIndices[inv[i]]]];
        }
        return inv.reverse();
    };

    Cube.prototype.moveInv = function(moves) {
        return this.move(Cube.inverse(moves));
    };

    Cube.prototype.rewind = function(n) {
        if (typeof n == 'undefined')
            n = 1;
        if (this.moves.length == 0)
            return this;
        this.moveInv(this.moves.pop());
        this.moves.pop();
        return this;
    };

    Cube.prototype.shuffle = function(n, moves) {
        moves = Array(n);
        var ind = Math.floor(Math.random() * _moves.length);
        moves[0] = _moves[ind];
        var indOld;
        for (var i=1; i<n; i++) {
            indOld = ind;
            ind = Math.floor(Math.random() * (_moves.length-1));
            if (ind >= _inverseIndices[indOld]) // avoid inverse move
                ind += 1;
            moves[i] = _moves[ind];
        }
        return this.move(moves);
    };

    Cube.prototype.face = function(name) {
        var n = this.size;
        var face = Array(n);

        for(var i = 0; i < n; i++) {
            face[i] = Array(n);
            for(var j = 0; j< n; j++ ) {
                switch(name) {
                    case 'B':
                        face[i][j] = this.state[0][n-1-j][n-1-i][0]; break;
                    case 'F':
                        face[i][j] = this.state[n-1][j][n-1-i][0]; break;
                    case 'L':
                        face[i][j] = this.state[j][0][n-1-i][1]; break;
                    case 'R':
                        face[i][j] = this.state[n-1-j][n-1][n-1-i][1]; break;
                    case 'D':
                        face[i][j] = this.state[n-1-i][j][0][2]; break;
                    case 'U':
                        face[i][j] = this.state[i][j][n-1][2]; break;
                    default:
                        throw('Invalid face ' + name);
                        return undefined;
                }
            }
        }
        return face;
    };

    Cube.prototype.toHTML = function(colors) {
        colors = colors || _colors;
        var out = "<div><div class='rb-face'></div>";
        out += Cube.faceHTML(this.face('U'), colors);
        out += "<div class='rb-face'></div><div class='rb-face'></div></div>";
        out += "<div>";
        out += Cube.faceHTML(this.face('L'), colors);
        out += Cube.faceHTML(this.face('F'), colors);
        out += Cube.faceHTML(this.face('R'), colors);
        out += Cube.faceHTML(this.face('B'), colors);
        out += "</div>";
        out += "<div><div class='rb-face'></div>";
        out += Cube.faceHTML(this.face('D'), colors);
        return out += "<div class='rb-face'></div><div class='rb-face'></div></div>";
    };

    Cube.prototype.refresh = function(cubeId, movesId, colors) {
        colors = colors || _colors;
        document.getElementById(cubeId).innerHTML = this.toHTML(colors);
        document.getElementById(movesId).innerHTML = this.moves.join(' ');
        return this;
    };

    Cube.faceHTML = function(face, colors) {
        colors = colors || _colors;
        var out = "<table class='rb-face'>\n";
        for(var i = 0; i < face.length; i++) {
            out += "<tr>";
            for(var j = 0; j < face[i].length; j++)
                out += "<td style=\"background-color: " + colors[face[i][j]] + ";\">" + "" + "</td>"
            out += "</tr>\n";
        }
        return out += "</table>";
    };

    Cube.ids = function(cube, moves, nshuf, txtmov) {
        nshuf = nshuf || 'my-nshuf';
        txtmov = txtmov || 'my-txtmov';
        return {
            cube: cube,
            moves: moves,
            nshuf: nshuf,
            txtmov: txtmov
        }
    };

    function _refreshHTML(ids) {
       return ".refresh(&quot;" + ids.cube + "&quot;, &quot;" + ids.moves + "&quot;)";
    }

    Cube.faceMoveCtrlHTML = function(move, varname, ids) {
        ids = ids || Cube.ids();
        var out = "<div class='rb-face'>";
        out += "<button class='rb-btn' onclick='" + varname + ".move(&quot;" + move + "&quot;)" + _refreshHTML(ids) + ";'><i class='fa fa-_rotate-right'></i> " + move + "</button>";
        out += "<button class='rb-btn' onclick='" + varname + ".move(&quot;" + move + "&apos;&quot;)" + _refreshHTML(ids) + ";'><i class='fa fa-_rotate-left'></i> " + move + "&apos;</button>";
        out += "<br><button class='rb-btn' onclick='" + varname + ".move(&quot;" + move + "2&quot;)" + _refreshHTML(ids) + ";'><i class='fa fa-refresh'></i> " + move + "2</button>";
        return out += "</div>";
    };

    Cube.movesCtrlHTML = function(varname, ids) {
        ids = ids || Cube.ids();
        var out = "<div class='rb-ctrl-row'><div class='rb-face'></div>";
        out += Cube.faceMoveCtrlHTML('U', varname, ids);
        out += "<div class='rb-face'></div><div class='rb-face'></div></div>";
        out += "<div class='rb-ctrl-row'>";
        out += Cube.faceMoveCtrlHTML('L', varname, ids);
        out += Cube.faceMoveCtrlHTML('F', varname, ids);
        out += Cube.faceMoveCtrlHTML('R', varname, ids);
        out += Cube.faceMoveCtrlHTML('B', varname, ids);
        out += "</div>";
        out += "<div class='rb-ctrl-row'><div class='rb-face'></div>";
        out += Cube.faceMoveCtrlHTML('D', varname, ids);
        return out += "<div class='rb-face'></div><div class='rb-face'></div></div>";
    };

    Cube.playCtrlHTML = function(varname, ids) {
        ids = ids || Cube.ids();

        var out = "<div class='rb-ctrl-row'>";
        out += "<div class='rb-face'>";
        out += "<button class='rb-btn' onclick='" + varname + ".reset()" + _refreshHTML(ids) + ";'><i class='fa fa-fast-backward'></i> Reset</button>";
        out += "</div>";
        out += "<div class='rb-face'>";
        out += "<button class='rb-btn' onclick='" + varname + ".rewind()" + _refreshHTML(ids) + ";'><i class='fa fa-step-backward'></i> Back</button>";
        out += "</div>";
        out += "<div class='rb-face'>";
        out += "<button class='rb-btn' onclick='" + varname + ".shuffle(document.getElementById(&quot;" + ids.nshuf + "&quot;).value)" + _refreshHTML(ids) + ";'><i class='fa fa-random'></i> Shuffle</button>";
        out += "</div>";
        out += "<div class='rb-face'>";
        out += "<input class='rb-input-num' id='" + ids.nshuf +"' name='" + ids.nshuf + "' type='number' value='20' min='1' max='40' class='rb-btn'></input>";
        out += "</div>";
        out += "</div>";

        out += "<div class='rb-ctrl-row'>";
        out += "<input class='rb-input-str' id='" + ids.txtmov + "' type='text' name='" + ids.txtmov + "'>";
        out += "<div class='rb-face'>";
        out += "<button onclick='" + varname + ".move(document.getElementById(&quot;" + ids.txtmov + "&quot;).value)" + _refreshHTML(ids) + ";'><i class='fa fa-play'></i> Play</button>";
        out += "</div>";
        out += "<div class='rb-face'>";
        out += "<button onclick='" + varname + ".moveInv(document.getElementById(&quot;" + ids.txtmov + "&quot;).value)" + _refreshHTML(ids) + ";'><i class='fa fa-play fa-_rotate-180'></i> Inverse</button>";
        out += "</div>";
        return out += "</div>";
    };

    return Cube;
})()

/**
 * created by LiuYing 2017-02-15
 */
var Tetris = (function () {
    function Tetris() {
        this.mapTable = [];
        this.rows = document.getElementsByClassName('row');
        this.previousCoorinates = [];
        this.currentCoorinates = [];
        this.timer = null;
        this.shape = 0;
        this.rotateNumer = 0;
        this.score = 0;
    }
    //创建对应的地图表
    Tetris.prototype.createMapTable = function () {
        var _this = this;
        for (var i = 0; i < 18; i++) {
            _this.mapTable.push([]);
        }
        _this.mapTable.forEach(function (table) {
            for (var i = 0; i < 10; i++) {
                table.push(true);
            }
        });
        for (var i = 0; i < 4; i++) {
            _this.previousCoorinates.push({ x: 0, y: 0 });
        }
    };
    //还原上一次的坐标
    Tetris.prototype._restorePrevious = function () {
        var _this = this;
        this.previousCoorinates.forEach(function (coorinate, index) {
            _this.currentCoorinates[index].x = coorinate.x;
            _this.currentCoorinates[index].y = coorinate.y;
        });
    };
    //创建地图
    Tetris.prototype.createMap = function () {
        var map = '';
        for (var i = 0; i < 18; i++) {
            var column = "";
            for (var j = 0; j < 10; j++) {
                column += "<div class='column'></div>";
            }
            map += "<div class=\"row\">" + column + "</div>";
        }
        document.getElementById("Tetris").innerHTML = map;
        this.createMapTable();
    };
    Tetris.prototype._getShape = function (Max, Min) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    };
    Tetris.prototype.suspend = function () {
        window.clearInterval(this.timer);
    };
    //创建俄罗斯方块
    Tetris.prototype.createTetris = function () {
        this.shape = this._getShape(1, 7);
        //方块的坐标
        if (this.shape == Shape.I) {
            this.currentCoorinates[0] = { x: 4, y: 0 };
            this.currentCoorinates[1] = { x: 4, y: 1 };
            this.currentCoorinates[2] = { x: 4, y: 2 };
            this.currentCoorinates[3] = { x: 4, y: 3 };
        }
        else if (this.shape == Shape.J) {
            this.currentCoorinates[0] = { x: 5, y: 0 };
            this.currentCoorinates[1] = { x: 5, y: 1 };
            this.currentCoorinates[2] = { x: 5, y: 2 };
            this.currentCoorinates[3] = { x: 4, y: 2 };
        }
        else if (this.shape == Shape.L) {
            this.currentCoorinates[0] = { x: 4, y: 0 };
            this.currentCoorinates[1] = { x: 4, y: 1 };
            this.currentCoorinates[2] = { x: 4, y: 2 };
            this.currentCoorinates[3] = { x: 5, y: 2 };
        }
        else if (this.shape == Shape.O) {
            this.currentCoorinates[0] = { x: 4, y: 0 };
            this.currentCoorinates[1] = { x: 5, y: 0 };
            this.currentCoorinates[2] = { x: 4, y: 1 };
            this.currentCoorinates[3] = { x: 5, y: 1 };
        }
        else if (this.shape == Shape.S) {
            this.currentCoorinates[0] = { x: 5, y: 0 };
            this.currentCoorinates[1] = { x: 5, y: 1 };
            this.currentCoorinates[2] = { x: 4, y: 1 };
            this.currentCoorinates[3] = { x: 4, y: 2 };
        }
        else if (this.shape == Shape.T) {
            this.currentCoorinates[0] = { x: 4, y: 0 };
            this.currentCoorinates[1] = { x: 5, y: 0 };
            this.currentCoorinates[2] = { x: 6, y: 0 };
            this.currentCoorinates[3] = { x: 5, y: 1 };
        }
        else {
            this.currentCoorinates[0] = { x: 4, y: 0 };
            this.currentCoorinates[1] = { x: 4, y: 1 };
            this.currentCoorinates[2] = { x: 5, y: 1 };
            this.currentCoorinates[3] = { x: 5, y: 2 };
        }
    };
    //渲染俄罗斯方块
    Tetris.prototype._renderTetris = function (shape) {
        var _this = this;
        var that = this;
        this.currentCoorinates.forEach(function (coorinate) {
            _this.rows[coorinate.y].children[coorinate.x].className = "column red";
        });
    };
    //擦除上一次的方块
    Tetris.prototype._wipeTetris = function () {
        var rows = this.rows;
        this.previousCoorinates.forEach(function (coorinate) {
            rows[coorinate.y].children[coorinate.x].className = "column";
        });
    };
    //拷贝一份,到上一次的坐标中
    Tetris.prototype._copyToPrevious = function () {
        var _this = this;
        this.currentCoorinates.forEach(function (item, index) {
            _this.previousCoorinates[index].x = item.x;
            _this.previousCoorinates[index].y = item.y;
        });
    };
    //改变坐标位置
    Tetris.prototype._updateCoordinates = function (direction) {
        var _this = this;
        this._copyToPrevious();
        if (direction == "left") {
            this.currentCoorinates.forEach(function (item, index) {
                _this.currentCoorinates[index] = { x: item.x - 1, y: item.y };
            });
            if (this._checkLeft() == false) {
                this._restorePrevious();
                return false;
            }
        }
        else if (direction == "right") {
            this.currentCoorinates.forEach(function (item, index) {
                _this.currentCoorinates[index] = { x: item.x + 1, y: item.y };
            });
            if (this._checkRight() == false) {
                this._restorePrevious();
                return false;
            }
        }
        else if (direction == "down") {
            this.currentCoorinates.forEach(function (item, index) {
                _this.currentCoorinates[index] = { x: item.x, y: item.y + 1 };
            });
            if (this._checkBottom() == false) {
                this._restorePrevious();
                this._updateMapTable();
                return false;
            }
        }
        else if (direction == "up") {
            this._rotate();
            this.currentCoorinates.forEach(function (coorinate) {
                if (!_this._checkRotate(coorinate.x, coorinate.y)) {
                    _this._restorePrevious();
                }
            });
        }
        return true;
    };
    Tetris.prototype._updateMapTable = function () {
        var _this = this;
        this.currentCoorinates.forEach(function (item) {
            _this.mapTable[item.y][item.x] = false;
        });
    };
    Tetris.prototype._checkTable = function () {
        var _this = this;
        for (var _i = 0, _a = this.currentCoorinates; _i < _a.length; _i++) {
            var coor = _a[_i];
            var status_1 = _this.mapTable[coor.y][coor.x];
            if (status_1 == false) {
                return false;
            }
        }
        return true;
    };
    Tetris.prototype._checkBottom = function () {
        var _this = this;
        for (var _i = 0, _a = this.currentCoorinates; _i < _a.length; _i++) {
            var coor = _a[_i];
            if (coor.y > 17) {
                return false;
            }
        }
        var status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    };
    Tetris.prototype._checkLeft = function () {
        for (var _i = 0, _a = this.currentCoorinates; _i < _a.length; _i++) {
            var coor = _a[_i];
            if (coor.x < 0) {
                return false;
            }
        }
        var status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    };
    Tetris.prototype._checkRight = function () {
        for (var _i = 0, _a = this.currentCoorinates; _i < _a.length; _i++) {
            var coor = _a[_i];
            if (coor.x > 9) {
                return false;
            }
        }
        var status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    };
    Tetris.prototype._checkRotate = function (x, y) {
        if (x > 9 || x < 0 || y > 17 || y < 0) {
            return false;
        }
        if (this.mapTable[y][x] == false) {
            return false;
        }
        return true;
    };
    Tetris.prototype._checkTop = function () {
        var _this = this;
        if (_this.currentCoorinates[3].y <= 3) {
            window.clearInterval(this.timer);
            alert('GAME OVER');
        }
    };
    Tetris.prototype._wipeLine = function () {
        var wipeList = [], _self = this, currLine = 0;
        this.mapTable.forEach(function (table, index) {
            var full = table.every(function (column) { return column === false; });
            if (full) {
                wipeList.push({ rowIndex: index });
                document.getElementById("score").innerText = _self.score += 1;
            }
        });
        if (wipeList.length > 0) {
            //进行数组交换
            wipeList.forEach(function (wipe, ixuanr) {
                _self.mapTable.splice(wipe.rowIndex, 1);
                var line = [];
                for (var i = 0; i < 10; i++) {
                    line.push(true);
                }
                _self.mapTable.unshift(line);
            });
            this.mapTable.forEach(function (map, index) {
                map.forEach(function (column, c) {
                    if (column == false)
                        _self.rows[index].children[c].setAttribute("class", "column red");
                    else {
                        _self.rows[index].children[c].setAttribute("class", "column");
                    }
                });
            });
        }
    };
    Tetris.prototype._rotate = function () {
        var _this = this;
        var centerX = 0;
        var centerY = 0;
        this.currentCoorinates.forEach(function (coorinate) {
            centerX += coorinate.x;
            centerY += coorinate.y;
        });
        //进行四舍五入
        centerX = Math.round(centerX / 4);
        centerY = Math.round(centerY / 4);
        //根据初中的旋转公式，x1=y-y0+x0,y1=x0-x+y0 
        //x0+y0-y，y0-x0+x
        if (this.rotateNumer > 4) {
            this.rotateNumer = 0;
        }
        else {
            this.rotateNumer++;
        }
        if (Shape.O != this.shape) {
            this.currentCoorinates.forEach(function (coorinate, index) {
                var afterX = centerY + centerX - coorinate.y;
                var afterY = centerY - centerX + coorinate.x;
                if ((_this.shape == Shape.O || _this.shape == Shape.Z || _this.shape == Shape.S || _this.shape == Shape.I) && _this.rotateNumer % 2 === 0) {
                    afterX -= 1;
                }
                coorinate.x = afterX;
                coorinate.y = afterY;
            });
        }
    };
    Tetris.prototype.start = function (speed) {
        var _this = this;
        //初次开始的时候先渲染一次
        // this.createMap();
        this._renderTetris(1);
        this.suspend();
        this.timer = setInterval(function () {
            var status = _this._updateCoordinates("down");
            if (status == false) {
                _this._checkTop();
                _this._wipeLine();
                _this.createTetris();
            }
            else {
                _this._wipeTetris();
            }
            _this._renderTetris(1);
        }, speed);
    };
    Tetris.prototype.operator = function () {
        var _this = this;
        window.addEventListener("keyup", function (event) {
            var key = window.event ? event.keyCode : event.which;
            if (key == 38) {
                _this._updateCoordinates("up");
            }
            else if (key == 40) {
                var status_2 = _this._updateCoordinates("down");
                if (status_2 == false)
                    return false;
            }
            else if (key == 37) {
                _this._updateCoordinates("left");
            }
            else if (key == 39) {
                _this._updateCoordinates("right");
            }
            _this._wipeTetris();
            _this._renderTetris(1);
        });
    };
    return Tetris;
}());
var Shape;
(function (Shape) {
    Shape[Shape["I"] = 1] = "I";
    Shape[Shape["J"] = 2] = "J";
    Shape[Shape["L"] = 3] = "L";
    Shape[Shape["O"] = 4] = "O";
    Shape[Shape["S"] = 5] = "S";
    Shape[Shape["T"] = 6] = "T";
    Shape[Shape["Z"] = 7] = "Z"; //右N形
})(Shape || (Shape = {}));

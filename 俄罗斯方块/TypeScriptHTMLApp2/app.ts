/**
 * created by LiuYing 2017-02-15
 */
class Tetris {
    private grade: number;
    private mapTable: Array<any>;
    private rows: any;
    private previousCoorinates: Array<Coorinate>;
    private currentCoorinates: Array<Coorinate>;
    private timer: any;
    private shape: number;
    private rotateNumer: number;
    private score: number;

    constructor() {
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
    public createMapTable() {
        let _this = this;
        for (let i = 0; i < 18; i++) {
            _this.mapTable.push([]);
        }

        _this.mapTable.forEach((table: any) => {
            for (let i = 0; i < 10; i++) {
                table.push(true);
            }
        });

        for (let i = 0; i < 4; i++) {
            _this.previousCoorinates.push({ x: 0, y: 0 });
        }
    }

    //还原上一次的坐标
    private _restorePrevious() {
        this.previousCoorinates.forEach((coorinate: Coorinate, index) => {
            this.currentCoorinates[index].x = coorinate.x;
            this.currentCoorinates[index].y = coorinate.y;
        });
    }

    //创建地图
    public createMap() {
        let map: string = '';
        for (let i = 0; i < 18; i++) {
            let column: string = ""
            for (let j = 0; j < 10; j++) {
                column += "<div class='column'></div>"
            }
            map += `<div class="row">${column}</div>`;
        }
        document.getElementById("Tetris").innerHTML = map;
        this.createMapTable();
    }

    protected _getShape(Max: number, Min: number): number {
        let Range = Max - Min;
        let Rand = Math.random();
        let num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }

    public suspend() {
        window.clearInterval(this.timer);
    }

    //创建俄罗斯方块
    public createTetris() {
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


    }
    //渲染俄罗斯方块
    private _renderTetris(shape) {
        let that: any = this;
        this.currentCoorinates.forEach((coorinate: Coorinate) => {
            this.rows[coorinate.y].children[coorinate.x].className = "column red";
        });

    }

    //擦除上一次的方块
    private _wipeTetris() {
        let rows: any = this.rows;
        this.previousCoorinates.forEach((coorinate: Coorinate) => {
            rows[coorinate.y].children[coorinate.x].className = "column";
        });
    }

    //拷贝一份,到上一次的坐标中
    private _copyToPrevious() {
        this.currentCoorinates.forEach((item, index) => {
            this.previousCoorinates[index].x = item.x;
            this.previousCoorinates[index].y = item.y;
        });
    }
    //改变坐标位置
    private _updateCoordinates(direction: string) {
        this._copyToPrevious();
        if (direction == "left") {
            this.currentCoorinates.forEach((item: Coorinate, index: number) => {
                this.currentCoorinates[index] = { x: item.x - 1, y: item.y };
            });
            if (this._checkLeft() == false) {
                this._restorePrevious();
                return false;
            }
        }
        else if (direction == "right") {
            this.currentCoorinates.forEach((item: Coorinate, index: number) => {
                this.currentCoorinates[index] = { x: item.x + 1, y: item.y };
            });
            if (this._checkRight() == false) {
                this._restorePrevious();
                return false;
            }
        }
        else if (direction == "down") {
            this.currentCoorinates.forEach((item: Coorinate, index: number) => {
                this.currentCoorinates[index] = { x: item.x, y: item.y + 1 };
            });
            if (this._checkBottom() == false) {
                this._restorePrevious();
                this._updateMapTable();
                return false;
            }
        }
        else if (direction == "up") {
            this._rotate();
            this.currentCoorinates.forEach((coorinate: Coorinate) => {
                if (!this._checkRotate(coorinate.x, coorinate.y)) {
                    this._restorePrevious();
                }
            });
        }
        return true;
    }


    private _updateMapTable() {
        this.currentCoorinates.forEach((item: Coorinate) => {
            this.mapTable[item.y][item.x] = false;
        });
    }

    private _checkTable() {
        let _this = this;
        for (let coor of this.currentCoorinates) {
            let status = _this.mapTable[coor.y][coor.x];
            if (status == false) {
                return false;
            }
        }
        return true;
    }

    private _checkBottom(): boolean {
        let _this = this;
        for (let coor of this.currentCoorinates) {
            if (coor.y > 17) {
                return false;
            }
        }
        let status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    }

    private _checkLeft() {
        for (let coor of this.currentCoorinates) {
            if (coor.x < 0) {
                return false;
            }
        }
        let status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    }

    private _checkRight() {
        for (let coor of this.currentCoorinates) {
            if (coor.x > 9) {
                return false;
            }
        }
        let status = this._checkTable();
        if (status == false) {
            return false;
        }
        return true;
    }

    private _checkRotate(x, y) {
        if (x > 9 || x < 0 || y > 17 || y < 0) {
            return false;
        }
        if (this.mapTable[y][x] == false) {
            return false;
        }
        return true;
    }

    private _checkTop() {
        let _this = this;
        if (_this.currentCoorinates[3].y <= 3) {
            window.clearInterval(this.timer);
            alert('GAME OVER');
        }


    }

    private _wipeLine() {
        let wipeList: any = [], _self: any = this, currLine = 0;
        this.mapTable.forEach((table, index) => {
            let full = table.every(function (column) { return column === false; });
            if (full) {
                wipeList.push({ rowIndex: index });
                document.getElementById("score").innerText = _self.score += 1;
            }
        });

        if (wipeList.length > 0) {
            //进行数组交换
            wipeList.forEach(function (wipe, ixuanr) {
                _self.mapTable.splice(wipe.rowIndex, 1);
                let line = [];
                for (let i = 0; i < 10; i++) {
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


    }

    private _rotate() {
        let centerX: number = 0;
        let centerY: number = 0;
        this.currentCoorinates.forEach((coorinate: Coorinate) => {
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
        } else {
            this.rotateNumer++;
        }
        if (Shape.O != this.shape) {
            this.currentCoorinates.forEach((coorinate: Coorinate, index: number) => {
                let afterX = centerY + centerX - coorinate.y;
                let afterY = centerY - centerX + coorinate.x;
                if ((this.shape == Shape.O || this.shape == Shape.Z || this.shape == Shape.S || this.shape == Shape.I) && this.rotateNumer % 2 === 0) {
                    afterX -= 1;
                }
                coorinate.x = afterX;
                coorinate.y = afterY;
            });
        }
    }

    public start(speed: number) {
        //初次开始的时候先渲染一次
        // this.createMap();
        this._renderTetris(1);
        this.suspend();
        this.timer = setInterval(() => {
            let status = this._updateCoordinates("down");
            if (status == false) {
                this._checkTop();
                this._wipeLine();
                this.createTetris();
            }
            else {
                this._wipeTetris();
            }
            this._renderTetris(1);
        }, speed);
    }

    public operator() {
        window.addEventListener("keyup", (event) => {
            let key: number = window.event ? event.keyCode : event.which;
            if (key == 38)  //变形
            {
                this._updateCoordinates("up");
            }
            else if (key == 40)  //向下
            {
                let status = this._updateCoordinates("down");
                if (status == false) return false;
            }
            else if (key == 37) //向左
            {
                this._updateCoordinates("left");
            }
            else if (key == 39) //向右
            {
                this._updateCoordinates("right");
            }
            this._wipeTetris();
            this._renderTetris(1);
        });
    }
}

enum Shape {
    I = 1,     //竖条形状
    J = 2,     //左L
    L = 3,     //右L
    O = 4,     //田字形状的方块
    S = 5,     //左N
    T = 6,     //T字形
    Z = 7      //右N形
}

interface Coorinate {
    x: number,
    y: number
}








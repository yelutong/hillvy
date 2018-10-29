var Flower;
(function (Flower_1) {
    var Flower = (function () {
        function Flower(x, y, ctx) {
            this.x = x;
            this.y = y;
            this.ctx = ctx;
            var rnd = {
                getColor: function () {
                    return "rgba(" + this.getRandomNum() + "," + this.getRandomNum() + "," + this.getRandomNum() + ",0.1)";
                },
                getPetalNum: function () {
                    return Math.floor(Math.random() * 3) + Flower_1.Config.petalNum;
                },
                getDefaultAngle: function () {
                    return (Math.floor(Math.random() * 16) + 15) / 360 * 2 * Math.PI;
                },
                getRandomNum: function () {
                    return Math.floor(Math.random() * 235) + 10;
                }
            };
            this.color = rnd.getColor();
            this.petalNum = rnd.getPetalNum();
            this.defaultAngle = rnd.getDefaultAngle();
        }
        Flower.prototype.draw = function () {
            for (var i = 0; i < this.petalNum; i++) {
                new Flower_1.Petal(this.x, this.y, i, this.petalNum, this.defaultAngle, this.color, this.ctx).draw();
            }
        };
        return Flower;
    }());
    Flower_1.Flower = Flower;
})(Flower || (Flower = {}));
var Flower;
(function (Flower) {
    var Heart = (function () {
        function Heart(x, y, scale, ctx) {
            this.x = x;
            this.y = y;
            this.ctx = ctx;
            this.scale(scale);
        }
        Heart.prototype.draw = function () {
            var _this = this;
            var q = task.queue();
            var _loop_1 = function(i, len) {
                var p = this_1.points[i];
                q.will(function () {
                    new Flower.Flower(p.x, p.y, _this.ctx).draw();
                }).delay(50);
            };
            var this_1 = this;
            for (var i = 0, len = this.points.length; i < len; i++) {
                _loop_1(i, len);
            }
            q.dequeue();
        };
        Heart.prototype.scale = function (num) {
            var points = [];
            for (var z = 10; z < 30; z += 0.2) {
                var p = this.getHeartPoint(z, num);
                points.push(new Flower.Point(p.x + this.x, this.y - p.y));
            }
            this.points = points;
        };
        Heart.prototype.getHeartPoint = function (c, scale) {
            scale = scale || 1;
            var b = c / Math.PI;
            var a = scale * (16 * Math.pow(Math.sin(b), 3));
            var d = scale * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
            return new Flower.Point(a, d);
        };
        return Heart;
    }());
    Flower.Heart = Heart;
})(Flower || (Flower = {}));
var Flower;
(function (Flower) {
    var Petal = (function () {
        function Petal(x, y, index, petalNum, defAngle, color, ctx) {
            this.x = x;
            this.y = y;
            this.index = index;
            this.petalNum = petalNum;
            this.defAngle = defAngle;
            this.color = color;
            this.ctx = ctx;
            var singleAngle = 2 * Math.PI / petalNum;
            this.angleLeft = defAngle + singleAngle * index;
            this.angleRight = this.angleLeft + singleAngle + 2 * Math.PI / 12;
            this.lenLeft = Math.floor(Math.random() * Flower.Config.petalRow) / 8 + 1;
            this.lenRight = Math.floor(Math.random() * Flower.Config.petalRow) / 8 + 1;
        }
        Petal.prototype.draw = function () {
            var q = task.queue();
            var delay = Math.floor(Math.random() * 60) + 10;
            for (var i = 0; i < Flower.Config.petalRowNum; i++) {
                q.delay(delay);
                this.drawSingle(i, q);
            }
            q.dequeue();
        };
        Petal.prototype.drawSingle = function (index, q) {
            var self = this, ctx = this.ctx;
            q.will(function () {
                ctx.save();
                ctx.beginPath();
                ctx.translate(self.x, self.y);
                var r = 0.2;
                var ang = (self.angleRight - self.angleLeft) / 2 + self.angleLeft;
                ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
                ctx.strokeStyle = self.color;
                var len1 = self.lenLeft + self.lenLeft * index;
                var len2 = self.lenRight + self.lenRight * index;
                ctx.bezierCurveTo(len1 * Math.cos(self.angleLeft), len1 * Math.sin(self.angleLeft), len2 * Math.cos(self.angleRight), len2 * Math.sin(self.angleRight), 0, 0);
                ctx.stroke();
                ctx.restore();
            });
        };
        return Petal;
    }());
    Flower.Petal = Petal;
})(Flower || (Flower = {}));
var Flower;
(function (Flower) {
    var Point = (function () {
        function Point(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        Point.prototype.clone = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return new Point(this.x + x, this.y + y);
        };
        Point.prototype.scale = function (n) {
            if (n === void 0) { n = 1; }
            return new Point(n * this.x, n * this.y);
        };
        return Point;
    }());
    Flower.Point = Point;
})(Flower || (Flower = {}));
var Flower;
(function (Flower) {
    (function (Config) {
        Config[Config["petalRow"] = 20] = "petalRow";
        Config[Config["petalRowNum"] = 20] = "petalRowNum";
        Config[Config["petalNum"] = 12] = "petalNum";
    })(Flower.Config || (Flower.Config = {}));
    var Config = Flower.Config;
})(Flower || (Flower = {}));

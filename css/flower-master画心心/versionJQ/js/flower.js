(function($, window) {

    $.fn.will = $.fn.will || function(callback, type) {
        return this.queue(type || "fx", function(next) {
            callback.call(this);
            next();
        });
    };

    var petalRow = 20,//花瓣每一圈的密度，越小越细致 
        petalRowNum = 20,//默认每一花瓣20圈,
        petalNum = 12;// 每朵花  12~15 个花瓣


    /*
    * 花瓣
    * (x,y)坐标,index-该花瓣索引,petalNum-花瓣个数,defAngle-起始角度,color-颜色,ctx-context
    */

    function Petal(x, y, index, petalNum, defAngle, color, ctx) {
        //save...
        // var paramArr = arguments.callee.toString().replace(/\s/g, "").match(/\(([^()]*)\)/)[1].split(',');
        // for (var i = 0, len = paramArr.length; i < len; i++) {
        //     this[paramArr[i]] = paramArr[i];
        // }    //代码比较任性，这里uglify之后参数缩写导致出错

        this.x = x;
        this.y = y;
        this.index = index;
        this.petalNum = petalNum;
        this.defAngle = defAngle;
        this.color = color;
        this.ctx = ctx;

        //inIt...

        var singleAngle = 2 * Math.PI / petalNum;   // 每个花瓣的角度

        this.angle1 = defAngle + singleAngle * index; //花瓣左侧角度
        this.angle2 = this.angle1 + singleAngle + 2 * Math.PI / 12;//花瓣右侧角度，有30度重合更漂亮~

        this.len1 = Math.floor(Math.random() * petalRow) / 8 + 1;  //曲线坐标点每次重绘递增长度
        this.len2 = Math.floor(Math.random() * petalRow) / 8 + 1;
    }

    Petal.prototype = {
        draw: function() {
            var $self = $(this);
            var delay = Math.floor(Math.random() * 60) + 10;  //每一层花瓣曲线的延迟
            for (var i = 0; i < petalRowNum; i++) { //默认每个花瓣由20层曲线组成
                $self.delay(delay);
                this.drawSingle(i, $self, this.ctx);
            }
        },
        drawSingle: function(index, $ele, ctx) {
            var self = this;
            $ele.will(function() {
                if (!ctx) return;
                ctx.save();   //保存初始状态
                ctx.beginPath();
                ctx.translate(self.x, self.y);

                //花心
                var r = 0.2;
                var ang = (self.angle2 - self.angle1) / 2 + self.angle1;
                ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);

                //ctx.moveTo(0, 0);
                ctx.strokeStyle = self.color;
                var len1 = self.len1 + self.len1 * index;
                var len2 = self.len2 + self.len2 * index;
                ctx.bezierCurveTo(
                    len1 * Math.cos(self.angle1), len1 * Math.sin(self.angle1),
                    len2 * Math.cos(self.angle2), len2 * Math.sin(self.angle2),
                    0, 0);
                ctx.stroke();
                //ctx.clearRect(-0.2, -0.2, 0.4, 0.4); //圆心
                ctx.restore();//恢复初始状态
            });
        }
    };

    //Flower类，对花瓣封装
    function Flower(x, y, ctx) {
        var rnd = {
            getColor: function() {
                return "rgba(" + this.getRandomNum() + "," + this.getRandomNum() + "," + this.getRandomNum() + ",0.1)";
            },
            getPetalNum: function() {  //花瓣个数
                return Math.floor(Math.random() * 3) + petalNum;
            },
            getDefaultAngle: function() {
                return (Math.floor(Math.random() * 16) + 15) / 360 * 2 * Math.PI; //初始15~30度偏移
            },
            getRandomNum: function() {
                return Math.floor(Math.random() * 235) + 10;
            }
        };

        var _color = rnd.getColor();
        var _petalNum = rnd.getPetalNum();
        var _defaultAngle = rnd.getDefaultAngle();
        this.draw = function() {
            for (var i = 0; i < petalNum; i++) {
                new Petal(x, y, i, _petalNum, _defaultAngle, _color, ctx).draw();
            }
            return this;
        };
    }

    window.Flower = Flower; //暴露出去


    //Point类，描述点
    function Point(x, y) {
        if (!(this instanceof Point)) return new Point(x, y);
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype = {
        clone: function() {
            return new Point(this.x, this.y);
        },
        scale: function(s) {
            s = s || 1;
            return new Point(this.x * s, this.y * s);
        },
        add: function(x, y) {
            return new Point(this.x + x, this.y + y);
        }
    }

    //Heart类，获取路径
    function Heart(startX, startY, scale) {
        if (!(this instanceof Heart)) return new Heart(startX, startY, scale);
        this._startX = startX;
        this._startY = startY;
        this.scale(scale || 1);
    }

    Heart.prototype = {
        scale: function(scale) {   // 调整大小
            var points = [];
            for (var z = 10; z < 30; z += 0.2) {
                var p = this._getHeartPoint(z, scale);
                points.push(new Point(p.x + this._startX, this._startY - p.y));
            }
            this.points = points;
        },
        _getHeartPoint: function(c, scale) {
            scale = scale || 1;
            var b = c / Math.PI;
            var a = scale * (16 * Math.pow(Math.sin(b), 3));
            var d = scale * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
            return new Point(a, d)
        },
        start: function(ctx) {
            var ele = $({});
            for (var i = 0, len = this.points.length; i < len; i++) {
                var p = this.points[i];
                (function(p) {
                    ele.will(function() {
                        new Flower(p.x, p.y, ctx).draw();
                    }).delay(50);
                })(p);
            }
        },
    };

    window.Heart = Heart;

})(jQuery, window);
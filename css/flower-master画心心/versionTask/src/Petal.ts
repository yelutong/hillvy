namespace Flower {
    /**
     * 花瓣类
     */
    export class Petal {

        /**
         * x 坐标
         */
        private x: number;

        /**
         * y 坐标
         */
        private y: number;

        /**
         * 该花瓣索引
         */
        private index: number;

        /**
         * 花瓣总数
         */
        private petalNum: number;

        /**
         * 起始角度
         */
        private defAngle: number;

        /**
         * 颜色
         */
        private color: string;

        /**
         * 花瓣左侧角度 
         */
        private angleLeft: number;

        /**
         * 花瓣右侧角度 
         */
        private angleRight: number;

        /**
         * 花瓣左侧递增长度 
         */
        private lenLeft: number;

        /**
         * 花瓣右侧递增长度
         */
        private lenRight: number;

        /**
         * 画布对象
         */
        private ctx: CanvasRenderingContext2D;

        constructor(x: number, y: number, index: number, petalNum: number, defAngle: number, color: string, ctx: CanvasRenderingContext2D) {
            // 保存参数
            this.x = x;
            this.y = y;
            this.index = index;
            this.petalNum = petalNum;
            this.defAngle = defAngle;
            this.color = color;
            this.ctx = ctx;

            // 初始化参数

            let singleAngle = 2 * Math.PI / petalNum;  // 每个花瓣角度

            this.angleLeft = defAngle + singleAngle * index;
            this.angleRight = this.angleLeft + singleAngle + 2 * Math.PI / 12;  // 花瓣右侧角度，有30度重合更漂亮

            this.lenLeft = Math.floor(Math.random() * Config.petalRow) / 8 + 1;  // 计算花瓣2侧每次递增长度
            this.lenRight = Math.floor(Math.random() * Config.petalRow) / 8 + 1;
        }

        public draw() {
            var q = task.queue();
            let delay = Math.floor(Math.random() * 60) + 10; // 每一层花瓣的延时
            for (var i = 0; i < Config.petalRowNum; i++) {
                q.delay(delay);
                this.drawSingle(i, q);
            }
            q.dequeue();
        }

        private drawSingle(index: number, q) {
            var self = this,
                ctx = this.ctx;
            q.will(() => {
                ctx.save();   //保存初始状态
                ctx.beginPath();
                ctx.translate(self.x, self.y);

                //花心
                let r = 0.2;
                let ang = (self.angleRight - self.angleLeft) / 2 + self.angleLeft;
                ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);

                //ctx.moveTo(0, 0);
                ctx.strokeStyle = self.color;
                let len1 = self.lenLeft + self.lenLeft * index;
                let len2 = self.lenRight + self.lenRight * index;
                ctx.bezierCurveTo(
                    len1 * Math.cos(self.angleLeft), len1 * Math.sin(self.angleLeft),
                    len2 * Math.cos(self.angleRight), len2 * Math.sin(self.angleRight),
                    0, 0);
                ctx.stroke();
                //ctx.clearRect(-0.2, -0.2, 0.4, 0.4); //圆心
                ctx.restore();//恢复初始状态
            });
        }


    }
}
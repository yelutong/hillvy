namespace Flower {
    /**
     * 花朵类
     */
    export class Flower {

        /**
         * x 坐标
         */
        private x: number;

        /**
         * y 坐标
         */
        private y: number;

        /**
         * 画布对象
         */
        private ctx: CanvasRenderingContext2D;

        /**
         * 颜色
         */
        private color: string;

        /**
         * 花瓣数量
         */
        private petalNum: number;

        /**
         * 第一个花瓣的起始角度
         */
        private defaultAngle: number;

        /**
         * 构造函数
         */
        constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            this.ctx = ctx;

            let rnd = {
                getColor: function () {
                    return "rgba(" + this.getRandomNum() + "," + this.getRandomNum() + "," + this.getRandomNum() + ",0.1)";
                },
                getPetalNum: function () {  //花瓣个数
                    return Math.floor(Math.random() * 3) + Config.petalNum;
                },
                getDefaultAngle: function () {
                    return (Math.floor(Math.random() * 16) + 15) / 360 * 2 * Math.PI; //初始15~30度偏移
                },
                getRandomNum: function () {
                    return Math.floor(Math.random() * 235) + 10;
                }
            };

            this.color = rnd.getColor();
            this.petalNum = rnd.getPetalNum();
            this.defaultAngle = rnd.getDefaultAngle();
        }

        /**
         * 画出花朵
         */
        public draw() {
            for (let i = 0; i < this.petalNum; i++) {
                new Petal(this.x, this.y, i, this.petalNum, this.defaultAngle, this.color, this.ctx).draw();
            }
        }

    }
}
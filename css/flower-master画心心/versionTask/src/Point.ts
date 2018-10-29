namespace Flower {
    /**
     * 坐标类 
     */
    export class Point {

        /**
         * x 坐标
         */
        public x: number = 0;

        /**
         * y 坐标
         */
        public y: number = 0;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        /**
         * 克隆坐标
         */
        public clone(x: number = 0, y: number = 0): Point {
            return new Point(this.x + x, this.y + y);
        }

        /**
         * 坐标放大或缩小某个倍数
         */
        public scale(n: number = 1): Point {
            return new Point(n * this.x, n * this.y);
        }
    }
}
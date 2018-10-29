namespace Flower {

    /**
     * 画心
     */
    export class Heart {

        private x: number;
        private y: number;
        private ctx: CanvasRenderingContext2D;
        private points: Point[];

        constructor(x: number, y: number, scale: number, ctx: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            this.ctx = ctx;
            this.scale(scale);
        }

        public draw() {
            let q = task.queue();
            for (let i = 0, len = this.points.length; i < len; i++) {
                let p = this.points[i];
                q.will(() => {
                    new Flower(p.x, p.y, this.ctx).draw();
                }).delay(50);
            }
            q.dequeue();
        }

        /**
         * 计算❤的各个点
         */
        private scale(num: number) {
            let points = [];
            for (var z = 10; z < 30; z += 0.2) {
                var p = this.getHeartPoint(z, num);
                points.push(new Point(p.x + this.x, this.y - p.y));
            }
            this.points = points;
        }

        /**
         * 计算出某个点 
         */
        private getHeartPoint(c, scale) {
            scale = scale || 1;
            let b = c / Math.PI;
            let a = scale * (16 * Math.pow(Math.sin(b), 3));
            let d = scale * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
            return new Point(a, d);
        }

    }
}
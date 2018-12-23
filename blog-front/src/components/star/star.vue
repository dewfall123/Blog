<style lang="less" scoped>
    @import './assets/star.less';
</style>

<template>
    <div class="background">
        <canvas class="background-canvas" id="bg-canvas" ></canvas>
        <div v-show="meteor" class="meteor-canvas" id="meteor-canvas" ></div>
    </div>

</template>
<script>
    const {Scene, Sprite, Path} = spritejs;
    export default {
        name: 'star',
        mixins: [ ],
        props: {
            startNum: {
                default: 1000,
                type: [Number],
            },
            starSize: {
                default: () => {return [1, 2];},
                type: [Array],
                validator: (value) => {
                    return value.length === 2 && value.every(i => {return +i;})
                },
            },
            meteor: {
                default: true,
                type: Boolean,
            },
            meteorNum: {
                default: 5,
                type: Number,
            },
        },
        data() {
            return {
                star: 'M480,50L423.8,182.6L280,194.8L389.2,289.4L356.4,430L480,355.4L480,355.4L603.6,430L570.8,289.4L680,194.8L536.2,182.6Z',
            };
        },
        mounted() {
            const xMax = window.screen.availWidth;
            const yMax = window.screen.availHeight;
            const canvas = document.getElementById('bg-canvas');
            if (!canvas.getContext) {
                return alert('当前浏览器不支持canvas 0-0');
            }
            canvas.setAttribute("height", xMax);
            canvas.setAttribute("width", yMax);

            const context = canvas.getContext('2d');

            context.width = xMax;
            context.height = yMax;
            const STAR_NUM = this.startNum;
            const SIZE_RANGE = this.starSize;

            // 范围随机
            function random(min = 0, max = 1, fixed = 0) {
                return (Math.random() * (max - min) + min).toFixed(fixed);
            }

            // 增加星星
            context.shadowColor = "white";
            for (let i = 0; i < STAR_NUM; i++) {
                const size = SIZE_RANGE[random(0, this.starSize.length - 1)];
                const x = random(0, xMax, 0);
                const y = random(0, yMax, 0);
                const randomHue = random(0, 360);
                const randomAlpha = random(0, 1, 2);
                context.fillStyle = `hsla(${randomHue}, 30%, 80%, ${randomAlpha})`;
                context.shadowBlur = random(2.5 * size, 10 * size);
                context.fillRect(x, y, size, size);
                // console.log(i, x, y, size);
            }
            // 星星闪动

            // 流星 圆 + 三角形
            // raf = this.myRequestAnimationFrame();
            const scene = new Scene('#meteor-canvas', {
                viewport: ['auto', 'auto'],
                resolution: [xMax, yMax]
            });
            const layer = scene.layer();
            const star = new Sprite();
            star.attr({
                size: [40, 40],
                pos: [100, 100],
                bgcolor: '#fff',
                borderRadius: 200,
                shadow: {
                    offset: [0, 150],
                    blur: 10,
                    color: '#999',
                },
            });
            layer.append(star);
        },
        methods: {
        },
    };
</script>
export default {
    props: {},
    computed: {},
    methods: {
        myRequestAnimationFrame(callback) {
            if (requestAnimationFrame) {
                return requestAnimationFrame(callback);
            } else {
                return setTimeout(() => {
                    if (performance && performance.now) {
                        return callback(performance.now());
                    } else {
                        return callback(Date.now());
                    }
                }, 1000 / 60);
            }
        },
        cancelMyRequestAnimationFrame(id) {
            if (cancelAnimationFrame) {
                cancelAnimationFrame(id);
            } else {
                clearTimeout(id);
            }
        },
        move(context, start = [0, 0], end = [], duration) {
            
        }
    }
};
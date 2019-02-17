'use strict';

module.exports = () => {
    return async function user(ctx, next) {
        if (!ctx.session.user) {
            ctx.body = {
                result: -1,
                msg: '请先登录!',
            };
            return;
        }
        await next();
    };
};


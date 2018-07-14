'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const blogRouter = app.router.namespace('/blog');

    const { controller, middleware } = app;

    blogRouter.get('/', controller.site.index);
};

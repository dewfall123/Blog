'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const blogRouter = app.router.namespace('/blog');

    const { controller, middleware } = app;

    blogRouter.get('/', controller.site.index);

    // blog 增删查改
    blogRouter.post('/list', controller.blog.list);
    blogRouter.post('/insert', controller.blog.insert);
    blogRouter.get('/detail', controller.blog.detail);
    blogRouter.delete('/delete/:id', controller.blog.delete);
    blogRouter.post('/update', controller.blog.update);
};

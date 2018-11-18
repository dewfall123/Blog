<style lang="less" scoped>
    @import './list.less';
</style>

<template>
    <div class="list-page">
        <Row type='flex'>
            <Col :span="3"></Col>
            <Col :span="18">
                <Row class="middle-page">
                    <!-- 文章列表 -->
                    <Col :span="18" class="blog-list">
                        <li v-for="(blogI) in blogList" :key="blogI.id"  :title="blogI.id" type="flex" class="blog-container" @click="showDetail(blogI.id)">
                            <Row>
                                <Col :span="18">
                                    <!-- 标题 -->
                                    <Row type='flex' align="middle">
                                        <span class="blog-title">{{blogI.title}}</span>
                                        <span class="time">{{dayjs(+blogI.createTime).fromNow()}}</span>
                                    </Row>
                                    <!-- 简略文字 -->
                                    <Row class="blog-content">{{blogI.summary}}</Row>
                                </Col>
                                <!-- 图片 -->
                                <Col :span="6"></Col>
                            </Row>
                            <Row class="blog-footer" type="flex">
                                <span></span>
                                <!-- 作者 -->
                                <!-- 点赞 -->
                                <!-- 评论数 -->
                            </Row>
                        </li>
                    </Col>
                    <!-- 标签 -->
                    <Col :span="6">
                    </Col>
                </Row>
            </Col>
            <Col :span="3"></Col>
        </Row>
    </div>
</template>
<script>

    export default {
        name: 'blogList',
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                blogList: [],
            }
        },
        methods: {
            list() {
                this.ajax.post('/blog/list',{
                }).then(res => {
                    if (+res.data.result === 0) {
                        this.blogList = res.data.blogList;
                    }
                });
            },
            showDetail(id) {
                console.log('前往详情页面');
                this.$router.push({name: 'blogdetail',  params: { id }});
            },
        },
        mounted() {
            // debugger;
            this.list();
        },
    };
</script>
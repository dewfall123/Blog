<style lang="less">
    @import './list.less';
</style>

<template>
    <div class="list-content">
        <Row class="blog-list">
            <Row class="blog-container" type="flex" v-for="(blogI, index) in blogList" :key="blogI.id">
                <Col :span="18">
                    <Row class="blog-title">{{blogI.title}}</Row>
                    <Row class="blog-content">{{blogI.content}}</Row>
                    <Row class="blog-footer"></Row>
                </Col>
                <Col :span="6">

                </Col>
            </Row>
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
                this.$util.ajax.post('/blog/list',{
                }).then(res => {
                    if (+res.data.result === 0) {
                        this.blogList = res.data.blogList;
                    }
                });
            }
        },
        mounted() {
            this.list();
        },
    };
</script>
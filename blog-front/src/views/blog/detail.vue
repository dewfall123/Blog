<style lang="less" scoped>
    @import './detail.less';
</style>

<template>
    <div class="list-page">
        <Row type='flex'>
            <Col :span="3"></Col>
            <Col :span="18">
                <Row type='flex'>
                    <h2>{{blog.title}}</h2>
                </Row>
            </Col>
            <Col :span="3"></Col>
        </Row>
    </div>
</template>
<script>

    export default {
        name: 'blogdetail',
        data() {
            return {
                blog: {
                    title: '',
                    content: '',
                    tags: '',
                    createTime: '',
                    lastEditTime: '',
                    createUser: '',
                }
            }
        },
        methods: {
            detail() {
                this.$util.ajax.post('/blog/detail',{
                    id: this.$router.params.id,
                }).then(res => {
                    if (+res.data.result === 0) {
                        this.blog = res.data.blog;
                    }
                });
            },
        },
        mounted() {
            debugger;
            this.detail();
        },
    };
</script>
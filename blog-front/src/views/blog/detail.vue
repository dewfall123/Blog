<style lang="less" scoped>
    @import './detail.less';
</style>

<template>
    <div class="detail-page">
        <Row type='flex'>
            <Col :span="3"></Col>
            <Col :span="18">
                <h1 class="title">{{blog.title}}</h1>
                <Row class="author" type="flex" justify="space-between" align="middle">
                    <img :src="logo"/>
                    <Row class="info">
                        <Row class="name">{{"昵称"}}</Row>
                        <Row class="tags">
                            <span>{{dayjs(+blog.createTime).format('YYYY年MM.DD HH:mm')}}</span>
                        </Row>
                    </Row>
                </Row>
                <Row class="content">
                    <mavon-editor :toolbarsFlag="editMode" :subfield="editMode" :defaultOpen="'preview'" v-model="blog.content"></mavon-editor>
                </Row>
                <Row type="flex" justify="end">
                    <Button type="text" @click="update" v-show="editMode">保存</Button>
                    <Button type="text" @click="showEdit" v-show="!editMode">修改</Button>
                    <Poptip
                        confirm
                        title="确认删除?"
                        @on-ok="deleteBlog"
                        >
                        <Button type="text" class="delete-button" v-show="!editMode">删除</Button>
                    </Poptip>
                </Row>
            </Col>
            <Col :span="3"></Col>
        </Row>
    </div>
</template>
<script>
    import logo from '../../assets/images/title.png';
import { setTimeout } from 'timers';

    export default {
        name: 'blogdetail',
        data() {
            return {
                logo,
                blog: {
                    title: '',
                    content: '',
                    tags: '',
                    createTime: '',
                    lastEditTime: '',
                    createUser: '',
                },
                editMode: false,
            }
        },
        methods: {
            detail() {
                if (!this.$route.params.id) {
                    this.$Modal.error({title: '^-^', content: '参数异常'});
                    this.backToList();
                    return;
                }
                this.ajax.get('/blog/detail',{
                    params: {
                    id: this.$route.params.id,
                }}).then(res => {
                    if (+res.data.result === 0) {
                        this.blog = res.data.blog;
                        console.log(JSON.stringify(this.blog));
                    }
                });
            },
            deleteBlog() {
                this.ajax.delete(`/blog/delete/${this.$route.params.id}`
                ).then(res => {
                    this.backToList();
                });
            },
            backToList() {
                setTimeout(() => {
                    this.$router.push({name: 'bloglist'})
                }, 1000);
            },
            showEdit() {
                this.editMode = !this.editMode;
            },
            update() {
                this.ajax.post(`/blog/update`, {
                    blog: this.blog,
                }).then(res => {
                    this.editMode = false;
                });
            }
        },
        mounted() {
            this.detail();
        },
    };
</script>
<style lang="less" scoped>
    @import './detail.less';
</style>
<style lang="less">
    @import './markdown.less';
</style>

<template>
    <article class="detail-page">
        <div class="container">
            <h1 class="title">{{blog.title}}</h1>
            <Tags :blogI="blog" class="icons"></Tags>
            <div class="tags">
                <div>
                    <Tag color="#f16d71" v-for="tag in (blog.tags || [])" :key="tag">{{tag}}</Tag>
                </div>
                <span>
                    <Icon type="ios-clock-outline" size="16" />
                    {{dayjs(+blog.createTime).format('HH:mm:ss')}}
                </span>
            </div>
            <article class="markdown" v-html="blog.htmlContent">
            </article>
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
        </div>
    </article>
</template>
<script>
    import logo from '../../assets/images/title.png';
    import link from '../mixins/link.js';
    import Tags from './components/tags.vue';

    export default {
        name: 'BlogDetail',
        mixins: [ link ],
        components: { Tags },
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
                    htmlCOntent: '',
                },
                editMode: false,
            };
        },
        methods: {
            async show() {
                if (!this.$route.params.id) {
                    this.$Modal.error({ title: '^-^', content: '参数异常' });
                    this.backToList();
                    return;
                }
                const res = await this.ajax.get(`/api/blogs/${this.$route.params.id}`);
                if (+res.data.result === 0) {
                    this.blog = res.data.blog;
                    console.log(JSON.stringify(this.blog));
                }
            },
            async deleteBlog() {
                await this.ajax.delete(`/api/blogs/${this.$route.params.id}`);
                this.backToList();
            },
            backToList() {
                setTimeout(() => {
                    this.goto({ name: 'BlogList' });
                }, 1000);
            },
            showEdit() {
                this.editMode = !this.editMode;
            },
            async update() {
                await this.ajax.put(`/api/blogs/${this.blog.id}`, { blog: this.blog });
                this.editMode = false;
            },
        },
        mounted() {
            this.show();
        },
    };
</script>
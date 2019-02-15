<style lang="less" scoped>
    @import './detail.less';
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
            <div class="content">
                <mavon-editor ref='md'
                    v-show="editMode"
                    class="markdown-edit"
                    v-model="blog.content"
                    @save="update"
                    @change="contentChange"
                    :navigation="false"
                    :subfield="false"
                    :toolbarsFlag="false"
                    @imgAdd="imgAdd" >
                </mavon-editor>
                <Markdown :style="{ width: editMode ? '48%' : '100%' }"
                    :html="blog.htmlContent"></Markdown>
            </div>
            <Row type="flex" justify="end">
                <Button type="text" @click="update" v-show="editMode">保存</Button>
                <Button type="text" @click="cancelEdit" v-show="editMode">取消</Button>
                <Button type="text" @click="showEdit" v-show="!editMode">修改</Button>
                <Poptip
                    confirm
                    title="确认删除?"
                    @on-ok="deleteBlog"
                    >
                    <Button type="text" class="delete-button" v-show="!editMode">删除</Button>
                </Poptip>
            </Row>
            <MdCatalog :markdownId="markdownId"></MdCatalog>
        </div>
    </article>
</template>
<script>
    import logo from '../../assets/images/title.png';
    import link from '../mixins/link.js';
    import Tags from './components/tags.vue';
    import Markdown from './components/markdown.vue';
    import MdCatalog from '../../components/md-catalog';

    import imgUpload from '../mixins/imgUpload.js';

    export default {
        name: 'BlogDetail',
        mixins: [ link, imgUpload ],
        components: {
            Tags,
            MdCatalog,
            Markdown,
        },
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
                blogOri: {},
                editMode: false,
                markdownId: '',
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
                    this.blogOri = JSON.parse(JSON.stringify(this.blog));
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
            cancelEdit() {
                this.blog = JSON.parse(JSON.stringify(this.blogOri));
                this.editMode = false;
            },
            async update() {
                await this.ajax.put(`/api/blogs/${this.blog.id}`, { blog: this.blog });
                this.editMode = false;
            },
            contentChange(md, html) {
                this.blog.htmlContent = html;
            },
        },
        async created() {
        },
        async mounted() {
            await this.show();
            this.$nextTick(() => {
                this.markdownId = 'markdown';
            });
        },
    };
</script>
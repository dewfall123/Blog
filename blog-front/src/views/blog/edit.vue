<style lang="less">
    @import './edit.less';
</style>

<template>
    <div class="edit-content">
        <Row>
            <Input long placeholder="标题" v-model="title"></Input>
            <ArrInput placeholder="标签" v-model="tags"></ArrInput>
            <!-- <editor v-model="content"></editor> -->
            <mavon-editor ref='md'
                class="markdown"
                v-model="content"
                @save="preCommit"
                :navigation="true"
                @imgAdd="imgAdd" >
            </mavon-editor>
            <Row>
                <Col :span="23"></Col>
            </Row>
        </Row>
    </div>
</template>
<script>
    // import Editor from '../../components/editor.vue';
    import ArrInput from '../../components/arr-input';
    import link from '../mixins/link.js';

    export default {
        name: 'BlogEdit',
        mixins: [ link ],
        components: {
            // Editor,
            ArrInput,
        },
        data() {
            return {
                title: this.dayjs().format('MM月DD日'),
                content: '',
                htmlContent: '',
                tags: [],
            };
        },
        methods: {
            async update() {
                await this.ajax.post('/api/blogs', {
                    title: this.title,
                    content: this.content,
                    tags: this.tags,
                    htmlContent: this.htmlContent,
                });
                setTimeout(() => {
                    this.goto({ name: 'BlogList' });
                }, 1000);
            },
            // 弹出提交确认
            preCommit(md, html) {
                if (!this.title) {
                    return this.$Modal.warning({ title: '^_^', content: '请输入标题!' });
                }
                if (!this.content) {
                    return this.$Modal.warning({ title: '^_^', content: '内容不能为空!' });
                }
                this.htmlContent = html;
                this.$Modal.confirm({
                    title: '确认发布?',
                    content: `<p>发布文章<h3>${this.title}</h3></p>`,
                    onOk: () => {
                        this.update();
                    },
                    onCancel: () => {
                    },
                });
            },
            // 图片上传的方法
            async imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                const formdata = new FormData();
                formdata.append('image', $file);
                const res = await this.ajax({
                    url: '/api/img/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                this.$refs.md.$img2Url(pos, res.data.url);
            },
        },
    };
</script>
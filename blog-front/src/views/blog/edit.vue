<style lang="less" scoped>
    @import './edit.less';
</style>

<template>
    <div class="container">
        <div class="edit">
            <p>标题:</p>
            <Input long placeholder="标题" v-model="title"></Input>
            <p>标签:</p>
            <ArrInput placeholder="标签" v-model="tags"></ArrInput>
            <RadioGroup class="type-select" v-model="category">
                <Radio v-for="(val) in categoryOptions" :key="val.icon" :label="val.value">
                    <Icon :type="val.icon" size="20"></Icon>
                    <span>{{val.label}}</span>
                </Radio>
            </RadioGroup>
            <mavon-editor ref='md'
                class="markdown-edit"
                v-model="content"
                @save="preCommit"
                @change="contentChange"
                :navigation="false"
                :subfield="false"
                @imgAdd="imgAdd" >
            </mavon-editor>
            <Row>
                <Col :span="23"></Col>
            </Row>
        </div>
        <Markdown :html="htmlContent"></Markdown>
        <div class="commit" >
            <Button  @click="preCommit" icon="ios-ribbon-outline">提交</Button>
        </div>
    </div>
</template>
<script>
    // import Editor from '../../components/editor.vue';
    import ArrInput from '../../components/arr-input';
    import link from '../mixins/link.js';
    import imgUpload from '../mixins/imgUpload.js';
    import Markdown from './components/markdown.vue';

    export default {
        name: 'BlogEdit',
        mixins: [ link, imgUpload ],
        components: {
            // Editor,
            ArrInput,
            Markdown,
        },
        data() {
            return {
                title: this.dayjs().format('MM月DD日'),
                content: '',
                htmlContent: '<p>开始编辑...</p>',
                tags: [],
                category: 'tec',
                categoryOptions: [
                    { value: 'tec', label: '技术文章', icon: 'ios-at' },
                    { value: 'life', label: '生活记录', icon: 'ios-color-palette' },
                ],
            };
        },
        methods: {
            async update() {
                await this.ajax.post('/api/blogs', {
                    title: this.title,
                    content: this.content,
                    tags: this.tags,
                    htmlContent: this.htmlContent,
                    category: this.category,
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
            contentChange(md, html) {
                this.htmlContent = html || '<p>开始编辑...</p>';
            },
        },
    };
</script>
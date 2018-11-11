<style lang="less">
    @import './edit.less';
</style>

<template>
    <div class="edit-content">
        <Row>
            <Input long placeholder="标题" v-model="title"></Input>
            <!-- <editor v-model="content"></editor> -->
            <mavon-editor v-model="content" @save="preCommit" ></mavon-editor>
            <Row>
                <Col :span="23"></Col>
            </Row>
        </Row>
    </div>
</template>
<script>
    // import Editor from '../../components/editor.vue';


    export default {
        name: 'blogEdit',
        components: {
            // Editor,
        },
        data() {
            return {
                title: this.dayjs().format('MM月DD日'),
                content: '',
            }
        },
        methods: {
            commitBlog() {
                console.log('提交：' + this.content);
                this.ajax.post('/blog/insert',{
                    title: this.title,
                    content: this.content,
                }).then(res => {
                    
                    setTimeout(() => {
                        this.$router.push({name: 'bloglist'})
                    }, 1000);
                });
            },

            // 弹出提交确认
            preCommit () {
                if (!this.title) {
                    return this.$Modal.warning({title: '^_^', content: '请输入标题!'});
                }
                if (!this.content) {
                    return this.$Modal.warning({title: '^_^', content: '内容不能为空!'});
                }
                this.$Modal.confirm({
                    title: '确认发布?',
                    content: `<p>发布文章<h3>${this.title}</h3></p>`,
                    onOk: () => {
                        this.commitBlog();
                    },
                    onCancel: () => {
                        //
                    }
                });
            },
        }, 
        mounted() {
            
        },
    };
</script>
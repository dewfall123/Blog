<style lang="less">
    @import './edit.less';
</style>

<template>
    <div class="edit-content">
        <Row>
            <Input long placeholder="标题" v-model="title"></Input>
            <!-- <editor v-model="content"></editor> -->
            <mavon-editor ref='md' v-model="content" @save="preCommit" @imgAdd="imgAdd" ></mavon-editor>
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
            // 图片上传的方法
            imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.ajax({
                    url: '/blog/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    this.$refs.md.$img2Url(pos, res.data.url);
                })
            },
        }, 
        mounted() {
            
        },
    };
</script>
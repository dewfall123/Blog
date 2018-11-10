<style lang="less">
    @import './edit.less';
</style>

<template>
    <div class="edit-content">
        <Row>
            <Input long placeholder="标题" v-model="title"></Input>
            <!-- <editor v-model="content"></editor> -->
            <mavon-editor v-model="content" @save="commitBlog" ></mavon-editor>
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
                    console.log(res.data);
                });
            }
        }, 
        mounted() {
            
        },
    };
</script>
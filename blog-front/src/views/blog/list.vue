<style lang="less" scoped>
    @import './list.less';
</style>

<template>
    <section class="container">
        <div class="list"
        >
            <article v-for="(blogI) in blogList" :key="blogI.id"
                v-show="testShow"
                :class="'blog-card'"
                @click="showDetail(blogI.id)">
                <p class="title">
                    <span class="title-content">{{blogI.title}}</span>
                </p>
                <p class="content">{{blogI.summary}}</p>
                <div class="footer">
                    <div class="footer-icons">
                        <div>
                            <Icon type="md-calendar" :size="16" />
                            <span>{{dayjs(+blogI.createTime).format('YYYY-MM-DD')}}</span>
                        </div>
                        <div>
                            <Icon type="ios-eye" :size="18"/>
                            <span>{{blogI.see || 0}}</span>
                        </div>
                        <div>
                            <Icon type="md-chatboxes" :size="16"/>
                            <span>{{blogI.comment || 0}}</span>
                        </div>
                    </div>
                    <!-- 作者 -->
                    <!-- 点赞 -->
                    <!-- 评论数 -->
                </div>
            </article>
        </div>
        <div class="page">
            <Page :total="count" size="small" show-elevator show-sizer
                :current="pageIndex"
                :page-size="pageSize"
                :page-size-opts="[3, 6, 9, 12, 21]"
                @on-page-size-change="sizeChange"
                @on-change="blogs"/>
        </div>
        <aside>
            <Button @click="testTransition">测试</Button>
        </aside>
    </section>
</template>
<script>
    import link from '../mixins/link.js';

    export default {
        name: 'BlogList',
        mixins: [ link ],
        data() {
            return {
                pageIndex: 1,
                pageSize: 9,
                blogList: [],
                count: -1,
                testShow: true,
            };
        },
        methods: {
            async blogs(i) {
                const res = await this.ajax.get('/api/blogs', { params: { pageIndex: i, pageSize: this.pageSize } });
                this.pageIndex = i;
                this.blogList = res.data.blogList;
                this.count = res.data.count;
            },
            async sizeChange(i) {
                this.pageSize = i;
                await this.blogs(this.pageIndex);
            },
            showDetail(id) {
                this.goto({
                    name: 'BlogDetail',
                    params: { id },
                });
            },
            testTransition() {
                this.testShow = !this.testShow;
            },
        },
        mounted() {
            this.blogs(1);
        },
    };
</script>
<style lang="less" scoped>
    @import './list.less';
</style>

<template>
    <section class="container">
        <div class="list"
        >
            <article v-for="(blogI, index) in blogList" :key="blogI.id"
                v-show="testShow"
                :class="'blog-card'"
                @click="showDetail(blogI.id)">
                <p class="title">
                    <span class="title-content">{{blogI.title}}</span>
                </p>
                <img v-lazyload="imgList[blogI.id]" :src="defaultImg"></img>
                <p class="content">{{blogI.summary}}</p>
                <Tags :blogI="blogI"></Tags>
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
        <!-- <aside>
            <Button @click="testTransition">测试</Button>
        </aside> -->
    </section>
</template>
<script>
    import link from '../mixins/link.js';
    import defaultImg from '../../assets/images/title.png';
    import Tags from './components/tags.vue';

    export default {
        name: 'BlogList',
        mixins: [ link ],
        components: { Tags },
        data() {
            return {
                defaultImg,
                validImgNum: 24,
                pageIndex: 1,
                pageSize: 9,
                blogList: [],
                count: -1,
                testShow: true,
            };
        },
        computed: {
            imgList() {
                const result = [];
                (this.blogList || []).forEach(i => {
                    result[i.id] = require('../../assets/images/' + i.id % this.validImgNum + '.png');
                });
                return result;
            },
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
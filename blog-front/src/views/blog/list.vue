<style lang="less" scoped>
    @import './list.less';
</style>

<template>
    <section class="container">
        <div class="p-title">
            <p>文章列表</p>
            <div class="tags">
                <TagWitiText v-for="o in filterTypes"
                    :class="[ category === o.filterValue ? 'active' : '' ]"
                    :clickEvent="() => {category = o.filterValue}"
                    :key="o.icon"
                    :icon="o.icon"
                    :text="o.text">
                </TagWitiText>
            </div>
        </div>
        <div class="list">
            <article v-for="(blogI, index) in filtedList" :key="blogI.id"
                v-show="testShow"
                :class="'blog-card'"
                @click="showDetail(blogI.id)">
                <div class="bg-img">
                    <img  v-lazyload="imgList[blogI.id]" :src="defaultImg" :alt="blogI.id">
                    </img>
                </div>
                <div class="cover">
                    <p class="content">{{blogI.summary}}</p>
                </div>
                <div class="blog-card-text">
                    <p class="title">
                        <span class="title-content">{{blogI.title}}</span>
                    </p>
                    <Tags :blogI="blogI"></Tags>
                </div>
            </article>
        </div>
        <div class="page">
            <Page :total="count" size="small"
                v-show="filtedList.length"
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
    import TagWitiText from './components/tag.vue';

    export default {
        name: 'BlogList',
        mixins: [ link ],
        components: { Tags, TagWitiText },
        data() {
            return {
                defaultImg,
                validImgNum: 19,
                pageIndex: 1,
                pageSize: 9,
                blogList: [],
                count: -1,
                testShow: true,
                filterTypes: [
                    { icon: 'md-apps', text: '所有文章', filterValue: '' },
                    { icon: 'logo-github', text: '技术笔记', filterValue: 'tec' },
                    { icon: 'md-paw', text: '生活记录', filterValue: 'life' },
                ],
                category: '',
            };
        },
        watch: {
            category() {
                this.blogs();
            },
        },
        computed: {
            imgList() {
                const result = [];
                (this.blogList || []).forEach(i => {
                    result[i.id] = require('../../assets/images/' + (i.id % this.validImgNum || 1) + '.jpg');
                });
                return result;
            },
            filtedList() {
                return this.blogList;
            },
        },
        methods: {
            async blogs(i) {
                const res = await this.ajax.get('/api/blogs', {
                    params: {
                        pageIndex: i,
                        pageSize: this.pageSize,
                        category: this.category,
                    },
                });
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
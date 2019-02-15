export default {
    methods: {
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
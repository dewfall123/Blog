'use strict';
const fs = require('fs');

const path = 'D:\\node练习项目\\egg\\egg-example\\blog-front\\src\\assets\\images';
const fileList = fs.readdirSync(path);
console.log(fileList.length);
console.log(typeof fileList[0]);
fileList.forEach(name => {
    if (name.match(/\(\d+\)/)) {
        console.log(name);
        const replaceName = name.replace(/\(\d+\)/, '');
        fs.createReadStream(path + '\\' + name).pipe(fs.createWriteStream(path + '\\' + replaceName));
        fs.unlink(path + '\\' + name, err => {
            if (!err) {
                console.log(`删除${name}成功`);
            }
        });
    }
});


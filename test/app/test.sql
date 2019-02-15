-- 11.11 添加字段
ALTER TABLE blog ADD COLUMN summary VARCHAR(1000) DEFAULT '...' COMMENT '摘要';
ALTER TABLE blog ADD COLUMN editCount int DEFAULT 0 COMMENT '修改次数';
ALTER TABLE blog ADD COLUMN firstImg VARCHAR(500) DEFAULT '' COMMENT '首图';
ALTER TABLE blog ADD COLUMN city VARCHAR(50) DEFAULT '广州' COMMENT '城市';
ALTER TABLE blog ADD COLUMN weather VARCHAR(50) DEFAULT 'sunny' COMMENT '天气';
ALTER TABLE blog ADD COLUMN htmlContent text DEFAULT '' COMMENT 'html';
ALTER TABLE blog ADD COLUMN see int DEFAULT 0 COMMENT '查看数';
ALTER TABLE blog ADD COLUMN category VARCHAR(20) DEFAULT 'tec' COMMENT '分类';

UPDATE blog SET category = 'tec';

CREATE TABLE user 


// 复制数据库
mysqldump blog -u root -p123456 --add-drop-table | mysql newdb -u root -p123456

CREATE DATABASE blog_prod;
CREATE TABLE blog_prod.blog LIKE blog.blog;
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


-- // 复制数据库
mysqldump blog -u root -p123456 --add-drop-table | mysql newdb -u root -p123456

CREATE DATABASE blog_prod;
CREATE TABLE blog_prod.blog LIKE blog.blog;

ALTER TABLE blog  MODIFY content TEXT  CHARACTER SET utf8mb4  COLLATE utf8mb4_unicode_ci;
ALTER TABLE blog CONVERT TO CHARACTER SET utf8mb4;

-- // 查看编码状态
SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';
SET NAMES utf8mb4; 
ALTER DATABASE `blog` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER DATABASE 'blog' CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


-- note表
CREATE TABLE IF NOT EXISTS `note`(
   `id` INT AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `content` TEXT ,
   `createUser` VARCHAR(20) DEFAULT null,
   `createTime` VARCHAR(20) DEFAULT null,
   `editTime` VARCHAR(20) DEFAULT null,
   `tags` VARCHAR(2000) DEFAULT null,
   `category` VARCHAR(20) DEFAULT null,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE note ADD COLUMN summary text  COMMENT '摘要';
ALTER TABLE note ADD COLUMN markdown text  COMMENT 'markdown';
ALTER TABLE note ADD COLUMN firstImg  VARCHAR(2000) DEFAULT null  COMMENT '首图';

-- user表
CREATE TABLE IF NOT EXISTS `user`(
   `id` INT AUTO_INCREMENT,
   `nick` VARCHAR(100) NOT NULL,
   `phone` VARCHAR(20) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `sex` INT NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE user ADD COLUMN pwd VARCHAR(100) DEFAULT '' COMMENT '密码md5';


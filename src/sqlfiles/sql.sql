CREATE DATABASE IF NOT EXISTS `book_store`;
USE `book_store`;


CREATE TABLE IF NOT EXISTS `user` (
  `id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '自動編號',
  `nickname` VARCHAR(20) NOT NULL COMMENT '暱稱',
  `account` VARCHAR(20) NOT NULL COMMENT '帳號',
  `password` VARCHAR(32) NOT NULL COMMENT '密碼',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '帳號創建日期',
  PRIMARY KEY (`id`),
  KEY `createDate` (`createDate`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `bookclass` (
  `id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '自動編號',
  `name` VARCHAR(20) NOT NULL COMMENT '分類名稱',
  PRIMARY KEY (`id`),
  KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `bookclass` (`name`) VALUES('哲學類');
INSERT INTO `bookclass` (`name`) VALUES('宗教類');
INSERT INTO `bookclass` (`name`) VALUES('科學類');
INSERT INTO `bookclass` (`name`) VALUES('歷史類');
INSERT INTO `bookclass` (`name`) VALUES('預言文學類');
INSERT INTO `bookclass` (`name`) values('藝術類');

CREATE TABLE IF NOT EXISTS `book` (
  `id` INTEGER NOT NULL AUTO_INCREMENT COMMENT '自動編號',
  `bookname` VARCHAR(20) NOT NULL COMMENT '書名',
  `bookclassId` INTEGER NOT NULL COMMENT '書籍分類ID',
  `author` VARCHAR(128) NOT NULL COMMENT '作者',
  `publishingHouse` VARCHAR(128) NOT NULL COMMENT '出版社',
  `createDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '帳號創建日期',
  PRIMARY KEY (`id`),
  KEY `createDate` (`createDate`) USING BTREE,
  FOREIGN KEY(bookclassId) REFERENCES bookclass(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


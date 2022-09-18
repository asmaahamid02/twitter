-- -----------------------------------------------------
-- Schema twitterdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `twitterdb` DEFAULT CHARACTER SET utf8 ;
USE `twitterdb` ;

-- -----------------------------------------------------
-- Table `twitterdb`.`profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Biography` VARCHAR(160) NULL,
  `location` VARCHAR(30) NULL,
  `url` VARCHAR(100) NULL,
  `profile_image_path` VARCHAR(255) NULL,
  `cover_image_path` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`))



-- -----------------------------------------------------
-- Table `twitterdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `profile_id` INT NULL,
  `name` VARCHAR(70) NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `birth_date` DATETIME NOT NULL,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_users_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `twitterdb`.`profiles` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)



-- -----------------------------------------------------
-- Table `twitterdb`.`friends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `friend_id` INT NOT NULL,
  `is_deleted` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`, `friend_id`),
  CONSTRAINT `fk_users_follows_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_follows_users2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)



-- -----------------------------------------------------
-- Table `twitterdb`.`blocks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`blocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `blocked_user_id` INT NOT NULL,
  `is_deleted` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_blocked_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_blocked_users_users2`
    FOREIGN KEY (`blocked_user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)



-- -----------------------------------------------------
-- Table `twitterdb`.`tweets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`tweets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tweet` VARCHAR(280) NULL,
  `picture` VARCHAR(255) NULL,
  `is_public` TINYINT NOT NULL DEFAULT 1,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tweets_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)



-- -----------------------------------------------------
-- Table `twitterdb`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `is_deleted` TINYINT NULL DEFAULT 0,
  `created_at` DATETIME NULL DEFAULT TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tweets_likes_tweets1`
    FOREIGN KEY (`tweet_id`)
    REFERENCES `twitterdb`.`tweets` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_tweets_likes_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)


-- -----------------------------------------------------
-- Schema twitterdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `twitterdb` DEFAULT CHARACTER SET utf8 ;
USE `twitterdb` ;

-- -----------------------------------------------------
-- Table `twitterdb`.`users_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`users_profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Biography` VARCHAR(160) NULL,
  `location` VARCHAR(30) NULL,
  `url` VARCHAR(100) NULL,
  `profile_image_path` VARCHAR(255) NULL,
  `cover_image_path` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `twitterdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `profile_id` INT NOT NULL,
  `name` VARCHAR(70) NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `email` VARCHAR(255) NULL,
  `birth_date` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_users_profiles1_idx` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_users_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `twitterdb`.`users_profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `twitterdb`.`users_follows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`users_follows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `followed_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_follows_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_users_follows_users2_idx` (`followed_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_follows_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_follows_users2`
    FOREIGN KEY (`followed_user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `twitterdb`.`blocked_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`blocked_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `blocked_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_blocked_users_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_blocked_users_users2_idx` (`blocked_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_blocked_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_blocked_users_users2`
    FOREIGN KEY (`blocked_user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `twitterdb`.`tweets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`tweets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tweet` VARCHAR(280) NULL,
  `picture` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tweets_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_tweets_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `twitterdb`.`tweets_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitterdb`.`tweets_likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tweets_likes_tweets1_idx` (`tweet_id` ASC) VISIBLE,
  INDEX `fk_tweets_likes_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_tweets_likes_tweets1`
    FOREIGN KEY (`tweet_id`)
    REFERENCES `twitterdb`.`tweets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tweets_likes_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `twitterdb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


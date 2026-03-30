/*M!999999\- enable the sandbox mode */
-- MariaDB dump 10.19-12.1.2-MariaDB, for osx10.21 (arm64)
--
-- Host: 127.0.0.1    Database: to_do_db
-- ------------------------------------------------------
-- Server version	12.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */
;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8mb4 */
;
CREATE TABLE `todos` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `completed` tinyint(1) DEFAULT 0,
    `user_id` int(10) unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `todos`
--

/*!40000 ALTER TABLE `todos` DISABLE KEYS */
;
set autocommit = 0;

INSERT INTO
    `todos`
VALUES (1, 'My first task', 0, 1),
    (2, 'My first task', 0, 1),
    (5, 'mine poodi', 0, 2);
/*!40000 ALTER TABLE `todos` ENABLE KEYS */
;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(30) DEFAULT '',
    `email` varchar(50) DEFAULT '',
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3 COLLATE = utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
set autocommit = 0;

INSERT INTO
    `users`
VALUES (
        1,
        'testuser',
        'test@test.com',
        '$2a$10$UJw2V8PW57YNyZAw71GGQuC2MMZyNcRzvYvcZ5AWK6meNgMQ6/FnC'
    ),
    (
        2,
        'mairi',
        'mairi.tikk@gmail.com',
        '$2a$10$gJNKANlDqo0sntU0bJPzgOJHRYiArlu72./3.GgswKaFXAYQxrjT6'
    );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
commit;

--
-- Dumping routines for database 'to_do_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */
;

-- Dump completed on 2026-03-26 17:53:32
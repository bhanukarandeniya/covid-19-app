-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: covid_tracker_db
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `covid_incident`
--

DROP TABLE IF EXISTS `covid_incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `covid_incident` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `discription` text NOT NULL,
  `active_record` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `covid_district` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `covid_district` (`covid_district`),
  CONSTRAINT `covid_incident_ibfk_1` FOREIGN KEY (`covid_district`) REFERENCES `district` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covid_incident`
--

LOCK TABLES `covid_incident` WRITE;
/*!40000 ALTER TABLE `covid_incident` DISABLE KEYS */;
INSERT INTO `covid_incident` VALUES (1,'2020-09-17 23:10:10','Apeksha Hospital','Apeksha Hospital, Maharagama','Maharagama','Subject has come to the Hospital for the treatments',1,'2020-09-21 19:31:56','2020-09-21 19:31:56',1),(2,'2020-09-18 23:10:10','Colombo City Center','Colombo City Center, Colombo 02','Colombo','Subject has gone to movie theater',1,'2020-09-21 20:36:31','2020-09-21 20:36:31',1);
/*!40000 ALTER TABLE `covid_incident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` smallint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'Colombo',10100,'2020-09-16 10:10:10','2020-09-16 10:10:10'),(2,'Galle',20100,'2020-09-16 10:10:10','2020-09-16 10:10:10');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `nic` varchar(10) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `dob` datetime NOT NULL,
  `maritial_status` tinyint(1) NOT NULL,
  `spouse` varchar(255) NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `infection_status` enum('POSITIVE','NEGATIVE','PENDING') NOT NULL,
  `description` text NOT NULL,
  `incident_id` int NOT NULL,
  `active_record` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `person_district` smallint DEFAULT NULL,
  `gender` tinyint(1) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `incident_id` (`incident_id`),
  KEY `person_district` (`person_district`),
  CONSTRAINT `person_ibfk_1` FOREIGN KEY (`incident_id`) REFERENCES `covid_incident` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_ibfk_2` FOREIGN KEY (`person_district`) REFERENCES `district` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Vimal','De Silva','No 22/B, Madiwela Rd,','Pelawatte, Thalawathgoda','871266034V','Thalawathgoda','1987-09-16 10:10:10',1,'S J De Silva','Clark','PENDING','Subject has been associated with few more covid suspicious subjects ',1,1,'2020-09-21 20:19:50','2020-09-21 20:19:50',1,1,'0738992361'),(2,'Madhawa','Weerasooriya','No 22/B, Madiwela Rd,','Pelawatte, Thalawathgoda','911266034V','Thalawathgoda','1991-09-16 10:10:10',1,'S J De Silva','Clark','NEGATIVE','Subject has been associated with few more covid suspicious subjects ',1,1,'2020-09-21 20:21:21','2020-09-21 20:21:21',1,1,'0776734552'),(3,'Supun','Karunarathna','No. 45/1A Rajakaruna mw,','Koswatta, Rajagiriya','891266034V','Rajagiriya','1989-09-16 10:10:10',0,'S K Kallora','Engineer','PENDING','Subject has been associated with few more covid suspicious subjects ',1,1,'2020-09-21 20:24:10','2020-09-21 20:24:10',1,1,'0713774375'),(4,'Kumudu','Weerasinghe','No. 762A Rajamal rd,','Thalawathugoda, Kottawa','941266034V','Thalawathugoda','1994-09-16 10:10:10',0,'H A Weerasinghe','None','POSITIVE','Subject has been associated with few more covid suspicious subjects ',2,1,'2020-09-21 20:39:25','2020-09-21 20:39:25',2,0,'0761122384');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22  2:41:00

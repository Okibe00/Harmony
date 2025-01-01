-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: harmony
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` varchar(255) NOT NULL,
  `generic_name` text,
  `brand_name` varchar(255) NOT NULL,
  `manufacturer_id` varchar(255) DEFAULT NULL,
  `nafdac_no` varchar(50) DEFAULT NULL,
  `pack_size` varchar(100) DEFAULT NULL,
  `drug_class` varchar(100) DEFAULT NULL,
  `category` enum('POM','OTC') NOT NULL,
  `dosage_form` varchar(100) NOT NULL,
  `active_ingredients` text NOT NULL,
  `market_status` enum('active','discontinued') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `manufacturer_id` (`manufacturer_id`),
  KEY `idx_brand_name` (`brand_name`),
  CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES ('15a53016-be48-41ed-a7a2-7fdae94bde5f','Artemeter+lumefrantrine','Amatem Soft Gel 80/480mg','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','546236','1x10','Antimalaria','POM','Tablet','Artemeter 80mg + Lumefrantine 480mg','active','2024-12-18 23:22:35','2024-12-18 23:22:35'),('39160fb6-1dbc-4e68-892b-4767f192b375','Triamcinolone-Econazole-Gentamicin','AcneAway','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','A4-2733','1x1','Antihelminthic','OTC','Tablet','Triamcinolone-0.1%-Econazole-1%-Gentamicin-0.1%','active','2024-12-21 10:20:32','2024-12-21 10:20:32'),('570e7709-f963-481c-b898-e5272cd80b97','alpha-beta-Arteether','Afebeta','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','546236','1x3','Antimalaria','POM','Injection','alpha-beta-Arteether 150mg','active','2024-12-21 10:04:59','2024-12-21 10:04:59'),('5cf6d211-77d0-4b76-87ff-a76fcea39258','Paracetamol','Emzor Paracetamol','5c85a761-7977-4889-a6e1-27323dee021c','B4-8578','1x10','Antipyretic','OTC','Tablet','Paracetamol 500mg','active','2024-12-18 23:22:36','2024-12-18 23:22:36'),('667a76ff-24a5-4e47-859b-b1605aefb6e4','Amlodipine','Amlong 10','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','A4-445','1x10','Antibiotic','POM','Tablet','Amlodipine-10mg','active','2024-12-21 10:54:26','2024-12-21 10:54:26'),('7ffc10b9-6043-4e23-b8a3-68d4e6a39ba6','Acyclovir','Acyclovir Cream','2d07528f-67fe-404f-8400-5129a49c61fb','B4-828','1x1','Antiviral','POM','Cream','Acyclovir 15%w/w','active','2024-12-18 23:22:43','2024-12-18 23:22:43'),('a7cb272f-739b-486e-8f34-3b9be5b75864','Albendazole','Wormplan','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','A4-5933','1x1','Antihelminthic','OTC','Tablet','Albendazole 400mg','active','2024-12-21 10:17:50','2024-12-21 10:17:50'),('c9998095-47b0-40cd-a49f-7af5e2c80725','Ciprofloxacin','Cenox','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','04-3002','1x10','Antibiotic','POM','Tablet','Ciprofloxacin 500mg','active','2024-12-21 10:23:38','2024-12-21 10:23:38'),('dc250334-46e2-47e2-947a-0bf796758f58','Ciprofloxacin-Tinidazole','Cenox-TN','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','B4-9244','1x10','Antibiotic','POM','Tablet','Ciprofloxacin-500mg-Tinidazole-600mg','active','2024-12-21 10:50:30','2024-12-21 10:50:30'),('dd6acd1c-2241-44a0-8d09-13526e1621dc','Amlodipine','Amlong 5','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','A4-0441','1x10','Antihypertensive','POM','Tablet','Amlodipine-5mg','active','2024-12-21 11:06:51','2024-12-21 11:06:51'),('e329e019-ac73-4ac9-acdd-3ffcae505dbb','Dihydroartemisin-Piperaquine','Ibasunate','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','B4-4786','1x9','Antimalaria','POM','Gelatin-Capsule','Dihydroartemisin-40mg-Piperaquine-320mg','active','2024-12-21 10:13:25','2024-12-21 10:13:25');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codes`
--

DROP TABLE IF EXISTS `codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codes` (
  `id` varchar(255) NOT NULL,
  `brand_id` varchar(255) DEFAULT NULL,
  `manufacturer_id` varchar(255) DEFAULT NULL,
  `product_code` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`product_code`),
  KEY `brand_id` (`brand_id`),
  KEY `manufacturer_id` (`manufacturer_id`),
  CONSTRAINT `codes_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `codes_ibfk_2` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codes`
--

LOCK TABLES `codes` WRITE;
/*!40000 ALTER TABLE `codes` DISABLE KEYS */;
INSERT INTO `codes` VALUES ('2e5e7ea9-8935-4a5b-9ebe-75bae15663ba','e329e019-ac73-4ac9-acdd-3ffcae505dbb','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Iba-7c4-Gel-Antim','2024-12-21 10:13:25','2024-12-21 10:13:25'),('569139e2-dd84-4121-aa1d-ee9aa762dd57','570e7709-f963-481c-b898-e5272cd80b97','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Afe-7c4-Inj-Antim','2024-12-21 10:04:59','2024-12-21 10:04:59'),('942ae38d-f0cf-46fd-aed8-a1618a65cab0','dd6acd1c-2241-44a0-8d09-13526e1621dc','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Aml-e8d6a2-Tab-Antih','2024-12-21 11:06:51','2024-12-21 11:06:51'),('b6487c23-d0be-49aa-bc97-ca009ecb8e5f','39160fb6-1dbc-4e68-892b-4767f192b375','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Acn-7c4-Tab-Antih','2024-12-21 10:20:32','2024-12-21 10:20:32'),('bf2537bb-173c-4ee6-9e2e-9358548c4131','a7cb272f-739b-486e-8f34-3b9be5b75864','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Wor-7c4-Tab-Antih','2024-12-21 10:17:50','2024-12-21 10:17:50'),('deade729-fb2b-4c67-8972-3ecfa2355283','c9998095-47b0-40cd-a49f-7af5e2c80725','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Cen-7c4-Tab-Antib','2024-12-21 10:23:39','2024-12-21 10:23:39'),('faebdc8e-3bd8-4fab-9bfd-6ea2adb82208','dc250334-46e2-47e2-947a-0bf796758f58','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Cen-edb-Tab-Antib','2024-12-21 10:50:30','2024-12-21 10:50:30'),('fd6e307e-22d5-454b-9a61-ddf6a9faad90','667a76ff-24a5-4e47-859b-b1605aefb6e4','7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Aml-df4-Tab-Antib','2024-12-21 10:54:26','2024-12-21 10:54:26');
/*!40000 ALTER TABLE `codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturers` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_manufacturer_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES ('0ad7c637-3577-4d8d-ae1d-50946255ae66','Chi Pharma Ltd','Nigeria','2024-12-18 06:06:48','2024-12-18 06:06:48'),('1360f8d5-d5c0-4056-a833-9772eb61ee38','Fidson PLC','Nigeria','2024-12-18 06:06:48','2024-12-18 06:06:48'),('2d07528f-67fe-404f-8400-5129a49c61fb','DrugField','Nigeria','2024-12-18 06:06:48','2024-12-18 06:06:48'),('5c85a761-7977-4889-a6e1-27323dee021c','Emzor Pharmaceuticals','Nigeria','2024-12-18 06:06:48','2024-12-18 06:06:48'),('7c458dbc-6272-4fe7-b03f-eae4086bb8ef','Elbe','Nigeria','2024-12-18 06:06:48','2024-12-18 06:06:48');
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5e3b0aa4-8968-4692-ad86-00905d5a549a','okibe007','okibe007','okibe@somemail','2024-12-26 21:46:23','2024-12-26 21:46:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-01 12:22:50

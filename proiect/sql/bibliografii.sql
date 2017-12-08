--SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


--/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
--/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
--/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
--/*!40101 SET NAMES utf8 */;

--
-- Baza de date: `bibioteca`
--
CREATE DATABASE `bibliografii` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bibliografii`;

-- --------------------------------------------------------

--
-- Tabela Format
--

CREATE TABLE IF NOT EXISTS `formate` (
  `id_format` smallint(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `citate` (
  `id_citate` smallint(5) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id_format` smallint(5) DEFAULT NULL,
  `titlul_sursei` varchar(100) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `descriere` varchar(300) DEFAULT NULL,
  `data_aparitiei` DATE,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  CONSTRAINT fk_format FOREIGN KEY (id_format) REFERENCES formate(id_format)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;






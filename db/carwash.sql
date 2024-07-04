-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-07-2024 a las 16:06:49
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carwash`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldatoscliente`
--

DROP TABLE IF EXISTS `tbldatoscliente`;
CREATE TABLE IF NOT EXISTS `tbldatoscliente` (
  `idDatosCliente` int(11) NOT NULL AUTO_INCREMENT,
  `apeNomDatosCliente` varchar(50) NOT NULL,
  `documentosDatosCliente` varchar(100) NOT NULL,
  `emailDatosCliente` varchar(100) NOT NULL,
  PRIMARY KEY (`idDatosCliente`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldatosreservaturno`
--

DROP TABLE IF EXISTS `tbldatosreservaturno`;
CREATE TABLE IF NOT EXISTS `tbldatosreservaturno` (
  `idDatosReservaTurno` int(10) NOT NULL AUTO_INCREMENT,
  `idDatosCliente` int(10) NOT NULL,
  `idDatosVehiculo` int(10) NOT NULL,
  `fechaReservaTurno` date NOT NULL,
  `horaReservaTurno` time(6) NOT NULL,
  `idTiposServicios` int(10) NOT NULL,
  `estadoReservaTurno` text NOT NULL,
  PRIMARY KEY (`idDatosReservaTurno`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbldatosvehiculo`
--

DROP TABLE IF EXISTS `tbldatosvehiculo`;
CREATE TABLE IF NOT EXISTS `tbldatosvehiculo` (
  `idDatosVehiculo` int(10) NOT NULL AUTO_INCREMENT,
  `idTipoVehiculo` int(10) NOT NULL,
  `patenteDatosVehiculo` varchar(10) DEFAULT NULL,
  `descripcionDatosVehiculo` varchar(255) DEFAULT NULL,
  `idDatosPersonales` int(10) NOT NULL,
  PRIMARY KEY (`idDatosVehiculo`),
  KEY `idTipoVehiculo` (`idTipoVehiculo`),
  KEY `idDatosPersonales_2` (`idDatosPersonales`),
  KEY `descripcionVehiculo` (`idDatosPersonales`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbltiposervicio`
--

DROP TABLE IF EXISTS `tbltiposervicio`;
CREATE TABLE IF NOT EXISTS `tbltiposervicio` (
  `idTipoServicio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionTipoServicio` text NOT NULL,
  `nombreTipoServicio` varchar(30) NOT NULL,
  `imgTipoServicio` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoServicio`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbltiposervicio`
--

INSERT INTO `tbltiposervicio` (`idTipoServicio`, `descripcionTipoServicio`, `nombreTipoServicio`, `imgTipoServicio`) VALUES
(1, 'Contamos con un sistema de lavado sin cepillos, está totalmente diseñado para la limpieza de vehículos mediante el rociado de agua y espuma. Este sistema de\r\nlavado para coche no posee cepillos u otros componentes que puedan entrar en contacto con el coche. Este sistema de lavado rocía agua de forma más rápida y efectiva para una eficiencia óptima del lavado de su coche. El sistema sin cepillos son perfectos para cualquier automóvil sea pequeños, medianos o grande. Con este sistema nos ayuda a incrementar la velocidad de lavado con eficacia y entregar su vehículo a tiempo. Su vehículo estará protegido en todo momento mientras se realiza el servicio                       de lavado.\r\n', 'Lavado', 'lavado.png'),
(4, 'Para su correspondiente siliconado de neumáticos antes lavamos los neumáticos con agua y jabón y cepillo de cerdas suaves para eliminar la suciedad, el polvo y la grasa. Enjuagando con agua para asegurarnos de que estén completamente limpias y luego del secado completo aplicamos la silicona en cantidad adecuada con una esponja suave distribuyendo uniformemente sobre la superficie de la llanta incluyendo los bordes y rincones así dando un tiempo suficiente de secado según recomendado por la marca del fabricante. Luego pulimos las llantas esto dará un brillo adicional y a eliminar cualquier exceso de silicona.\r\n', 'Siliconado', 'siliconado.png'),
(2, 'Aplicamos productos de ceras a base de CARNAUBA, ya que son una\r\n                        de las ceras naturales más puras que producen un brillo profundo y lustroso. En cuanto a la\r\n                        técnica de encerado de su automóvil, aplicamos una capa fina y uniforme a una capa gruesa\r\n                        mediante un movimiento de lado a lado en forma paralelo a las juntas, de esta manera cubriendo\r\n                        de poco con el producto hasta cubrir toda la zona del coche de esta manera aseguramos de que la\r\n                        cera o el abrillantador no se seque antes de pulir.', 'Encerado', 'encerado.png'),
(3, 'Con respecto a la limpieza del motor en primer lugar\r\n                        retiramos el polvo de todas las partes visibles del motor, para ello utiliza el cepillo y la\r\n                        aspiradora. Luego con el limpiador multiusos rociamos por todas las partes visibles del motor\r\n                        evitando tocar los cables y las conexiones eléctricas, usando un paño para limpiar toda la zona.\r\n                        En caso de que existan manchas persistentes que no hayan desaparecido con el limpiador multiuso,\r\n                        aplicamos un desengrasante para acabar con ellas. Una vez seco y limpio aplicamos un\r\n                        abrillantador específico para plásticos y así lograr el acabado final', 'Motor', 'motor.png'),
(5, 'Para la limpieza de interior de su automóvil aplicamos\r\n                        restauradores de plásticos previo desengrase, no usamos siliconas, contamos con máquinas de\r\n                        vapor para de esta manera desinfectar ductos de aire acondicionado, así lograr eliminar los\r\n                        hongos que se pueden formar dentro los cuales son responsables de emanar un mal olor al prender\r\n                        la calefacción. La tapicería se desinfecta y se lava con maquinarias de inyección y extracción.\r\n                        Su limpieza incluye asientos, puertas, techo, baúl, alfombras, burletes y entradas de aire.', 'Interior', 'interior.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbltipovehiculo`
--

DROP TABLE IF EXISTS `tbltipovehiculo`;
CREATE TABLE IF NOT EXISTS `tbltipovehiculo` (
  `idTipoVehiculo` int(10) NOT NULL AUTO_INCREMENT,
  `nombreTipoVehiculo` varchar(50) NOT NULL,
  PRIMARY KEY (`idTipoVehiculo`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbltipovehiculo`
--

INSERT INTO `tbltipovehiculo` (`idTipoVehiculo`, `nombreTipoVehiculo`) VALUES
(1, 'Auto'),
(2, 'Camioneta'),
(3, 'Moto'),
(4, 'Camion'),
(5, 'Autobus');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbltipovehiculoservicio`
--

DROP TABLE IF EXISTS `tbltipovehiculoservicio`;
CREATE TABLE IF NOT EXISTS `tbltipovehiculoservicio` (
  `idTipoVehiculoServicio` int(10) NOT NULL AUTO_INCREMENT,
  `idTipoVehiculo` int(10) NOT NULL,
  `idTipoServicio` int(10) NOT NULL,
  `precioTipoVehiculoServicio` decimal(10,0) NOT NULL,
  PRIMARY KEY (`idTipoVehiculoServicio`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbltipovehiculoservicio`
--

INSERT INTO `tbltipovehiculoservicio` (`idTipoVehiculoServicio`, `idTipoVehiculo`, `idTipoServicio`, `precioTipoVehiculoServicio`) VALUES
(1, 1, 1, '3000'),
(2, 1, 2, '3500'),
(3, 1, 3, '4000'),
(4, 1, 4, '4500'),
(5, 1, 5, '3000'),
(6, 2, 1, '4000'),
(7, 2, 2, '4500'),
(8, 2, 3, '5000'),
(9, 2, 4, '5000'),
(10, 2, 5, '4500'),
(11, 3, 1, '2500'),
(12, 3, 2, '2500'),
(13, 3, 3, '3000'),
(14, 3, 4, '4000'),
(15, 3, 5, '2000'),
(16, 4, 1, '5000'),
(17, 4, 2, '5000'),
(18, 4, 3, '6000'),
(19, 4, 4, '6500'),
(20, 4, 5, '5000'),
(21, 5, 1, '7000'),
(22, 5, 2, '6000'),
(23, 5, 3, '7000'),
(24, 5, 4, '7000'),
(25, 5, 5, '6500');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusuarios`
--

DROP TABLE IF EXISTS `tblusuarios`;
CREATE TABLE IF NOT EXISTS `tblusuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(60) NOT NULL,
  `emailUsuario` varchar(60) NOT NULL,
  `passwordUsuario` varchar(255) NOT NULL,
  `rolUsuario` varchar(20) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=157 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblusuarios`
--

INSERT INTO `tblusuarios` (`idUsuario`, `nombreUsuario`, `emailUsuario`, `passwordUsuario`, `rolUsuario`) VALUES
(156, 'user1', 'user1@gmaaail.com', '$2a$05$UDoXyu.l0yoyOLBQ5rTkyuXbYJwspyGsfZbkegt9hQldpA1dAISvq', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 15. 14:03
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szalloda`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rooms`
--

CREATE TABLE `rooms` (
  `ID` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`description2`)),
  `price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rooms`
--

INSERT INTO `rooms` (`ID`, `image_path`, `name`, `description`, `description2`, `price`) VALUES
(1, 'images/superior.jpg', 'Superior szoba', 'Elegáns berendezés, kilátással a városra', '{   \"wifi\": \"Ingyenes WiFi\",   \"smart_tv\": \"Smart TV\",   \"air_conditioning\": \"Légkondicionáló\" }', 45000),
(3, 'images/Deluxe.jpg', 'Deluxe szoba', 'Tágas tér, luxus kényelemmel, kilátás a parkra', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"minibar\": \"Minibár\" }', 65000),
(4, 'images/Luxus.jpg', 'Luxus Suite', 'A legmagasabb szintű kényelem és elegancia', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"jacuzzi\": \"Jacuzzi\", \"minibar\": \"Minibár\" }', 95000),
(5, 'images/Standart.jpg', 'Standard szoba', 'Kényelmes és praktikus szoba, ideális pihenésre', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\" }', 35000),
(6, 'images/Penthouse.jpg', 'Penthouse Suite', 'Exkluzív lakosztály panorámás kilátással', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"jacuzzi\": \"Jacuzzi\", \"sauna\": \"Szauna\" }', 120000),
(8, 'images/Business.jpg', 'Business szoba', 'Ideális üzleti utazóknak, kényelmes munkakörnyezet', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"desk\": \"Munkapad\" }', 55000);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `rooms`
--
ALTER TABLE `rooms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

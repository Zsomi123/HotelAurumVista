CREATE DATABASE IF NOT EXISTS `szalloda` 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_hungarian_ci;
USE `szalloda`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `room_id` int(11) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `payment_status` enum('Paid','Pending','Failed','Refunded') NOT NULL,
  `additional_services` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `cancellation_reason` text DEFAULT NULL,
  `special_requests` text DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `payment_method` enum('Credit Card','Bank Transfer','Cash','Paypal') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `booking_status` enum('Active','Completed','Canceled','Pending') DEFAULT 'Active',
  `booking_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `coupon_code` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `restaurant_bookings` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Guests` int(11) DEFAULT NULL,
  `Special_requests` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `restaurant_menu` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` varchar(50) DEFAULT NULL,
  `Type` enum('Starters','Mains','Desserts','Drinks') NOT NULL DEFAULT 'Starters'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `restaurant_menu` (`ID`, `Name`, `Description`, `Price`, `Type`) VALUES
(2, 'Kacsamáj terrine', 'Finoman fűszerezett, krémes kacsamáj terrine, melyet friss fűszernövényekkel és pirított baguette-tel tálalunk.', '4900', 'Starters'),
(3, 'Lobster Bisque', 'Egy gazdag és krémes homár leves, amely friss fűszernövényekkel és egy csepp brandy-vel van ízesítve.', '6900', 'Starters'),
(4, 'Tengeri herkentyűk carpaccio', 'Vékonyra szeletelt friss tengeri herkentyűk, citromlével, olívaolajjal és egy kis csípős tormával tálalva.', '5500', 'Starters'),
(5, 'Vörösboros marhaszelet', 'Ínycsiklandó marhaszelet, vörösboros mártással, burgonyapürével és friss zöldségekkel tálalva.', '12900', 'Mains'),
(6, 'Grillezett lazacfilé', 'Frissen grillezett lazacfilé, citromos vajjal és ropogós zöldségekkel, rizottóval és kapros öntettel tálalva.', '11500', 'Mains'),
(7, 'Vaddisznó steakek', 'Finoman grillezett vaddisznó steak, fűszeres áfonyaszósszal és házi készítésű krokettel tálalva.', '14500', 'Mains'),
(8, 'Citromtorta meringue-nel', 'Krémes, friss citromtorta, finom meringue-val a tetején, amit lánggal pirítunk.', '3500', 'Desserts'),
(9, 'Csokoládéfondü', 'Gazdag, olvasztott csokoládé, melyet friss gyümölcsökkel, piskótával és pörkölt mandulával tálalunk.', '3900', 'Desserts'),
(10, 'Tiramisu', 'Klasszikus olasz tiramisu, krémes mascarpone töltelékkel, eszpresszóval áztatott piskótával.', '4200', 'Desserts'),
(11, 'Bordeaux vörösbor (Château Margaux)', 'Prémium vörösbor gazdag ízvilággal és kifinomult tanninokkal, tökéletes húsételek mellé.', '15900', 'Drinks'),
(12, 'Pezsgő (Dom Pérignon)', 'A világ egyik legismertebb pezsgője, friss, ropogós ízekkel és egyedülálló buborékélménnyel.', '49900', 'Drinks'),
(13, 'Friss gyümölcslé (narancs és gránátalma)', 'Frissen facsart narancs és gránátalma lé, édes és savanykás ízekkel.', '2200', 'Drinks');

CREATE TABLE `rooms` (
  `ID` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`description2`)),
  `price` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `rooms` (`ID`, `image_path`, `name`, `description`, `description2`, `price`) VALUES
(8, 'images/Business.jpg', 'Business szoba', 'Ideális üzleti utazóknak, kényelmes munkakörnyezet', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"desk\": \"Munkapad\" }', 55000),
(9, 'images/Standart.jpg', 'Standard szoba', 'Kényelmes és praktikus szoba, ideális pihenésre', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"minibar\": \"Minibár\" }', 35000),
(10, 'images/Superior.jpg', 'Superior szoba', 'Elegáns berendezés, kilátással a városra', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\" }', 53000),
(11, 'images/Deluxe.jpg', 'Deluxe szoba', 'Tágas tér, luxus kényelemmel, kilátás a parkra', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"minibar\": \"Minibár\" }', 53000),
(12, 'images/Luxus.jpg', 'Luxus Suite', 'A legmagasabb szintű kényelem és elegancia', '{ \"wifi\": \"Ingyenes WiFi\", \"smart_tv\": \"Smart TV\", \"air_conditioning\": \"Légkondicionáló\", \"jacuzzi\": \"Jacuzzi\", \"minibar\": \"Minibár\" }', 54000);

CREATE TABLE `rooms_data` (
  `ID` int(11) NOT NULL,
  `Room_type` int(11) DEFAULT NULL,
  `Room_number` int(11) DEFAULT NULL,
  `Room_status` enum('Available','Occupied','Cleaning','Maintenance') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `rooms_data` (`ID`, `Room_type`, `Room_number`, `Room_status`) VALUES
(1, 8, 101, 'Occupied'),
(2, 9, 102, 'Available'),
(3, 10, 103, 'Available'),
(4, 11, 104, 'Available'),
(5, 12, 105, 'Available');

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `shop` (`id`, `Name`, `Description`, `Points`) VALUES
(1, 'Ingyen kaja', 'Ingyen vacsora ott ahol kell', 5),
(2, 'Ocsó ruha', '50% az kínai ruhákra mindenholis', 10);

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `membership_level` enum('Normal','Gold','Platinum','Diamond','VIP','Adminisztrátor') DEFAULT 'Normal',
  `Created_at` datetime DEFAULT current_timestamp(),
  `Points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO `users` (`ID`, `email`, `first_name`, `last_name`, `password`, `phone_number`, `membership_level`, `Created_at`, `Points`) VALUES
(5, 'a@a.a', 'a', 'a', '$2a$10$QY.zi7SdRIuXZk8Tpu1e9.g.sGC0HLg.tS/Od.svfqxEVhyJuOpJu', '123', 'Normal', '2025-01-21 15:30:11', 2000),
(7, 'admin@admin.com', 'Admin', 'User', '$2a$10$QY.zi7SdRIuXZk8Tpu1e9.g.sGC0HLg.tS/Od.svfqxEVhyJuOpJu', '123456789', 'Adminisztrátor', '2025-01-21 15:30:11', 0);

ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `FK_bookings_rooms_data` (`room_id`);

ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reward_id` (`reward_id`);

ALTER TABLE `restaurant_bookings`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `restaurant_menu`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `rooms`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `rooms_data`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_rooms_data_rooms` (`Room_type`),
  ADD KEY `Room_number` (`Room_number`);

ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`) USING BTREE;

ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `restaurant_bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `restaurant_menu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `rooms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `rooms_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `bookings`
  ADD CONSTRAINT `FK_bookings_rooms_data` FOREIGN KEY (`room_id`) REFERENCES `rooms_data` (`Room_number`),
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`);

ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `coupons_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `shop` (`id`);

ALTER TABLE `rooms_data`
  ADD CONSTRAINT `FK_rooms_data_rooms` FOREIGN KEY (`Room_type`) REFERENCES `rooms` (`ID`);
COMMIT;
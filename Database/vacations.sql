-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 10:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(45, 62),
(45, 59),
(45, 66),
(45, 67),
(45, 57),
(45, 60),
(46, 62),
(46, 58),
(46, 68),
(46, 59),
(46, 64),
(46, 61),
(46, 66),
(47, 62),
(47, 68),
(47, 63),
(47, 65),
(47, 64),
(47, 60),
(47, 58),
(48, 62),
(48, 63),
(48, 66),
(48, 59),
(48, 68),
(48, 61),
(49, 57),
(49, 62),
(49, 58),
(49, 68),
(49, 63),
(49, 65),
(49, 67),
(49, 61),
(49, 64);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `userUuid` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(512) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userUuid`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(44, 'd4f35cf0-b667-4ad3-82df-0b71fc22eb81', 'david', 'nezri', 'davidnezri1990@gmail.com', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 1),
(45, '495df55a-b7f4-4bd5-9e93-3f6d9fd6e4cc', 'יעל', 'נזרי', 'yaelnezri1991@gmail.com', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 2),
(46, '550d7939-7f3e-4141-9016-6ce17fc6abab', 'itamar', 'nezri', 'itanez', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 2),
(47, 'e845273b-ffd4-41ab-85ea-9dd5b943ef7e', 'meir', 'nezri', 'menez', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 2),
(48, '18529e5f-a3cd-4f95-8131-d07728ba1b87', 'shay', 'nezri', 'shanez', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 2),
(49, '19c9117b-a3af-472d-92dc-80c1ea4ec662', 'adele', 'nezri', 'adenez', '688c2380337c10daafc53957b5fbf34ab0f9d9da5d8260bcbcf5d0403cd3a01804784957986514a8a00a3f61b8334643f082011fe89b18acd3af3ac43f165f7e', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(57, 'canada', 'Experience the breathtaking beauty of Canada on your dream vacation. Immerse yourself in stunning landscapes, from the majestic Rocky Mountains to the serene shores of Lake Louise. Explore vibrant cities like Toronto and Vancouver, where diverse cultures and world-class dining await. Embark on thrilling outdoor adventures, whether kayaking in Banff National Park or whale watching off the coast of Nova Scotia. Discover the rich history of Quebec City\'s cobblestone streets and visit iconic landmarks like the CN Tower. With warm and friendly locals, Canada promises a memorable and captivating escape.', 'f583a7e1-c706-4123-ad30-3864176ed80d.webp', '2023-08-30', '2023-09-09', 1000.33),
(58, 'israel', 'Indulge in a captivating vacation in Israel, where history, culture, and natural beauty converge. Wander through the ancient streets of Jerusalem, where historic sites like the Western Wall and the Church of the Holy Sepulchre resonate with spiritual significance. Explore the stunning landscapes of the Dead Sea, where you can effortlessly float in the mineral-rich waters. Discover the modern energy of Tel Aviv\'s beaches, renowned nightlife, and contemporary art scene. Immerse yourself in the diverse flavors of Israeli cuisine, from falafel and hummus to fresh Mediterranean seafood. With its blend of old and new, Israel offers an unforgettable journey of exploration and enlightenment.', 'c6862d67-dd9d-456e-86e7-5b96db5719fb.webp', '2023-08-30', '2023-09-09', 550.32),
(59, 'italy', 'Embark on a mesmerizing vacation in Italy, a land of timeless beauty and rich cultural heritage. Stroll through the enchanting streets of Florence, where Renaissance art and architecture captivate at every turn. Indulge in the romantic ambiance of Venice\'s winding canals and historic palaces. Explore the ancient ruins of Rome, including the iconic Colosseum and the awe-inspiring Vatican City. Delight your taste buds with authentic Italian cuisine, from mouthwatering pasta dishes to delectable gelato. Whether you\'re sipping wine in the Tuscan countryside or admiring the dramatic Amalfi Coast, Italy promises an unforgettable blend of history, art, and la dolce vita.', '8a4c88c1-94fd-4d67-9b13-8d84159f55fb.webp', '2023-08-31', '2023-09-07', 750.94),
(60, 'lasvegas', 'Experience an electrifying getaway in Las Vegas, a dazzling city that never sleeps. Marvel at the iconic Las Vegas Strip, adorned with dazzling lights and world-famous resorts. Try your luck at the opulent casinos and catch mesmerizing live performances featuring top-tier artists. Indulge in exquisite dining options curated by renowned chefs, and unwind by luxurious poolside retreats. From the grandeur of the Bellagio fountains to the vibrant nightlife of Fremont Street, Las Vegas offers a non-stop extravaganza of entertainment, luxury, and excitement that will leave you spellbound.', '9a2c661a-8f57-473c-9b13-61b104e6d1ac.jpeg', '2023-08-30', '2023-09-08', 3256.00),
(61, 'france', 'Embark on a charming vacation in France, where romance, art, and gastronomy intertwine. Wander through the romantic streets of Paris, gazing upon the Eiffel Tower and exploring world-class museums like the Louvre. Traverse the picturesque vineyards of Bordeaux, savoring exquisite wines and gourmet delights. Relax on the stunning beaches of the French Riviera, where the Mediterranean\'s azure waters beckon. Explore the medieval villages of Provence, steeped in history and surrounded by lavender fields. Whether you\'re admiring the châteaux of the Loire Valley or sipping espresso at a café in Montmartre, France offers a diverse tapestry of culture and beauty to immerse yourself in.', '9418efa9-e97f-4fe6-a1fe-93a24f46aa41.jpeg', '2023-08-30', '2023-09-02', 1234.00),
(62, 'dubay', 'Embark on a luxurious vacation in Dubai, where opulence and modernity reign supreme. Witness the iconic Burj Khalifa, the world\'s tallest skyscraper, piercing the desert skyline. Indulge in extravagant shopping at the Dubai Mall and explore traditional souks for authentic experiences. Relax on pristine beaches along the Persian Gulf\'s shimmering waters. Immerse yourself in desert adventures, from exhilarating dune bashing to serene camel rides at sunset. Enjoy world-class dining in Michelin-starred restaurants and experience vibrant nightlife in sleek lounges. With its blend of futuristic architecture and Arabian traditions, Dubai promises an unforgettable escape into luxury and innovation.', '24e90357-6c48-48fa-8bf0-0ee0e305ade1.jpeg', '2023-08-30', '2023-09-08', 1245.00),
(63, 'america', 'Embark on an unforgettable vacation in America, a land of diverse landscapes and experiences. Explore the vibrant streets of New York City, home to iconic landmarks like Times Square and Central Park. Discover the natural wonders of the Grand Canyon, where awe-inspiring vistas take your breath away. Relax on the stunning beaches of Hawaii, surrounded by turquoise waters and lush vegetation. Immerse yourself in the musical vibes of New Orleans, where jazz and culture thrive. Experience the magic of Disney in Orlando\'s theme parks, perfect for family adventures. From the bustling streets of San Francisco to the tranquility of the Great Smoky Mountains, America offers a tapestry of adventures for every traveler.', '386cecc4-f3ee-4edb-971f-60edc344cb9c.jpeg', '2023-09-07', '2023-09-29', 4567.00),
(64, 'africa', 'Embark on a captivating vacation in Africa, a continent of diverse landscapes and cultures. Embrace the wild wonders of a safari in Serengeti National Park, where majestic animals roam freely. Relax on the pristine beaches of Seychelles, with their powdery white sands and turquoise waters. Immerse yourself in the rich history of ancient Egypt\'s pyramids and temples along the Nile River. Discover the vibrant markets and rhythms of Marrakech, where Moroccan traditions come alive. Explore the vibrant cities of Cape Town and Nairobi, each offering a unique blend of modernity and heritage. From the savannahs to the deserts, Africa promises an enriching journey into its natural beauty and rich heritage.', '29f89b45-5380-4fd2-a999-3fca260bdf0f.jpeg', '2023-08-30', '2023-09-03', 2578.00),
(65, 'lebanon', 'Embark on a captivating vacation in Lebanon, a country brimming with history and natural beauty. Explore the vibrant streets of Beirut, where ancient architecture meets modern nightlife. Discover the ancient ruins of Baalbek, a UNESCO World Heritage site, and marvel at its colossal temples. Relax along the stunning Mediterranean coastline, enjoying pristine beaches and fresh seafood. Immerse yourself in the charming atmosphere of Byblos, one of the oldest continuously inhabited cities. Experience the lush landscapes of the Bekaa Valley, known for its vineyards and picturesque scenery. With its rich cultural tapestry and breathtaking landscapes, Lebanon offers a unique and enriching travel experience.', '4401b86b-bb78-4ba1-aa32-ac89eb215846.jpg', '2023-09-29', '2023-10-25', 2468.00),
(66, 'japan', 'Embark on an enchanting vacation in Japan, a land of timeless traditions and modern marvels. Explore the bustling streets of Tokyo, where neon lights and serene temples coexist. Immerse yourself in Kyoto\'s cultural heritage, wandering through historic shrines and serene gardens. Experience the serenity of Mount Fuji\'s iconic peak and its surrounding landscapes. Indulge in exquisite sushi and traditional tea ceremonies, savoring the nuances of Japanese cuisine. Discover the tranquility of rural landscapes in places like Hokkaido or Okinawa. With a blend of ancient rituals and technological innovations, Japan offers a captivating journey into its past and future.', '8489b8f0-8a3d-4133-8a5c-c0ce01534f67.jpg', '2023-09-07', '2023-09-15', 579.25),
(67, 'maroco', 'Embark on a captivating vacation in Morocco, a land of vibrant colors and rich traditions. Get lost in the labyrinthine streets of Marrakech\'s medina, where bustling markets and ornate palaces await. Discover the stunning beauty of the Sahara Desert, where camel treks lead you to mesmerizing golden dunes. Immerse yourself in the historic ambiance of Fes, with its medieval architecture and renowned tanneries. Indulge in aromatic Moroccan cuisine, from tagines to mint tea, delighting your taste buds. Explore the coastal charm of Essaouira, where ancient fortifications meet beautiful beaches. With its blend of ancient history and exotic allure, Morocco promises an unforgettable journey of exploration and cultural immersion.', '86af814e-36dc-44b0-8fd0-0e9b20d91a3e.jpeg', '2023-09-07', '2023-09-20', 623.89),
(68, 'viana', 'Discover the captivating charm of Viana, the capital of Ostria, on your dream vacation. Wander through historic streets lined with ornate architecture and immerse yourself in the city\'s rich cultural heritage. Explore local markets brimming with artisanal crafts and sample authentic Ostrian cuisine in quaint cafes. Uncover the city\'s history at museums and landmarks, then escape to lush parks for relaxation. Experience vibrant festivals celebrating Ostrian traditions and enjoy a blend of modern amenities amidst a backdrop of classical beauty. Viana invites you to explore its unique character and create lasting memories in the heart of Ostria.', '13292402-6ca6-45de-8e91-515a86be5e72.jpg', '2023-09-07', '2023-09-28', 1234.12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

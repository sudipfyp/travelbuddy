-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2024 at 09:14 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelbuddy`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add guide', 7, 'add_guide'),
(26, 'Can change guide', 7, 'change_guide'),
(27, 'Can delete guide', 7, 'delete_guide'),
(28, 'Can view guide', 7, 'view_guide'),
(29, 'Can add seller', 8, 'add_seller'),
(30, 'Can change seller', 8, 'change_seller'),
(31, 'Can delete seller', 8, 'delete_seller'),
(32, 'Can view seller', 8, 'view_seller'),
(33, 'Can add user', 9, 'add_user'),
(34, 'Can change user', 9, 'change_user'),
(35, 'Can delete user', 9, 'delete_user'),
(36, 'Can view user', 9, 'view_user'),
(37, 'Can add user profile', 10, 'add_userprofile'),
(38, 'Can change user profile', 10, 'change_userprofile'),
(39, 'Can delete user profile', 10, 'delete_userprofile'),
(40, 'Can view user profile', 10, 'view_userprofile'),
(41, 'Can add hotel room', 11, 'add_hotelroom'),
(42, 'Can change hotel room', 11, 'change_hotelroom'),
(43, 'Can delete hotel room', 11, 'delete_hotelroom'),
(44, 'Can view hotel room', 11, 'view_hotelroom'),
(45, 'Can add hotel', 12, 'add_hotel'),
(46, 'Can change hotel', 12, 'change_hotel'),
(47, 'Can delete hotel', 12, 'delete_hotel'),
(48, 'Can view hotel', 12, 'view_hotel'),
(49, 'Can add place', 13, 'add_place'),
(50, 'Can change place', 13, 'change_place'),
(51, 'Can delete place', 13, 'delete_place'),
(52, 'Can view place', 13, 'view_place'),
(53, 'Can add guide hire', 14, 'add_guidehire'),
(54, 'Can change guide hire', 14, 'change_guidehire'),
(55, 'Can delete guide hire', 14, 'delete_guidehire'),
(56, 'Can view guide hire', 14, 'view_guidehire'),
(57, 'Can add admin', 15, 'add_admin'),
(58, 'Can change admin', 15, 'change_admin'),
(59, 'Can delete admin', 15, 'delete_admin'),
(60, 'Can view admin', 15, 'view_admin'),
(61, 'Can add shop', 16, 'add_shop'),
(62, 'Can change shop', 16, 'change_shop'),
(63, 'Can delete shop', 16, 'delete_shop'),
(64, 'Can view shop', 16, 'view_shop'),
(65, 'Can add event', 17, 'add_event'),
(66, 'Can change event', 17, 'change_event'),
(67, 'Can delete event', 17, 'delete_event'),
(68, 'Can view event', 17, 'view_event'),
(69, 'Can add hotel room booking', 18, 'add_hotelroombooking'),
(70, 'Can change hotel room booking', 18, 'change_hotelroombooking'),
(71, 'Can delete hotel room booking', 18, 'delete_hotelroombooking'),
(72, 'Can view hotel room booking', 18, 'view_hotelroombooking'),
(73, 'Can add product', 19, 'add_product'),
(74, 'Can change product', 19, 'change_product'),
(75, 'Can delete product', 19, 'delete_product'),
(76, 'Can view product', 19, 'view_product'),
(77, 'Can add guide requirement', 20, 'add_guiderequirement'),
(78, 'Can change guide requirement', 20, 'change_guiderequirement'),
(79, 'Can delete guide requirement', 20, 'delete_guiderequirement'),
(80, 'Can view guide requirement', 20, 'view_guiderequirement'),
(81, 'Can add guide requirement hiring', 21, 'add_guiderequirementhiring'),
(82, 'Can change guide requirement hiring', 21, 'change_guiderequirementhiring'),
(83, 'Can delete guide requirement hiring', 21, 'delete_guiderequirementhiring'),
(84, 'Can view guide requirement hiring', 21, 'view_guiderequirementhiring'),
(85, 'Can add transportation', 22, 'add_transportation'),
(86, 'Can change transportation', 22, 'change_transportation'),
(87, 'Can delete transportation', 22, 'delete_transportation'),
(88, 'Can view transportation', 22, 'view_transportation'),
(89, 'Can add stop point', 23, 'add_stoppoint'),
(90, 'Can change stop point', 23, 'change_stoppoint'),
(91, 'Can delete stop point', 23, 'delete_stoppoint'),
(92, 'Can view stop point', 23, 'view_stoppoint'),
(93, 'Can add code', 24, 'add_code'),
(94, 'Can change code', 24, 'change_code'),
(95, 'Can delete code', 24, 'delete_code'),
(96, 'Can view code', 24, 'view_code'),
(97, 'Can add rating', 25, 'add_rating'),
(98, 'Can change rating', 25, 'change_rating'),
(99, 'Can delete rating', 25, 'delete_rating'),
(100, 'Can view rating', 25, 'view_rating'),
(101, 'Can add chat', 26, 'add_chat'),
(102, 'Can change chat', 26, 'change_chat'),
(103, 'Can delete chat', 26, 'delete_chat'),
(104, 'Can view chat', 26, 'view_chat');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `chat_chat`
--

CREATE TABLE `chat_chat` (
  `id` bigint(20) NOT NULL,
  `message` longtext NOT NULL,
  `time` datetime(6) NOT NULL,
  `receiver_guide_id` bigint(20) DEFAULT NULL,
  `receiver_seller_id` bigint(20) DEFAULT NULL,
  `receiver_user_id` bigint(20) DEFAULT NULL,
  `sender_guide_id` bigint(20) DEFAULT NULL,
  `sender_seller_id` bigint(20) DEFAULT NULL,
  `sender_user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat_chat`
--

INSERT INTO `chat_chat` (`id`, `message`, `time`, `receiver_guide_id`, `receiver_seller_id`, `receiver_user_id`, `sender_guide_id`, `sender_seller_id`, `sender_user_id`) VALUES
(52, 'hi', '2024-05-23 12:19:35.151381', 1, NULL, NULL, NULL, NULL, 3),
(53, 'are you there?', '2024-05-23 12:27:59.254346', 1, NULL, NULL, NULL, NULL, 3),
(54, 'yes sir', '2024-05-23 12:28:08.135078', NULL, NULL, 3, 1, NULL, NULL),
(55, 'When will we meet?', '2024-05-23 12:28:25.440651', 1, NULL, NULL, NULL, NULL, 3),
(56, '?', '2024-05-23 12:34:33.408996', 1, NULL, NULL, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(26, 'chat', 'chat'),
(5, 'contenttypes', 'contenttype'),
(17, 'event', 'event'),
(20, 'guidefind', 'guiderequirement'),
(21, 'guidefind', 'guiderequirementhiring'),
(14, 'guidehire', 'guidehire'),
(12, 'hotelbooking', 'hotel'),
(11, 'hotelbooking', 'hotelroom'),
(18, 'hotelbooking', 'hotelroombooking'),
(13, 'place', 'place'),
(25, 'rating', 'rating'),
(15, 'registration', 'admin'),
(24, 'registration', 'code'),
(7, 'registration', 'guide'),
(8, 'registration', 'seller'),
(9, 'registration', 'user'),
(10, 'registration', 'userprofile'),
(6, 'sessions', 'session'),
(19, 'shop', 'product'),
(16, 'shop', 'shop'),
(23, 'transportation', 'stoppoint'),
(22, 'transportation', 'transportation');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-03-09 05:12:28.066058'),
(2, 'auth', '0001_initial', '2024-03-09 05:12:28.622315'),
(3, 'admin', '0001_initial', '2024-03-09 05:12:28.754755'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-03-09 05:12:28.759375'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-03-09 05:12:28.778074'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-03-09 05:12:28.867541'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-03-09 05:12:28.939437'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-03-09 05:12:28.958230'),
(9, 'auth', '0004_alter_user_username_opts', '2024-03-09 05:12:28.967247'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-03-09 05:12:29.035414'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-03-09 05:12:29.037422'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-03-09 05:12:29.047419'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-03-09 05:12:29.068762'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-03-09 05:12:29.086917'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-03-09 05:12:29.104272'),
(16, 'auth', '0011_update_proxy_permissions', '2024-03-09 05:12:29.112561'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-03-09 05:12:29.124718'),
(18, 'registration', '0001_initial', '2024-03-09 05:12:29.363691'),
(19, 'guidehire', '0001_initial', '2024-03-09 05:12:29.530438'),
(20, 'hotelbooking', '0001_initial', '2024-03-09 05:12:29.650158'),
(21, 'place', '0001_initial', '2024-03-09 05:12:29.684498'),
(22, 'sessions', '0001_initial', '2024-03-09 05:12:29.716237'),
(23, 'hotelbooking', '0002_alter_hotel_image', '2024-03-17 03:56:19.544683'),
(24, 'place', '0002_alter_place_image', '2024-03-17 03:56:19.564852'),
(25, 'registration', '0002_admin_alter_guide_image_alter_seller_image_and_more', '2024-03-17 03:56:19.615714'),
(26, 'event', '0001_initial', '2024-03-30 06:24:11.613747'),
(27, 'shop', '0001_initial', '2024-03-30 06:24:11.671668'),
(28, 'event', '0002_rename_title_event_name', '2024-03-30 09:37:04.096342'),
(29, 'event', '0003_event_identifier', '2024-03-30 09:52:54.279508'),
(30, 'event', '0004_event_image_event_tag', '2024-03-30 10:07:06.448652'),
(31, 'place', '0003_place_district', '2024-04-03 17:36:21.448143'),
(32, 'guidefind', '0001_initial', '2024-04-06 06:23:22.219345'),
(33, 'hotelbooking', '0003_hotel_location', '2024-04-06 06:23:22.236738'),
(34, 'place', '0004_alter_place_district', '2024-04-06 06:23:22.465939'),
(35, 'place', '0005_alter_place_district', '2024-04-06 08:03:05.360691'),
(36, 'registration', '0003_guide_description_guide_rating_alter_guide_tag', '2024-04-06 08:03:05.444482'),
(37, 'transportation', '0001_initial', '2024-04-09 15:58:43.096240'),
(38, 'guidefind', '0002_guiderequirement_budget', '2024-04-11 17:31:31.146802'),
(39, 'hotelbooking', '0002_hotelroombooking_status', '2024-04-11 17:31:31.165006'),
(40, 'registration', '0002_guide_verify_seller_sellertype_seller_verify_and_more', '2024-04-11 17:31:31.399338'),
(41, 'shop', '0002_product_identifier', '2024-04-11 17:31:31.410997'),
(42, 'hotelbooking', '0003_remove_hotel_rating', '2024-04-11 17:34:50.957385'),
(43, 'shop', '0003_remove_shop_rating', '2024-04-11 17:34:50.977966'),
(44, 'shop', '0004_product_tag', '2024-04-11 17:49:10.690277'),
(45, 'registration', '0003_alter_code_guide_alter_code_seller_alter_code_user', '2024-04-12 08:10:13.775717'),
(46, 'guidehire', '0002_guidehire_date', '2024-04-12 12:31:51.931333'),
(47, 'rating', '0001_initial', '2024-04-13 14:45:21.848901'),
(48, 'guidehire', '0003_guidehire_price', '2024-04-13 14:51:31.632543'),
(49, 'hotelbooking', '0004_alter_hotelroom_unique_together_and_more', '2024-04-13 14:51:33.698649'),
(50, 'hotelbooking', '0005_remove_hotelroombooking_amount', '2024-04-14 04:21:54.048033'),
(51, 'hotelbooking', '0006_alter_hotelroombooking_user', '2024-04-14 05:23:48.228318'),
(52, 'chat', '0001_initial', '2024-04-21 05:36:32.685309');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `event_event`
--

CREATE TABLE `event_event` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `location` varchar(100) NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `tag` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_event`
--

INSERT INTO `event_event` (`id`, `name`, `description`, `startdate`, `enddate`, `location`, `identifier`, `image`, `tag`) VALUES
(4, 'IndraJatra', 'Indra Jātrā, also known as Yenyā (Nepal Bhasa: येँयाः), is the biggest religious street festival in Kathmandu, Nepal. The celebrations consist of two events, Indra Jātrā and Kumāri Jātrā.', '2024-01-11', '2024-04-09', 'Basantapur', 'localevents', 'event/indra-Jatra.jpg', 'popular'),
(6, 'Dashain', 'Dashain is the biggest and longest Hindu festival celebrated in Nepal. It symbolizes the victory of good over evil. It is celebrated with great enthusiasm and lasts for 15 days.', '2024-10-01', '2024-10-15', 'Kathmandu', 'localevents', 'event/dashain-1.jpg', 'cultural'),
(7, 'Tihar', 'Tihar, also known as Deepavali or the festival of lights, is a five-day-long Hindu festival celebrated with great fervor in Nepal. Each day of Tihar is dedicated to different animals and objects, including crows, dogs, cows, and oxen.', '2024-11-04', '2024-11-08', 'Kathmandu', 'localevents', 'event/tihar-festival.jpg', 'cultural'),
(8, 'Bisket Jatra', 'Bisket Jatra is a festival celebrated by the Newar community in Bhaktapur, a city near Kathmandu. It marks the Nepali New Year and involves the pulling of chariots and various religious ceremonies.', '2024-04-07', '2024-04-20', 'Bhaktapur', 'localevents', 'event/Screenshot_2024-04-15_120619.png', 'popular'),
(9, 'Gai Jatra', 'Gai Jatra, or the Cow Festival, is celebrated to commemorate the death of loved ones. Families who have lost a relative in the past year participate in a procession with a decorated cow, or children dress as cows.', '2024-08-17', '2024-08-18', 'Kathmandu', 'localevents', 'event/Gaijatra.png', 'popular'),
(10, 'Maha Shivaratri', 'Maha Shivaratri, or the Great Night of Shiva, is a Hindu festival celebrated in reverence of Lord Shiva. Devotees fast, perform rituals, and offer prayers throughout the day and night.', '2024-02-24', '2024-02-25', 'Pashupatinath Temple', 'localevents', 'event/Devotees-at-Pashupatinath-temple-Nepal-on-Mahashivratri.jpg', 'recommended'),
(11, 'Buddha Jayanti', 'Buddha Jayanti, also known as Buddha Purnima, celebrates the birth, enlightenment, and death of Gautama Buddha, the founder of Buddhism. It is observed with prayers, processions, and teachings.', '2024-05-18', '2024-05-18', 'Kathmandu', 'localevents', 'event/images.jpg', 'cultural'),
(12, 'Ghode Jatra', 'Ghode Jatra, or the Horse Racing Day, is celebrated to ward off evil spirits and bring peace and prosperity. It involves various cultural performances and a horse parade at Tundikhel, an open ground in Kathmandu.', '2024-03-27', '2024-03-27', 'TudiKhel', 'localevents', 'event/nepal-ghode-jatra-01.jpg', 'cultural'),
(25, 'HOLI', 'Holi, the vibrant Hindu festival of colors, celebrates the arrival of spring and the triumph of good over evil. Revelers come together to douse each other in colorful powders, dance to lively music, and indulge in festive treats. It\'s a time of joy, unity, and spreading love.', '2024-03-27', '2024-03-31', 'Basantapur', 'localevents', 'event/holi_HIZAgl3.png', 'recommended');

-- --------------------------------------------------------

--
-- Table structure for table `guidefind_guiderequirement`
--

CREATE TABLE `guidefind_guiderequirement` (
  `id` bigint(20) NOT NULL,
  `title` longtext NOT NULL,
  `description` longtext NOT NULL,
  `location` longtext NOT NULL,
  `date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `budget` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guidefind_guiderequirement`
--

INSERT INTO `guidefind_guiderequirement` (`id`, `title`, `description`, `location`, `date`, `status`, `user_id`, `budget`) VALUES
(14, 'Need guide for exploring natural beauty in kathmandu valley', 'I am here in Kathmandu for a weeklong and i need guide who can accompany me during my stay here. I love being in nature, so I am searching for such guides.', 'Shivapuri, Chhuche Dhunga and similar places', '2024-04-29', 'accepted', 3, 10000);

-- --------------------------------------------------------

--
-- Table structure for table `guidefind_guiderequirementhiring`
--

CREATE TABLE `guidefind_guiderequirementhiring` (
  `id` bigint(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `guide_id` bigint(20) NOT NULL,
  `guidereq_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guidefind_guiderequirementhiring`
--

INSERT INTO `guidefind_guiderequirementhiring` (`id`, `status`, `price`, `guide_id`, `guidereq_id`) VALUES
(15, 'paid', 11500, 5, 14),
(16, 'rejected', 15000, 1, 14);

-- --------------------------------------------------------

--
-- Table structure for table `guidehire_guidehire`
--

CREATE TABLE `guidehire_guidehire` (
  `id` bigint(20) NOT NULL,
  `place` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `day` int(11) NOT NULL,
  `guide_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guidehire_guidehire`
--

INSERT INTO `guidehire_guidehire` (`id`, `place`, `status`, `day`, `guide_id`, `user_id`, `date`, `price`) VALUES
(23, 'Basantapur, Patan, Bhaktapur', 'paid', 3, 1, 3, '2024-04-19', NULL),
(24, 'Thamel', 'paid', 1, 1, 3, '2024-04-21', NULL),
(25, 'Basantapur', 'paid', 2, 1, 3, '2024-04-24', NULL),
(26, 'Thamel', 'cancelled', 2, 2, 3, '2024-04-25', NULL),
(28, 'Shivapuri, Sundarijal', 'cancelled', 2, 3, 3, '2024-04-25', NULL),
(29, 'Basantapur, Thamel', 'paid', 5, 3, 3, '2024-04-27', NULL),
(30, 'Bhaktapur durbar Square', 'rejected', 1, 3, 3, '2024-04-24', NULL),
(31, '12', 'rejected', 11, 1, 3, '2024-05-17', NULL),
(32, 'Gt', 'hired', 12, 1, 3, '2024-05-17', NULL),
(33, '12', 'cancelled', 12, 1, 3, '2024-05-24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hotelbooking_hotel`
--

CREATE TABLE `hotelbooking_hotel` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `latitude` longtext NOT NULL,
  `longitude` longtext NOT NULL,
  `address` longtext NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `noOfRoom` int(11) NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `location` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotelbooking_hotel`
--

INSERT INTO `hotelbooking_hotel` (`id`, `name`, `description`, `latitude`, `longitude`, `address`, `image`, `noOfRoom`, `identifier`, `owner_id`, `location`) VALUES
(11, 'Yeti and Yak Hotel', '\"Yeti and Yak: Where Himalayan hospitality meets modern comfort in the heart of Kathmandu. Nestled amidst the majestic peaks, our hotel offers a serene retreat with authentic Nepalese charm. Experience the allure of the Himalayas with our warm hospitality and unparalleled service.\"', '27.711642956408173', '85.31788766384126', 'Kathmandu', 'hotel/6_OG7CSCg.png', 26, 'hotel', 1, 'Hattisar,  Kathmandu-1, Kathmandu,  Bagmati Pradesh'),
(12, 'Shangri-Laugh Inn', ' Where every stay is an adventure in whimsy and wonder amidst the chaotic charm of KTM Valley. Dive into our quirky accommodations, indulge in unconventional amenities, and embrace the hilarity of our themed rooms inspired by the quirks of Kathmandu.', '27.711342520658782', '85.28995513916016', 'Kathmandu', 'hotel/5_b95fSXT.png', 10, 'hotel', 3, 'Kimdol, Chauni Hospital Sadak, Kathmandu-15, Kathmandu,  Bagmati Pradesh'),
(13, 'SoalCoffee Hotel', 'Experience the epitome of opulence and hospitality nestled in the heart of Kathmandu Valley. From our plush \'Pashmina Suites\' to our fine dining at \'Mountain View Restaurant,\'', '27.684369985211703', '85.36419208394365', 'Bhaktapur', 'hotel/hotels_ZLRqJfY_o9aEAa9.png', 55, 'hotel', 5, 'Madhyapur Thimi-2, Bhaktapur,  Bagmati Pradesh'),
(14, 'Hotel Mt. Cliff ', '\"Experience affordability without compromise at our budget-friendly hotel. Comfortable accommodations and convenient amenities await you without breaking the bank.\"', '27.68250618322816', '85.31261444091797', 'Lalitpur', 'hotel/Screenshot_2024-05-23_121116.png', 5, 'hotel', 31, 'Bakhundole,  Lalitpur-3, Lalitpur,  Bagmati Pradesh'),
(15, 'The Best Guest House', 'The Best Guest House is a modern, elegant 4-star hotel overlooking the mountains, perfect for a romantic, charming vacation, in the enchanting setting of Kathmandu valley.', '27.6793097019846', '85.30943870544434', 'Lalitpur', 'hotel/Screenshot_2024-05-23_120855.png', 25, 'hotel', 30, 'Sanepa,  Lalitpur-2, Lalitpur,  Bagmati Pradesh');

-- --------------------------------------------------------

--
-- Table structure for table `hotelbooking_hotelroom`
--

CREATE TABLE `hotelbooking_hotelroom` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) NOT NULL,
  `roomType` varchar(50) NOT NULL,
  `roomPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotelbooking_hotelroom`
--

INSERT INTO `hotelbooking_hotelroom` (`id`, `hotel_id`, `roomType`, `roomPrice`) VALUES
(2, 11, 'Deluxe', 15400),
(3, 12, 'Premium', 12400),
(4, 12, 'Basic', 2500),
(5, 13, 'Premium', 14500),
(6, 13, 'Extra Luxury', 45120),
(7, 11, 'Economy', 3500),
(8, 11, 'Premium', 14600),
(9, 15, 'Basic', 1600),
(10, 15, 'Luxory', 5500),
(11, 15, 'Premium', 9800),
(12, 14, 'Basic', 800),
(13, 14, 'Premium', 2000);

-- --------------------------------------------------------

--
-- Table structure for table `hotelbooking_hotelroombooking`
--

CREATE TABLE `hotelbooking_hotelroombooking` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hotelbooking_hotelroombooking`
--

INSERT INTO `hotelbooking_hotelroombooking` (`id`, `user_id`, `room_id`, `checkIn`, `checkOut`, `status`) VALUES
(5, 3, 2, '2024-04-17', '2024-04-19', 'accept'),
(6, 3, 2, '2024-04-26', '2024-04-30', 'reject'),
(7, 3, 2, '2024-04-01', '2024-04-02', 'cancel'),
(8, 3, 2, '2024-04-16', '2024-04-16', 'cancel'),
(9, 3, 7, '2024-04-25', '2024-04-26', 'cancel'),
(10, 3, 7, '2024-04-24', '2024-04-29', 'reject'),
(11, 3, 2, '2024-04-30', '2024-05-01', 'cancel'),
(12, 3, 5, '2024-04-24', '2024-04-26', 'cancel'),
(14, 3, 7, '2024-04-25', '2024-04-26', 'accept'),
(15, 3, 2, '2024-05-18', '2024-05-20', 'accept'),
(16, 3, 2, '2024-05-25', '2024-05-27', 'cancel');

-- --------------------------------------------------------

--
-- Table structure for table `place_place`
--

CREATE TABLE `place_place` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` longtext NOT NULL,
  `latitude` longtext NOT NULL,
  `longitude` longtext NOT NULL,
  `tag` longtext NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(50) NOT NULL,
  `district` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place_place`
--

INSERT INTO `place_place` (`id`, `name`, `location`, `latitude`, `longitude`, `tag`, `description`, `image`, `identifier`, `district`) VALUES
(1, 'Kathmandu Durbar Square', 'Basantapur Durbar Square, Ganga Path, Kathmandu-24, Kathmandu,  Bagmati Pradesh', '27.70382147666034', '85.30689597129823', 'heritage', 'Kathmandu Durbar Square, also known as Basantapur Durbar and Hanuman Dhoka, is an old durbar square in Kathmandu\'s city center. In the heart of old Kathmandu city, Basantapur never fails to impress first time visitors with its intricate wood carvings and rich history. Hanuman Dhoka was built during the Licchavi period (4th to 8th centuries AD), and King Pratap Malla extended the property significantly in the 17th century.  With the highest concentration of old structures, the square is home to several palaces, courtyards, and temples. It is also known as \"the Museum of Temples\" because there are over 50 temples in the square. Handicraft shops may be found in the courtyards around Gaddi Baithak, where you can see a variety of attractive purchasable handicrafts.', 'place/7.png', 'place', 'Kathmandu'),
(2, 'Swayambhunath Stupa', 'Kimdol,  Kathmandu-15, Kathmandu,  Bagmati Pradesh', '27.71477316427379', '85.2904094641781', 'heritage', 'Resting on a hillock 3 km west of Kathmandu, Swayambhu is one of the holiest Buddhist stupas in Nepal. It is said to have evolved spontaneously when the valley was created out of a primordial lake more than 2,000 years ago. This stupa is the oldest of its kind in Nepal and has numerous shrines and monasteries on its premises.', 'place/3.png', 'place', 'Kathmandu'),
(3, 'BHAIRAVNATH TEMPLE', 'Bhairabnath Temple,  Taumadhi Tole,  Bhaktapur-5, Bhaktapur,  Bagmati Pradesh', '27.67115952648369', '85.42948365211487', 'heritage', 'Dedicated to Bhairav, the God of Terror, the three-storied temple of Bhairavnath has only the head of Bhairav in the inner sanctum. Legend has it that the Bhairav’s head was cut off by a Tantric expert in order to keep him in Bhaktapur. Built-in pagoda style, the temple is noted for its artistic grandeur and stands adjacent to the famous five-storied Nyatapola Temple. ', 'place/Screenshot_2024-04-15_004903_xenuyy1.png', 'place', 'Bhaktapur'),
(4, 'NYATAPOLA TEMPLE', 'Nyatapola Temple,  Taumadhi Tole,  Bhaktapur-5, Bhaktapur,  Bagmati Pradesh', '27.671359250927253', '85.42935490608217', 'heritage', 'The unique temple of Bhaktapur, the Nyatapola literally means ‘five storied’ and rises above the city’s landscape as a remarkable landmark. It also has the distinction of having withstood the devastating earthquake of 1933. Dedicated to a Tantric goddess, the steps leading up to the temple are flanked by stone sculptures of deities and mythical beasts, each 10 times more powerful than the one immediately below.', 'place/4.png', 'place', 'Bhaktapur'),
(5, 'Central ZOO', 'शान्ति चोक,  Lalitpur-4, Lalitpur,  Bagmati Pradesh', '27.672859382592986', '85.31162738800049', 'recommended', 'In 1995, Government of Nepal entrusted the management of Nepal’s Central Zoo, the only zoo in Nepal, located at Jawalakhel in the Kathmandu Valley to NTNC for 30 years. Established as a private zoo in 1932 by the late Rana Prime Minister Juddha Samsher, it came under the ownership of Government of Nepal', 'place/2.png', 'place', 'Lalitpur'),
(6, 'THIMI', 'Sano Thimi,  Madhyapur Thimi-2, Bhaktapur,  Bagmati Pradesh', '27.683031338050302', '85.37062525749208', 'natural', 'THIMI is a Newar town situated about 8 km east of Kathmandu on the way to Bhaktapur. Besides farming, most of the households here are engaged in pottery. This laid-back town not only supplies Kathmandu its pottery but also its vegetables. The two important deities here are those of Balkumari Temple, dedicated to the Mother Goddess, and Karunamaya, the Buddha of Compassion. ', 'place/6.png', 'place', 'Bhaktapur'),
(7, 'Patan Durbar Square', 'Patan,  Lalitpur-16, Lalitpur,  Bagmati Pradesh', '27.67341175112703', '85.32504379749298', 'heritage', 'The Durbar Square is a marvel of Newar architecture. The square floor is tiled with red bricks. There are many temples and statues in the area. The main temples are aligned opposite the western face of the palace. The entrance of the temples faces east, towards the palace. There is also a bell situated in the alignment beside the main temples', 'place/5.png', 'place', 'Lalitpur'),
(13, 'Dharahara', 'Khichapokhari,  Kathmandu-22, Kathmandu,  Bagmati Pradesh', '27.700661209385405', '85.31184303750707', 'recommended', 'Dharahara or Bhimsen Stambha (Nepali: धरहरा; pronounced [dʱʌɾʌɦʌɾa] or [dʱʌɾʌːɾa]), is a 72-metre-tall (236 ft) tower at the centre of Sundhara, Kathmandu, Nepal. It was first built in 1832 by Mukhtiyar (equivalent to Prime Minister) Bhimsen Thapa ', 'place/1.png', 'place', 'Kathmandu'),
(15, 'Kamalpokhari', 'Hattisar, Pashupati Sadak - 3, Kathmandu-1, Kathmandu,  Bagmati Pradesh', '27.710546811916938', '85.32542467117311', 'natural', 'Kamal Pokhari, an unkempt natural pond at the centre of Hattisar, named for the lotus flower that bloomed in its waters, in recent years, has become the prime host for Chhath celebrations in the Capital with even the President of the country joining the ceremony here.', 'place/Screenshot_2024-03-30_211436_He8U8SE.png', 'place', 'Kathmandu'),
(44, 'Narayanhiti Palace', 'Lainchaur Chowk,  Kathmandu-1, Kathmandu,  Bagmati Pradesh', '27.714542179899247', '85.31801104545595', 'recommended', 'Narayanhiti Palace Museum is established on the backdrop of the beginning of The Federal Democratic Republic of Nepal. Ten years of people\'s war and nineteen days of people\'s movement played decisive role for the major political shift in the country. In line with the political changes, Narayanhiti Royal Palace was converted into a public museum and was inaugurated by the then Prime Minister Girija Prasad Koirala on 15 June, 2008. ', 'place/Narayanhiti-Palace-1024x576.jpg', 'place', 'Kathmandu');

-- --------------------------------------------------------

--
-- Table structure for table `rating_rating`
--

CREATE TABLE `rating_rating` (
  `id` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL,
  `guide_id` bigint(20) NOT NULL,
  `guidehire_id` bigint(20) DEFAULT NULL,
  `guidereq_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating_rating`
--

INSERT INTO `rating_rating` (`id`, `rating`, `guide_id`, `guidehire_id`, `guidereq_id`, `user_id`) VALUES
(2, 3, 1, 23, NULL, 3),
(3, 3, 1, 24, NULL, 3),
(4, 3, 1, 25, NULL, 3),
(5, 5, 3, 29, NULL, 3),
(6, 5, 5, NULL, 15, 3);

-- --------------------------------------------------------

--
-- Table structure for table `registration_admin`
--

CREATE TABLE `registration_admin` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration_admin`
--

INSERT INTO `registration_admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'Sudip Sigdel', 'sudip@admin.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=');

-- --------------------------------------------------------

--
-- Table structure for table `registration_code`
--

CREATE TABLE `registration_code` (
  `id` bigint(20) NOT NULL,
  `code` varchar(10) NOT NULL,
  `expiry` datetime(6) NOT NULL,
  `guide_id` bigint(20) DEFAULT NULL,
  `seller_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration_code`
--

INSERT INTO `registration_code` (`id`, `code`, `expiry`, `guide_id`, `seller_id`, `user_id`) VALUES
(28, '1871', '2024-04-23 17:37:13.332992', NULL, 30, NULL),
(29, '5128', '2024-04-23 23:31:57.342433', NULL, 31, NULL),
(30, '5761', '2024-04-23 23:32:49.941411', NULL, 31, NULL),
(31, '4656', '2024-04-23 23:36:25.719530', NULL, 31, NULL),
(32, '4458', '2024-04-23 23:38:57.404551', NULL, 31, NULL),
(33, '6849', '2024-04-23 23:46:06.704139', NULL, 31, NULL),
(34, '1873', '2024-04-24 02:37:05.666469', NULL, NULL, 9),
(35, '4445', '2024-04-24 02:50:40.807520', 6, NULL, NULL),
(36, '7163', '2024-04-24 03:08:01.422376', NULL, 32, NULL),
(37, '1486', '2024-05-23 11:21:13.760654', NULL, 33, NULL),
(38, '6718', '2024-05-23 11:43:54.914040', NULL, 33, NULL),
(39, '3288', '2024-05-23 12:37:00.587427', NULL, 34, NULL),
(40, '1095', '2024-05-23 12:40:20.586186', NULL, 35, NULL),
(41, '7706', '2024-05-23 12:41:05.610486', NULL, 36, NULL),
(42, '7454', '2024-05-23 18:05:07.562709', NULL, 37, NULL),
(43, '3702', '2024-05-23 19:50:27.704601', 7, NULL, NULL),
(44, '4459', '2024-05-23 19:52:08.209887', NULL, NULL, 10),
(45, '4986', '2024-05-23 19:52:34.989383', NULL, NULL, 10),
(46, '7623', '2024-05-23 21:15:59.575798', NULL, NULL, 10),
(47, '9371', '2024-05-23 22:57:37.109250', NULL, NULL, 10),
(48, '4856', '2024-05-23 23:10:01.671488', NULL, NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `registration_guide`
--

CREATE TABLE `registration_guide` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `tag` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(45) NOT NULL,
  `charge` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `verify` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration_guide`
--

INSERT INTO `registration_guide` (`id`, `name`, `email`, `address`, `phone`, `tag`, `password`, `image`, `identifier`, `charge`, `description`, `rating`, `verify`) VALUES
(1, 'Guide 1', '1@guide.com', 'Kathmandu', '9800000000', 'adventure', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/1_9IQcrZI.png', 'guide', 1200, 'Navigate the wonders of our destination with an experienced guide who unlocks hidden gems and shares captivating stories, turning every moment into an unforgettable adventure.', 3.25, 1),
(2, 'Guide 2', '2@guide.com', 'Lalitpur', '12345', 'histoical', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/2.png', 'guide', 1233, 'Immerse yourself in the heart and soul of our locale as your knowledgeable guide unveils centuries of history, traditions, and local customs, offering insights that breathe life into every landmark.', NULL, 1),
(3, 'Guide 3', '3@guide.com', 'Bhaktapur', '12345', 'cultural', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/3.png', 'guide', 1500, 'Trek through breathtaking landscapes with a seasoned guide who not only leads the way but also shares ecological knowledge and wildlife wisdom, fostering a deeper connection to the natural world', 5, 1),
(4, 'Guide 4', '4@guide.com', 'Kathmandu', '12345', '', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/4.png', 'guide', 1200, 'Discover the pulse of the city with a savvy guide who unveils secret spots, trendy eateries, and off-the-beaten-path neighborhoods, ensuring you experience the vibrant energy and hidden charms of urban life', NULL, 1),
(5, 'Guide 5', '5@guide.com', 'Kathmandu', '12345', 'natural', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/5.png', 'guide', 5000, 'Embark on adrenaline-fueled escapades led by an adventurous guide who thrives on excitement and knows the best spots for thrilling activities, promising an action-packed journey you\'ll never forget.', 5, 1),
(6, 'Anukul Karki', 'anukulkarki11@gmail.com', 'Kadaghari, Kathmandu', '9878978978', 'cultural', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'guide/Screenshot_2024-04-20_182015.png', 'guide', 1800, 'Where passion meets adventure. Connect with me if you want to explore the Kathmandu valley by enjoying its cultural diversity.  ', NULL, 1),
(7, 'Sarbagya', 'sudip.bbssm+1@gmail.com', 'Kathmandu', '9811111111', NULL, 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', '', 'guide', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration_seller`
--

CREATE TABLE `registration_seller` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(50) NOT NULL,
  `sellertype` varchar(20) DEFAULT NULL,
  `verify` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration_seller`
--

INSERT INTO `registration_seller` (`id`, `name`, `email`, `password`, `image`, `identifier`, `sellertype`, `verify`) VALUES
(1, 'Seller 1', '1@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/IMG_20230403_210131.jpg', 'seller', 'Hotel', 1),
(3, 'Seller 3', '3@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', '', 'seller', 'Hotel', 1),
(5, 'Seller 5', '5@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', '', 'seller', 'Hotel', 1),
(30, 'Seller 30', '30@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/IMG_20240210_120514_ccGzVbv.jpg', 'seller', 'Hotel', 1),
(31, 'Sarbagya', '31@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/Bisket_Jatra_VIbes.jpg', 'seller', 'Hotel', 1),
(32, 'Bhupendra Neupane', '99@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/259536744_581514276410087_3457498626843236998_n.jpg', 'seller', 'Shop', 1),
(33, 'Sudip', '98@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/nature-g74df1cee6_1920.jpg', 'seller', 'Shop', 1),
(34, 'Hari', '97@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/Screenshot_2024-04-20_182109.png', 'seller', 'Shop', 1),
(35, 'Shyam', '96@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/IMG_20230428_213454.jpg', 'seller', 'Shop', 1),
(36, 'Krishna', '95@seller.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'seller/Screenshot_2024-04-20_182008.png', 'seller', 'Shop', 1),
(37, 'Sudip', 'sudip.bbssm@gmail.com', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$BXPDV6f0newAoqvahzSz5+x947yP5sNw6W29BUIAuH8=', 'seller/android-chrome-192x192.png', 'seller', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `registration_user`
--

CREATE TABLE `registration_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nationality` varchar(200) NOT NULL,
  `preferredplace` varchar(200) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(50) NOT NULL,
  `verify` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registration_user`
--

INSERT INTO `registration_user` (`id`, `name`, `email`, `address`, `password`, `nationality`, `preferredplace`, `image`, `identifier`, `verify`) VALUES
(3, 'Tourist 1', '1@tourist.com', 'Kalimati, Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'natural', 'user/IMG_20230428_213454.jpg', 'user', 1),
(4, 'Tourist 2', '2@tourist.com', 'Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'natural', '', 'user', 1),
(5, 'Tourist 3', '3@tourist.com', 'Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'natural', '', 'user', 1),
(6, 'Tourist 4', '4@tourist.com', 'Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'natural', '', 'user', 1),
(7, 'Tourist 5', '5@tourist.com', 'Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'heritage', '', 'user', 1),
(9, 'Sudip Sigdel', '7@tourist.com', 'Kalimati, Kathmandu', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'natural', 'user/IMG_20230403_210131.jpg', 'user', 1),
(10, 'Hari', 'sudip.bbssm+5@gmail.com', 'Chitwan', 'pbkdf2_sha256$720000$hakjhfeihakwhdhfipq$PuOSAimHZN2zOQIE4PRlSNtJiH44/849LQ9an21s9eU=', 'Nepal', 'heritage', 'user/hari.jpg', 'user', 1);

-- --------------------------------------------------------

--
-- Table structure for table `shop_product`
--

CREATE TABLE `shop_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(50) NOT NULL,
  `tag` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_product`
--

INSERT INTO `shop_product` (`id`, `shop_id`, `name`, `description`, `price`, `image`, `identifier`, `tag`) VALUES
(19, 13, 'Palpali Dhaka Topi', 'Where tradition meets style atop your crown. Embrace the cultural heritage of Nepal with our authentic Dhaka Topis from Palpa. Handwoven with intricate patterns and vibrant colors, each topi is a symbol of pride and elegance, perfect for adding a touch of Nepali flair to any outfit.\r\n', 1500, 'product/811whIDQLJL._AC_UY1100__onpzDCj.jpg', 'product', 'popular'),
(20, 13, 'Gunyo Choli Set', 'Unveil the essence of Nepalese grace with our Gunyo Choli. Handcrafted with exquisite fabrics and adorned with traditional motifs, these elegant blouses epitomize timeless beauty. \r\n', 5500, 'product/Screenshot_2024-04-15_173938_YzzLrHS.png', 'product', 'clothing'),
(21, 14, 'Wooden Tea set', 'Wooden Tea set/Handmade wooden Tea set/Sheehan wood Tea set/Wooden Mugs/Handicrafts/Wooden Kettle', 4500, 'product/Screenshot_2024-04-15_171528_Hp3YPx4.png', 'product', 'handcrafted'),
(22, 14, 'Doko', 'Traditional small basket (doko) in Nepali language used for carrying items. Made of bamboo. Popular in village areas.', 1500, 'product/Screenshot_2024-04-15_171911_ku30A5g.png', 'product', 'handcrafted'),
(23, 15, 'Sirupate Khukuri', 'Embrace the legacy of Nepalese warriors with our meticulously crafted khukuris. Modeled after the revered Sirupate blade, each khukuri carries centuries of tradition and craftsmanship.', 7500, 'product/images_Htm2Qak.jpg', 'product', 'historical'),
(24, 15, 'Vajrasattva Statue', 'Vajrasattva is also regarded as Adi-Buddha by Nepalese Bajracharya\'s who follow Vajrayana tradition according to the text Vajrasattva Kaya. His body is white with one face and two hands. His right-hand holds a five-pronged golden vajra at his heart.\r\n', 4800, 'product/bajra_satwo_50614e4d1c030_D2twwqQ.jpg', 'product', 'historical'),
(25, 15, 'Laughing Buddha', 'Laughing Buddha has always been considered a lucky charm, especially when it\'s gifted. This traditional idol of laughing Buddha with a touch of contemporary art symbolizes happiness, well-being, and abundance.', 3300, 'product/Screenshot_2024-04-15_171717_k8dbtxM.png', 'product', 'popular'),
(26, 16, ' Christmas Ball', 'Festive accents for your porch, yard, or indoors—anywhere you want to display holiday cheer!', 1400, 'product/a1d2445a9d7f1c7adb65572b9ede7d17_NeirURA.png', 'product', 'decoration'),
(27, 16, ' Colorful Mandala', 'Colorful Mandala is a 1,000 pieces puzzle worthy of any skilled puzzler. This puzzle is a round Mandala with different patterns and colors which has a Geometric law. Vivid color and beautiful scenery makes the puzzle very enjoyable. \r\n', 8510, 'product/81eVmjcsW9L._AC_UF8941000_QL80__yqlDDdZ.jpg', 'product', 'decoration'),
(28, 17, 'Nepali Ornament Kantha Mala', 'Consists of gold beads - round, fluted or barrel-shaped - combined with red felt pads, which besides functioning as a cushion between beads also provide a striking color contrast to the gold.\r\n', 4560, 'product/710t4a-1bqL._AC_UY1100__EC0e1r1.jpg', 'product', 'ornament');

-- --------------------------------------------------------

--
-- Table structure for table `shop_shop`
--

CREATE TABLE `shop_shop` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `latitude` longtext NOT NULL,
  `longitude` longtext NOT NULL,
  `address` longtext NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `identifier` varchar(50) NOT NULL,
  `owner_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop_shop`
--

INSERT INTO `shop_shop` (`id`, `name`, `description`, `latitude`, `longitude`, `address`, `image`, `identifier`, `owner_id`) VALUES
(13, 'Bhawani Collection', '\"Discover timeless elegance and contemporary flair at Bhawani Collection. From stylish apparel to chic accessories, indulge in a curated selection that elevates your fashion statement.\"', '27.679870262106284', '85.31525373458864', 'Lalitpur,  Lalitpur-3, Lalitpur,  Bagmati Pradesh', 'shop/1630582915077_NnkaaOB.jpg', 'shop', 32),
(14, 'Sigdel Enterprises', '\"Sigdel Enterprises: Where artisanal craftsmanship meets heartfelt creation. Explore our curated collection of handcrafted products, each infused with passion and tradition. From intricately designed textiles to meticulously carved woodwork, discover timeless treasures that reflect the artistry of skilled artisans.\"\r\n', '27.699507052243504', '85.2991819381714', 'Kalimati,  Kathmandu-13, Kathmandu,  Bagmati Pradesh', 'shop/logoo_SMaEvuc.png', 'shop', 33),
(15, 'Unique History', 'Step into a realm where the past meets the present at our unique history shop. Uncover treasures from bygone eras, each item carrying a story waiting to be shared and cherished anew.', '27.70739117477402', '85.33012390136719', 'Dillibazar, Radhe Marg, Kathmandu-30, Kathmandu,  Bagmati Pradesh', 'shop/Screenshot_2024-04-15_174353_F8dE09n.png', 'shop', 34),
(16, 'Floralo', '\"Floralo: Where every petal tells a story. Explore our enchanting collection of décor items, where floral motifs bloom into timeless accents for your home and events.\"', '27.68945634496339', '85.33218383789062', 'Buddha Nagar, ChhakkuBakku Marg, Kathmandu-10, Kathmandu,  Bagmati Pradesh', 'shop/5f322706d244173caa850fe07a1cbaf3_i3OkHsC.jpg', 'shop', 35),
(17, 'Nepali Gahana Ghar', 'Gahana Ghar: Where elegance adorns every corner. Step into a world of ornate beauty where our collection of exquisite ornaments transforms your home into a sanctuary of sophistication.', '27.655706561031476', '85.32222747802736', '364 Satdobato Tutepani Marg,  Satdobato NayaBasti, Satdobato,  Lalitpur-15, Lalitpur,  Bagmati Pradesh', 'shop/Screenshot_2024-04-14_214920_3bS8jOP.png', 'shop', 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `chat_chat`
--
ALTER TABLE `chat_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_chat_receiver_guide_id_4508d6d3_fk_registration_guide_id` (`receiver_guide_id`),
  ADD KEY `chat_chat_receiver_seller_id_b713544d_fk_registration_seller_id` (`receiver_seller_id`),
  ADD KEY `chat_chat_receiver_user_id_fa8f85a6_fk_registration_user_id` (`receiver_user_id`),
  ADD KEY `chat_chat_sender_guide_id_827d6a05_fk_registration_guide_id` (`sender_guide_id`),
  ADD KEY `chat_chat_sender_seller_id_954f73c1_fk_registration_seller_id` (`sender_seller_id`),
  ADD KEY `chat_chat_sender_user_id_4ccf09c9_fk_registration_user_id` (`sender_user_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `event_event`
--
ALTER TABLE `event_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guidefind_guiderequirement`
--
ALTER TABLE `guidefind_guiderequirement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guidefind_guiderequi_user_id_28b1405d_fk_registrat` (`user_id`);

--
-- Indexes for table `guidefind_guiderequirementhiring`
--
ALTER TABLE `guidefind_guiderequirementhiring`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guidefind_guiderequi_guide_id_c845c052_fk_registrat` (`guide_id`),
  ADD KEY `guidefind_guiderequi_guidereq_id_e2ce200b_fk_guidefind` (`guidereq_id`);

--
-- Indexes for table `guidehire_guidehire`
--
ALTER TABLE `guidehire_guidehire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guidehire_guidehire_guide_id_a1daf418_fk_registration_guide_id` (`guide_id`),
  ADD KEY `guidehire_guidehire_user_id_e5954043_fk_registration_user_id` (`user_id`);

--
-- Indexes for table `hotelbooking_hotel`
--
ALTER TABLE `hotelbooking_hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotelbooking_hotel_owner_id_99c6aac6_fk_registration_seller_id` (`owner_id`);

--
-- Indexes for table `hotelbooking_hotelroom`
--
ALTER TABLE `hotelbooking_hotelroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotelbooking_hotelroom_hotel_id_2684275c` (`hotel_id`);

--
-- Indexes for table `hotelbooking_hotelroombooking`
--
ALTER TABLE `hotelbooking_hotelroombooking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `place_place`
--
ALTER TABLE `place_place`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating_rating`
--
ALTER TABLE `rating_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rating_rating_guide_id_f3825ff9_fk_registration_guide_id` (`guide_id`),
  ADD KEY `rating_rating_guidehire_id_6fbdfacf_fk_guidehire_guidehire_id` (`guidehire_id`),
  ADD KEY `rating_rating_guidereq_id_9403024d_fk_guidefind` (`guidereq_id`),
  ADD KEY `rating_rating_user_id_5b3fb171_fk_registration_seller_id` (`user_id`);

--
-- Indexes for table `registration_admin`
--
ALTER TABLE `registration_admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `registration_code`
--
ALTER TABLE `registration_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registration_code_guide_id_bad6bf05_fk_registration_guide_id` (`guide_id`),
  ADD KEY `registration_code_seller_id_c6e7f95c_fk_registration_seller_id` (`seller_id`),
  ADD KEY `registration_code_user_id_e9dc620a_fk_registration_user_id` (`user_id`);

--
-- Indexes for table `registration_guide`
--
ALTER TABLE `registration_guide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration_seller`
--
ALTER TABLE `registration_seller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration_user`
--
ALTER TABLE `registration_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_product`
--
ALTER TABLE `shop_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop_shop`
--
ALTER TABLE `shop_shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_shop_owner_id_b851bb8d_fk_registration_seller_id` (`owner_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_chat`
--
ALTER TABLE `chat_chat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `event_event`
--
ALTER TABLE `event_event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `guidefind_guiderequirement`
--
ALTER TABLE `guidefind_guiderequirement`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `guidefind_guiderequirementhiring`
--
ALTER TABLE `guidefind_guiderequirementhiring`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `guidehire_guidehire`
--
ALTER TABLE `guidehire_guidehire`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `hotelbooking_hotel`
--
ALTER TABLE `hotelbooking_hotel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `hotelbooking_hotelroom`
--
ALTER TABLE `hotelbooking_hotelroom`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `hotelbooking_hotelroombooking`
--
ALTER TABLE `hotelbooking_hotelroombooking`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `place_place`
--
ALTER TABLE `place_place`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `rating_rating`
--
ALTER TABLE `rating_rating`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `registration_admin`
--
ALTER TABLE `registration_admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `registration_code`
--
ALTER TABLE `registration_code`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `registration_guide`
--
ALTER TABLE `registration_guide`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `registration_seller`
--
ALTER TABLE `registration_seller`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `registration_user`
--
ALTER TABLE `registration_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `shop_product`
--
ALTER TABLE `shop_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `shop_shop`
--
ALTER TABLE `shop_shop`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `chat_chat`
--
ALTER TABLE `chat_chat`
  ADD CONSTRAINT `chat_chat_receiver_guide_id_4508d6d3_fk_registration_guide_id` FOREIGN KEY (`receiver_guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `chat_chat_receiver_seller_id_b713544d_fk_registration_seller_id` FOREIGN KEY (`receiver_seller_id`) REFERENCES `registration_seller` (`id`),
  ADD CONSTRAINT `chat_chat_receiver_user_id_fa8f85a6_fk_registration_user_id` FOREIGN KEY (`receiver_user_id`) REFERENCES `registration_user` (`id`),
  ADD CONSTRAINT `chat_chat_sender_guide_id_827d6a05_fk_registration_guide_id` FOREIGN KEY (`sender_guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `chat_chat_sender_seller_id_954f73c1_fk_registration_seller_id` FOREIGN KEY (`sender_seller_id`) REFERENCES `registration_seller` (`id`),
  ADD CONSTRAINT `chat_chat_sender_user_id_4ccf09c9_fk_registration_user_id` FOREIGN KEY (`sender_user_id`) REFERENCES `registration_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `guidefind_guiderequirement`
--
ALTER TABLE `guidefind_guiderequirement`
  ADD CONSTRAINT `guidefind_guiderequi_user_id_28b1405d_fk_registrat` FOREIGN KEY (`user_id`) REFERENCES `registration_user` (`id`);

--
-- Constraints for table `guidefind_guiderequirementhiring`
--
ALTER TABLE `guidefind_guiderequirementhiring`
  ADD CONSTRAINT `guidefind_guiderequi_guide_id_c845c052_fk_registrat` FOREIGN KEY (`guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `guidefind_guiderequi_guidereq_id_e2ce200b_fk_guidefind` FOREIGN KEY (`guidereq_id`) REFERENCES `guidefind_guiderequirement` (`id`);

--
-- Constraints for table `guidehire_guidehire`
--
ALTER TABLE `guidehire_guidehire`
  ADD CONSTRAINT `guidehire_guidehire_guide_id_a1daf418_fk_registration_guide_id` FOREIGN KEY (`guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `guidehire_guidehire_user_id_e5954043_fk_registration_user_id` FOREIGN KEY (`user_id`) REFERENCES `registration_user` (`id`);

--
-- Constraints for table `hotelbooking_hotel`
--
ALTER TABLE `hotelbooking_hotel`
  ADD CONSTRAINT `hotelbooking_hotel_owner_id_99c6aac6_fk_registration_seller_id` FOREIGN KEY (`owner_id`) REFERENCES `registration_seller` (`id`);

--
-- Constraints for table `rating_rating`
--
ALTER TABLE `rating_rating`
  ADD CONSTRAINT `rating_rating_guide_id_f3825ff9_fk_registration_guide_id` FOREIGN KEY (`guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `rating_rating_guidehire_id_6fbdfacf_fk_guidehire_guidehire_id` FOREIGN KEY (`guidehire_id`) REFERENCES `guidehire_guidehire` (`id`),
  ADD CONSTRAINT `rating_rating_guidereq_id_9403024d_fk_guidefind` FOREIGN KEY (`guidereq_id`) REFERENCES `guidefind_guiderequirementhiring` (`id`),
  ADD CONSTRAINT `rating_rating_user_id_5b3fb171_fk_registration_seller_id` FOREIGN KEY (`user_id`) REFERENCES `registration_seller` (`id`);

--
-- Constraints for table `registration_code`
--
ALTER TABLE `registration_code`
  ADD CONSTRAINT `registration_code_guide_id_bad6bf05_fk_registration_guide_id` FOREIGN KEY (`guide_id`) REFERENCES `registration_guide` (`id`),
  ADD CONSTRAINT `registration_code_seller_id_c6e7f95c_fk_registration_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `registration_seller` (`id`),
  ADD CONSTRAINT `registration_code_user_id_e9dc620a_fk_registration_user_id` FOREIGN KEY (`user_id`) REFERENCES `registration_user` (`id`);

--
-- Constraints for table `shop_shop`
--
ALTER TABLE `shop_shop`
  ADD CONSTRAINT `shop_shop_owner_id_b851bb8d_fk_registration_seller_id` FOREIGN KEY (`owner_id`) REFERENCES `registration_seller` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

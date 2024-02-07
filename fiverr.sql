-- -------------------------------------------------------------
-- TablePlus 5.6.8(524)
--
-- https://tableplus.com/
--
-- Database: fiverr
-- Generation Time: 2024-02-08 02:51:53.7370
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietLoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_loai_cong_viec` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_loai_cong_viec` (`ma_loai_cong_viec`),
  CONSTRAINT `ChiTietLoaiCongViec_ibfk_1` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `LoaiCongViec` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mo_ta_ngan` varchar(255) DEFAULT NULL,
  `sao_cong_viec` int DEFAULT NULL,
  `ma_chi_tiet_loai` int DEFAULT NULL,
  `nguoi_tao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_tao` (`nguoi_tao`),
  CONSTRAINT `CongViec_ibfk_1` FOREIGN KEY (`nguoi_tao`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ThueCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_thue` int DEFAULT NULL,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `ma_nguoi_thue` (`ma_nguoi_thue`),
  CONSTRAINT `ThueCongViec_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`id`),
  CONSTRAINT `ThueCongViec_ibfk_2` FOREIGN KEY (`ma_nguoi_thue`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 1, '2024-01-01 00:00:00', 'haha', 5),
(2, 2, 2, '2024-01-01 00:00:00', 'hihi', 5);

INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(1, 'Social & Marketing Videos', 'https://fiverrnew.cybersoft.edu.vn/images/lcv7.jpg', 4),
(2, 'Video Editing & Post-Production', 'https://fiverrnew.cybersoft.edu.vn/images/lcv8.jpg', 4);

INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(1, 'I will design minimal logo with complete corporate brand identity', 66, 10, 'https://fiverrnew.cybersoft.edu.vn/images/cv3.jpg', 'asd', 'asd', 5, 1, 1),
(2, 'I will sing', 88, 10, 'https://fiverrnew.cybersoft.edu.vn/images/cv3.jpg', 'asd', 'asd', 5, 2, 2),
(4, 'hacker', 5, 5, '/Users/trankhaiphong1728/Desktop/Fiverr_Backend_NestJS/fiverr/public/img/1707335244656_408980665_682369687218280_791551785006544074_n.jpg', 'mota', 'motangan', 5, 1, 1);

INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(1, 'hehe'),
(2, 'Digital Marketing'),
(3, 'Writing & Translation'),
(4, 'Video & Animation'),
(5, 'Music & Audio'),
(6, 'Programing & Tech'),
(7, 'AI'),
(8, 'Digital Marketing'),
(9, 'Linux');

INSERT INTO `NguoiDung` (`id`, `uname`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(1, 'phong', 'phong@gmail.com', '1234', '0913195823', '09/04/2002', 'male', 'cus', 'good', 'excellent'),
(2, 'John Doe', 'john.doe@example.com', 'securePassword123', '123456789', '1990-01-01', 'male', 'user', 'programming', 'certificate123'),
(3, 'ngoc', 'ngoc@gmail.com', '1234', '0903049250', '29/06/2003', 'female', 'cus', 'good', 'excellent'),
(4, 'Nàm', 'nam@gmail.com', '$2a$10$7cJaVs5wVMvZgEGNFnNk9.3R0VhpH73eBqCSl4QalS.Jh9XcIGU26', '123456789', '01/05/2002', 'male', 'user', 'good', 'good'),
(6, 'neymar', 'neymar@gmail.com', '$2a$10$gOESfGZreP5FUQe/0L8oFO6Om2q7dwlDQvY1o5neplWpGjcZb0i.u', '123456789', '1990-01-01', 'male', 'user', 'hehe', 'good'),
(7, 'ronaldoaaa', 'ronaldo@gmail.com', '$2a$10$wNNmNkRVRB7NeAc.97WO2.HrW8gJper5l6HWUrhQJifa6H2ydp6du', '123456789', '1985-02-05T14:30:00Z', 'male', 'admin', 'good', 'excellent'),
(8, 'ronaldo', 'ronaldo@gmail.com', '$2a$10$ymZEPZR/cJGv.5WN43YT3OFgXpgn1jv8N6OUAzcetJwfKDVY6UP8G', '123456789', '2024-01-17T14:30:00Z', 'male', 'user', 'blabla', 'good');

INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(1, 1, 2, '2024-05-10 00:00:00', 1),
(2, 2, 1, '2024-05-10 00:00:00', 0),
(3, 2, 3, '2024-05-10 00:00:00', 1);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
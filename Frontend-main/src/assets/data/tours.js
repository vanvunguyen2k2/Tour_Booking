import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";

const tours = [
    {
        id: 1,
        imgSrc: tourImg01,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 2,
        imgSrc: tourImg02,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 3,
        imgSrc: tourImg03,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 4,
        imgSrc: tourImg04,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 5,
        imgSrc: tourImg05,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 6,
        imgSrc: tourImg06,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
    {
        id: 7,
        imgSrc: tourImg07,
        destTitle: "Westminister Bridge",
        location: "London",
        grade: "HOT_TOUR",
        fee: 100,
        description: "this is the description"
    },
]
// create table tour
// (
//     id             int auto_increment
//         primary key,
//     arrival        varchar(255)  not null,
//     content        varchar(1000) not null,
//     depart         varchar(255)  not null,
//     duration       int           not null,
//     image          varchar(255)  not null,
//     max_guest_size int           not null,
//     price          int           not null,
//     status         varchar(255)  not null,
//     title          varchar(255)  not null,
//     transport      varchar(255)  not null,
//     type           varchar(255)  not null
// );

// INSERT INTO du_lich_viet.tour (id, arrival, content, depart, duration, image, max_guest_size, price, status, title, transport, type) VALUES (1, 'Malaysia', 'Hành trình liên tuyến Singapore - Malaysia sẽ đưa du khách đến và trải nghiệm những văn hóa độc đáo đặc sắc. Thưởng ngoạn các danh lam thắng cảnh, tìm hiểu phong tục tập quán,... của 2 quốc gia xinh đẹp hàng đầu trong khu vực Đông Nam Á. Đến với tour Singapore Malaysia 5 ngày từ Hà Nội, du khách được tham quan các địa danh du lịch nổi tiếng như sau:

// Nhắc đến du lịch Singapore thì chắc hẳn các du khách đều biết đến tượng sư tử Merlion đã quá nổi tiếng với thế giới. Đây là biểu tượng của thành phố và cũng là một điểm đến nổi bật ở Singapore mà bạn không thể bỏ qua. ', 'Hà Nội', 5, 'https://dulichvietnam.com.vn/tour/vnt_upload/tour/04_2022/thumbs/380_crop_chua-thien-hau-2.jpg', 10, 9990000, 'AVAILABLE', 'Hà Nội - Singapore - Malaysia 5N4Đ Bay Vietjet Air/ Scoot Air', 'AIRPLANE', 'HOLIDAY');
// INSERT INTO du_lich_viet.tour (id, arrival, content, depart, duration, image, max_guest_size, price, status, title, transport, type) VALUES (2, 'Singapore', 'Dưới đây là giới thiệu sơ bộ về các hành trình tour thăm quan Singapore 4 ngày/ 3 đêm bay từ SB Tân Sơn Nhất, HCM.

// Singapore có diện tích nhỏ nhất Đông Nam Á, là quốc gia phát triển mạnh về kinh tế và du lịch. Tham gia tour Singapore 4 ngày 3 đêm từ HCM du khách được tham quan các địa danh du lịch nổi tiếng như sau:

// Merlion là biểu tượng thần thoại của Singapore và là điểm du lịch Singapore thu hút nhiều khách tham quan nhất trên toàn đảo.', 'TP. Hồ Chí Minh', 4, 'https://dulichvietnam.com.vn/tour/vnt_upload/tour/04_2022/thumbs/380_crop_du-lich-singapore-2_1.jpg', 20, 10680000, 'AVAILABLE', 'HCM - Singapore - River Safari 4N3Đ, VMB + KS 4*', 'AIRPLANE', 'HOLIDAY');
export default tours;
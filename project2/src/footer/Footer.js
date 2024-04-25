import { memo } from "react";
import img1 from "../assets/header/Logo.png";
import {Link} from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="Footer">
      <nav className="article1">
        <ul>
          <li>
            <img src={img1} alt="" />
          </li>
          <li><p>Tại hệ thống cửa hàng bán đồ cho chó mèo thú cưng PetVillage, kiến thức thú y chuyên môn, kỹ năng chăm sóc chuyên nghiệp và sự tận tâm trong công việc là những tiêu chí hàng đầu đối với đội ngũ nhân viên. Với sự sáng tạo và đổi mới không ngừng, PetVillage hiện đang là một trong những địa điểm hàng đầu chuyên cung cấp những dịch vụ, sản phẩm cho thú cưng.</p></li>
          <li>2022 © PetVillage-All Right Reserved</li>
        </ul>
      </nav>
      <nav className="article2">
        <ul>
            <li><h2>Về chúng tôi</h2></li>
            <br></br>
            <li><Link>Giới thiệu</Link></li>
            <li><Link>Blog</Link></li>
            <li><Link>Liên hệ</Link></li>
            <li>Email: petvillage@gmail.com</li>
            <li>Điện thoại: 0856311329</li>
            <li><Link><FaFacebookSquare /></Link></li>
            <li><Link><FaSquareTwitter /></Link></li>
        </ul>
      </nav>
      <nav className="article3">
        <ul>
            <li><h2>Chính sách chung</h2></li>
            <br></br>
            <li><Link>Chính sách và quy định chung</Link></li>
            <li><Link>Quy định và hình thức thanh toán</Link></li>
            <li><Link>Chính sách bảo hành</Link></li>
            <li><Link>Chính sách vận chuyển và giao nhận</Link></li>
            <li><Link>Chính sách bảo mật thông tin cá nhân</Link></li>
            <li><Link>Chính sách đổi/trả hàng và hoàn tiền</Link></li>
          
        </ul>
      </nav>
      <nav className="article4">
        <ul>
            <li><h2>Hệ thống shop thú cưng</h2></li>
            <br></br>
            <p>Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
            <p>81-95 Nghi Tàm, P.Yên Phụ, Q.Tây Hồ, Tp.Hà Nội</p>
          
        </ul>
      </nav>
      <p><Link>Câu hỏi thường gặp</Link></p>
      <p><Link>Chính sách bảo mật</Link></p>
    </div>
  );
}
export default memo(Footer);

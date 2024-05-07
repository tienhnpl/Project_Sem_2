import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "utils/path";
import Logo from "assets/imgs/Logo.png";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-[75px] py-[50px] bg-[#18181A] text-[#FFFFFF]">
      <div className=" flex justify-between text-[#FFFFFF]">
        <div className="w-[362px] flex flex-col gap-[30px]">
          <Link to={path.HOME} className="">
            <img src={Logo} width={122} height={39} alt="Village logo" />
          </Link>
          <p className="text-[16px] text-justify">
            Tại hệ thống cửa hàng bán đồ cho chó mèo thú cưng PetVillage, kiến
            thức thú y chuyên môn, kỹ năng chăm sóc chuyên nghiệp và sự tận tâm
            trong công việc là những tiêu chí hàng đầu đối với đội ngũ nhân
            viên. Với sự sáng tạo và đổi mới không ngừng, PetVillage hiện đang
            là một trong những địa điểm hàng đầu chuyên cung cấp những dịch vụ,
            sản phẩm cho thú cưng
          </p>
        </div>
        <div className="w-[214px] flex flex-col gap-[30px]">
          <p className="font-extrabold text-[18px]">Về chúng tôi</p>
          <div className="flex flex-col gap-[15px]">
            <span className="text-[16px] ">Giới thiệu</span>
            <span className="text-[16px] ">Blog</span>
            <span className="text-[16px] ">Liên hệ</span>
            <span className="text-[16px] ">Email: petvillage@gmail.com</span>
            <span className="text-[16px] ">Điện thoại: 0856311329</span>
            <div className="flex gap-4">
              <FaFacebookSquare size={26} />
              <FaTwitterSquare size={26} />
            </div>
          </div>
        </div>

        <div className="w-[284px] flex flex-col gap-[30px]">
          <p className="font-extrabold text-[18px]">Chính sách chung</p>
          <div className="flex flex-col gap-[15px]">
            <span className="text-[16px] ">Chính sách & Quy định chung</span>
            <span className="text-[16px] ">
              Quy định và hình thức thanh toán
            </span>
            <span className="text-[16px] ">Chính sách bảo hành</span>
            <span className="text-[16px] ">
              Chính sách vận chuyển và giao nhận
            </span>
            <span className="text-[16px] ">
              Chính sách bảo mật thông tin cá nhân
            </span>
            <span className="text-[16px] ">
              Chính sách đổi/ trả hàng và hoàn tiền
            </span>
          </div>
          <div></div>
        </div>

        <div className="w-[224px] flex flex-col gap-[30px]">
          <p className="font-extrabold text-[18px]">Hệ thống shop thú cưng</p>
          <div className="flex flex-col gap-[15px]">
            <span className="text-[16px] ">
              Khu phố 6, P.Linh Trung Tp.Thủ Đức, Tp.Hồ Chí Minh.
            </span>
            <span className="text-[16px] ">
              81-95 Nghi Tàm, P. Yên Phụ Q. Tây Hồ, Tp Hà Nội.
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div className="text-[16px] flex justify-between">
        <p>2024 © PetVillage - All right reserved</p>
        <div className="flex gap-[75px]">
          <span>Câu hỏi thường gặp</span>
          <span>Chính sách bảo mật</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

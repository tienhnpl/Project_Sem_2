import {memo} from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/header/Logo.png";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiArrowUpSLine } from "react-icons/ri";

function Header(){

    return(
        <div className="Header">
            <nav>
                <ul>
                    <li><Link to={""}><img src={img1} alt=""/></Link></li>
                    <li className="category"><Link to ={""}><BiSolidCategory /><span>Danh mục PetVillage</span><span clss><IoIosArrowDown /></span><span><RiArrowUpSLine /></span></Link>
                    <ul>
                        <li></li>
                    </ul>
                    </li>
                    <li className="search"><input placeholder="Tìm kiếm sản phẩm"/><Link to={""}><CiSearch/></Link></li>
                    <li className="button"><button className="sign_up">Đăng ký</button><button className="sign_in">Đăng nhập</button></li>
                </ul>
            </nav>
        </div>
    );
}
export default memo(Header);
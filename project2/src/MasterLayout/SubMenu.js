import {memo} from "react";

function SubMenu(){
    return(
        <div className="SubMenu">
            <nav className="Article1">
                <ul>
                    <li><h2>SẢN PHẨM CHO CHÓ</h2></li>
                    <li>Vật dụng ăn uống cho chó</li>
                    <li>Thức ăn cho chó</li>
                    <li>Vòng cổ, dây dắt</li>
                    <li>Chuồng, giường, nhà</li>
                    <li>Mỹ phẩm, làm đẹp</li>
                    <li>Y tế, thuốc cho chó</li>
                    <li>Đồ chơi , phụ kiện huấn luyện</li>
                    <li>DỊCH VỤ CẮT TỈA LÔNG CHÓ MÈO</li>
                </ul>
            </nav>
            <nav className="Article2">
                <ul>
                    <li><h2>SẢN PHẨM CHO MÈO</h2></li>
                    <li>Cát vệ sinh cho mèo</li>
                    <li>Thức ăn cho mèo</li>
                    <li>Nhà cho mèo</li>
                    <li>Thuốc thú y cho mèo</li>
                    <li>Chăm sóc mèo</li>
                    <li>Đồ dùng cho mèo</li>
                    <li>BLOG CHIA SẺ</li>
                </ul>
            </nav>
            <nav className="Article3">
                <ul>
                    <li><h2>CHÓ CẢNH</h2></li>
                    <li>Chó Husky</li>
                    <li>Chó Shiba Inu</li>
                    <li>Chó Akita Inu</li>
                    <li>Chó Alabai</li>
                    <li>Chó Basenji</li>
                    <li>Chó Bắc Hà</li>
                    <li>Chó Becgie</li>
                    <li>Chó Beagle</li>
                    <li>Chó Bull Pháp</li>
                    <li>Chó Bull Anh</li>
                </ul>
            </nav>
            <nav className="Article4">
                <ul>
                    <li><h2>MÈO CẢNH</h2></li>
                    <li>Mèo Anh lông ngắn</li>
                    <li>Mèo Anh lông dài</li>
                    <li>Mèo Ba tư</li>
                    <li>Mèo Bengal</li>
                    <li>Mèo Muchkin chân ngắn</li>
                    <li>Mèo Scottish Fold</li>
                    <li>Mèo Xiêm</li>
                    <li>Mèo Ragdoll</li>
                    <li>Mèo Maine Coon</li>
                    <li>Sphynx không lông</li>
                </ul>
            </nav>
            <nav className="Article5">
                <img className="img" src="" alt="">
                    <p>Khuyến mại</p>
                    <p>Các sản phẩm thức ăn</p>
                    <p>108 sản phẩm</p>
                </img>
            </nav>
        </div>
    );
}
export default memo(SubMenu);
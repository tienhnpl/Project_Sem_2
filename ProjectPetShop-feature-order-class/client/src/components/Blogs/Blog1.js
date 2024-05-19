import React from 'react'
import data from '../../assets/imgs/Husky1.png'
import data2 from '../../assets/imgs/Husky2.png'
import data3 from '../../assets/imgs/Husky3.png'

const Blog1 = () => {
  return (
    <div className="para mx-10 mt-5">
      <h2 id="htwo" className="ml-10 text-2xl font-bold">Kiến Thức Chăm Sóc Chó Mèo</h2>
      <div id="img" className="flex flex-wrap justify-center">
        <img src={data} alt="" width={1100} />
      </div>
      <section className="para">
        <h2 className="text-2xl font-bold">Chăm Sóc Chó Alaska 3 Tháng Tuổi Đúng Cách Và Hiệu Quả</h2>
        <p className="mt-4">
          Với hình dáng to con cùng với bộ lông mượt mà, dễ thương, chó Alaska ngày càng được ưa chuộng tại Việt Nam. 
          Tuy nhiên không phải ai cũng có thể nuôi được một chú chó Alaska đúng cách, đặc biệt là cho Alaska 3 tháng tuổi đang trong giai đoạn phát triển.
          Bài viết dưới đây sẽ cung cấp những kiển thức hữu ích cho bạn nếu như bạn đang muốn sở hữu một chú chó Alaska ở nhà để làm bạn.
        </p>
        <h4 className="font-bold text-xl mt-4">Tìm hiểu giống chó Alaska</h4>
        <p className="mt-4">
          Chó Alaska được phát hiện ra từ một người Eskimo, 
          giống chó này có sức mạnh lớn khi có thể di chuyến đường dài và kéo xe tuyết một cách rất hiệu quả. 
          Các chú chó Alaska đều sở hữu ngoại hình to lớn, 
          đặc biệt chúng có một trí tuệ thông minh và bộ lông đa dạng màu sắc như đen, trắng, xám trắng,....
        </p>
        <p className="mt-4">
          Hiện tại, giá của chó Alaska sau khi được thuần chủng sẽ giao động trong khoảng 10 đến 12 triệu. 
          Tuy nhiên phụ thuộc vào nhiều yếu tố khác nhau mà giá chó Alaska có thể sẽ thay đổi nên không thể xác định con số chính xác. 
          Theo hiệp hội cho Hòa Kỳ, chó
          Alaska được phân thành 3 nhóm chính là Standard, Large Standard và cuối cùng là Giant, chúng được sắp xếp theo thứ tự lớn dần về kích thước.
        </p>
        <h4 className="font-bold text-xl mt-4">Nuôi chó Alaska khó hay dễ ?</h4>
        <p className="mt-4">
          Quá trình chăm sóc một chú chó Alaska không quá khó nhưng vì thay đổi môi trường sống nên sẽ có những điều mà
           bạn cần phải lưu ý khi để chó Alaska có thể thích nghi và phát triển tốt.
           Bạn cần lưu ý các vấn đề sau:
        </p>
        <h4 className="font-bold text-xl mt-4">Điều kiện về khí hậu</h4>
        <p className="mt-4">
          Đặc điểm của chó Alaska là có bộ lông rất dày để giữ ấm tại môi trường lạnh nên khi sống tại Việt Nam với khí 
          hậu nhiệt đới gió mùa tương đối nóng, bạn cần phải chú ý để tránh việc chó Alaska bị sốc nhiệt. Đối với những 
          ngày quá nóng, nhiệt độ trên 30 độ bạn nên giữ chúng trong phòng máy lạnh và thường xuyên tằm rửa hằng ngày cho chó Alaska, 
          tránh việc tiếp xúc với đất cát nóng.
        </p>
        <h4 className="font-bold text-xl mt-4">Tiêm phòng và kiểm tra định kỳ</h4>
        <p className="mt-4">
          Để đảm bảo cho chú chó của bạn có sức khỏe tốt, bạn nên cho chúng đi tiêm phòng và kiểm tra sức khỏe thường xuyên.
           Với những chú chó Alaska còn nhỏ đang trong giai đoạn phát triển từ 2 đến 4 tháng tuổi, 
           việc tiêm phòng càng được quan tâm, chú trọng hơn để giúp chúng tăng cường sức đề kháng và tránh bị nhiễm các bệnh từ bên ngoài. 
          Bạn nên tìm hiểu các phòng khám có uy tín để chú chó của mình được chăm sóc tốt nhất.
        </p>
        <h4 className="font-bold text-xl mt-4">Giữ vệ sinh sạch sẽ</h4>
        <p className="mt-4">
          Với đặc thù là bộ lông dày, chó Alaska cần được tắm rửa sạch sẽ thường xuyên. 
          Ban cũng cần chú ý vệ sinh các yếu tố liên quan như nơi ở của chó Alaska, các tô bát đựng thức ăn và dụng cụ uống nước. 
          Vệ sinh sạch sẽ giúp chó Alaska tránh được các nguy cơ nhiễm bệnh từ bên ngoài. 
          Ngoài ra, chó Alaska cũng cần được vệ sinh răng miệng sạch sẽ để phòng chống các bệnh về răng miệng.
        </p>
        <h4 className="font-bold text-xl mt-4">Vận động thường xuyên</h4>
        <p className="mt-4">
          Giống chó Alaska rất khỏe nên chúng cực kỳ thích vận động. Nếu bạn chí giữ chúng ở nhà không 
          cho ra ngoài chạy nhảy thì chúng sẽ trở nên buồn chán và có các hành động phá phách.
           Bạn có thể cho chúng ra ngoài vào buổi sáng để cùng bạn tập thể dục hoặc dắt 
          chúng đi dạo để tăng cường thể lực và làm quen với môi trường, bầu không khí bên ngoài.
        </p>
        <div id="img" className="flex flex-wrap justify-center mt-4">
          <img src={data2} alt="Brontosaurus" width={1100} />
        </div>
        <h4 className="font-bold text-xl mt-4">Thức ăn</h4>
        <p className="mt-4">
          Chó Alaska thường ăn những loại thức ăn có nhiều protein nhưng không phải ở mức cao cấp như chó Husky. 
          Bạn có thể tự tay nấu ăn cho chúng hoặc mua những loại thức ăn có hàm lượng dinh dưỡng phù hợp với chó Alaska. 
          Để tránh việc chúng bị nhàm chăn với thức ăn, bạn có thể cho chúng ăn xen kẽ thức ăn mua bên ngoài và thức ăn bạn tự nấu.
          Đối với những chú chó còn nhỏ, đặc biệt là chó Alaska 3 tháng tuổi trở xuống thì bạn nên cho chúng ăn các loại thức ăn dạng
           bột để dễ tiêu hóa và hấp thụ. Chó Alaska cũng yêu thích các loại thức ăn tươi sống như nội tạng lợn nhưng bạn cũng không nên 
           cho chúng ăn quá nhiều, trong giai đoạn này nên cho chúng ăn những loại thức ăn nấu chín nhiều chất dinh dưỡng hơn.
        </p>
        <h4 className="font-bold text-xl mt-4">Cách nuôi chó Husky 3 tháng tuổi</h4>
        <p className="mt-4">
          Chó Alaska 3 tháng tuổi đang ở trong giai đoạn tập thích nghi với môi trường sống mới và phát triển. 
          Bạn có thể cho chúng tập thói quen nhai bằng cách cho nhiều thức ăn cứng thường xuyên cho chúng trong các bữa ăn. 
          Bên cạnh đó, chó Alaska trong giai đoạn này còn nhỏ nên bạn cần bổ sung 
          vào các bữa ăn của chúng men tiêu hóa để giảm nguy cơ mắc các bệnh về đường ruột.
        </p>
        <h4 className="font-bold text-xl mt-4">Kết luận</h4>
        <p className="mt-4">
          Đây là những thông tin về chó Alaska và cách nuôi Alaska 3 tháng tuổi mà chúng tôi muốn cung cấp cho bạn. 
          Hy vọng bạn đã có thêm được nhiều kiến 
          thức để có thể chăm sóc và nuôi dạy chú chó Alaska của mình phát triển thật khỏe mạnh.
        </p>
        <div id="img" className="flex flex-wrap justify-center mt-4">
          <img src={data3} alt="Brontosaurus" width={1100} />
        </div>
      </section>
    </div>
  );
};

export default Blog1
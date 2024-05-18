import React from 'react'
import data from '../../assets/imgs/P3.1.webp'

const Blog3 = () => {
  return (
    <div>
    <main className="p-6">
      <div id="img" className="flex justify-center mb-6">
        <img
          src={data}
          alt="Velociraptor"
          width="1200"
        />
      </div>
      <section className="para">
        <h2 className="text-2xl font-bold mb-4">Chính sách chung</h2>
        <p className="mb-4">
          - Chào mừng quý khách hàng đến với Pet Village <br />
          - Chúng tôi là Công ty TNHH Pet Village có địa chỉ trụ sở tại Khu phố 6, P.Linh Trung Tp.Thủ Đức, Tp.Hồ Chí Minh.<br />
          - Hệ thống cửa hàng thành lập trang thương mại điện tử <a href="https://www.petvillage.com.au/" target="_blank" rel="noopener noreferrer">petvillage.vn</a> và đã được đăng ký chính thức với Bộ Công Thương Việt Nam.<br />
          - Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.<br />
          - Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
        </p>
        <h2 className="text-2xl font-bold mb-4">Hướng dẫn sử dụng Website</h2>
        <p className="mb-4">
          Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.<br />
          Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng có thể mua sắm trên website trong khuôn khổ Điều khoản và Điều kiện sử dụng đã đề ra.<br />
          Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên web. Hơn nữa, quý khách hàng phải thông báo cho chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy định.<br />
          Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không được chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây, chúng tôi sẽ hủy tài khoản của khách mà không cần báo trước.<br />
          Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo. 
        </p>
        <h2 className="text-2xl font-bold mb-4">Chấp nhận đơn hàng và giá cả</h2>
        <p className="mb-4">
          Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ lý do gì liên quan đến lỗi kỹ thuật, hệ thống một cách khách quan vào bất kỳ lúc nào.<br />
          Ngoài ra, để đảm bảo tính công bằng cho khách hàng là người tiêu dùng cuối cùng của <a href="https://dogparadise.vn/?gidzl=IngMU1XkzILF19Py6dNt8qu9ada4AADs15_0VbT-fdK3MC5_12cZSrHSo7i3AFWbK0_EVJDaH59k7MVn8m" target="_blank" rel="noopener noreferrer">Dogparadise.vn</a>, chúng tôi cũng sẽ từ chối các đơn hàng không nhằm mục đích sử dụng cho cá nhân, mua hàng số lượng nhiều hoặc với mục đích mua đi bán lại.<br />
          Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra, ví dụ như trường hợp giá sản phẩm không hiển thị chính xác trên trang web hoặc sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách. Chúng tôi cũng có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã thanh toán.
        </p>
      </section>
    </main>

    </div>
  )
}

export default Blog3
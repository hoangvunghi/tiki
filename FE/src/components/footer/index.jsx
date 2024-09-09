import Company from '../company'
import Info from '../info'
import Social from '../social'

function Footer() {

    return (
        <>
            <footer className="bg-white py-2 max-[768px]:hidden">
                <div className="mx-40">
                    <div className='flex justify-between gap-5 py-4'>
                        <Info 
                            title={"Hỗ trợ khách hàng"}
                            value={["Hotline: 1900-6035", "Các câu hỏi thường gặp", "Gửi yêu cầu hỗ trợ", "Hướng dẫn đặt hàng", "Phương thức vận chuyển", "Chính sách đổi trả", "Hướng dẫn trả góp", "Chính sách hàng nhập khẩu", "Hỗ trợ khách hàng: hotro@tiki.vn", "Báo lỗi bảo mật: security@tiki.vn"]}
                        />
                        <Info 
                            title={"Về Tiki"}
                            value={["Giới thiệu Tiki", "Tiki Blog", "Tuyển dụng", "Chính sách bảo mật thanh toán", "Chính sách bảo mật thông tin cá nhân", "Chính sách giải quyết khiếu nại", "Điều khoản sử dụng", "Giới thiệu Tiki Xu", "Gói hội viên VIP", "Tiếp thị liên kết cùng Tiki", "Bán hàng doanh nghiệp", "Điều kiện vận chuyển"]}
                        />
                        <div>
                            <Info 
                                title={"Hợp tác và liên kết"}
                                value={["Quy chế hoạt động Sàn GDTMĐT", "Bán hàng cùng Tiki"]}
                            />
                            <Info 
                                title={"Chứng nhận bởi"}
                                value={[]}
                            />
                            <a href="http://online.gov.vn/Home/WebDetails/21193">
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" alt=""/>
                            </a>
                        </div>
                        <div>
                            <Info 
                                title={"Phương thức thanh toán"}
                                value={[]}
                            />
                            <Info 
                                title={"Dịch vụ giao hàng"}
                                value={[]}
                            />
                        </div>
                        <div>
                            <Info 
                                title={"Kết nối với chúng tôi"}
                                value={[]}
                            />
                            <Social />
                            <Info 
                                title={"Tải ứng dụng trên điện thoại"}
                                value={[]}
                            />
                        </div>
                    </div>
                    <div className='py-4 border-solid border-y-2'>
                        <Company />
                    </div>
                    <div className='h-10'></div>
                </div>
            </footer>
        </>
    )
}
  
export default Footer
function BookSmall(props) {

    const { jsonData } = props;

    const bookData = JSON.parse(jsonData);

    // Tính toán Star
    const ratingAverage = bookData.rating_average || 0;
    const numberOfStars = Math.floor(ratingAverage);
    const numberOfNotStars = 5 - numberOfStars;

    // Tính toán Price
    const listPrice = bookData.list_price || 0;
    const currentSellerPrice = bookData.current_seller ? bookData.current_seller.price : 0;
    const percentage = ((100 - (currentSellerPrice / listPrice) * 100)).toFixed(0)

    const quantityText = bookData.quantity_sold ? bookData.quantity_sold.text : "Đã bán 0";

    const name = bookData.name || "Sách";

    const firstImageData = bookData.images ? bookData.images[0] : null;

    return (
        <>
            <div className="flex flex-col bg-white rounded-lg flex-1 max-h-[600px]">
                <div className="flex items-center justify-center">
                    <div className="w-[181px] h-[181px]">
                        <img className="w-full h-full opacity-100 rounded-lg" src={firstImageData.thumbnail_url} alt="" />
                    </div>
                </div>
                <div className="flex flex-col p-2 flex-1 justify-between">
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="h-6"></div>
                        <div className="flex flex-col flex-1 justify-between">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm break-words font-normal text-ellipsis self-stretch overflow-hidden">
                                    {name}
                                </h3>
                                <div className="flex">
                                    <div className="flex items-center mr-2">
                                        {/* Load Star Gold*/}
                                        {[...Array(numberOfStars)].map((_, index) => (
                                            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#a)">
                                                <path
                                                    d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"
                                                    fill="#FFC400"
                                                ></path>
                                                </g>
                                                <defs>
                                                <clipPath id="a">
                                                    <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        ))}

                                        {/* Load Star not Gold*/}
                                        {[...Array(numberOfNotStars)].map((_, index) => (
                                            <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#a)">
                                                <path
                                                    d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"
                                                    fill="#DDDDE3"
                                                ></path>
                                                </g>
                                                <defs>
                                                <clipPath id="a">
                                                    <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        ))}

                                    </div>
                                    <div className="relative text-xs text-neutral-500 pl-2 p-1 before:block before:absolute before:h-4 before:border-l-2 before:justify-center before:left-0">
                                        {quantityText}
                                    </div>
                                </div>
                            </div>
                            <div className="flex font-semibold items-center">
                                <div className="text-base mr-2">
                                    {new Intl.NumberFormat('vi-VN').format(currentSellerPrice)}
                                    <sup>₫</sup>
                                </div>
                                {percentage !== '0' && (
                                    <div className="bg-neutral-200 text-[12px] px-1 h-5 rounded-lg justify-center">
                                        -{percentage}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center text-xs">
                        <div className="h-4 w-full border-solid border-b">
                        </div>
                        <div className="flex items-center pt-1">
                            <span className="text-neutral-500">Giao siêu tốc 2h</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default BookSmall
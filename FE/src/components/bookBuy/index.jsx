import React, { useState, useEffect } from 'react';

function BookBuy(props) {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (props.book.current_seller && props.book.current_seller.price !== null) {
            setPrice(props.book.current_seller.price);
        } else {
            setPrice(0);
        }
    }, [props]);

    useEffect(() => {
        setTotalAmount(price * quantity);
    }, [quantity, price]);

    const handleAdd = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleRemove = () => {
        if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value.trim();
        let newQuantity;
      
        if (inputValue === '' || isNaN(inputValue)) {
          newQuantity = 1;
        } else {
          newQuantity = parseInt(inputValue, 10);
        }
      
        setQuantity(newQuantity);
    };

    const handleAddToCartClick = () => {
        props.onAddToCart(props.book, quantity);
    };


    return (
        <>
            <div className="bg-white rounded-lg p-4 h-fit">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 font-semibold text-base">
                        <p>Số lượng</p>
                        <div className="flex">
                            <button
                                className="flex p-2 items-center justify-center h-8 border border-solid rounded"
                                onClick={handleRemove}
                            >
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg" alt="" />
                            </button>
                            <input
                                className="w-10 h-8 rounded border border-solid text-center mx-1"
                                type="text"
                                value={quantity}
                                onChange={handleInputChange}
                            />
                            <button
                                className="flex p-2 items-center justify-center h-8 border border-solid rounded"
                                onClick={handleAdd}
                            >
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 font-semibold">
                        <div className="text-base">Tạm tính</div>
                        <div className="text-2xl">
                            {new Intl.NumberFormat('vi-VN').format(totalAmount)}
                            <sup>₫</sup>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-base">
                        <button className="bg-red-500 rounded cursor-pointer font-light flex items-center justify-center p-2 gap-2 text-white whitespace-nowrap h-10 w-full">
                            <div>Mua ngay</div>
                        </button>
                        <button onClick={handleAddToCartClick} className="flex justify-center items-center rounded p-2 gap-2 whitespace-nowrap cursor-pointer bg-white text-sky-700 border-solid border border-sky-700 w-full hover:bg-sky-700 hover:text-white">
                            <div>Thêm vào giỏ</div>
                        </button>
                        <button className="flex justify-center items-center rounded p-2 gap-2 whitespace-nowrap cursor-pointer bg-white text-sky-700 border-solid border border-sky-700 w-full hover:bg-sky-700 hover:text-white">
                            <div>Mua trước trả sau</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default BookBuy
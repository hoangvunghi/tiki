import React, { useState, useEffect } from "react";

function CartItem(props) {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (props.book.original_price && props.book.original_price !== null) {
            setPrice(props.book.original_price);
        } else {
            setPrice(0);
        }
        setQuantity(props.book.quantity);
    }, [props]);

    useEffect(() => {
        setTotalAmount(price * quantity);
    }, [quantity, price]);

    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        handleQuantityChange(newQuantity);
    };

    const handleRemove = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            handleQuantityChange(newQuantity);
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

    const handleRemoveItem = () => {
        props.onRemoveItem(props.book.id);
    };

    const handleQuantityChange = (newQuantity) => {
        props.onUpdateQuantity(props.book.id, newQuantity);
    };

    return (
        <>
            <div className="w-full p-2">
                <div className="flex px-4 py-3 my-2 rounded-lg items-center justify-between border border-neutral-300 max-[768px]:flex-col max-[768px]:gap-10">
                    <div className="flex items-center gap-10">
                        <div>
                            <img className="w-[80px] h-[80px]" src={props.book.images[0].thumbnail_url} alt="" />
                        </div>
                        <div className="flex flex-col items-center">
                            <div>
                                <p>{props.book.name}</p>
                            </div>
                            <div className="text-lg font-semibold">
                                {new Intl.NumberFormat('vi-VN').format(price)}
                                <sup>đ</sup>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-20 max-[768px]:flex-col max-[768px]:gap-2">
                        <div className="flex flex-col items-center">
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
                            <div className="text-lg font-semibold">
                                {new Intl.NumberFormat('vi-VN').format(totalAmount)}
                                <sup>đ</sup>
                            </div>
                        </div>
                        <div className="flex hover:cursor-pointer" onClick={handleRemoveItem}>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default CartItem
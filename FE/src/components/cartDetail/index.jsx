import CartItem from "../cartItem"

function CartDetail(props) {

    return (
        <>
            <div className="flex bg-[#efefef]">
                <div className="flex flex-col mx-40 my-5 rounded-lg items-center justify-center bg-white w-full max-[768px]:mx-2">
                {props.cartData.length === 0 ? (
                    <div className="flex flex-col my-5 items-center justify-center">
                        <img src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png" alt="" />
                        <p className="font-semibold">Giỏ hàng trống</p>
                        <p>Vui lòng thêm các sản phẩm khác!</p>
                    </div>
                ) : (
                    <div className="w-full">
                        {props.cartData.map((item) => (
                            <CartItem key={item.id} book={item} onRemoveItem={props.onRemoveItem} onUpdateQuantity={props.onUpdateQuantity}/>
                        ))}
                        <button className="bg-red-500 p-4 rounded cursor-pointer font-light flex items-center justify-center gap-2 text-white whitespace-nowrap h-10 w-full">
                            <div>Mua ngay</div>
                        </button>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}
  
export default CartDetail
import { useNavigate } from 'react-router-dom';

function Cart(props) {

    const navigate = useNavigate();
    const handleCard = () => {
        navigate(`/cart`);
    };

    return (
        <>
            <div onClick={handleCard}>
                <div className="flex w-10 h-10 items-center justify-center relative hover:bg-sky-100 rounded-lg cursor-pointer">
                    <img className="w-6 h-6" src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png" alt="" />
                    <span className="bg-red-600 text-white h-4 right-0 -top-1 py-[0.5px] px-1 ml-6 absolute text-[10px] rounded-lg">
                        {props.quantity}
                    </span>
                </div>
            </div>
        </>
    )
}
  
export default Cart
import UserDetail from "../userDetail"
import Cart from "../cart"

function User(props) {

    return (
        <>
            <div className="flex justify-center items-center ml-12 max-[768px]:ml-2">
                <UserDetail 
                    imgUrl="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                    text="Trang&nbsp;chủ"
                />
                <UserDetail 
                    imgUrl="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                    text="Tài&nbsp;khoản"
                />
                <Cart 
                    quantity={props.quantity}
                />
            </div>
        </>
    )
}
  
export default User
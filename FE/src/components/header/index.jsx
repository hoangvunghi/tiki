import Logo from "../logo"
import Search from "../search"
import User from "../user"

function Header(props) {

    return (
        <>
            <header className="bg-white py-2 max-[768px]:bg-sky-500">
                <div className="px-6 mx-40 max-[768px]:mx-2 max-[768px]:px-2">
                    <div className="flex items-center justify-between gap-12 max-[768px]:gap-1">
                        <Logo />
                        <div className="flex flex-auto items-center justify-center">
                            <Search onSearch={props.onSearch} />
                            <User quantity={props.quantity}/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
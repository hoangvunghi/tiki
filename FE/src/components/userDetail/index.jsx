function UserDetail(props) {

    return (
        <>
            <div className="flex items-center px-4 py-2 rounded-lg justify-center cursor-pointer hover:bg-neutral-300 max-[768px]:hidden">
                <img
                    className="w-6 h-6 mr-1 rounded-full"
                    src={props.imgUrl}
                    alt=""
                />
                <span className="no-underline text-neutral-500">{props.text}</span>
            </div>
        </>
    )
}
  
export default UserDetail
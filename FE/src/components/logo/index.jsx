function Logo() {

    return (
        <>
            <div className="flex flex-col items-center justify-center max-[768px]:flex-row max-[768px]:mr-2">
                <div className="hidden max-[768px]:flex max-[768px]:gap-2">
                    <a className="flex text-white" href="/">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </a>
                    <a className="flex text-white" href="/">
                        <span class="material-symbols-outlined">menu</span>
                    </a>
                </div>
                <a className="w-40 flex flex-col max-[768px]:hidden" href="/">
                    <img className="w-24 h-10" src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png" alt="" />
                    <span className="text-sky-700 font-semibold">
                        Tốt & Nhanh
                    </span>
                </a>
            </div>
        </>
    )
}
  
export default Logo
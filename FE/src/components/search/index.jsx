import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        props.onSearch(searchTerm);
        if (searchTerm.trim() !== "") {
            navigate(`/search/${searchTerm}`);
        }else{
            navigate(`/`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            if (searchTerm.trim() !== "") {
                navigate(`/search/${searchTerm}`);
            }else{
                navigate(`/`);
            }
        }
    };

    return (
        <>
            <div className="flex bg-white rounded-lg border-solid border-2 items-center w-full h-fit">
                <img
                    className="w-5 h-5 ml-4 max-[768px]:ml-2"
                    src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                    alt=""
                />
                <input 
                    className="px-2 border-0 w-full focus:outline-none rounded-lg"
                    type="text" 
                    placeholder="Freeship đến 30k"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button 
                    className="relative text-sky-700 hover:bg-sky-100 h-9 w-24 p-1 rounded-r-lg items-center justify-center before:block before:absolute before:h-6 before:border-l-2 before:left-0 before:top-2 max-[768px]:hidden"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </button>
            </div>
        </>
    )
}
  
export default Search
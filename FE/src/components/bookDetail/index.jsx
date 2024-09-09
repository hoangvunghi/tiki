import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BookBuy from "../bookBuy";
import BookDes from "../bookDes";
import BookInfoLarge from "../bookInfoLarge";
import BookInfoSmall from "../bookInfoSmall";
import BookLarge from "../bookLarge";

function BookDetail(props) {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('https://h5ltj4-8080.csb.app/books');
            // const response = await fetch('https://giang05072003.github.io/books/books.json');
            const data = await response.json();
    
            setBooks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const book = books.find(book => book.id === parseInt(id, 10)) || {};
        setSelectedBook(book);
    }, [id, books]);


    useEffect(() => {
    }, [selectedBook]);


    
    return (
      <>
        <div className="flex bg-[#efefef]">
            {loading ? (
                    <div className='flex flex-1 items-center justify-center my-52'>
                        <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
                    </div>
                ) : (
                    Object.keys(selectedBook).length === 0 ? (
                        <div className='flex flex-1 my-5 mx-40 gap-4 max-[768px]:mx-2'>
                            <div className='flex flex-1 items-center justify-center my-52 font-bold text-lg'>
                                <p>Không tìm thấy sản phẩm!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 my-5 gap-4 mx-40 max-[768px]:mx-2 max-[768px]:grid-cols-1">
                            <BookLarge book={selectedBook}/>
                            <div className="flex flex-col gap-2">
                                <BookInfoLarge book={selectedBook} />
                                <BookInfoSmall book={selectedBook} />
                                <BookDes book={selectedBook} />
                            </div>
                            <BookBuy book={selectedBook} onAddToCart={props.onAddToCart} />
                        </div>
                    )
                )}
        </div>
      </>
    );
}

export default BookDetail;
  
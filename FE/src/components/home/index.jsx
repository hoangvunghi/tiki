import React, { useState, useEffect } from 'react';

import Filter from '../filter';
import Page from '../page';
import BookMain from '../bookMain';
import bookApi from '../../api/book';

function Home(props) {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(null);
    const [currentSeller, setCurrentSeller] = useState([]);
    const [star, setStar] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await bookApi.getAllBook();
            setBooks(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
    }, [category]);

    const handleCategory = (category) => {
        setCategory(category);
    };

    useEffect(() => {
    }, [price]);

    const handlePrice = (Price) => {
        setPrice(Price);
    };

    useEffect(() => {
    }, [currentSeller]);

    const handleCurrentSeller = (currentSeller) => {
        setCurrentSeller(currentSeller);
    };

    useEffect(() => {
    }, [star]);

    const handleStar = (star) => {
        setStar(star);
    };

    const filteredBooks = books.filter((book) => {
        const searchTerm = props.searchData.toLowerCase();
        const matchesCategory =
          category !== ''
            ? book.categories.name === category
            : true;

        const matchesSearch =
          props.searchData !== ''
            ? book.name.toLowerCase().includes(searchTerm)
            : true;

        const isNotHidden = book.isHidden === undefined || book.isHidden === false;

        const matchesSupplier =
            currentSeller.length > 0
                ? currentSeller.includes(book.current_seller.name)
                : true;
      
        const isRatingGreater =
            star !== ''
            ? parseFloat(book.rating_average) >= parseFloat(star)
            : true;

        return matchesCategory && matchesSearch && isNotHidden && isRatingGreater && matchesSupplier;
    });
    
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (price === 0) {
          return a.current_seller.price - b.current_seller.price;
        } else if (price === 1) {
          return b.current_seller.price - a.current_seller.price;
        } else {
          return 0;
        }
    });

    const itemsPerPage = 25;
    const [currentPage, setCurrentPage] = useState(1);

    const totalBooks = sortedBooks.length;
    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    useEffect(() => {
        if (!loading) {
            setCurrentPage(1);
        }
    }, [loading]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBooks = sortedBooks.slice(startIndex, endIndex);

    return (
        <>
            <div className='flex flex-1 bg-[#efefef]'>
                {loading ? (
                    <div className='flex flex-1 items-center justify-center my-52'>
                        <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
                    </div>
                ) : (
                    filteredBooks.length === 0 ? (
                        <div className='flex flex-1 my-5 mx-40 gap-4 max-[768px]:mx-0 max-[768px]:gap-2  max-[768px]:flex-col max-[768px]:my-0'>
                            <Filter onSelectCategory={handleCategory} onSelectStar={handleStar} onSelectPrice={handlePrice} onSelectCurrentSeller={handleCurrentSeller} />
                            <div className='flex flex-1 items-center justify-center my-52 font-bold text-lg'>
                                <p>Không tìm thấy sản phẩm!</p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-1 my-5 mx-40 gap-4 max-[768px]:mx-0 max-[768px]:gap-2 max-[768px]:flex-col max-[768px]:my-0'>
                            <Filter onSelectCategory={handleCategory}  onSelectStar={handleStar} onSelectPrice={handlePrice} onSelectCurrentSeller={handleCurrentSeller} />
                            <div className='max-[768px]:mx-2 max-[768px]:my-5'>
                                <BookMain currentBooks={currentBooks} />
                                <Page currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}
  
export default Home
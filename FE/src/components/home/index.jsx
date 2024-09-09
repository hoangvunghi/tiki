import React, {useCallback, useEffect, useState} from 'react';
import Filter from '../filter';
import Page from '../page';
import BookMain from '../bookMain';
import bookApi from '../../api/book';
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";

function Home(props) {
  const location = useLocation();
  const paramObj = queryString.parse(location.search);

  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(paramObj?.category || '');
  const [price, setPrice] = useState(paramObj?.price || '');
  const [currentSeller, setCurrentSeller] = useState(paramObj?.seller ? paramObj?.seller.split(',') : []);
  const [star, setStar] = useState(paramObj?.star || '');
  const [currentPage, setCurrentPage] = useState(paramObj?.page ? Number(paramObj?.page) : 1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 25;

  const updateQueryParams = useCallback((params) => {
    const searchParams = new URLSearchParams(params).toString();
    navigate({
      pathname: location.pathname,
      search: `?${searchParams}`,
    });
  }, [navigate, location.pathname]);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        category,
        price,
        seller: currentSeller?.join(','),
        star,
        searchTerm: props.searchData,
        page: currentPage,
        page_size: itemsPerPage
      };
      const response = await bookApi.getAllBook(params);

      setBooks(response.books);
      setTotalPages(response.total_pages);

      updateQueryParams({category, price, seller: currentSeller, star, page: currentPage});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [category, price, currentSeller, star, props.searchData, currentPage, updateQueryParams]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCategory = useCallback((category) => setCategory(category), []);
  const handlePrice = useCallback((price) => setPrice(price), []);
  const handleCurrentSeller = useCallback((currentSeller) => setCurrentSeller(currentSeller), []);
  const handleStar = useCallback((star) => setStar(star), []);
  const handlePageChange = useCallback((page) => setCurrentPage(page), []);
  return (
    <div className='flex flex-1 bg-[#efefef]'>
      {loading ? (
        <div className='flex flex-1 items-center justify-center my-52'>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading..."/>
        </div>
      ) : (
        books.length === 0 ? (
          <div
            className='flex flex-1 my-5 mx-40 gap-4 max-[768px]:mx-0 max-[768px]:gap-2 max-[768px]:flex-col max-[768px]:my-0'>
            <Filter
              onSelectCategory={handleCategory}
              onSelectStar={handleStar}
              onSelectPrice={handlePrice}
              onSelectCurrentSeller={handleCurrentSeller}
              category={category}
              star={star}
              price={price}
              currentSeller={currentSeller}
            />
            <div className='flex flex-1 items-center justify-center my-52 font-bold text-lg'>
              <p>Không tìm thấy sản phẩm!</p>
            </div>
          </div>
        ) : (
          <div
            className='flex flex-1 my-5 mx-40 gap-4 max-[768px]:mx-0 max-[768px]:gap-2 max-[768px]:flex-col max-[768px]:my-0'>
            <Filter
              onSelectCategory={handleCategory}
              onSelectStar={handleStar}
              onSelectPrice={handlePrice}
              onSelectCurrentSeller={handleCurrentSeller}
              category={category}
              star={star}
              price={price}
              currentSeller={currentSeller}
            />
            <div className='max-[768px]:mx-2 max-[768px]:my-5'>
              <BookMain currentBooks={books}/>
              <Page currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Home;

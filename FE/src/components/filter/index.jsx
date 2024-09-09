import React, {useState} from 'react';

function Filter(props) {
  const {
    onSelectCategory,
    onSelectCurrentSeller,
    onSelectPrice,
    onSelectStar,
    price,
    star,
    currentSeller = [],
    category
  } = props;

  const [seeMoreText, setSeeMoreText] = useState('Xem thêm');
  const [showPrice, setShowPrice] = useState(false);

  const handleSelectCategory = (event) => {
    onSelectCategory(event);
  };

  const handleSelectCurrentSeller = (seller) => {
    const updatedCurrentSeller = currentSeller?.includes(seller)
      ? currentSeller.filter(item => item !== seller)
      : [...currentSeller, seller];
    onSelectCurrentSeller(updatedCurrentSeller);
  };
  const handleSelectPrice = (event) => {
    onSelectPrice(parseInt(event.target.value));
  };

  const togglePriceVisibility = () => {
    setShowPrice(prevState => !prevState);
    setSeeMoreText(prevState => (prevState === 'Xem thêm' ? 'Thu gọn' : 'Xem thêm'));
  };

  const handleSelectStar = (star) => {
    onSelectStar(star);
  };

  const handleResetFilters = () => {
    onSelectCategory("");
    onSelectPrice("");
    onSelectStar("");
    document.getElementById('book').value = '';
    document.getElementById('price').value = '';
    document.getElementById('star').value = '';
  };

  return (
    <>
      <div className="hidden bg-white max-[768px]:flex max-[768px]:flex-col">
        <div className='flex w-full items-center justify-between h-10 border-b border-neutral-300'>
          <div className='flex border-r border-neutral-300'>
            <select className='h-full' id="book" onChange={handleSelectCategory}>
              <option value="">Chọn loại sách</option>
              <option value="English Books">English Books</option>
              <option value="Sách tiếng Việt">Sách tiếng Việt</option>
              <option value="Văn phòng phẩm">Văn phòng phẩm</option>
              <option value="Quà lưu niệm">Quà lưu niệm</option>
            </select>
          </div>
          <div className='flex border-r border-neutral-300'>
            <select className='h-full' id="price" onChange={handleSelectPrice}>
              <option value="">Chọn giá</option>
              <option value={0}>Từ thấp đến cao</option>
              <option value={1}>Từ cao đến thấp</option>
            </select>
          </div>
          <div className='flex'>
            <select className='h-full' id="star" onChange={(e) => handleSelectStar(e.target.value)}>
              <option value="">Chọn sao</option>
              <option value="5">Từ 5 sao</option>
              <option value="4">Từ 4 sao</option>
              <option value="3">Từ 3 sao</option>
            </select>
          </div>
        </div>
        <div className='flex h-10 items-center' onClick={handleResetFilters}>
          <span className="material-symbols-outlined">filter_alt</span>
          <span className='pr-2 border-r border-neutral-300'>Lọc</span>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-lg py-3 px-1 h-fit max-[768px]:hidden">
        <div className="flex flex-col w-52">
          <div className="font-bold p-1">Danh mục sản phẩm</div>
          {['English Books', 'Sách tiếng Việt', 'Văn phòng phẩm', 'Quà lưu niệm'].map(item => (
            <div
              key={item}
              className={`p-1 ${category === item ? 'text-sky-700' : 'text-black'} hover:cursor-pointer hover:text-sky-700`}
              onClick={() => handleSelectCategory(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="border-solid border-t mt-2">
          <div className="font-bold p-1">Nhà cung cấp</div>
          {['Nhà sách Fahasa', 'Bamboo Books', 'Time Books', 'Nhà Sách Trẻ Online', 'VBooks'].map(seller => (
            <div className="flex p-1" key={seller}>
              <input
                type="checkbox"
                value={seller}
                checked={currentSeller?.includes(seller)}
                onChange={() => handleSelectCurrentSeller(seller)}
              />
              <p className="ml-2">{seller}</p>
            </div>
          ))}
        </div>
        {showPrice && (
          <div className="border-solid border-t mt-2">
            <div className="font-bold p-1">Giá sản phẩm</div>
            {[
              {value: 0, label: 'Từ thấp đến cao'},
              {value: 1, label: 'Từ cao đến thấp'}
            ].map(option => (
              <div
                key={option.value}
                className={`p-1 ${price === option.value ? 'text-sky-700' : 'text-black'} hover:cursor-pointer hover:text-sky-700`}
                onClick={() => handleSelectPrice({target: {value: option.value}})}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <div onClick={togglePriceVisibility} className="flex items-center cursor-pointer">
          <div className="font-bold p-1 text-sky-700">{seeMoreText}</div>
          <div className="flex text-sky-700 items-center justify-center">
            <span className="material-symbols-outlined">
              {showPrice ? 'expand_less' : 'expand_more'}
            </span>
          </div>
        </div>
        <div className="border-solid border-t mt-2">
          <div className="font-bold p-1">Đánh giá</div>
          {['5', '4', '3'].map(starRating => (
            <div
              key={starRating}
              className={`flex p-1 ${star === starRating ? 'text-sky-700' : 'text-black'} hover:cursor-pointer hover:text-sky-700`}
              onClick={() => handleSelectStar(starRating)}
            >
              <div className="flex items-center mr-2">
                {[...Array(parseInt(starRating))].map((_, index) => (
                  <svg key={index} width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#a)">
                      <path
                        d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"
                        fill="#FFC400"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                ))}
                {[...Array(5 - parseInt(starRating))].map((_, index) => (
                  <svg key={index} width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#a)">
                      <path
                        d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"
                        stroke="#FFC400"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                ))}
              </div>
              <span>{`${starRating} sao`}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;

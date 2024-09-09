import React from "react";

function BookInfoSmall(props) {
   
    return (
      <>
        <div className="flex gap-2 flex-col bg-white rounded-lg p-4">
            <div className="font-semibold text-base">Thông tin chi tiết</div>
            <div className="flex flex-col">
               <div>
                <span>Tác giả: </span>
                <span>{props.book.author  || 'Không xác định'}</span>
               </div>
               <div>
                <span>Dịch giả: </span>
                <span>{props.book.dich_gia || 'Không xác định'}</span>
               </div>
               <div>
                <span>Ngày xuất bản: </span>
                <span>{props.book.publication_date  || 'Không xác định'}</span>
               </div>
            </div>
        </div>
      </>
    );
}
  
export default BookInfoSmall;
  
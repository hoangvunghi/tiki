import React, { useState, useEffect } from "react";

function BookInfoSmall(props) {

    const [specAtt, setSpecAtt] = useState([]);

    useEffect(() => {
        if (props.book.specifications && props.book.specifications.length > 0) {
            setSpecAtt(props.book.specifications[0].attributes || []);
        } else {
            setSpecAtt([]);
        }
    }, [props]);

    useEffect(() => {
    }, [specAtt]);
    
    return (
      <>
        <div className="flex gap-2 flex-col bg-white rounded-lg p-4">
            <div className="font-semibold text-base">Thông tin chi tiết</div>
            <div className="flex flex-col">
                {specAtt.map((attribute) => (
                    <div key={attribute.code} className="p-2 border-b border-neutral-300">
                        <div className="flex justify-between">
                            <span className="text-neutral-500">{attribute.name}</span>
                            <span>{attribute.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
}
  
export default BookInfoSmall;
  
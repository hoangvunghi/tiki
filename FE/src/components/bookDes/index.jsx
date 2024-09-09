import React, { useState, useEffect } from "react";

function BookDes(props) {

    return (
        <>
            <div className="flex flex-col bg-white rounded-lg p-4 gap-1">
                <div className="font-semibold text-base">Mô tả sản phẩm</div>
                <div className="pt-2">
                    <div className="text-justify text-sm font-normal flex flex-col gap-1" dangerouslySetInnerHTML={{ __html: props.book.description }}>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDes;

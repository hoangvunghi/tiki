import React, { useState, useEffect } from "react";

function BookDes(props) {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (props.book.description !== null && props.book.description !== undefined) {
            setHtmlContent(props.book.description);
        } else {
            setHtmlContent('');
        }
    }, [props]);

    return (
        <>
            <div className="flex flex-col bg-white rounded-lg p-4 gap-1">
                <div className="font-semibold text-base">Mô tả sản phẩm</div>
                <div className="pt-2">
                    <div className="text-justify text-sm font-normal flex flex-col gap-1" dangerouslySetInnerHTML={{ __html: htmlContent }}>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDes;

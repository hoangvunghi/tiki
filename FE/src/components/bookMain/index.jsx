import { Link } from "react-router-dom";
import BookSmall from "../bookSmall";

function BookMain(props) {
    return (
        <>
            <div className='grid flex-1 grid-cols-5 gap-2 max-[768px]:grid-cols-2'>
                {props.currentBooks.map((book, index) => (
                    <Link className='flex' key={index} to={`/book/${book.id}`}>
                        <BookSmall jsonData={book} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default BookMain;

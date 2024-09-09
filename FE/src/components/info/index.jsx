function Info(props) {

    return (
        <>
            <div className="flex flex-col">
                <h4 className="mb-3 font-medium text-base">
                    {props.title}
                </h4>
                {props.value.map((text, index) => (
                    <a className="mb-2 text-neutral-500 text-xs hover:underline" href="">{text}</a>
                ))}
            </div>
        </>
    )
}
  
export default Info
interface RadioBtnProps {
    id: string;
    name: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export default function RadioBtn({id, name, onClick}: RadioBtnProps){
    return (
        <div className="radio-component">
            <label htmlFor={`${id}`}>
                <input type="radio" id={`${id}`} name={`${name}`} onClick={onClick}/>
                <span>{id}</span>
            </label>
        </div>
    )
}
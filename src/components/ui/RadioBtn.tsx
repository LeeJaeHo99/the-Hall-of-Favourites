interface RadioBtnProps {
    id: string;
    name: string;
    checked: boolean;
    onClick: () => void;
}

export default function RadioBtn({id, name, checked, onClick}: RadioBtnProps){
    return (
        <div className={`radio-component${checked ? " selected" : ""}`}>
            <label htmlFor={id}>
                <input
                    type="radio"
                    id={id}
                    name={name}
                    checked={checked}
                    onClick={onClick}
                />
                <span>{id}</span>
            </label>
        </div>
    )
}

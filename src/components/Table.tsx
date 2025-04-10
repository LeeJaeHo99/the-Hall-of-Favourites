export default function Table({head, body, columns}) {
    return (
        <table className="table-component">
            <thead>
                <tr>
                    {head.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body.map((data, i) => (
                    <tr key={data.id ?? i}>
                        <td>{i + 1}</td>
                        {columns.map((col) => (<td key={col}>{data[col]}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
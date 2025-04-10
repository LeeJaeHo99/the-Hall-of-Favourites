export default function Table({ head, body, columns }) {
    return (
        <table className="table-component">
            <thead>
                <tr>
                    {head.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body.map((data, i) => {
                    let rankContent;
                    if (i === 0) rankContent = "🥇";
                    else if (i === 1) rankContent = "🥈";
                    else if (i === 2) rankContent = "🥉";
                    else if (i === 3 || i === 4) {
                        rankContent = (
                            <span
                                style={{ color: "#991b1b", fontWeight: "bold" }}
                            >
                                {i + 1}
                            </span>
                        );
                    } else {
                        rankContent = i + 1;
                    }

                    return (
                        <tr key={data.id ?? i}>
                            <td>{rankContent}</td>
                            {columns.map((col) => (
                                <td key={col}>{data[col]}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

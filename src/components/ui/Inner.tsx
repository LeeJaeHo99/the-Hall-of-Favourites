export default function Inner({ children, x = 'center', y = 'row'}: { children: React.ReactNode, x?: string, y?: string }) {
    return <div className={`inner ${x} ${y}`}>{children}</div>;
}
import { PuffLoader } from "react-spinners";

export default function Spinner() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <PuffLoader color="#8e65ab" size={60} />
        </div>
    );
}

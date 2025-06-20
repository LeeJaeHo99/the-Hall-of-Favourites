import { ClipLoader } from "react-spinners";

export default function LoadSpinner() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "120px",
            }}
        >
            <ClipLoader color="#8e65ab" size={50} speedMultiplier={1}/>
        </div>
    );
}
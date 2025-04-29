import Inner from "@/components/ui/Inner";
import LoadSpinner from "./LoadSpinner";

export default function InfoLoadComponent(){
    return(
        <div className="MemberPage InfoPage sub-page">
            <Inner>
                <LoadSpinner/>
            </Inner>
        </div>
    );
}
"use client";

// import { useParams } from "next/navigation";
import Inner from "@/components/ui/Inner";
import Image from "next/image";

export default function GroupPage() {
    // const params = useParams();

    return (
        <div className="GroupPage sub-page">
            <Inner x={"left"} y={"column"}>
                <Image
                    className="group-img"
                    src={"/images/aespa/asepa.png"}
                    width={480}
                    height={440}
                    alt="그룹 이미지"
                />
            </Inner>
        </div>
    );
}
import Image from 'next/image';

export default function Winner(){
    return(
        <div className="winner">
            <Image src={'/images/aespa/karina-main.png'} width={480} height={480} alt='오늘의 우승자'/>
        </div>
    );
}
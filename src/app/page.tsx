import Inner from '@/components/Inner';
import Winner from '@/components/Winner';

export default function Home() {
    return (
        <div>
            <Inner direction={'center'}>
                <Winner group={`aespa`} singer={`karina`}/>
            </Inner>
        </div>
    );
}
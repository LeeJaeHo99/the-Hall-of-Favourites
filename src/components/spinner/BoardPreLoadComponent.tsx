import LoadSpinner from '@/components/spinner/LoadSpinner';

export default function BoardPreLoadComponent(){
    return(
        <div className="board-preview blur-box">
            <LoadSpinner/>
    </div>
    );
}
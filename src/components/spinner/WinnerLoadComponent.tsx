import LoadSpinner from './LoadSpinner';

export default function WinnerLoadComponent(){
    return(
        <div className="winner">
            <div className="winner-content">
                <LoadSpinner/>
            </div>
        </div>
    );
}
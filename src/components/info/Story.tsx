export default function Story({story}: {story?: string[]}){
    return(
        <div className="story-component blur-box">
            {
                story?.map((data, i) => (
                    <div className="story" key={`${data}-${i}`}>
                        <div className="circle"></div>
                        <span>{story[i]}</span>
                    </div>
                ))
            }
        </div>
    );
}
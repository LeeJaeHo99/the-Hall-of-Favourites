export default function Modal(){
    return(
        <div className="modal-wrap blur-box">
            <div>삭제를 원하시면<br />비밀번호 4자리를 입력해주세요.</div>
            <form className="modal-form">
                <input type="password" placeholder="4자리" maxLength={4} required/>
                <button type="submit">삭제</button>
            </form>
        </div>
    );
}
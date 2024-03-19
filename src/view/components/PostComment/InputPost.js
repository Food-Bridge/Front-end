import React, { useRef, useEffect} from 'react';
import { ContentsInput, TitleInput} from './styledComponent';


function InputPost({onChange, contents, title}) {
    const titleInput = useRef();
    const contentsInput = useRef();
    useEffect(() =>{
        titleInput.current.focus();
    },[]);
    const onKeyUpplz = (e) => {
        if(e.key === 'Enter'){
            contentsInput.current.focus();
        }
    }
    return (
        <>
            <TitleInput 
                name = "title"
                type = "text"
                value = {title}
                placeholder="제목을 입력해주세요. (15자 이내)"
                onChange = {onChange}
                ref = {titleInput}    
                onKeyUp = {onKeyUpplz}
            />
            <ContentsInput 
                name = "contents"
                value = {contents}
                cols="30" 
                rows="10"
                onChange = {onChange}
                ref = {contentsInput}
            ></ContentsInput>
        </>
    );
};

export default InputPost;
import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";
import ReviewSection from '../ReviewSection';
import Comment from '../Comment';

const Cont = styled.div`
    display:flex;
    flex-direction:column;
`

const NameCont = styled.div`
    
`

const CommentBox = styled.input`
    width:400px;
    height:50px;
`

const CommentCont = styled.div`

`

const SubmitBtn = styled.button`
    width:100px;
    height:40px;
`

const ButtonCont = styled.div`

`


const NewCommentForm = ({
    username="HooWoo",
    date="01/12/2022",
    comment="OMG, I cried while watching this movie too !",
    border="1px solid red"
    
}) => {

    //---------------------User Input COMMENT--------------------------
    const [userInput, setUserInput] = useState('');
    const [todoList, setTodoList] = useState([])

    const [userNickname, setUserNickname] = useState('');
    const [nameList, setNameList] = useState([])

    //Nickname input
    // const handleChangeName = (e) => {
    //     e.preventDefault()

    //     setUserNickname(e.target.value)
    //     console.log(userNickname)
    // }

    //Comment box input
    const handleChange = (e) => {
        e.preventDefault()

        setUserInput(e.target.value)
        console.log(userInput)
    }

    const handleChangeName = (e) => {
        e.preventDefault()
        
        setUserNickname(e.target.value)
        console.log(userNickname)
    }

  //2 functions and pass in 1 object  

    const handleSubmit = (e) => {
        e.preventDefault()

        setTodoList([
            // userInput,
            // userNickname,
            {comment:userInput, nickname:userNickname},
            ...todoList
        ])

        setNameList([
            userNickname,
            ...todoList
        ])
    }
    //-------------------------End Comment-------------------------------------

    //-------------------------User Input NAME--------------------------------

    // const [userNickname, setUserNickname] = useState('');
    // const [nameList, setNameList] = useState([])

    // const handleChangeName = (e) => {
    //     e.preventDefault()
    //     setUserNickname(e.target.value)
    //     console.log(userNickname)
    // }

    //-------------------------End Name---------------------------------------

    return <Cont>
        
        <h1>comment form</h1>
        <form>
            <NameCont>
            <label>Nickname</label>
            <input type="textarea" onChange={handleChangeName}></input>
            </NameCont>

            <CommentBox type="textarea" onChange={handleChange} 
            placeholder="Share your opinion about this movie!">
            </CommentBox>

            <ButtonCont>
                <SubmitBtn onClick={handleSubmit}>Submit</SubmitBtn> 
            </ButtonCont>
            
        </form>
        <ul>
            {
                todoList.length >=1 ? todoList.map((o, i) => {
                    return <CommentCont key={i}>
                    <Comment 
                    comment={o.comment} 
                    username={o.nickname}
                    >
                    </Comment>
                    </CommentCont>
                })
                : 'Enter a comment item'
            }

        </ul>
        
    </Cont>
}

export default NewCommentForm


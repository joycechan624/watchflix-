import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../CommentForm';
import { v4 as uuidv4 } from "uuid";
import { basicColor, inputborder, cmtColor } from '@/utils/variables';
import { useTheme, useResult } from "@/utils/provider";


const Cont = styled.div`
    display:flex;
    width: 100%;
`

const BotCont = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 2rem;
    margin-bottom: 0.75rem;
`
const CommentCont = styled.div`
    width: 100%;
`

const TopCont = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom: 0.75rem;
`


const Username = styled.h5`
    padding-right:10px;
    padding-left:10px;
    color: ${props => props.color};
`

const Date = styled.p`
    color: ${props => props.color};
`

const UserComment = styled.p`
    color: ${props => props.color};
`

const Dot = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius:50%;
    border-style: solid;
    border-width: thin;
    border-color:${props=>props.border}
`

// const PostBtn = styled.button`
//     width:100px;
//     height:30px;
// `

// const CommentBox = styled.input`
//     width:100px;
//     height:50px;
// `

const Comment = ({
    username="HooWoo",
    date="01/12/2022",
    comment="OMG, I cried while watching this movie too !",
    border="1px solid red"
    
}) => {

    const { theme, setTheme } = useTheme();
    const [items, setItems] = useState([])

    const createItems = () => {
        setItems(oldItems => [...oldItems, {
            id:1,
            title:"new item",
            itemId: uuidv4()
        }])
    }

    const [value, setValue] = useState('');

    const saveValue = e =>{
        setValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
    };


    return <Cont>
        <CommentCont>
            <TopCont>
                <Dot border={inputborder[theme]} color={basicColor[theme]}></Dot>
                <Username color={basicColor[theme]}>{username}</Username>
                <Date color={basicColor[theme]}>{date}</Date>
            </TopCont>

            <BotCont>
                <UserComment color={cmtColor[theme]}>{comment}</UserComment>
            </BotCont>
        </CommentCont>
        {/* <CommentForm></CommentForm> */}
        
    </Cont>
}

export default Comment
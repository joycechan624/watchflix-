import styled from "styled-components";
import ax from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme, useResult } from "@/utils/provider";
import Comment from "../Comment";
// import Image from "next/image";
import down_arrow from "@/public/images/down-arrow.png";
import up_arrow from "@/public/images/up-arrow.png";
import CommentForm from "../CommentForm";
import { v4 as uuidv4 } from "uuid";

import NewCommentForm from "../NewCommentForm";

import {
  bkColor,
  nameColor,
  hovBkDColor,
  divcolor,
  basicColor,
  borderColor,
} from "@/utils/variables";
import Divider from "../Divider";

const arrows = { down_arrow, up_arrow };

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  aligh-items: center;
  justify-content: center;
  margin-bottom: 7rem;
`;

const HeaderCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
  margin-bottom: 2rem;
`;

const LeftLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 15%;
  height: 20px;

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 20%;
  }

  @media only screen and (max-width: 565px) {
    width: 25%;
  }
`;

const RightLine = styled.div`
  background-color: ${props => props.bkcolor};
  border-radius: 10px;
  border: none;
  width: 60%;
  height: 20px;

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 50%;
  }

  @media only screen and (max-width: 565px) {
    width: 25%;
  }
`;

const TitleCont = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  width: 25%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    width: 30%;
  }

  @media only screen and (max-width: 565px) {
    width: 50%;
    justify-content: space-between;
  }
`

const Title = styled.h3`  
  color: ${props => props.color};

  @media only screen and (min-width: 566px) and (max-width: 700px) {
    font-size: 1.75em;   
  }

  @media only screen and (min-width: 396px)and (max-width: 565px) {
    font-size: 1.75em;
    text-align: center;
  }

  @media only screen and (max-width: 395px) {
    font-size: 1.25em;
    margin-right: 15px;
  }
`;

const Dropdown = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  width: 33px;
  height:18px;
  display: block;

  @media only screen and (max-width: 395px) {
    width: 30px;
    height: 15px;
  }
`
const UserComments = styled.div`
  margin-bottom: 2rem;
`;

const CmmtCont = styled.ul`
  width: 100%;
  padding: 0 2rem;
`;

//----------------------New Comment Form comps----------------------
const NameCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  @media only screen and (max-width:680px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const NameText = styled.label`
  color: ${(props) => props.color};
  font-size: 2em;
  margin-right: 2rem;

  @media only screen and (max-width:680px) {
    margin-right:0;
    margin-bottom: 1rem;
    font-size: 1.5em;
  }
`;

const NameInput = styled.input`
  min-width: 345px;
  height: 3rem;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;
  border-color: ${(props) => props.borderColor};
  padding: 1rem;

  @media only screen and (max-width:680px) {
    width: 100%; min-width: 0;
    height: 2rem;
  }
`;

const FormCont = styled.form`
  width: 100%;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media only screen and (max-width:680px) {
    
  }
`;
const CommentCont = styled.li`
  display: block;
  width: 100%;
  padding: 0.5rem;
`;

const CommentBox = styled.textarea`
  width: 100%;
  height: 100px;
  display: flex;
  padding: 1rem;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const RevTxt = styled.p`
  width: 100%;
  line-height: 1.5em;
  color: ${(props) => props.revTxt};
`;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

`;

const SubmitBtn = styled.button`
  min-width: 250px;
  height: 70px;
  border-radius: 20px;
  border: none;
  font-size: 1.5em;
  padding: 1rem 4rem;
  border-radius: 35px;
  border: none;
  background: ${(props) => props.bgcolor};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: ${(props) => props.hovpopbg};
    color: #ffffff;
    transform: scale(0.95);
    transition-duration: 0.3s;
  }

  @media only screen and (min-width: 421px) and (max-width:680px) {
    min-width: 150px;
    width: 50%; 
    padding: 1rem;
    height: 60px;
    font-size: 1.25rem;  
  }

  @media only screen and (max-width:420px) {
    font-size: 0.875rem; 
    min-width: 150px;
    width: 50%; 
    padding: 1rem;
    height: 60px;   
  }
`;


//--------------------------------------------------------

const ReviewSection = ({ text = "Reviews" }) => {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(true);
  const onClick = () => setOpen(!open);

  // const [selected, setSelected] = useState(arrows.down_arrow)
  // const onArrowClick = () => setSelected(!selected)

  // const [items, setItems] = useState([])

  // const createItems = () => {
  //     setItems(oldItems => [...oldItems, {
  //         id:1,
  //         title:"new item",
  //         itemId: uuidv4()
  //     }])
  // }

  // const [value, setValue] = useState('');

  // const saveValue = e =>{
  //     setValue(e.target.value)
  // }

  // const onSubmit = (e) => {
  //     e.preventDefault();

  // };

  //--------------------------New Comment Form Functions-----------------

  //---------------------User Input COMMENT--------------------------
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const [userNickname, setUserNickname] = useState("");

  //Nickname input
  // const handleChangeName = (e) => {
  //     e.preventDefault()

  //     setUserNickname(e.target.value)
  //     console.log(userNickname)
  // }

  //Comment box input

  //-------------Function for comment---------------------
  const handleChange = (e) => {
    e.preventDefault();

    setUserInput(e.target.value);
    console.log(userInput);

    //  setUserNickname(e.target.value)
    //  console.log(userNickname)
  };
  //2 functions and pass in 1 object

  //----------Function for name--------------------
  const handleChangeName = (e) => {
    e.preventDefault();

    setUserNickname(e.target.value);
    console.log(userNickname);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodoList([
      // userInput,
      // userNickname,
      { comment: userInput, nickname: userNickname, date: todayDate },
      ...todoList,
    ]);

    // setNameList([
    //     userNickname,
    //     ...todoList
    // ])
  };
  //-------------------------End Comment-------------------------------------

  //-------------------------Test Date-----------------------------------
  //  const [dateTime, setDateTime] = useState(new Date());

  //  useEffect(() => {
  //      const id = setInterval(() => setDateTime(new Date()), 1000);
  //      return () => {
  //          clearInterval(id);
  //      }
  //  }, []);

  const [todayDate, setTodayDate] = useState();
  const today = new Date().toDateString();

  //----------------------------------------------------------------------

  return (
    <Cont>
      {/* <h4>{`${dateTime.toLocaleDateString()}`}</h4> */}
      <HeaderCont>
        <LeftLine bkcolor={divcolor[theme]}></LeftLine>
        <TitleCont>
          <Title color={basicColor[theme]}>{text}</Title>
          <Dropdown>
          {open ? (
            <Image
              src= "../../images/down-arrow.png"              
              onClick={onClick}
            ></Image>
          ) : (
            <Image
              src ="../../images/up-arrow.png" 
              onClick={onClick}
            ></Image>
          )}
        </Dropdown>
        </TitleCont>
        {/* <Dropdown onClick={onClick}>&#x25BC;</Dropdown> */}
        <RightLine bkcolor={divcolor[theme]}></RightLine>
      </HeaderCont>
{/* ============================== Review section ============================== */}
      <UserComments>
        {open ? (
          <CmmtCont>
            {todoList.length >= 1 ? (
              todoList.map((o, i) => {
                return (
                  <CommentCont key={i}>
                    <Comment
                      comment={o.comment}
                      username={o.nickname}
                      date={o.date}
                    ></Comment>
                  </CommentCont>
                );
              })
            ) : (
              <RevTxt revTxt={basicColor[theme]}>Enter a comment below</RevTxt>
            )}
          </CmmtCont>
        ) : null}
      </UserComments>

{/* ============================== Add Review section ============================== */}
      <Divider text="Add Review"></Divider>

      <FormCont>
        <NameCont>
          <NameText color={nameColor[theme]}>Nickname</NameText>
          <NameInput
            borderColor={borderColor[theme]}
            type="textarea"
            onChange={handleChangeName}
          ></NameInput>
        </NameCont>

        <CommentBox
          type="textarea"
          rows="10"
          onChange={handleChange}
          placeholder="Share your opinion about this movie!"
        ></CommentBox>

        <ButtonCont>
          <SubmitBtn
            bgcolor={bkColor[theme]}
            hovpopbg={hovBkDColor[theme]}
            onClick={handleSubmit}
          >
            Post
          </SubmitBtn>
        </ButtonCont>
      </FormCont>
    </Cont>
  );
};

export default ReviewSection;

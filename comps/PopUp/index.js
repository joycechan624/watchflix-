import ax from "axios";
import * as React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useTheme, useResult } from "@/utils/provider";

import {
  bkColor,
  themes,
  bgpopup,
  basicColor,
  hovBkColor, hovBkDColor,
} from "@/utils/variables";
import { v4 as uuidv4 } from "uuid";

const Cont = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;  
`;

const Box = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  // margin-top: calc(100vh - 85vh - 20px);
  background: ${(props) => props.bgcolor};
  border-radius: 30px;
  padding: 3rem 3rem 2rem;
  overflow: auto;
`;
const Title = styled.p`
  font-size: 24px;
  color: ${(props) => props.color};
  margin-bottom: 1rem;
`;
const Link = styled.a`
  color: #999999;
`;
const BtnCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

`;
const Btn = styled.button`
  min-width: 110px;
  min-height: 40px;
  padding: 1rem 4rem;
  margin: 20px;
  border-radius: 50px;
  border: none;
  font-size: 1.125em;
  background: ${(props) => props.bgcolor};
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  cursor: pointer;
  
  :hover {
    background: ${(props) => props.hovpopbg};
    color: #ffffff;
    transform: scale(0.95);
    transition-duration: 0.3s;
  }
`;

const UrlArea = styled.textarea`
  width: 100%;
  height: 30px;
  margin-bottom: 1rem;
`;

const PopUp = ({
  src = "url src here",
  handleClose = () => {},
  myurl = "myurl",
}) => {
  const { theme, setTheme } = useTheme();

  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
  }

  return (
    <Cont>
      <Box bgcolor={bgpopup[theme]}>
        <Title color={basicColor[theme]}>Share with your friend</Title>
        {/* <Link src={src}>{src}</Link> */}
        <UrlArea ref={textAreaRef} value={myurl} />
        <BtnCont>
          <Btn
            onClick={handleClose}
            bgcolor={bkColor[theme]}
            hovpopbg={hovBkDColor[theme]}
          >
            Cancel
          </Btn>
          <Btn
            bgcolor={bkColor[theme]}
            hovpopbg={hovBkDColor[theme]}
            onClick={copyToClipboard}
          >
            Copy link
          </Btn>
        </BtnCont>
      </Box>
    </Cont>
  );
};

export default PopUp;

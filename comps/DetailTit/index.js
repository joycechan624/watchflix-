import Head from 'next/head';
import ax from 'axios';
import { useState, useEffect } from "react";
import styled from 'styled-components';

const Cont = styled.div`
  width: ${props => props.conWidth};
  min-height: ${props => props.conHeight};
  display: flex;
  flex-direction: row;
  justify-contents: flex-start;
  align-items: ${props => props.conAlign};
  box-sizing: border-box;
  margin-bottom: ${props => props.marginB}
`

const Title = styled.h4`
  padding-left: 1em;
  min-width: ${props => props.minWidth};
  // background: url(${props => props.barUrl});
  // background: url(${props => props.barUrl === 'light' ? `url('./images/icon_verBar.svg)` : `url('./images/icon_verBar.svg)`});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: left center; 
  
  @media only screen and (min-width: 1001px) and (max-width: 1100px) {
    padding-left: 0;
  } 
`

const Movie = styled.h3``

const Text  = styled.p`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.clamp};
  -webkit-box-orient: vertical;
  margin-bottom: ${props => props.marginB}rem;
`

const DetailTit = ({
  conWidth = "100%",
  conHeight = "4.5em",
  conAlign = "center",
  marginB = "2em",
  minWidth = "8.75em",
  title = "Title",
  movieTitle = "Alive",
  // barUrl = "bar ? 'url(./images/icon_verBarLight.svg)' : 'url(./images/icon_verBarDark.svg)'",
  text = "",
  clamp = '5',
  txtMarginB = '3'

}) => {

  const [bar, setBar] = useState("light");

  return (
    <Cont
      width = {conWidth}
      conHeight = {conHeight}
      conAlign = {conAlign}
      marginB= {marginB}
    >
      {/* <Rect /> */}
      <Title
        minWidth = {minWidth}
        style = {{
          background: bar ? "url(./images/icon_verBarLight.svg)" : "url(./images/icon_verBarDark.svg)",
          backgroundRepeat: bar ? "no-repeat" : "no-repeat",
        }}
        // barUrl = {barUrl}
      >
        {title}
      </Title>
      <Movie>
        {movieTitle}
      </Movie>
      <Text clamp ={clamp} marginB = {txtMarginB}>
        {text}
      </Text>
    </Cont>
  )
}

export default DetailTit;

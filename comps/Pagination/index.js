import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Cont = styled.div`
  display:flex;
  width: 100%;
  dislplay: flex; 
  justify-content: center;
  align-items: center;
`

const ContCont = styled.div`
  display:flex;
  width: 60%;
  justify-content:space-between;
`

const FirstBttn = styled.a`
  font-size: 1.5em;
  color:${props=>props.firstColor};
  padding:10px;
`

const PrevBttn = styled.a`
  font-size: 1.5em;
  color:${props=>props.prevColor};
  padding:10px;
`

const NextBttn = styled.a`
  font-size: 1.5em;
  color:${props=>props.nextColor};
  padding:10px;
`

const LastBttn = styled.a`
  font-size: 1.5em;
  color:${props=>props.lastColor};
  padding:10px;
`

const BackCont = styled.div`
    
`
const NextCont = styled.div`
    
`

const PageNum = styled.button`
    border:none;
    background-color:transparent;
    cursor:pointer;
`

const Pagination = ({
    nextColor="black",
    prevColor="black",
    lastColor="pink",
    firstColor="yellow",
    
}) => {

    const numMovies = 45000;
    const [cur_page, setCurPage] = useState(0);
    const [bs, setBS] = useState([]);

    const PageClick = async(p)=>{
        const res = await ax.get("/api/movie", {
          params:{
            page:p,
            num:15
          }
        });
        console.log(res.data);
        setBS(res.data);
        setCurPage(p);
      }

    var pageArr = [];
    var ind = 1;
    for(var i = 0; i<numMovies; i+= 15){
      pageArr.push(
        <PageNum 
        onClick={PageClick.bind(this, ind)}
        style={{color:cur_page===ind?"red":"black"}}
        >{ind}</PageNum>
      );
      ind++;
    }
    
    pageArr = pageArr.slice(cur_page-5 < 0 ? 0 : cur_page-2, cur_page+3);

    return <Cont>
      <ContCont>
        <BackCont>
          <FirstBttn href="#" nextColor={firstColor}>&laquo;</FirstBttn>
          <PrevBttn href="#" prevColor={prevColor}>&lt;</PrevBttn>
        </BackCont>

        {/* <PageNum>1</PageNum> */}
        <div>
        {pageArr}
        </div>

        <NextCont>
          <NextBttn href="#" nextColor={nextColor}>&gt;</NextBttn>
          <LastBttn href="#" nextColor={lastColor}>&raquo;</LastBttn>
        </NextCont>
      </ContCont>
    </Cont>
}

export default Pagination
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useResult } from "@/utils/provider";
import ax from "axios";
import ClickButton from "@/comps/ClickButton";
import Detail from "@/comps/Detail";

import Divider from "@/comps/Divider";

import ReviewSection from "@/comps/ReviewSection";
import styled from "styled-components";

const Cont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;
const PageCont = styled.div`
  width: 100%;
  display: flex;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButCont = styled.div`
  width: 100%;
  display: flex;
`;
export default function Result() {
  const r = useRouter();
  const { uuid } = r.query;
  const { result, setResult } = useResult();

  console.log(Object.values(result));

  /*
const SaveResult = async ()=>{
  const res = await ax.post("/api/save", {
    uuid,
    result
  })
}
*/

  useEffect(() => {
    if (uuid) {
      const GetUuid = async () => {
        const res = await ax.get("/api/save", {
          params: {
            uuid,
          },
        });
        if (res.data !== false) {
          setResult(res.data);
          console.log(res.data);
        }
      };
      GetUuid();
    }
  }, [uuid]);
  return (
    <Cont>
      <Divider text="Result"></Divider>
      <PageCont>
        {/* <button onClick={SaveResult}>Save</button>*/}

        {Object.values(result).map((item) => (
          <div>
            <Detail
              alt={item.Title}
              title={item.Title}
              director={item.director}
              genre={item.Genre}
              cast={item.cast}
              description={item.description}
              src={item.Poster}
            />
          </div>
        ))}
      </PageCont>
      <ButCont>
        <ClickButton src={uuid} />
      </ButCont>
      <ReviewSection text="Reviews" />
      <Divider text="Add Review"></Divider>
    </Cont>
  );
}

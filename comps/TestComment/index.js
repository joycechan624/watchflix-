import styled from 'styled-components';
import ax from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Comment from '../Comment';

const Cont = styled.div`
    display:flex;
    flex-direction:column;
`

const FormCont = styled.form`

`

const Label = styled.label`

`

const Nickname = styled.input.attrs({
    type:'text'
})`
    
`

const SubmitBtn = styled.input.attrs({
    type:'submit'
})`

`

const Textarea = styled.input.attrs({
    type:'textarea'
})`

`

const TestComment = ({
    text="Review"
}) => {


    return <Cont>
        <FormCont>
            <Label>Nickname:
                <Nickname type="text" name="nickname"/>
            </Label>
            <Textarea></Textarea>
            <SubmitBtn type="submit" value="Submit"/>
        </FormCont>
    </Cont>
}

export default TestComment


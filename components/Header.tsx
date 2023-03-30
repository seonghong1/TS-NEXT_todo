import palette from "@/styles/palette";
import styled from "styled-components";
import React from "react";

const Container = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    padding: 0 12px;
    border-bottom: 1px solid ${palette.gray};
    box-sizing: border-box;
    h1{
        font-size: 21px;
    }
`

const Header: React.FC = () => {
    return (
        <Container>
            <h1>Next.JS & TypeScript</h1>
        </Container>
    )
}

export default Header
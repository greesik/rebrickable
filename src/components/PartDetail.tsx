import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

interface Props {
    imageUrl: string;
    partNum: string;
    name: string;
}

export const PartDetail = ({ imageUrl, name, partNum }: Props) => {
    return (
        <Row>
            <Image src={imageUrl} />
            <Column>
                <Name>{name}</Name>
                <PartNum>{partNum}</PartNum>
            </Column>
        </Row>
    );
};

const Row = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 8px;
`;

const Column = styled(Row)`
    flex-direction: column;
`;

const Image = styled("img")`
    width: 50px;
    height: 50px;
`;

const Name = styled("p")`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 0;
`;

const PartNum = styled("a")`
    color: orange;
    text-decoration: none;
    width: 50%;
    text-align: center;
    padding: 4px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: lightgrey;
    }
`;

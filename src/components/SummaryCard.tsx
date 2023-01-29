import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React from "react";
import { PartDetail } from "./PartDetail";
import { Part } from "./Step3";

interface Props {
    imageUrl?: string;
    name?: string;
    parts?: Part[];
}

export const SummaryCard = ({ imageUrl, name, parts }: Props) => {
    return (
        <CardWrapper>
            <Image src={imageUrl} />
            <Name>{name}</Name>
            {parts && (
                <Caption>
                    There are {parts.length} parts in this minifig:
                </Caption>
            )}
            {parts &&
                parts.map((part) => {
                    return (
                        <PartDetail
                            key={part.id}
                            imageUrl={part.part.part_img_url}
                            partNum={part.part.part_num}
                            name={part.part.name}
                        />
                    );
                })}
        </CardWrapper>
    );
};

const CardWrapper = styled(Paper)`
    width: 20rem;
    border-radius: 1rem;
    border: 2px solid black;
    margin: 2rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Image = styled("img")`
    width: 90%;
    height: 50%;
`;

const Name = styled("p")`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
`;

const Caption = styled(Name)`
    width: 100%;
    text-align: left;
`;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY, Minifigure } from "./Step1";
import { MinifigureCard } from "./MinifigureCard";
import { SubmitForm } from "./SubmitForm";
import { SummaryCard } from "./SummaryCard";

interface State {
    minifigures: Minifigure[];
    selected: string;
}

export interface Part {
    id: number;
    part: {
        part_num: string;
        name: string;
        part_img_url: string;
    };
}

interface PartsResponse {
    results: Part[];
}

export const Step3 = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const location = useLocation();
    const { selected, minifigures }: State = location.state;
    const selectedMinifigure = minifigures.find(
        (minifigure) => minifigure.set_num === selected
    );
    const API_PARTS_URL = `https://rebrickable.com/api/v3/lego/minifigs/${selectedMinifigure?.set_num}/parts/?key=${API_KEY}`;

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await axios.get<PartsResponse>(API_PARTS_URL);
                setParts(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchParts();
    }, []);

    return (
        <>
            <SubmitForm />
            <SummaryCard
                parts={parts}
                imageUrl={selectedMinifigure?.set_img_url}
                name={selectedMinifigure?.name}
            />
        </>
    );
};

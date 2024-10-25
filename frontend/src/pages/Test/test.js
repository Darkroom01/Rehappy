import React from "react";
import BodyDiagram from "./BodyDaigram";
import "./style.css";
import styled from "styled-components";

const Wrapper=styled.div`
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
`
export default function Test() {
    const [selected, setSelected] = React.useState([]);

    return (
        <Wrapper>
            <BodyDiagram value={selected} onChange={setSelected} />
            <ul>
                <li>Click to zoom in</li>
                <li>When zoomed in</li>
                <ul>
                    <li>Click a body part to select it</li>
                    <li>Drag around holding the left click button</li>
                    <li>
                        A 'Reset Zoom' button appears on the top right corner of the diagram
                    </li>
                </ul>
                <li>Change BodyDiagram.js line 5 to specify another zoom multiplier</li>
            </ul>
        </Wrapper>
    );
}

import React from "react";
import BodySvg from "./BodySvg";
import SvgWrapper from "./SvgWrapper";
import styled from "styled-components";

const ZOOM = 3;

const BodyDiagram2=styled.div`
    display: flex;
    flex-direction: row;
`
const Controls=styled.div`
    width: 50px;
`

// this will be the equivalent to our standard field
export default function BodyDiagram({ value, onChange }) {
    const [zoom, setZoom] = React.useState(1);

    const onPartClick = (name) => {
        const index = value.indexOf(name);
        if (index === -1) {
            onChange([...value, name]);
        } else {
            const newSelection = [...value];
            newSelection.splice(index, 1);
            onChange(newSelection);
        }
    };

    return (
        <BodyDiagram2>
            <SvgWrapper zoom={zoom} onZoom={() => setZoom(ZOOM)}>
                <BodySvg
                    selected={value}
                    onPartClick={onPartClick}
                    style={{ width: zoom * 100 + "%" }}
                />
            </SvgWrapper>
            <Controls>
                {zoom > 1 && <button onClick={() => setZoom(1)}>Reset Zoom</button>}
            </Controls>
        </BodyDiagram2>
    );
}

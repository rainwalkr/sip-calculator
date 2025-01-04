import { SliderProps } from "rc-slider";
import { cloneElement } from "react";

// A slider handle which is confined within the track , no overflows
export const TrackTrappedHandle: SliderProps['handleRender'] = (node) => {
    return cloneElement(node,{style:{
        ...node.props.style,
        transform:`translateX(-${ node.props.style?.left })`
    }});
};
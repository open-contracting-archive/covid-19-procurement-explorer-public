import React, { useRef, useEffect } from "react";

const Map = () => {
    const svgRef = useRef();
    console.log(svgRef)
    
    useEffect(() => {
        console.log(svgRef);
    }, [])
	return (
		<div>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default Map;

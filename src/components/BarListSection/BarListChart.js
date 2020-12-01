import React from 'react'

function BarListChart({ data }) {
    return (
        <div className="custom-horizontal-bar">
            <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                {data.map((bar_value, index) => {
                    return (
                        <li key={index}>
                            <div className="flex items-center">
                                <div className="custom-horizontal-bar-text">
                                    <h3>{bar_value.name}</h3>
                                </div>
                                <div className="custom-horizontal-bar-progress">
                                    <span
                                        style={{
                                            width: `${bar_value.value}`
                                        }}></span>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BarListChart

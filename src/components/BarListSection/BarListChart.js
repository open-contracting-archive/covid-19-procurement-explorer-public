import React from 'react'
import formatNumber from '../FormatNumber/FormatNumber'

function BarListChart({ data, byValue }) {
    return (
        <div className="custom-horizontal-bar">
            <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                {data &&
                    data.map((bar_value, index) => {
                        return (
                            <li key={index}>
                                <div className="flex items-center">
                                    <div className="custom-horizontal-bar-text">
                                        <h3 title={bar_value.name}>
                                            {bar_value.name}
                                        </h3>
                                    </div>
                                    <div className="custom-horizontal-bar-progress">
                                        <span
                                            style={{
                                                width: `${bar_value.value}%`
                                            }}></span>
                                    </div>
                                    <div className="ml-2 custom-horizontal-bar-amount">
                                        <p>
                                            {byValue && bar_value.amount
                                                ? '$'
                                                : ''}
                                            {formatNumber(bar_value.amount) ||
                                                '-'}
                                        </p>
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

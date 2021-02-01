import React from 'react'
import { formatNumber } from '../../helpers/number'

function SimpleBarListChart({ data, byValue, currency }) {
    return (
        <div className="custom-horizontal-bar simple-bar">
            <ul className="custom-scrollbar">
                {data.map((bar_value, index) => {
                    return (
                        <li key={index}>
                            <div className="flex items-center">
                                <div className="custom-horizontal-bar-text">
                                    <h3 className="capitalize">
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
                                        {byValue && bar_value.amount ? '$' : ''}
                                        {formatNumber(bar_value.amount) || '-'}

                                        {currency && (
                                            <span className="uppercase text-xs ml-1">
                                                {currency}
                                            </span>
                                        )}
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

export default SimpleBarListChart

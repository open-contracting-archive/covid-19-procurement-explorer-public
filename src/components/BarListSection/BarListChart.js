import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatNumber } from '../../helpers/number'

function BarListChart({ data, byValue, text, currency, viewType }) {
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )
    return (
        <div className="custom-horizontal-bar">
            <ul className="custom-scrollbar h-80 overflow-y-auto pr-4">
                {data.length < 1 || data === undefined ? (
                    <li>No Data Available</li>
                ) : (
                    data &&
                    data.map((bar_value, index) => {
                        return (
                            <li key={index}>
                                <div className="flex items-center">
                                    <div className="custom-horizontal-bar-text">
                                        <Link
                                            className="hover:text-primary-blue"
                                            to={`/${text}/${bar_value.id}`}>
                                            <h3 title={bar_value.name}>
                                                {bar_value.name}
                                            </h3>
                                        </Link>
                                    </div>
                                    <div className="custom-horizontal-bar-progress">
                                        <span
                                            style={{
                                                width: `${bar_value.value}%`
                                            }}></span>
                                    </div>
                                    <div className="ml-2 custom-horizontal-bar-amount">
                                        <p>
                                            {viewType === 'value' ? '$' : ''}
                                            {formatNumber(bar_value.amount) ||
                                                '-'}
                                            {viewType === 'value' && (
                                                <span className="uppercase ml-1">
                                                    {currency === 'local'
                                                        ? countryCurrency
                                                        : 'usd'}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}

export default BarListChart

import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Default from '../../../../constants/Default'
import { formatNumber } from '../../../../helpers/number'

function SimpleBarListChart({ data, currency, viewType }) {
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )

    return (
        <div className="custom-horizontal-bar simple-bar">
            <ul className="custom-scrollbar">
                {data.map((bar_value, index) => {
                    return (
                        <li key={index}>
                            <div className="flex items-center">
                                <div className="custom-horizontal-bar-text">
                                    <h3 className="capitalize">
                                        {bar_value.name.replace(/_/g, ' ')}
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
                                        {bar_value.amount ? (
                                            <Fragment>
                                                {viewType === 'value' &&
                                                currency !==
                                                    Default.CURRENCY_LOCAL
                                                    ? '$'
                                                    : ''}
                                                {formatNumber(bar_value.amount)}
                                                {viewType === 'value' && (
                                                    <span className="uppercase text-xs ml-1">
                                                        {currency ===
                                                        Default.CURRENCY_LOCAL
                                                            ? countryCurrency
                                                            : Default.CURRENCY_USD}
                                                    </span>
                                                )}
                                            </Fragment>
                                        ) : (
                                            '-'
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

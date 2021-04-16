import React from 'react'
import AreaChart from './AreaChart'
import { formatNumber } from '../../../../helpers/number'
import { useSelector } from 'react-redux'
import Default from '../../../../constants/Default'

const AreaChartBlock = (props) => {
    const { totalAmount, chartData, percentage, currency, colorValue } = props
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )

    return (
        <div className="text-primary-dark w-full">
            <AreaChart data={chartData} apiData colorValue={colorValue} />
            <p className="mt-2 flex leading-tight items-baseline">
                <strong
                    className="text-xl inline-block mr-1"
                    title={totalAmount}>
                    {currency && (
                        <span>
                            {currency !== Default.CURRENCY_LOCAL ? '$' : ''}
                        </span>
                    )}
                    {formatNumber(totalAmount)}
                </strong>

                {currency && (
                    <span className="uppercase">
                        {currency === Default.CURRENCY_LOCAL
                            ? countryCurrency
                            : Default.CURRENCY_USD}
                    </span>
                )}
            </p>
            <p
                className={`text-sm  font-bold ${
                    percentage < 0 ? 'text-red-30' : 'text-green-30'
                }`}>
                {percentage}%
            </p>
        </div>
    )
}

export default AreaChartBlock

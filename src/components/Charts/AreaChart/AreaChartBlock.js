import React from 'react'
import AreaChart from './AreaChart'
import { formatNumber } from '../../../helpers/number'
import { useSelector } from 'react-redux'

const AreaChartBlock = (props) => {
    const { totalAmount, chartData, percentage, currency, colorValue } = props
    const countryCurrency = useSelector(
        (state) => state.general.countryCurrency
    )

    return (
        <div className="text-primary-dark pb-4 w-full">
            <AreaChart data={chartData} apiData colorValue={colorValue} />
            <p className="mt-2">
                <strong
                    className="text-xl inline-block mr-3"
                    title={totalAmount}>
                    {formatNumber(totalAmount)}
                </strong>

                {currency && (
                    <span className="uppercase">
                        {currency === 'local' ? countryCurrency : 'usd'}
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

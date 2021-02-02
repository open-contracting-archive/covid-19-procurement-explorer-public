import React from 'react'
import AreaChart from './AreaChart'
import { formatNumber } from '../../../helpers/number'

const AreaChartBlock = (props) => {
    const { totalAmount, chartData, percentage, currency, colorValue } = props

    return (
        <div className="text-primary-dark pb-4 w-full">
            <AreaChart
                data={chartData}
                apiData
                colorValue={colorValue}
            />
            <p className="mt-2">
                <strong
                    className="text-xl inline-block mr-3"
                    title={totalAmount}>
                    {formatNumber(totalAmount)}
                </strong>

                {currency && <span className="uppercase">{currency}</span>}
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

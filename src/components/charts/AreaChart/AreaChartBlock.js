import React from 'react'
import AreaChart from './AreaChart'
import formatNumber from '../../formatNumber/FormatNumber'

const AreaChartBlock = ({ totalAmount, chartData, percentage, currency }) => {
    return (
        <div className=" text-primary-dark pb-4 w-2/5">
            <AreaChart data={chartData} apiData />
            <p className="mt-2">
                <strong className="text-xl inline-block mr-3">
                    {formatNumber(totalAmount)}
                </strong>
                {currency && <span className="uppercase">{currency}</span>}
            </p>
            <p
                className={`text-sm  font-bold ${
                    percentage < 100 ? 'text-red-30' : 'text-green-30'
                }`}>
                {percentage}%
            </p>
        </div>
    )
}

export default AreaChartBlock

import React from 'react'
import AreaChart from './AreaChart'
import formatNumber from '../../FormatNumber/FormatNumber'

const AreaChartBlock = ({ totalAmount, chartData, percentage, currency }) => {
    return (
        <div className=" text-primary-dark pb-4 w-2/5">
            <AreaChart
                data={chartData}
                apiData
                colorValue={percentage < 0 ? '#FE5151' : '#3EEDA4'}
            />
            <p className="mt-2">
                <strong className="text-xl inline-block mr-3">
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

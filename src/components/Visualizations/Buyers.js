import React from 'react'
import AreaChart from '../Charts/AreaChart/AreaChart'

// Add Area Chart data
const area_chart_data = [
    {
        month: 'FEB',
        value: 22324,
        expenses: 21.1
    },
    {
        month: 'MAR',
        value: 45990,
        expenses: 30.5
    },
    {
        month: 'APR',
        value: 10003,
        expenses: 34.9
    },
    {
        month: 'MAY',
        value: 77070,
        expenses: 23.1
    },
    {
        month: 'JUN',
        value: 23489,
        expenses: 28.2
    },
    {
        month: 'JUL',
        value: 58902,
        expenses: 31.9
    },
    {
        month: 'AUG',
        value: 29190,
        expenses: 31.9
    },
    {
        month: 'SEP',
        value: 45908,
        expenses: 31.9
    }
]

function Buyers() {
    return (
        <div className="bg-white rounded p-4 h-full">
            <h3 className="uppercase font-bold  text-primary-dark">Buyers</h3>
            <div className="flex items-end">
                <div className=" text-primary-dark w-2/5">
                    <AreaChart data={area_chart_data} colorValue="#FE5151" />
                    <p>
                        <strong className="text-xl inline-block mr-3">
                            21,800
                        </strong>
                    </p>
                    <p className="text-sm text-red-30 font-bold">-11%</p>
                </div>
                <div className="flex-1" />
            </div>
        </div>
    )
}

export default Buyers

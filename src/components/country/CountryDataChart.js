import React, {useEffect, useState} from 'react'
import BarChart from '../../components/charts/BarChart/BarChart'
import PieChart from '../../components/charts/PieChart/PieChart'
import AreaChart from '../../components/charts/AreaChart/AreaChart'
import CombinedChart from '../../components/charts/CombinedChart/CombinedChart'
import Loader from '../../components/loader/Loader'

// Add Bar Chart data
const bar_chart_data = [
    {
        method: 'Open',
        value: 2025
    },
    {
        method: 'Limited',
        value: 1882
    },
    {
        method: 'Selective',
        value: 1809
    },
    {
        method: 'Direct',
        value: 1322
    }
]

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

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

// Add Combined Chart data
const combined_chart_data = [
    {
        date: '2013-01-16',
        market1: 71,
        market2: 75,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-17',
        market1: 74,
        market2: 78,
        sales1: 4,
        sales2: 6
    },
    {
        date: '2013-01-18',
        market1: 78,
        market2: 88,
        sales1: 5,
        sales2: 2
    },
    {
        date: '2013-01-19',
        market1: 85,
        market2: 89,
        sales1: 8,
        sales2: 9
    },
    {
        date: '2013-01-20',
        market1: 82,
        market2: 89,
        sales1: 9,
        sales2: 6
    },
    {
        date: '2013-01-21',
        market1: 83,
        market2: 85,
        sales1: 3,
        sales2: 5
    },
    {
        date: '2013-01-22',
        market1: 88,
        market2: 92,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-23',
        market1: 85,
        market2: 90,
        sales1: 7,
        sales2: 6
    },
    {
        date: '2013-01-24',
        market1: 85,
        market2: 91,
        sales1: 9,
        sales2: 5
    },
    {
        date: '2013-01-25',
        market1: 80,
        market2: 84,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-26',
        market1: 87,
        market2: 92,
        sales1: 4,
        sales2: 8
    },
    {
        date: '2013-01-27',
        market1: 84,
        market2: 87,
        sales1: 3,
        sales2: 4
    },
    {
        date: '2013-01-28',
        market1: 83,
        market2: 88,
        sales1: 5,
        sales2: 7
    },
    {
        date: '2013-01-29',
        market1: 84,
        market2: 87,
        sales1: 5,
        sales2: 8
    },
    {
        date: '2013-01-30',
        market1: 81,
        market2: 85,
        sales1: 4,
        sales2: 7
    }
]

const axisRotation = 60
const barColorValue = '#ABBABF'
const colors = ['#ABBABF', '#DCEAEE']

function CountryDataCharts() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <section style={{ background: '#E5E5E5' }}>
            <div className="container mx-auto">
                {loading ? (
                    <div className="flex flex-wrap -mx-3 -mb-6">
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold text-blue-50 mb-6">
                                    Total Spending
                                </h3>
                                <div className="flex items-end">
                                    <div className="text-blue-50 pb-10">
                                        <span>
                                            <strong className="text-4xl inline-block mr-3">
                                                87M
                                            </strong>
                                            USD
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <BarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                            axisRotation={axisRotation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold text-blue-50 mb-6">
                                    Total contracts
                                </h3>
                                <div className="flex items-end">
                                    <div className="text-blue-50 pb-10">
                                        <span>
                                            <strong className="text-4xl inline-block mr-3">
                                                218
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <BarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                            axisRotation={axisRotation}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold text-blue-50 mb-6">
                                    Cancelled awards
                                </h3>
                                <div className="flex items-end">
                                    <div className="text-blue-50 pb-10">
                                        <span>
                                            <strong className="text-4xl inline-block mr-3">
                                                51
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <PieChart
                                            data={pie_chart_data}
                                            colors={colors}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold text-blue-50 mb-6">
                                    Procurement trend
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <AreaChart data={area_chart_data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold text-blue-50 mb-6">
                                    Combined Chart with multiple value axes
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <CombinedChart
                                            data={combined_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    )
}

export default CountryDataCharts

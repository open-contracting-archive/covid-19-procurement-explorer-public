import React from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useTrans from '../../hooks/useTrans'
import { CountryCombinedChart } from './Charts'
import { ChartFooter } from '../Utilities'

const CountryProductChart = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { productName } = props
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()

    let data = [
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

    return (
        <div className="flex flex-wrap -mb-4">
            <div className="w-full px-4 mb-4 border border-blue-0 rounded pb-4">
                <FullScreen handle={fullScreenHandler}>
                    <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                        {trans(productName)}{' '}
                        {trans('spending comparison with the world')}
                    </h2>

                    <CountryCombinedChart data={data} />
                </FullScreen>

                <ChartFooter fullScreenHandler={fullScreenHandler} />
            </div>
        </div>
    )
}

export default CountryProductChart

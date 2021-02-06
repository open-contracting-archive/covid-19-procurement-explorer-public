import React, { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import CountryCombinedChart from '../Charts/CountryCombinedChart/CountryCombinedChart'

const CountryProductChart = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { productName, country } = props
    const {trans} = useTrans()
    const handle = useFullScreenHandle()

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
        <div className="border border-blue-0 rounded bg-white pb-4">
            <FullScreen handle={handle}>
                <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                    {trans(productName)}{' '}
                    {trans('spending comparison with the world')}
                </h2>

                <CountryCombinedChart data={data} />
            </FullScreen>

            <div
                className="flex items-center justify-between pt-4 border-t
                                                         border-blue-0 text-sm text-primary-blue px-6">
                <div className="flex items-center">
                    <div className="flex items-center mr-6">
                        <DownloadIcon className="mr-2 inline-block" />
                        <span>{trans('Download')}</span>
                    </div>
                    <div className="flex">
                        <span className="flex items-center">
                            <ShareIcon className="mr-2 inline-block" />{' '}
                            <span className="cursor-pointer">
                                {trans('Share')}
                            </span>
                        </span>
                    </div>
                </div>
                <div>
                    <span className="flex items-center">
                        <button onClick={handle.enter}>
                            <span className="cursor-pointer">
                                {trans('View full screen')}
                            </span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CountryProductChart

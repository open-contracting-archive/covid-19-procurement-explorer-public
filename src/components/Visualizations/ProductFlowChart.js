import React, { useEffect, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import GlobalSuppliers from '../Visualizations/GlobalSuppliers'

const CountryProductFlowChart = (props) => {
    const handle = useFullScreenHandle()

    return (
        <div className="border border-blue-0 rounded bg-white pb-4">
            <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                Ventilator spending comparison with the world
            </h2>

            <GlobalSuppliers
                label="Product Flow"
                params={{ product: productID}}
            />

            <div
                className="flex items-center justify-between pt-4 border-t
                                                         border-blue-0 text-sm text-primary-blue px-6">
                <div className="flex items-center">
                    <div className="flex items-center mr-6">
                        <DownloadIcon className="mr-2 inline-block" />
                        <span>Download</span>
                    </div>
                    <div className="flex">
                        <span className="flex items-center">
                            <ShareIcon className="mr-2 inline-block" />{' '}
                            <span className="cursor-pointer">Share</span>
                        </span>
                    </div>
                </div>
                <div>
                    <span className="flex items-center">
                        <button onClick={handle.enter}>
                            <span className="cursor-pointer">
                                View full screen
                            </span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CountryProductFlowChart

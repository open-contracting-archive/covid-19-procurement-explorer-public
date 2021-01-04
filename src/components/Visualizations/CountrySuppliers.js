import React, { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SankeyChart from '../Charts/SankeyChart/SankeyChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationServices from '../../services/visualizationServices'

function CountrySuppliers({ label, params }) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [globalSuppliers, setGlobalSuppliers] = useState()
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.GlobalSuppliers(params).then((response) => {
            setGlobalSuppliers(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Global Suppliers Visualization
    const getSuppliersData = (data, type) => {
        let suppliersData = {}
        let set1 =
            data &&
            data[type].product_country.map((item) => {
                return {
                    ...suppliersData,
                    from: item.product_name,
                    to: item.country_name,
                    value:
                        type === 'by_value' ? item.amount_usd : item.tender_count
                }
            })
        let set2 =
            data &&
            data[type].supplier_product.map((item) => {
                return {
                    ...suppliersData,
                    from: item.supplier_name,
                    to: item.product_name,
                    value:
                        type === 'by_value' ? item.amount_usd : item.tender_count
                }
            })
        return [...set2, ...set1]
    }
    const globalSuppliersDataByNumber =
        globalSuppliers && getSuppliersData(globalSuppliers, 'by_number')
    const globalSuppliersDataByValue =
        globalSuppliers && getSuppliersData(globalSuppliers, 'by_value')

    return (
        <div className="bg-white rounded p-4 simple-tab">
            <FullScreen handle={handle}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans(label)}
                </h3>

                <Tabs>
                    <TabList>
                        <Tab>{trans('By contract value')}</Tab>
                        <Tab>{trans('By number of contracts')}</Tab>
                    </TabList>
                    {loading ? (<Loader />) : (
                        <div className="flex">
                            <div className="flex-1">
                                <TabPanel>
                                    <SankeyChart
                                        data={globalSuppliersDataByValue}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <SankeyChart
                                        data={globalSuppliersDataByNumber}
                                    />
                                </TabPanel>
                            </div>
                        </div>
                    )}
                </Tabs>
            </FullScreen>

            <div
                className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                <div className="flex">
                    <span className="flex items-center">
                        <DownloadIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Download</span>
                    </span>
                    <span className="ml-8 flex items-center">
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Share</span>
                    </span>
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

export default CountrySuppliers

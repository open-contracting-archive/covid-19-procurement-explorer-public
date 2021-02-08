import React, { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { isEmpty } from 'lodash'
import SankeyChart from '../Charts/SankeyChart/SankeyChart'
import Loader from '../Loader/Loader'
import useTrans from '../../hooks/useTrans'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import VisualizationService from '../../services/VisualizationService'
import ChartFooter from '../Utilities/ChartFooter'
import HelpText from '../../components/HelpText/HelpText'

const GlobalSuppliers = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { label, params } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState({})
    const { trans } = useTrans()
    const fullScreenHandler = useFullScreenHandle()
    const helpText =
        'Top 10 suppliers in each product category according to contracts value or number of signed contracts'

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.GlobalSuppliers(params).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [params?.country])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================

    // Global Suppliers Visualization
    const getSuppliersData = (data, type) => {
        let suppliersData = {}

        if (isEmpty(data)) {
            return []
        }

        let set1 = data[type].product_country.map((item) => {
            return {
                ...suppliersData,
                from: item.product_name,
                to: item.country_name,
                value: type === 'by_value' ? item.amount_usd : item.tender_count
            }
        })
        let set2 = data[type].supplier_product.map((item) => {
            return {
                ...suppliersData,
                from: item.supplier_name,
                to: item.product_name,
                value: type === 'by_value' ? item.amount_usd : item.tender_count
            }
        })
        return [...set2, ...set1]
    }
    const globalSuppliersDataByNumber =
        originalData && getSuppliersData(originalData, 'by_number')
    const globalSuppliersDataByValue =
        originalData && getSuppliersData(originalData, 'by_value')

    return (
        <div className="bg-white rounded p-4 simple-tab right-direction">
            <FullScreen handle={fullScreenHandler}>
                <div className="flex items-center">
                    <h3 className="uppercase font-bold text-primary-dark inline-block">
                        {trans(label ? label : 'Global Suppliers')}
                    </h3>
                    <HelpText helpTextInfo={helpText} />
                </div>

                <Tabs>
                    <TabList>
                        <Tab>{trans('By contract value')}</Tab>
                        <Tab>{trans('By number of contracts')}</Tab>
                    </TabList>

                    {/* <ul className="flex items-center my-4">
                        <li className="inline-block mr-2 px-4 py-2 rounded-full bg-blue-50 text-white">
                            {trans('Global suppliers chain')}
                        </li>
                        <li className="inline-block mr-2 px-4 py-2 rounded-full bg-blue-0">
                            {trans('Global distribution chain')}
                        </li>
                    </ul> */}

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="flex mt-4">
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

            <ChartFooter fullScreenHandler={fullScreenHandler} />
        </div>
    )
}

export default GlobalSuppliers

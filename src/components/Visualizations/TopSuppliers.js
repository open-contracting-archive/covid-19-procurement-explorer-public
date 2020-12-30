import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import VisualizationServices from '../../services/visualizationServices'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import BarListChart from '../BarListSection/BarListChart'

function TopSuppliers(params) {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [topSuppliers, setTopSuppliers] = useState()
    const { trans } = useTrans()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.TopSuppliers(params).then((response) => {
            setTopSuppliers(response)
            setLoading(false)
        })
    }, [])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    // Top suppliers
    const calculateBarChartPercentage = (data, type) => {
        if (type === 'by_value') {
            let total = data.by_value.reduce((acc, current) => {
                return acc + current.amount_usd
            }, 0)

            return data.by_value.map((data) => {
                return {
                    name: data.supplier_name,
                    value: Math.ceil((data.amount_usd / total) * 100),
                    amount: data.amount_usd
                }
            })
        }

        if (type === 'by_number') {
            let total = data.by_number.reduce((acc, current) => {
                return acc + current.tender_count
            }, 0)

            return data.by_number.map((data) => {
                return {
                    name: data.supplier_name,
                    value: Math.ceil((data.tender_count / total) * 100),
                    amount: data.tender_count
                }
            })
        }
    }
    const topSuppliersDataByNumber =
        topSuppliers && calculateBarChartPercentage(topSuppliers, 'by_number')
    const topSuppliersDataByValue =
        topSuppliers && calculateBarChartPercentage(topSuppliers, 'by_value')

    return (
        <div className="bg-white rounded h-full">
            <div className="bg-white rounded p-6 h-full">
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    {trans('Top Suppliers')}
                </h3>
                <div className="flex">
                    <div className="flex-1">
                        <div className="flex-1 simple-tab -mt-10">
                            <Tabs>
                                <div className="flex justify-end">
                                    <TabList>
                                        <Tab>{trans('By contract value')}</Tab>
                                        <Tab>
                                            {trans('By number of contracts')}
                                        </Tab>
                                    </TabList>
                                </div>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <div className="mt-10">
                                        <TabPanel>
                                            <BarListChart
                                                data={topSuppliersDataByValue}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <BarListChart
                                                data={topSuppliersDataByNumber}
                                            />
                                        </TabPanel>
                                    </div>
                                )}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopSuppliers

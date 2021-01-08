import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs'
import PieChart from '../../../components/Charts/PieChart/PieChart'
import CountryFlag from '../../../components/CountryFlagIcon'
import useTrans from '../../../hooks/useTrans'
import {
    ContractsRedFlags,
    GlobalSuppliers,
    ProductDistribution,
    ProductsTimeline,
    TopSuppliers,
    TotalContracts,
    TotalSpending,
    DirectOpen
} from '../../../components/Visualizations'
import VisualizationServices from '../../../services/visualizationServices'
import TenderTable from '../../../components/Tables/TenderTable'

const SupplierProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [supplierInfo, setSupplierInfo] = useState()
    const { trans } = useTrans()
    let history = useHistory()
    const { id } = useParams()

    const previousPage = () => {
        history.goBack()
    }

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.SupplierDetail(id).then((response) => {
            setSupplierInfo(response)
        })
    }, [])
    // console.log(supplierInfo)

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    window.scrollTo(0, 0)

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr className="table-row" key={index}>
                <td className="uppercase">SERVICIOS DE LABORATORIO CLÍNICO</td>
                <td>Mexico</td>
                <td>21</td>
                <td>3</td>
                <td>5</td>
                <td>2,352,045</td>
                <td className="uppercase">1.2</td>
            </tr>
        )
    })

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 ">
                <div className="text-sm mb-4 text-blue-5">
                    <span className="cursor-pointer text-primary-blue">
                        {get(supplierInfo, 'country_name')}
                    </span>{' '}
                    /{' '}
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Supplier')}
                    </span>
                </div>
                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                    {get(supplierInfo, 'supplier_name')}
                </h2>
                <div className="flex flex-wrap mb-5 text-primary-dark">
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <CountryFlag
                            className="rounded-sm mr-2"
                            code={
                                supplierInfo &&
                                get(supplierInfo, 'country_code').toLowerCase()
                            }
                        />
                        <p className="mr-2 text-sm">
                            {get(supplierInfo, 'country_name')}
                        </p>
                    </div>
                </div>
                <div className="w-full px-2 mb-10">
                    <GlobalSuppliers label="Product flow" />
                </div>
            </div>
            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="pt-16 pb-24 bg-primary-gray">
                <div className="container mx-auto px-4 ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <TotalSpending
                                label="Total income"
                                params={{ supplier: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <TotalContracts params={{ supplier: id }} />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <DirectOpen heightFull params={{ supplier: id }} />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ProductsTimeline
                                label="Product timeline"
                                params={{ supplier: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ProductDistribution
                                label="Product Distribution"
                                params={{ supplier: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <TopSuppliers
                                label="Top suppliers"
                                params={{ supplier: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ContractsRedFlags />
                        </div>
                    </div>
                    {/* Table */}
                    <TenderTable params={{ supplier: id }} />
                </div>
            </div>
        </section>
    )
}

export default SupplierProfile

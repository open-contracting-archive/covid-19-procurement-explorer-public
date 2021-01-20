import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import CountryFlag from '../../../components/CountryFlagIcon'
import useTrans from '../../../hooks/useTrans'
import {
    ContractsRedFlags,
    GlobalSuppliers,
    ProductDistribution,
    ProductsTimeline,
    TopBuyers,
    TotalContracts,
    TotalSpending,
    DirectOpen
} from '../../../components/Visualizations'
import VisualizationServices from '../../../services/visualizationServices'
import TenderTable from '../../../components/Tables/TenderTable'
import Loader from "../../../components/Loader/Loader"

const SupplierProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const countries = useSelector((state) => state.general.countries)
    const [supplierInfo, setSupplierInfo] = useState({})
    const [country, setCountry] = useState({})
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    let history = useHistory()
    const { id } = useParams()

    const previousPage = () => {
        history.goBack()
    }

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.SupplierDetail(id).then((response) => {
            const country = countries.find((country) => country.response)
            setSupplierInfo(response)
            setCountry(country)
            setLoading(false)
        })
    }, [countries, id])


    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    window.scrollTo(0, 0)

    return (
        <section className="pt-8">
            {loading ? (<Loader />) : !isEmpty(supplierInfo) && (
                <Fragment>
                    <div className="container mx-auto">
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
                                    code={supplierInfo && get(supplierInfo, 'country_code').toLowerCase()
                                    }
                                />
                                <p className="mr-2 text-sm">
                                    {get(supplierInfo, 'country_name')}
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-10">
                            <div className="rounded border border-blue-0 bg-white">
                                <GlobalSuppliers label="Product flow" params={{ supplier: id, country: supplierInfo.country_code }} />
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            borderTop: '5px solid #1fbbec'
                        }}
                        className="pt-16 pb-24 bg-primary-gray">
                        <div className="container mx-auto">
                            <div className="flex flex-wrap -mx-2 mb-6">
                                <div className="w-full lg:w-1/3 px-2 mb-4">
                                    <TotalSpending
                                        label="Total income"
                                        params={{ supplier: id, country: supplierInfo.country_code }}
                                    />
                                </div>
                                <div className="w-full lg:w-1/3 px-2 mb-4">
                                    <TotalContracts params={{ supplier: id, country: supplierInfo.country_code }} />
                                </div>
                                <div className="w-full lg:w-1/3 px-2 mb-4">
                                    <DirectOpen heightFull params={{ supplier: id, country: supplierInfo.country_code }} />
                                </div>
                                <div className="w-full px-2 mb-4">
                                    <ProductsTimeline
                                        label="Product timeline"
                                        params={{ supplier: id, country: supplierInfo.country_code }}
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 px-2 mb-4">
                                    <ProductDistribution
                                        label="Product Distribution"
                                        params={{ supplier: id, country: supplierInfo.country_code }}
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 px-2 mb-4">
                                    <TopBuyers
                                        label="Top Buyers"
                                        params={{ supplier: id, country: supplierInfo.country_code }}
                                    />
                                </div>
                                <div className="w-full px-2 mb-4">
                                    <ContractsRedFlags />
                                </div>
                            </div>
                            {/* Table */}
                            <TenderTable params={{ supplier: id, country: supplierInfo.country_code }} />
                        </div>
                    </div>
                </Fragment>
            )}
        </section>
    )
}

export default SupplierProfile

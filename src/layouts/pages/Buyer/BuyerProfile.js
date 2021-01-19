import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import Select from 'react-select'
import { useHistory, useParams } from 'react-router-dom'
import CountryFlag from '../../../components/CountryFlagIcon'
import useTrans from '../../../hooks/useTrans'
import {
    AverageBidsPerContract,
    ContractsRedFlags,
    ContractStatus,
    DirectOpen,
    EquityIndicators,
    Monopolization,
    ProductDistribution,
    ProductsTimeline,
    TopSuppliers,
    TotalContracts,
    TotalSpending,
    BuyerProductTimeline
} from '../../../components/Visualizations'
import VisualizationServices from '../../../services/visualizationServices'
import { TenderTable } from '../../../components/Tables'

const BuyerProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [buyerInfo, setBuyerInfo] = useState()
    const { trans } = useTrans()
    let history = useHistory()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    const { id } = useParams()

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.BuyerDetail(id).then((response) => {
            setBuyerInfo(response)
        })
    }, [id])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    window.scrollTo(0, 0)

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 ">
                <div className="text-sm mb-4 text-blue-5">
                    <span className="cursor-pointer text-primary-blue">
                        {get(buyerInfo, 'country_name')}
                    </span>{' '}
                    /{' '}
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Buyers')}
                    </span>
                </div>
                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                    {get(buyerInfo, 'buyer_name')}
                </h2>
                <div className="flex flex-wrap mb-5 text-primary-dark">
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <CountryFlag
                            className="rounded-sm mr-2"
                            code={
                                buyerInfo &&
                                get(buyerInfo, 'country_code').toLowerCase()
                            }
                        />
                        <p className="mr-2 text-sm">
                            {get(buyerInfo, 'country_name')}
                        </p>
                    </div>
                </div>

                <div className="border border-blue-0 rounded mb-10">
                    <BuyerProductTimeline
                        label="Products Timeline"
                        params={{ buyer: id }}
                    />
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
                                label="Total Spending"
                                helpText="This is a help text for the total spending visualization"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <TotalContracts
                                label="Total contracts"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <AverageBidsPerContract
                                label="Average bid"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <Monopolization
                                label="Monopolization"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <ContractStatus
                                label="Contract status"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="flex flex-col justify-between h-full">
                                <EquityIndicators
                                    label="Equity indicator"
                                    params={{ buyer: id }}
                                />
                                <DirectOpen
                                    label="Direct/Open"
                                    params={{ buyer: id }}
                                />
                            </div>
                        </div>
                        <div className="w-full px-2 mb-6">
                            <ProductsTimeline
                                label="Product timeline"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ProductDistribution
                                label="Product distribution"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <TopSuppliers
                                label="Top suppliers"
                                params={{ buyer: id }}
                            />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <ContractsRedFlags
                                label="Contracts red flags"
                                params={{ buyer: id }}
                            />
                        </div>
                    </div>
                    {/* Table */}
                    <TenderTable params={{ buyer: id }} />
                </div>
            </div>
        </section>
    )
}

export default BuyerProfile

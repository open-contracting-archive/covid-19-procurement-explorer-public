import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../../../components/Loader/Loader'
import {
    AverageBidsPerContract,
    ContractStatus,
    DirectOpen,
    EquityIndicators,
    Monopolization,
    ProductsTimeline,
    TotalContracts,
    TotalSpending,
    TopSuppliers,
    TopBuyers,
    CountrySuppliers,
    ProductDistribution,
    ContractsCorrelation,
    ContractsRedFlags
} from '../../../../components/Visualizations'
import CountryPartnerSlider from '../../../../components/CountryPartnerSlider/CountryPartnerSlider'

function CountryData(props) {
    const { countryCode } = props
    const { countrySlug } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (countryCode !== undefined && countryCode !== null) {
            setLoading(false)
        }
    }, [countryCode])

    return loading ? (
        <Loader />
    ) : (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                {countryCode && (
                    <div className="flex flex-wrap -mx-2 -mb-4">
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <TotalSpending
                                label="Total Spending"
                                helpText="This is a help text for the total spending visualization"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <TotalContracts
                                label="Total Contracts"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <AverageBidsPerContract
                                label="Average bids per contract"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <Monopolization
                                label="Monopolization"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <ContractStatus
                                label="Contract status"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <div className="flex flex-col justify-between h-full">
                                <EquityIndicators
                                    label="Equity indicators"
                                    params={{ country: countryCode }}
                                />
                                <DirectOpen
                                    label="Direct/Open"
                                    params={{ country: countryCode }}
                                />
                            </div>
                        </div>

                        <div className="w-full px-2 mb-4">
                            <ProductsTimeline
                                label="Products timeline"
                                params={{ country: countryCode }}
                            />
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                            <TopSuppliers
                                label="Top Suppliers"
                                params={{ country: countryCode }}
                            />
                            <Link
                                to={`/country/${countrySlug}/suppliers`}
                                className="absolute -mt-12 text-primary-blue pt-3 pl-6 pb-6 inline-block">
                                View All
                            </Link>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                            <TopBuyers
                                label="Top Buyers"
                                params={{ country: countryCode }}
                            />
                            <Link
                                to={`/country/${countrySlug}/buyers`}
                                className="absolute -mt-12 text-primary-blue pt-3 pl-6 pb-6 inline-block">
                                View All
                            </Link>
                        </div>
                        {/*<div className="w-full lg:w-1/2 px-2 mb-4">*/}
                        {/*    <Concentration*/}
                        {/*        label="Concentration"*/}
                        {/*        params={{ country: countryCode }}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="w-full px-2 mb-4">
                            <CountrySuppliers
                                label="Country Suppliers"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4">
                            <ProductDistribution
                                label="Product Distribution"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4">
                            <ContractsRedFlags />
                        </div>
                        <div className="w-full px-2 mb-4">
                            <ContractsCorrelation
                                label="Covid/Contracts Quantity Correlation"
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full px-2 mb-4">
                            <CountryPartnerSlider
                                params={{ country: countryCode }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CountryData

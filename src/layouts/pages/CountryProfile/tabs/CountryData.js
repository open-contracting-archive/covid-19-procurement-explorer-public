import React, { useState, useEffect } from 'react'
import Loader from "../../../../components/Loader/Loader"
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
    ContractsRedFlags,
    Concentration
} from '../../../../components/Visualizations'
import CountryPartnerSlider from "../../../../components/CountryPartnerSlider/CountryPartnerSlider"

function CountryData({ countryCode,slug }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (countryCode !== undefined && countryCode !== null) {
            setLoading(false)
        }
    }, [countryCode])

    return loading ? (<Loader />) : (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-3 -mb-6">
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalSpending
                            label="Total Spending"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalContracts
                            label="Total Contracts"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <AverageBidsPerContract
                            label="Average bids per contract"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <Monopolization
                            label="Monopolization"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <ContractStatus
                            label="Contract status"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
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

                    <div className="w-full px-2 mb-6">
                        <ProductsTimeline
                            label="Products timeline"
                            params={{ country: countryCode }}
                        />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <Concentration
                            label="Concentration"
                            params={{ country: countryCode }} />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopSuppliers
                            label="Top Suppliers"
                            params={{ country: countryCode }}
                            viewLink={`/country/${slug}/suppliers`}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopBuyers
                            label="Top Buyers"
                            params={{ country: countryCode }}
                            viewLink={`/country/${slug}/buyers`}
                        />
                    </div>

                    <div className="w-full px-2 mb-6">
                        <CountrySuppliers
                            label="Country Suppliers"
                            params={{ country: countryCode }}
                        />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ProductDistribution
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ContractsRedFlags />
                    </div>
                    <div className="w-full px-2 mb-6">
                        <ContractsCorrelation
                            label="Covid/Contracts Quantity Correlation"
                            params={{ country: countryCode }}
                        />
                    </div>
                    <div className="w-full px-2 mb-6">
                        <CountryPartnerSlider />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CountryData

import React from 'react'
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
    GlobalSuppliers,
    ProductDistribution,
    ContractsCorrelation,
    ContractsRedFlags,
    Concentration
} from '../../../../components/Visualizations'

function CountryDataTab({ countryCode }) {
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-3 -mb-6">
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalSpending
                            label="Total Spending"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalContracts
                            label="Total Contracts"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <AverageBidsPerContract
                            label="Average bids per contract"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <Monopolization
                            label="Monopolization"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <ContractStatus
                            label="Contract status"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <div className="flex flex-col justify-between h-full">
                            <EquityIndicators
                                label="Equity indicators"
                                country={countryCode}
                            />
                            <DirectOpen
                                label="Direct/Open"
                                country={countryCode}
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ProductsTimeline
                            label="Products timeline"
                            country={countryCode}
                        />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <Concentration label="Concentration" />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopSuppliers
                            label="Top Suppliers"
                            country={countryCode}
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopBuyers label="Top Buyers" country={countryCode} />
                    </div>

                    <div className="w-full px-2 mb-6">
                        <GlobalSuppliers
                            label="Global suppliers"
                            country={countryCode}
                        />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ProductDistribution country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ContractsRedFlags />
                    </div>

                    <div className="w-full px-2 mb-6">
                        <ContractsCorrelation
                            label="Covid/Contracts Quantity Correlation"
                            country={countryCode}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CountryDataTab

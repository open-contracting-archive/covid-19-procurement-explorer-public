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
} from '../Visualizations'

function CountryDataCharts({ countryCode }) {
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-3 -mb-6">
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalSpending country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <TotalContracts country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <AverageBidsPerContract country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <Monopolization country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <ContractStatus country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-6">
                        <div className="flex flex-col justify-between h-full">
                            <EquityIndicators country={countryCode} />
                            <DirectOpen country={countryCode} />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ProductsTimeline country={countryCode} />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <Concentration />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopSuppliers country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <TopBuyers country={countryCode} />
                    </div>

                    <div className="w-full px-2 mb-6">
                        <GlobalSuppliers country={countryCode} />
                    </div>

                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ProductDistribution country={countryCode} />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-6">
                        <ContractsRedFlags />
                    </div>

                    <div className="w-full px-2 mb-6">
                        <ContractsCorrelation country={countryCode} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CountryDataCharts

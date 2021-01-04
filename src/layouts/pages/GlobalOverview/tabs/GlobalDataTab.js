import React from 'react'
import {
    DirectOpen,
    AverageBidsPerContract,
    TotalContracts,
    TotalSpending,
    Monopolization,
    ContractStatus,
    EquityIndicators,
    ProductsTimeline,
    TopSuppliers,
    TopBuyers,
    GlobalSuppliers,
    ProductDistribution,
    ContractsRedFlags,
    ContractsCorrelation
} from '../../../../components/Visualizations'

const GlobalDataTab = () => {
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-3 -mb-4">
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalSpending label="Total Spending" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalContracts label="Total Contracts" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <AverageBidsPerContract label="Average bids per contract" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <Monopolization label="Monopolization" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <ContractStatus label="Contract status" />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <div className="flex flex-col justify-between h-full">
                            <EquityIndicators label="Equity indicators" />
                            <DirectOpen label="Direct/Open" />
                        </div>
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ProductsTimeline label="Products timeline" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <TopSuppliers label="Top Suppliers" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <TopBuyers label="Top Buyers" />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <GlobalSuppliers label="Global suppliers" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ProductDistribution />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ContractsRedFlags />
                    </div>
                    <div className="w-full px-2 mb-4">
                         <ContractsCorrelation />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GlobalDataTab

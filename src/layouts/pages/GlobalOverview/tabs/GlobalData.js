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

const GlobalData = () => {
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-2 -mb-4">
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalSpending
                            helpText="This is a help text for the total spending visualization"
                            label="Total Spending"
                        />
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
                        <TopSuppliers
                            label="Top Suppliers"
                            viewLink="/global-overview/suppliers"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <TopBuyers
                            label="Top Buyers"
                            viewLink="/global-overview/buyers"
                        />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <GlobalSuppliers label="Global suppliers" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ProductDistribution label="Product Distribution" />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <ContractsRedFlags />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ContractsCorrelation label="Covid/Contracts quantity correlation" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GlobalData

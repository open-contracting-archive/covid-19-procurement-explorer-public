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
} from '../../../../components/visualizations'

const GlobalDataTab = () => {
    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                <div className="flex flex-wrap -mx-3 -mb-4">
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalSpending />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <TotalContracts />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <AverageBidsPerContract />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <Monopolization />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <ContractStatus />
                    </div>
                    <div className="w-full lg:w-1/3 px-2 mb-4">
                        <div className="flex flex-col justify-between h-full">
                            <EquityIndicators />
                            <DirectOpen />
                        </div>
                    </div>
                    <div className="w-full px-2 mb-4">
                        <ProductsTimeline />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <TopSuppliers />
                    </div>
                    <div className="w-full lg:w-1/2 px-2 mb-4">
                        <TopBuyers />
                    </div>
                    <div className="w-full px-2 mb-4">
                        <GlobalSuppliers />
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

import React, { useEffect, useState } from 'react'
import ProcurementTimeline from '../ProcurementTimeline/ProcurementTimeline'
import ContractsIndicator from '../ContractsIndicator/ContractsIndicator'
import GlobalSupplier from '../GlobalSupplier/GlobalSupplier'
import ProductDistribution from '../ProductDistribution/ProductDistribution'
import QuantityCorrelation from '../QuantityCorrelation/QuantityCorrelation'
import BarListSection from '../BarListSection/BarListSection'
import ContractRedFlag from '../ContractRedFlag/ContractRedFlag'
import Loader from '../loader/Loader'

const top_supply_bar_data = [
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

const top_buyer_bar_data = [
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

function GlobalDataChart() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <section className="bg-primary-gray">
            <div className="container mx-auto">
                {loading ? (
                    <div className="flex flex-wrap -mx-3 -mb-6">
                        <div className="w-full px-2 mb-6">
                            <ProcurementTimeline />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <ContractsIndicator />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Top Suppliers"
                                bar_data={top_supply_bar_data}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Top Buyers"
                                bar_data={top_buyer_bar_data}
                            />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <GlobalSupplier />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <ProductDistribution />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <QuantityCorrelation />
                        </div>
                        <div className="w-full lg:w-1/2 mb-6">
                            <ContractRedFlag />
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    )
}

export default GlobalDataChart

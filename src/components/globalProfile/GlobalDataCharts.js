import React, { useEffect, useState } from 'react'
import ProcurementTimeline from '../ProcurementTimeline/ProcurementTimeline'
import ContractsIndicator from '../ContractsIndicator/ContractsIndicator'
import GlobalSupplier from '../GlobalSupplier/GlobalSupplier'
import ProductDistribution from '../ProductDistribution/ProductDistribution'
import QuantityCorrelation from '../QuantityCorrelation/QuantityCorrelation'
import Loader from '../loader/Loader'
import useTrans from '../../hooks/useTrans'

function GlobalDataChart() {
    const [loading, setLoading] = useState(false)
    const { trans } = useTrans()

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
                        <div className="w-full px-2 mb-6">
                            <GlobalSupplier />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <ProductDistribution />
                        </div>
                        <div className="w-full px-2 mb-6">
                            <QuantityCorrelation />
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

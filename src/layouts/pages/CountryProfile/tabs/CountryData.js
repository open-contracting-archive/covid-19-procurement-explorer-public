import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { T } from '@transifex/react'
import { Loader, DataDisclaimerInfo } from '../../../../components/Utilities'
import {
    AverageBidsPerContract,
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
    ContractRedFlags,
    Concentration,
    CountryPartnerSlider
} from '../../../../components/Visualizations'
import { useCountry } from '../../../../context/CountryContext'

function CountryData() {
    const [loading, setLoading] = useState(true)
    const { country_code_alpha_2: countryCode, slug: countrySlug } =
        useCountry()

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
                <DataDisclaimerInfo
                    forwardUrl={`/country/${countrySlug}/methodology`}
                />

                {countryCode && (
                    <div className="flex flex-wrap -mx-2 -mb-4">
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <TotalSpending params={{ country: countryCode }} />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <TotalContracts params={{ country: countryCode }} />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <div className="flex flex-col justify-between h-full space-y-4">
                                <AverageBidsPerContract
                                    params={{ country: countryCode }}
                                />
                                <Monopolization
                                    params={{ country: countryCode }}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <EquityIndicators
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-4">
                            <DirectOpen params={{ country: countryCode }} />
                        </div>
                        <div className="w-full px-2 mb-4">
                            <ProductsTimeline
                                params={{ country: countryCode }}
                            />
                        </div>

                        <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                            <TopSuppliers params={{ country: countryCode }} />
                            <Link
                                to={`/country/${countrySlug}/suppliers`}
                                className="absolute -mt-8 text-primary-blue inline-block text-sm right-0 mr-6"
                            >
                                <T _str="View in detail" /> →
                            </Link>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4 relative">
                            <TopBuyers params={{ country: countryCode }} />
                            <Link
                                to={`/country/${countrySlug}/buyers`}
                                className="absolute -mt-8 text-primary-blue inline-block text-sm right-0 mr-6"
                            >
                                <T _str="View in detail" /> →
                            </Link>
                        </div>
                        <div className="w-full px-2 mb-4">
                            <CountrySuppliers
                                params={{ country: countryCode }}
                                countrySlug={countrySlug}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4">
                            <ProductDistribution
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4">
                            <ContractRedFlags
                                params={{ country: countryCode }}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-4">
                            <Concentration params={{ country: countryCode }} />
                        </div>
                        <div className="w-full px-2 mb-4">
                            <ContractsCorrelation
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

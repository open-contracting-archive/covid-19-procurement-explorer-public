import React, { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { get, isEmpty } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import { T } from '@transifex/react'
import VisualizationService from '../../../services/VisualizationService'
import {
    Loader,
    CountryFlagIcon,
    MetaInformation
} from '../../../components/Utilities'
import {
    TotalSpending,
    TotalContracts,
    DirectOpen,
    TopBuyers,
    ProductsTimeline,
    ProductDistribution,
    ContractRedFlags,
    SupplierProductFlow
} from '../../../components/Visualizations'
import { ContractTable } from '../../../components/Tables'

const SupplierProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const countries = useSelector((state) => state.general.countries)
    const [originalData, setOriginalData] = useState({})
    const [, setCountry] = useState({})
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    const { id } = useParams()
    window.scrollTo(0, 0)
    const previousPage = () => {
        history.goBack()
    }

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.SupplierDetail(id).then((response) => {
            if (response) {
                const country = countries.find((country) => country.response)
                setOriginalData(response)
                setCountry(country)
            }
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [countries, id])

    return (
        <section className="pt-8">
            {loading ? (
                <Loader />
            ) : (
                !isEmpty(originalData) && (
                    <Fragment>
                        <MetaInformation
                            title={get(originalData, 'name')}
                            description="Welcome Covid-19 Contract Explorer"
                        />
                        <div className="container mx-auto px-4 md:px-0">
                            <div className="text-sm mb-4 text-blue-5">
                                <span className="cursor-pointer text-primary-blue">
                                    {get(originalData, 'country_name')}
                                </span>{' '}
                                /{' '}
                                <span
                                    className="cursor-pointer text-primary-blue"
                                    onClick={previousPage}>
                                    <T _str="Supplier" />
                                </span>
                            </div>
                            <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                                {`${get(originalData, 'name')} #${get(
                                    originalData,
                                    'code'
                                )}`}
                            </h2>
                            <div className="flex flex-wrap mb-5 text-primary-dark">
                                <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                                    <CountryFlagIcon
                                        className="rounded-sm mr-2"
                                        code={
                                            originalData.country_code &&
                                            get(
                                                originalData,
                                                'country_code'
                                            ).toLowerCase()
                                        }
                                    />
                                    <p className="mr-2 text-sm">
                                        {get(originalData, 'country_name')}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full mb-10">
                                <div className="rounded border border-blue-0 bg-white">
                                    <SupplierProductFlow
                                        label="Product flow"
                                        params={{
                                            supplierId: id
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                borderTop: '5px solid #1fbbec'
                            }}
                            className="py-10 md:pt-16 md:pb-24 px-4 bg-primary-gray">
                            <div className="container mx-auto">
                                <div className="flex flex-wrap -mx-2 mb-6">
                                    <div className="w-full lg:w-1/3 px-2 mb-4">
                                        <TotalSpending
                                            label="Total income"
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-4">
                                        <TotalContracts
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-4">
                                        <DirectOpen
                                            heightFull
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full px-2 mb-4">
                                        <ProductsTimeline
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-2 mb-4">
                                        <ProductDistribution
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-2 mb-4">
                                        <TopBuyers
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full px-2 mb-4">
                                        <ContractRedFlags
                                            params={{
                                                supplier: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                </div>

                                <ContractTable
                                    params={{
                                        supplier: id,
                                        country: originalData.country_code
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                )
            )}
        </section>
    )
}

export default SupplierProfile

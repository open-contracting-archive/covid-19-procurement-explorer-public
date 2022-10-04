import React, { useEffect, useState, Fragment } from 'react'
import { get, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { T } from '@transifex/react'
import {
    Loader,
    CountryFlagIcon,
    MetaInformation
} from '../../../components/Utilities'
import {
    AverageBidsPerContract,
    ContractRedFlags,
    DirectOpen,
    EquityIndicators,
    Monopolization,
    ProductDistribution,
    ProductsTimeline,
    TopSuppliers,
    TotalContracts,
    TotalSpending
} from '../../../components/Visualizations'
import VisualizationService from '../../../services/VisualizationService'
import { ContractTable } from '../../../components/Tables'

const BuyerProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const countries = useSelector((state) => state.general.countries)
    const [originalData, setOriginalData] = useState({})
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    const { id } = useParams()

    const previousPage = () => {
        history.goBack()
    }
    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.BuyerDetail(id).then((response) => {
            setOriginalData(response)
            setLoading(false)
        })

        return () => {
            setOriginalData({})
        }
    }, [countries, id])

    // ===========================================================================
    // Handlers and functions
    // ===========================================================================
    window.scrollTo(0, 0)

    return (
        <section className="pt-8">
            {loading ? (
                <Loader />
            ) : (
                !isEmpty(originalData) && (
                    <Fragment>
                        <MetaInformation
                            title={get(originalData, 'name')}
                            description=""
                        />
                        <div className="container mx-auto px-4 ">
                            <div className="text-sm mb-4 text-blue-5">
                                <span className="cursor-pointer text-primary-blue">
                                    {get(originalData, 'country_name')}
                                </span>{' '}
                                /{' '}
                                <span
                                    className="cursor-pointer text-primary-blue"
                                    onClick={previousPage}
                                >
                                    <T _str="Buyers" />
                                </span>
                            </div>
                            <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                                {`${get(originalData, 'name')}  #${get(
                                    originalData,
                                    'code'
                                )}`}
                            </h2>
                            <div className="flex flex-wrap mb-5 text-primary-dark">
                                <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                                    <CountryFlagIcon
                                        className="rounded-sm mr-2"
                                        code={
                                            originalData &&
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
                        </div>
                        <div
                            style={{
                                borderTop: '5px solid #1fbbec'
                            }}
                            className="pt-16 pb-24 bg-primary-gray"
                        >
                            <div className="container mx-auto px-4 ">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full lg:w-1/3 px-2 mb-6">
                                        <TotalSpending params={{ buyer: id }} />
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-6">
                                        <TotalContracts
                                            params={{ buyer: id }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-4">
                                        <div className="flex flex-col justify-between h-full space-y-4">
                                            <AverageBidsPerContract
                                                params={{ buyer: id }}
                                            />
                                            <Monopolization
                                                params={{ buyer: id }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-6">
                                        <EquityIndicators
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/3 px-2 mb-6">
                                        <DirectOpen
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full px-2 mb-6">
                                        <ProductsTimeline
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-2 mb-6">
                                        <ProductDistribution
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-2 mb-6">
                                        <TopSuppliers
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                    <div className="w-full px-2 mb-6">
                                        <ContractRedFlags
                                            params={{
                                                buyer: id,
                                                country:
                                                    originalData.country_code
                                            }}
                                        />
                                    </div>
                                </div>

                                <ContractTable
                                    params={{
                                        buyer: id,
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

export default BuyerProfile

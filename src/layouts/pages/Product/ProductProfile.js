import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ContractTable } from '../../../components/Tables'
import { MetaInformation } from '../../../components/Utilities'

const MainChart = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './sections/MainChart')
)
const ProductInfo = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './sections/ProductInfo')
)

const ProductProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { productId, countrySlug } = useParams()
    const countries = useSelector((state) => state.general.countries)
    const [countryData, setCountryData] = useState({})
    const productCategories = useSelector(
        (state) => state.general.productCategories
    )
    const product = useMemo(() => {
        const productItem = productCategories.find(
            (item) => item.id === parseInt(productId)
        )
        return productItem ? productItem : null
    }, [productCategories, productId])
    window.scrollTo(0, 0)

    useEffect(() => {
        let country = countries.find((country) => country.slug === countrySlug)
        setCountryData(country)
    }, [countries, countrySlug])

    return (
        <section className="pt-8">
            <MetaInformation title={product.name} description="" />
            <div className="container mx-auto">
                <ProductInfo product={product} country={countryData} />

                {product && (
                    <MainChart product={product} country={countryData} />
                )}
            </div>

            <div className="py-12 bg-primary-gray px-4">
                <div className="container mx-auto">
                    <div>
                        {countryData ? (
                            <ContractTable
                                params={{
                                    product: productId,
                                    country: countryData.country_code_alpha_2
                                }}
                            />
                        ) : (
                            <ContractTable
                                params={{
                                    product: productId
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductProfile

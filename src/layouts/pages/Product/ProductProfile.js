import React, { useMemo } from 'react'
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
    const productCategories = useSelector(
        (state) => state.general.productCategories
    )
    const countries = useSelector((state) => state.general.countries)
    const product = useMemo(() => {
        const productItem = productCategories.find(
            (item) => item.id === parseInt(productId)
        )
        return productItem ? productItem : null
    }, [productCategories, productId])
    const country = useMemo(() => {
        return countrySlug !== undefined
            ? countries.find((item) => item.slug === countrySlug)
            : null
    }, [countries, countrySlug])
    window.scrollTo(0, 0)

    return (
        <section className="pt-8">
            <MetaInformation
                title="Products"
                description="Welcome Covid-19 Contract Explorer"
            />
            <div className="container mx-auto">
                <ProductInfo product={product} country={country} />

                {product && <MainChart product={product} country={country} />}
            </div>

            <div className="py-12 bg-primary-gray px-4">
                <div className="container mx-auto">
                    <div>
                        <ContractTable params={{ product: productId }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductProfile

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductInfo from "./sections/ProductInfo"
import MainChart from "./sections/MainChart"
import { TenderTable } from "../../../components/Tables"

const ProductProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { productId, countrySlug } = useParams()
    const productCategories = useSelector((state) => state.general.productCategories)
    const countries = useSelector((state) => state.general.countries)
    const product = useMemo(() => {
        const productItem = productCategories.find((item) => item.id === parseInt(productId))
        return productItem ? productItem : null
    }, [productCategories, productId])
    const country = useMemo(() => {
        return countrySlug !== undefined ? countries.find((item) => item.slug === countrySlug) : null
    }, [countries, countrySlug])

    return (
        <section className="pt-8">
            <div className="container mx-auto">
                <ProductInfo product={product} country={country} />

                {product && (
                    <MainChart product={product} country={country} />
                )}
            </div>

            <div className="py-12 bg-primary-gray">
                <div className="container mx-auto">
                    <div>
                        <TenderTable params={{ product: productId }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductProfile

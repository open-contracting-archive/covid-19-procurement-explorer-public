import React, { Fragment } from 'react'
import { t } from '@transifex/native'
import { useHistory, useParams } from 'react-router-dom'

const ProductInfo = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { product, country } = props
    const { countrySlug } = useParams()
    const history = useHistory()
    const showCountryPage = () => {
        if (countrySlug) {
            history.push(`/country/${countrySlug}/data`)
        } else {
            history.push(`/global-overview/data`)
        }
    }

    const showProductTab = () => {
        if (countrySlug) {
            history.push(`/country/${countrySlug}/products`)
        } else {
            history.push(`/global-overview/products`)
        }
    }

    return (
        <Fragment>
            <div className="px-4 md:px-0">
                <div className="text-sm mb-4 text-blue-5">
                    <span
                        className="text-primary-blue cursor-pointer"
                        onClick={() => showCountryPage()}>
                        {country ? country.name : t('Global')}
                    </span>{' '}
                    /{' '}
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={() => showProductTab()}>
                        {t('Products')}
                    </span>
                </div>

                <h2 className="text-lg md:text-xl">
                    {product ? product.name : '-'}
                </h2>
            </div>
        </Fragment>
    )
}

export default ProductInfo

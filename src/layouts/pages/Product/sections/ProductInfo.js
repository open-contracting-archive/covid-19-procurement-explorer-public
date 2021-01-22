import React, { Fragment } from 'react'
import useTrans from "../../../../hooks/useTrans"
import { useHistory, useParams } from 'react-router-dom'

const ProductInfo = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { product, country } = props
    const { trans } = useTrans()
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
            <div className="text-sm mb-4 text-blue-5">
                <span className="text-primary-blue cursor-pointer"
                      onClick={() => showCountryPage()}>
                    {country ? country.name : trans('Global')}
                </span>{' '}
                /{' '}
                <span className="cursor-pointer text-primary-blue cursor-pointer"
                      onClick={() => showProductTab()}>
                    {trans('Products')}
                </span>
            </div>

            <h2 className="text-xl">{product ? product.name : '-'}</h2>
        </Fragment>
    )
}

export default ProductInfo

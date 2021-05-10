import React from 'react'
import PropTypes from 'prop-types'
import { T } from '@transifex/react'
import { WorldMap } from './index'

const CountryProductMap = (props) => {
    const { params } = props

    return (
        <div className="border border-blue-0 rounded bg-white">
            <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                <T _str="Product World Map" />
            </h2>

            <WorldMap params={params} />
        </div>
    )
}

CountryProductMap.propTypes = {
    params: PropTypes.object
}

export default CountryProductMap

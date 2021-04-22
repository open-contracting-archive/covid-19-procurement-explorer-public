import React from 'react'
import { WorldMap } from './index'
import { t } from '@transifex/native'

const CountryProductMap = (props) => {
    const { params } = props

    return (
        <div className="border border-blue-0 rounded bg-white">
            <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                {t('Product World Map')}
            </h2>

            <WorldMap params={params} />
        </div>
    )
}

export default CountryProductMap

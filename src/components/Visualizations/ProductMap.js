import React from 'react'
import { WorldMap } from './index'
import useTrans from '../../hooks/useTrans'

const CountryProductMap = (props) => {
    const { trans } = useTrans()
    const { params } = props

    return (
        <div className="border border-blue-0 rounded bg-white">
            <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                {trans('Product World Map')}
            </h2>

            <WorldMap params={params} />
        </div>
    )
}

export default CountryProductMap

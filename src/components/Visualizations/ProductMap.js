import React, { useEffect, useState } from 'react'
import WorldMap from '../../components/Visualizations/WorldMap'

const CountryProductMap = (props) => {
    const { params } = props

    return (
        <div className="border border-blue-0 rounded bg-white">
            <h2 className="uppercase font-bold text-primary-dark inline-block px-4 pt-4">
                Product World Map
            </h2>

            <WorldMap params={params} />
        </div>
    )
}

export default CountryProductMap

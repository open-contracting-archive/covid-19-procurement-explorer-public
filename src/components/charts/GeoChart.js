import React, { useRef, useEffect, useState } from 'react'
import { select, geoPath, geoMercator } from 'd3'
import { Link } from 'react-router-dom'
import useResizeObserver from '../../hooks/useResizeObserver'
import CountryServices from '../../services/countryServices'

function GeoChart({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)
    const [countryData, setCountryData] = useState([])

    const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E']

    const formatNumber = (number) => {
        // what tier? (determines SI symbol)
        var tier = (Math.log10(number) / 3) | 0

        // if zero, we don't need a suffix
        if (tier === 0) return number

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return scaled.toFixed(1) + suffix
    }

    useEffect(() => {
        CountryServices.CountryData().then((response) => {
            if (response) {
                const countries = response.reduce((acc, current) => {
                    return { [current.name]: current, ...acc }
                }, {})
                setCountryData(countries)
            }
        })
    }, [])

    useEffect(() => {
        const svg = select(svgRef.current)

        // use resized dimensions
        // but fall back to getBoundingClientRect, if no dimensions yet.
        const { width, height } =
            dimensions || wrapperRef.current.getBoundingClientRect()

        // projects geo-coordinates on a 2D plane
        const projection = geoMercator().fitSize([width, height], data)

        // takes geojson data,
        // transforms that into the d attribute of a path element
        const pathGenerator = geoPath().projection(projection)

        // create a tooltip
        // Define the div for the tooltip
        var tooltip = select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')

        // render each country
        svg.selectAll('.country')
            .data(data.features)
            .join('path')
            .attr('class', 'country')
            .attr('fill', function (d) {
                if (Object.keys(countryData).includes(d.properties.name)) {
                    return '#c8d419'
                } else {
                    return '#e3e3e3'
                }
            })
            .attr('d', pathGenerator)
            .on('mouseenter', function (e, d) {
                if (Object.keys(countryData).includes(d.properties.name)) {
                    tooltip.transition().style('opacity', 1).duration(100)
                    tooltip
                        .style('left', e.pageX - 28 + 'px')
                        .style('top', e.pageY - 28 + 'px')
                        .style('pointer-events', 'auto')
                        .html(
                            `<a href='/country/${
                                countryData[d.properties.name]['id']
                            }'>${d.properties.name}</a>`
                        )
                }
            })
            .on('mouseout', function () {
                tooltip.transition().style('opacity', 0).duration(50)
            })
    }, [data, dimensions, countryData])

    // console.log(countryData)

    return (
        <div className="px-4 mb-16 map-wrapper pt-20">
            <div className="container mx-auto mb-16">
                <div className="flex flex-wrap items-center -mx-2">
                    <div className="w-3/12 leading-snug px-2">
                        <h2 className="text-4xl uppercase leading-snug m-0 text-black-3d3">
                            Explore Countries
                        </h2>
                    </div>
                    <div className="flex-1 px-2">
                        <div>
                            <span className="text-xl inline-block mb-6 text-black-3d3-50">
                                Track your country’s Covid-19 Procurement status
                            </span>
                            <ul className="flex items-center space-x-16">
                                {Object.keys(countryData).map((country, i) => (
                                    <li key={i}>
                                        <span className="text-lg uppercase text-black">
                                            <Link
                                                to={
                                                    '/country/' +
                                                    countryData[country].id
                                                }>
                                                {countryData[country].name}
                                            </Link>
                                        </span>
                                        <span className="text-sm text-black-50 block">
                                            {formatNumber(
                                                countryData[country].gdp
                                            )}
                                            <span>
                                                {countryData[country].currency}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={wrapperRef} className="relative">
                <svg className="w-full h-screen" ref={svgRef}></svg>
            </div>
        </div>
    )
}

export default GeoChart

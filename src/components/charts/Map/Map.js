/* Imports */
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Link } from 'react-router-dom'
import CountryServices from '../../../services/countryServices'
import formatNumber from '../../formatNumber/FormatNumber'

const Map = ({ data, barColorValue, axisRotation }) => {
    const mapchartDiv = useRef(null)
    const [countryData, setCountryData] = useState([])

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

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(mapchartDiv.current, am4maps.MapChart)
        chart.exporting.menu = new am4core.ExportMenu()

        // Set map definition
        chart.geodata = am4geodata_worldLow

        // Set projection
        chart.projection = new am4maps.projections.Miller()

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

        // Exclude Antartica
        polygonSeries.exclude = ['AQ']

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name}'
        polygonTemplate.polygon.fillOpacity = 0.6

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create('hover')
        hs.properties.fill = chart.colors.getIndex(0)

        // Add image series
        let imageSeries = chart.series.push(new am4maps.MapImageSeries())
        imageSeries.mapImages.template.propertyFields.longitude = 'longitude'
        imageSeries.mapImages.template.propertyFields.latitude = 'latitude'
        imageSeries.mapImages.template.tooltipText = '{title}'
        imageSeries.mapImages.template.propertyFields.url = 'url'

        let circle = imageSeries.mapImages.template.createChild(am4core.Circle)
        circle.radius = 3
        circle.propertyFields.fill = 'color'

        let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle)
        circle2.radius = 3
        circle2.propertyFields.fill = 'color'

        circle2.events.on('inited', function (event) {
            animateBullet(event.target)
        })

        function animateBullet(circle) {
            let animation = circle.animate(
                [
                    { property: 'scale', from: 1, to: 5 },
                    { property: 'opacity', from: 1, to: 0 }
                ],
                1000,
                am4core.ease.circleOut
            )
            animation.events.on('animationended', function (event) {
                animateBullet(event.target.object)
            })
        }

        let colorSet = new am4core.ColorSet()

        imageSeries.data = [
            {
                title: 'Kenya',
                latitude: 1,
                longitude: 38,
                url: '/country/2',
                color: colorSet.next()
            },
            {
                title: 'Kyrgyzstan',
                latitude: 41,
                longitude: 75,
                url: '/country/9',
                color: colorSet.next()
            },
            {
                title: 'Moldova',
                latitude: 47,
                longitude: 29,
                url: '/country/8',
                color: colorSet.next()
            },
            {
                title: 'United Kingdom',
                latitude: 54,
                longitude: -2,
                url: '/country/7',
                color: colorSet.next()
            },
            {
                title: 'Ukraine',
                latitude: 49,
                longitude: 32,
                url: '/country/6',
                color: colorSet.next()
            },
            {
                title: 'Mexico',
                latitude: 23,
                longitude: -102,
                url: '/country/1',
                color: colorSet.next()
            }
        ]

        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return (
        <div className="px-4 mb-16 map-wrapper pt-20">
            <div className="container mx-auto mb-16">
                <div className="flex flex-wrap items-center -mx-2">
                    <div className="w-3/12 leading-snug px-2">
                        <h2 className="text-4xl uppercase leading-snug m-0 text-yellow-50">
                            Explore Countries
                        </h2>
                    </div>
                    <div className="flex-1 px-2">
                        <div>
                            <span className="text-xl inline-block mb-6 text-yellow-50 text-opacity-50">
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
                                        <span className="text-sm text-black text-opacity-50 block">
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
            <div ref={mapchartDiv} style={{ width: '100%', height: '500px' }} />
        </div>
    )
}

export default Map

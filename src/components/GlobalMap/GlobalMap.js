/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const GlobalMap = ({ data, innerMap }) => {
    const globalMapchartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(globalMapchartDiv.current, am4maps.MapChart)
        chart.chartContainer.wheelable = false
        // chart.exporting.menu = new am4core.ExportMenu()

        // Set map definition
        chart.geodata = am4geodata_worldLow

        // Set projection
        chart.projection = new am4maps.projections.Miller()

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

        // Exclude Antartica
        polygonSeries.exclude = ['AQ']

        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
            property: 'fill',
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(1),
            max: chart.colors.getIndex(1).brighten(-0.3)
        })

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        // Set heatmap values for each state
        polygonSeries.data = [
            {
                id: 'UA',
                value: 8447100
            },
            {
                id: 'US',
                value: 4447100
            },
            {
                id: 'UK',
                value: 626932
            },
            {
                id: 'KE',
                value: 5130632
            },
            {
                id: 'MD',
                value: 2673400
            },
            {
                id: 'KG',
                value: 33871648
            },
            {
                id: 'MX',
                value: 50871648
            }
        ]

        // Set up heat legend
        let heatLegend = chart.createChild(am4maps.HeatLegend)
        heatLegend.series = polygonSeries
        heatLegend.align = 'right'
        heatLegend.valign = 'bottom'
        heatLegend.width = am4core.percent(20)
        heatLegend.marginRight = am4core.percent(4)
        heatLegend.minValue = 0
        heatLegend.maxValue = 40000000

        // Set up custom heat map legend labels using axis ranges
        let minRange = heatLegend.valueAxis.axisRanges.create()
        minRange.value = heatLegend.minValue
        minRange.label.text = '0'
        let maxRange = heatLegend.valueAxis.axisRanges.create()
        maxRange.value = heatLegend.maxValue
        maxRange.label.text = '100M'

        // Blank out internal heat legend value axis labels
        heatLegend.valueAxis.renderer.labels.template.adapter.add(
            'text',
            function (labelText) {
                return ''
            }
        )

        // Configure series tooltip
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name}: {value}'
        polygonTemplate.nonScalingStroke = true
        polygonTemplate.strokeWidth = 0.5

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create('hover')
        hs.properties.fill = am4core.color('#3c5bdc')
        chart.data = data
        chart.logo.disabled = true

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return (
        <div className="map-wrapper bg-white rounded-md h-full">
            <div
                ref={globalMapchartDiv}
                style={
                    innerMap
                        ? { width: '100%', height: '100%', minHeight: '400px' }
                        : { width: '100%', height: '500px' }
                }
            />
        </div>
    )
}

export default GlobalMap

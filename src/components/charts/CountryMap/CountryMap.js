/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const CountryMap = ({ data, countryCode }) => {
    const countryMapChartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(countryMapChartDiv.current, am4maps.MapChart)
        chart.chartContainer.wheelable = false
        // chart.exporting.menu = new am4core.ExportMenu()

        // Set map definition
        chart.geodata = am4geodata_worldLow

        // Set projection
        chart.projection = new am4maps.projections.Miller()

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())

        // Exclude Antartica
        // polygonSeries.exclude = ['AQ']
        polygonSeries.include = [`${countryCode}`]

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
        if (data) {
            polygonSeries.data = data
        } else {
            polygonSeries.data = [
                {
                    id: 'MX',
                    value: 50871648
                }
            ]
        }

        // Set up heat legend
        // let heatLegend = chart.createChild(am4maps.HeatLegend)
        // heatLegend.series = polygonSeries
        // heatLegend.align = 'center'
        // heatLegend.valign = 'bottom'
        // heatLegend.width = am4core.percent(40)
        // heatLegend.marginRight = am4core.percent(4)
        // // heatLegend.minValue = 0
        // // heatLegend.maxValue = 40000000
        // heatLegend.orientation = 'horizontal'
        // heatLegend.padding(20, 20, 20, 20)
        // heatLegend.valueAxis.renderer.labels.template.fontSize = 10
        // heatLegend.valueAxis.renderer.minGridDistance = 40

        // polygonSeries.mapPolygons.template.events.on('over', (event) => {
        //     handleHover(event.target)
        // })

        // polygonSeries.mapPolygons.template.events.on('hit', (event) => {
        //     handleHover(event.target)
        // })

        // function handleHover(mapPolygon) {
        //     if (!isNaN(mapPolygon.dataItem.value)) {
        //         heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value)
        //     } else {
        //         heatLegend.valueAxis.hideTooltip()
        //     }
        // }

        // polygonSeries.mapPolygons.template.strokeOpacity = 0.4
        // polygonSeries.mapPolygons.template.events.on('out', (event) => {
        //     heatLegend.valueAxis.hideTooltip()
        // })

        // Configure series tooltip
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name}: {value}'
        polygonTemplate.nonScalingStroke = true
        polygonTemplate.strokeWidth = 0.5

        // Zoom control
        chart.zoomControl = new am4maps.ZoomControl()
        chart.zoomControl.valign = 'top'

        // Setting map's initial zoom
        // chart.homeZoomLevel = (coordinates && coordinates.zoomLevel) || 1
        // chart.homeGeoPoint = {
        //     latitude: (coordinates && coordinates.lat) || 0,
        //     longitude: (coordinates && coordinates.long) || 0
        //     // latitude: 55.85406929584602,
        //     // longitude: 28.24904034876191
        // }

        // Create hover state and set alternative fill color
        // let hs = polygonTemplate.states.create('hover')
        // hs.properties.fill = am4core.color('#3c5bdc')

        chart.data = data
        chart.logo.disabled = true

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data, countryCode])

    return (
        <div className="map-wrapper bg-white rounded-md h-full">
            <div
                ref={countryMapChartDiv}
                style={{ width: '100%', height: '430px', minHeight: '400px' }}
            />
        </div>
    )
}

export default CountryMap

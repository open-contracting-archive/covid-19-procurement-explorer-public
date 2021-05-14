import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { color, create, percent, useTheme } from '@amcharts/amcharts4/core'
import {
    HeatLegend,
    MapChart,
    MapPolygonSeries,
    ZoomControl,
    projections
} from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const GlobalMap = ({ data, coordinates, viewType }) => {
    const globalMapDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(globalMapDiv.current, MapChart)
        chart.chartContainer.wheelable = false

        // Set map definition
        chart.geodata = am4geodata_worldLow

        // Set projection
        chart.projection = new projections.Miller()

        // Create map polygon series
        let polygonSeries = chart.series.push(new MapPolygonSeries())

        // Exclude Antartica
        polygonSeries.exclude = ['AQ']
        polygonSeries.calculateVisualCenter = true
        polygonSeries.mapPolygons.template.tooltipPosition = 'fixed'

        chart.colors.list = [color('#F0F9E8'), color('#08589E')]

        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
            property: 'fill',
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(0),
            max: chart.colors.getIndex(1)
        })

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        // Set heatmap values for each state
        if (data) {
            polygonSeries.data = data
        }

        // Set up heat legend
        let heatLegend = chart.createChild(HeatLegend)
        heatLegend.series = polygonSeries
        heatLegend.align = 'center'
        heatLegend.valign = 'bottom'
        heatLegend.width = percent(80)
        heatLegend.marginRight = percent(4)
        heatLegend.orientation = 'horizontal'
        heatLegend.padding(20, 20, 20, 20)
        heatLegend.valueAxis.renderer.labels.template.fontSize = 10
        heatLegend.valueAxis.renderer.minGridDistance = 40

        polygonSeries.mapPolygons.template.events.on('over', (event) => {
            handleHover(event.target)
        })

        polygonSeries.mapPolygons.template.events.on('hit', (event) => {
            handleHover(event.target)
        })

        function handleHover(mapPolygon) {
            if (!isNaN(mapPolygon.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value)
            } else {
                heatLegend.valueAxis.hideTooltip()
            }
        }

        polygonSeries.mapPolygons.template.strokeOpacity = 0.4
        polygonSeries.mapPolygons.template.events.on('out', () => {
            heatLegend.valueAxis.hideTooltip()
        })

        // Configure series tooltip
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name}: {value}'
        polygonTemplate.nonScalingStroke = true
        polygonTemplate.strokeWidth = 0.5

        // Configure series
        polygonTemplate.tooltipHTML =
            viewType === 'value'
                ? '<b class="opacity-75">{name}</b> <br> <b class="opacity-75">Total Spending: ${value}</b><br><a href="{url}" style="font-size: 14px">View Details --&gt;</a>'
                : '<b class="opacity-75">{name}</b> <br> <b class="opacity-75">Total Contracts: {value}</b><br><a href="{url}" style="font-size: 14px">View Details --&gt;</a> '

        // Set up tooltips
        polygonSeries.calculateVisualCenter = true
        polygonTemplate.tooltipPosition = 'fixed'
        polygonSeries.tooltip.label.interactionsEnabled = true
        polygonSeries.tooltip.keepTargetHover = true

        // Zoom control
        chart.zoomControl = new ZoomControl()
        chart.zoomControl.valign = 'top'

        // Setting map's initial zoom
        chart.homeZoomLevel = (coordinates && coordinates.zoomLevel) || 1
        chart.homeGeoPoint = {
            latitude: (coordinates && coordinates.lat) || 0,
            longitude: (coordinates && coordinates.long) || 0
        }

        // Create hover state and set alternative fill color
        polygonTemplate.states.create('hover')

        chart.data = data
        chart.logo.disabled = true
        chart.numberFormatter.numberFormat = '#.##a'
        chart.numberFormatter.bigNumberPrefixes = [
            { number: 1e3, suffix: 'K' },
            { number: 1e6, suffix: 'M' },
            { number: 1e9, suffix: 'B' }
        ]

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data, coordinates])

    return (
        <div className="map-wrapper bg-white rounded-md h-full mt-5">
            <div ref={globalMapDiv} className="h-500 global-map-section" />
        </div>
    )
}

GlobalMap.propTypes = {
    data: PropTypes.array,
    coordinates: PropTypes.object,
    viewType: PropTypes.string
}

export default GlobalMap

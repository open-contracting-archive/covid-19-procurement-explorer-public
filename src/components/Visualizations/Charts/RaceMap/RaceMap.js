import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
    color,
    Container,
    create,
    ease,
    Label,
    percent,
    PlayButton,
    Slider,
    useTheme
} from '@amcharts/amcharts4/core'
import {
    HeatLegend,
    MapChart,
    MapPolygonSeries,
    ZoomControl,
    projections
} from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { formatYearText } from '../../../../helpers/date'

const RaceMap = ({
    sliderData,
    contractType,
    contractData,
    yearMonth,
    coordinates
}) => {
    const mapDiv = useRef(null)
    const [data, setData] = useState({})
    let yearMonthMapData = yearMonth

    const extractData = (selectedKey) => {
        const currentData = contractData[selectedKey] || {}
        return Object.entries(currentData).map(([countryCode, valObject]) => {
            return {
                id: countryCode,
                value: valObject[contractType] || 0,
                url: valObject.url
            }
        })
    }

    useEffect(() => {
        let mapData = extractData(yearMonthMapData)
        setData(mapData)
    }, [yearMonthMapData, contractData, contractType])

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(mapDiv.current, MapChart)
        chart.chartContainer.wheelable = false
        chart.responsive.enabled = true

        let label = chart.createChild(Label)
        label.y = percent(80)
        label.horizontalCenter = 'center'
        label.verticalCenter = 'middle'
        label.fontSize = 24
        label.padding(0, 50, 25, 50)
        label.align = 'center'

        // Set map definition
        chart.geodata = am4geodata_worldLow

        // Set projection
        chart.projection = new projections.Miller()

        // Create map polygon series
        let polygonSeries = chart.series.push(new MapPolygonSeries())

        // Exclude Antarctica
        polygonSeries.exclude = ['AQ']

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        chart.colors.list = [color('#F0F9E8'), color('#08589E')]

        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
            property: 'fill',
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(0),
            max: chart.colors.getIndex(1)
        })

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

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipHTML =
            contractType === 'value'
                ? '<b>{name}</b> <br> <b>Total Spending: ${value}</b><br><a href="{url}" style="font-size: 14px">View Details --&gt;</a>'
                : '<b>{name}</b> <br> <b>Total Contracts: {value}</b><br><a href="{url}" style="font-size: 14px">View Details --&gt;</a>'

        // Set up tooltips
        polygonSeries.calculateVisualCenter = true
        polygonTemplate.tooltipPosition = 'fixed'
        polygonSeries.tooltip.label.interactionsEnabled = true
        polygonSeries.tooltip.keepTargetHover = true

        // Set heatmap values for each state
        polygonSeries.data = data

        // Set up heat legend
        let heatLegend = chart.createChild(HeatLegend)
        heatLegend.series = polygonSeries
        heatLegend.align = 'center'
        heatLegend.valign = 'bottom'
        heatLegend.width = percent(80)
        heatLegend.marginBottom = percent(8)
        heatLegend.orientation = 'horizontal'
        heatLegend.padding(20, 20, 20, 20)
        heatLegend.valueAxis.renderer.labels.template.fontSize = 10
        heatLegend.valueAxis.renderer.minGridDistance = 40
        heatLegend.minColor = color('#A8DDB5')
        heatLegend.maxColor = color('#08589E')

        chart.zoomControl = new ZoomControl()
        chart.zoomControl.valign = 'top'

        // Setting map's initial zoom
        chart.homeZoomLevel = (coordinates && coordinates.zoomLevel) || 1
        chart.homeGeoPoint = {
            latitude: (coordinates && coordinates.lat) || 0,
            longitude: (coordinates && coordinates.long) || 0
        }

        chart.events.on('ready', function () {
            createSlider()
        })

        let slider

        let playButton

        let sliderAnimation

        // const years = Object.keys(data)
        // let currentYearIndex = 0
        // let currentYear = years[currentYearIndex] || ''
        label.text = formatYearText(yearMonthMapData)

        function createSlider() {
            let sliderContainer = chart.createChild(Container)
            sliderContainer.width = percent(100)
            sliderContainer.valign = 'bottom'
            sliderContainer.marginBottom = percent(4)
            sliderContainer.padding(0, 50, 25, 50)
            sliderContainer.layout = 'horizontal'
            sliderContainer.height = 50

            slider = sliderContainer.createChild(Slider)
            slider.valign = 'middle'
            slider.margin(0, 0, 0, 0)
            slider.background.opacity = 1
            slider.opacity = 0.8
            slider.background.fill = color('#DCEAEE')
            slider.marginTop = 50
            slider.marginRight = 10
            slider.height = 15

            slider.start = null

            // what to do when slider is dragged
            slider.events.on('rangechanged', function () {
                let index = Math.round(
                    (sliderData.length - 1) * (slider.start || 1)
                )
                const updatedData = extractData(sliderData[index])

                label.text = formatYearText(sliderData[index])

                for (var i = 0; i < updatedData.length; i++) {
                    let di = updatedData[i]
                    let polygon = polygonSeries.getPolygonById(di.id)

                    if (polygon) {
                        polygon.dataItem.dataContext.value = di.value
                    }
                    polygonSeries.invalidateRawData()
                }
            })

            playButton = sliderContainer.createChild(PlayButton)
            playButton.valign = 'middle'
            playButton.background.fill = color('#1FBBEC')
            playButton.events.on('toggled', function (event) {
                if (event.target.isActive) {
                    play()
                } else {
                    stop()
                }
            })

            slider.startGrip.events.on('drag', function () {
                stop()
                sliderAnimation.setProgress(slider.start)
            })

            sliderAnimation = slider
                .animate({ property: 'start', to: 1 }, 50000, ease.linear)
                .pause()
            sliderAnimation.events.on('animationended', function () {
                playButton.isActive = false
            })
        }

        function play() {
            if (slider) {
                if (slider.start >= 1) {
                    slider.start = 0
                    sliderAnimation.start()
                }
                sliderAnimation.resume()
                playButton.isActive = true
            }
        }

        function stop() {
            sliderAnimation.pause()
            playButton.isActive = false
        }

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
    }, [data, coordinates, formatYearText])

    return <div ref={mapDiv} className="race-map-section" />
}

RaceMap.propTypes = {
    sliderData: PropTypes.array,
    contractType: PropTypes.string,
    contractData: PropTypes.object,
    yearMonth: PropTypes.string,
    coordinates: PropTypes.object
}

export default RaceMap

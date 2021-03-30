/* Imports */
import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const Map = ({
    sliderData,
    contractType,
    contractData,
    yearMonth,
    coordinates
}) => {
    const mapchartDiv = useRef(null)
    const [data, setData] = useState({})
    // const [yearMonthMapData, setYearMonthMapData] = useState(yearMonth)
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
        // if (contractData) {
        //     // console.log(yearMonthMapData)
        //     setData(extractData(yearMonthMapData))
        // }
    }, [yearMonthMapData, contractData, contractType])

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(mapchartDiv.current, am4maps.MapChart)
        chart.chartContainer.wheelable = false

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
            max: chart.colors.getIndex(1).brighten(-0.5)
        })

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true

        // Set heatmap values for each state
        polygonSeries.data = data
        // console.log(polygonSeries.data)

        // Set up heat legend
        let heatLegend = chart.createChild(am4maps.HeatLegend)
        heatLegend.series = polygonSeries
        heatLegend.align = 'center'
        heatLegend.valign = 'bottom'
        heatLegend.width = am4core.percent(60)
        heatLegend.marginBottom = am4core.percent(8)

        heatLegend.series = polygonSeries
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

        chart.zoomControl = new am4maps.ZoomControl()
        chart.zoomControl.valign = 'top'

        // Setting map's initial zoom
        chart.homeZoomLevel = (coordinates && coordinates.zoomLevel) || 1
        chart.homeGeoPoint = {
            latitude: (coordinates && coordinates.lat) || 0,
            longitude: (coordinates && coordinates.long) || 0
            // latitude: 55.85406929584602,
            // longitude: 28.24904034876191
        }

        // Configure series tooltip
        let polygonTemplate = polygonSeries.mapPolygons.template
        polygonTemplate.tooltipText = '{name}: {value}'
        polygonTemplate.nonScalingStroke = true
        polygonTemplate.strokeWidth = 0.5
        // polygonTemplate.url = '/country/mexico'
        polygonTemplate.url = '{url}'

        // polygonSeries.mapPolygons.template.propertyFields.url = 'url'

        // Create hover state and set alternative fill color
        let hs = polygonTemplate.states.create('hover')
        hs.properties.fill = am4core.color('#3c5bdc')

        chart.events.on('ready', function () {
            createSlider()
        })

        let slider

        let playButton

        let sliderAnimation

        function createSlider() {
            let sliderContainer = chart.createChild(am4core.Container)

            sliderContainer.width = am4core.percent(100)
            sliderContainer.valign = 'bottom'
            sliderContainer.marginBottom = am4core.percent(4)
            sliderContainer.padding(0, 50, 25, 50)
            sliderContainer.layout = 'horizontal'
            sliderContainer.height = 50

            slider = sliderContainer.createChild(am4core.Slider)
            slider.valign = 'middle'
            slider.margin(0, 0, 0, 0)
            slider.background.opacity = 1
            slider.opacity = 0.8
            slider.background.fill = am4core.color('#DCEAEE')
            slider.marginTop = 50
            slider.marginRight = 10
            slider.height = 15

            // what to do when slider is dragged
            slider.events.on('rangechanged', function () {
                let index = Math.round((sliderData.length - 1) * slider.start)
                const updatedData = extractData(sliderData[index])

                // console.log(sliderData[index], 'Slider Data')

                for (var i = 0; i < updatedData.length; i++) {
                    let di = updatedData[i]
                    let polygon = polygonSeries.getPolygonById(di.id)

                    if (polygon) {
                        polygon.dataItem.dataContext.value = di.value
                    }

                    // polygonSeries.heatRules.getIndex(0).maxValue =
                    //     maxPC[currentType]

                    polygonSeries.invalidateRawData()
                }

                // polygonSeries.data = updatedData
            })

            playButton = sliderContainer.createChild(am4core.PlayButton)
            playButton.valign = 'middle'
            playButton.background.fill = am4core.color('#1FBBEC')
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
                .animate(
                    { property: 'start', to: 1 },
                    50000,
                    am4core.ease.linear
                )
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

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data, sliderData, coordinates])

    return (
        <div className="map-wrapper pb-6">
            <div ref={mapchartDiv} style={{ width: '100%', height: '750px' }} />
        </div>
    )
}

export default Map

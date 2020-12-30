/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const AreaChart = ({ data, apiData }) => {
    const areachartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(areachartDiv.current, am4charts.XYChart)
        chart.logo.height = 15
        am4core.options.queue = true
        // chart.exporting.menu = new am4core.ExportMenu()

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.ticks.template.disabled = true
        categoryAxis.renderer.line.opacity = 0
        categoryAxis.renderer.grid.template.disabled = true
        categoryAxis.renderer.labels.template.disabled = true
        categoryAxis.renderer.minGridDistance = 40
        categoryAxis.dataFields.category = apiData ? 'date' : 'month'
        categoryAxis.startLocation = 0.4
        categoryAxis.endLocation = 0.6

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.tooltip.disabled = true
        valueAxis.renderer.line.opacity = 0
        valueAxis.renderer.ticks.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.labels.template.disabled = true
        valueAxis.min = 0

        let lineSeries = chart.series.push(new am4charts.LineSeries())
        lineSeries.dataFields.categoryX = apiData ? 'date' : 'month'
        lineSeries.dataFields.valueY = 'value'
        lineSeries.tooltipText = 'value: {valueY.value}'
        lineSeries.fillOpacity = 1
        lineSeries.strokeWidth = 2
        lineSeries.stroke = '#1fbbec'
        lineSeries.fill = '#1fbbec'

        var gradient = new am4core.LinearGradient()
        gradient.addColor(am4core.color(''))

        var fillModifier = new am4core.LinearGradientModifier()
        fillModifier.opacities = [1, 0]
        fillModifier.offsets = [0, 1]
        fillModifier.gradient.rotation = 90
        lineSeries.segments.template.fillModifier = fillModifier

        // let bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        // bullet.circle.radius = 6
        // bullet.circle.fill = am4core.color('#fff')
        // bullet.circle.strokeWidth = 3

        chart.cursor = new am4charts.XYCursor()
        chart.cursor.behavior = 'panX'
        chart.cursor.lineX.opacity = 0
        chart.cursor.lineY.opacity = 0

        // chart.scrollbarX = new am4core.Scrollbar()
        // chart.scrollbarX.parent = chart.bottomAxesContainer

        chart.data = data
        chart.logo.disabled = true

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return (
        <div
            ref={areachartDiv}
            className="relative z-10"
            style={{ width: '100%', height: '90px' }}
        />
    )
}

export default AreaChart

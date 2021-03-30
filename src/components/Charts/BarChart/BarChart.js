/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const BarChart = ({ data, barColorValue, axisRotation }) => {
    const barchartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(barchartDiv.current, am4charts.XYChart)

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'method'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30
        categoryAxis.renderer.labels.template.verticalCenter = 'middle'
        categoryAxis.renderer.labels.template.rotation = axisRotation
        chart.yAxes.push(new am4charts.ValueAxis())

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'value'
        series.dataFields.categoryX = 'method'
        series.name = 'Value'
        series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
        series.columns.template.fillOpacity = 0.8
        series.columns.template.fill = am4core.color(barColorValue)

        let columnTemplate = series.columns.template
        columnTemplate.strokeWidth = 1
        columnTemplate.strokeOpacity = 1
        columnTemplate.stroke = '#ABBABF'

        chart.data = data
        chart.logo.disabled = true

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data, axisRotation, barColorValue])

    return <div ref={barchartDiv} style={{ width: '100%', height: '250px' }} />
}

export default BarChart

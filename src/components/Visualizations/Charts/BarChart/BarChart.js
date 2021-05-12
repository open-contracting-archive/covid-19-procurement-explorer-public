import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { color, create, useTheme } from '@amcharts/amcharts4/core'
import {
    CategoryAxis,
    ColumnSeries,
    ValueAxis,
    XYChart
} from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const BarChart = ({ data, barColorValue, axisRotation }) => {
    const barchartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(barchartDiv.current, XYChart)

        // Create axes
        let categoryAxis = chart.xAxes.push(new CategoryAxis())
        categoryAxis.dataFields.category = 'method'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30
        categoryAxis.renderer.labels.template.verticalCenter = 'middle'
        categoryAxis.renderer.labels.template.rotation = axisRotation
        chart.yAxes.push(new ValueAxis())

        // Create series
        let series = chart.series.push(new ColumnSeries())
        series.dataFields.valueY = 'value'
        series.dataFields.categoryX = 'method'
        series.name = 'Value'
        series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
        series.columns.template.fillOpacity = 0.8
        series.columns.template.fill = color(barColorValue)

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
    }, [data])

    return <div ref={barchartDiv} style={{ width: '100%', height: '250px' }} />
}

BarChart.propTypes = {
    data: PropTypes.array,
    barColorValue: PropTypes.string,
    axisRotation: PropTypes.string
}

export default BarChart

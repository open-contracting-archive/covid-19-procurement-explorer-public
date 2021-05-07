import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const HorizontalBarChart = ({ data }) => {
    const horizontalBarChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(
            horizontalBarChart.current,
            am4charts.XYChart
        )
        chart.padding(40, 40, 40, 40)

        chart.numberFormatter.bigNumberPrefixes = [
            { number: 1e3, suffix: 'K' },
            { number: 1e6, suffix: 'M' },
            { number: 1e9, suffix: 'B' }
        ]

        // Create axes

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'country'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 30
        categoryAxis.renderer.grid.template.disabled = true

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.renderer.labels.template.disabled = true

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueX = 'visits'
        series.dataFields.categoryY = 'country'
        series.name = 'Visits'
        series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]'
        series.columns.template.fillOpacity = 0.8
        series.columns.template.fill = '#ABBABF'

        let columnTemplate = series.columns.template
        columnTemplate.strokeWidth = 0
        columnTemplate.strokeOpacity = 1

        chart.data = data
        chart.logo.disabled = true

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return (
        <div
            ref={horizontalBarChart}
            style={{ width: '100%', height: '500px' }}
        />
    )
}

HorizontalBarChart.propTypes = {
    data: PropTypes.array
}

export default HorizontalBarChart

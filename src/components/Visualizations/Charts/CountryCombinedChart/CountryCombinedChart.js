import React, { useLayoutEffect, useRef } from 'react'
import { useTheme, create, percent, color } from '@amcharts/amcharts4/core'
import {
    CircleBullet,
    ColumnSeries,
    DateAxis,
    Legend,
    LineSeries,
    ValueAxis,
    XYChart,
    XYCursor
} from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const CountryCombinedChart = ({ data, label1, label2 }) => {
    const combinedChartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(combinedChartDiv.current, XYChart)

        // Create axes
        chart.xAxes.push(new DateAxis())

        let valueAxis1 = chart.yAxes.push(new ValueAxis())
        valueAxis1.title.text = 'World Average'

        // Create series
        function createSeries(field, name) {
            let series = chart.series.push(new ColumnSeries())
            series.dataFields.valueY = field
            series.dataFields.dateX = 'date'
            series.yAxis = valueAxis1
            series.name = name
            series.tooltipText = '{name}\n[bold font-size: 14]${valueY}M[/]'
            series.strokeWidth = 0
            series.clustered = true
            series.columns.template.width = percent(200)
            series.sequencedInterpolation = true
        }

        createSeries('value1', label1)

        if (label2) {
            createSeries('value2', label2)
        }

        let series2 = chart.series.push(new LineSeries())
        series2.dataFields.valueY = 'average'
        series2.dataFields.dateX = 'date'
        series2.name = 'World Average'
        series2.strokeWidth = 2
        series2.fill = '#B174FE'
        series2.tensionX = 0.7
        series2.yAxis = valueAxis1
        series2.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]'

        let bullet1 = series2.bullets.push(new CircleBullet())
        bullet1.circle.radius = 3
        bullet1.circle.strokeWidth = 2
        bullet1.circle.fill = color('#fff')

        // Add cursor
        chart.cursor = new XYCursor()

        // Add legend
        chart.legend = new Legend()
        chart.legend.position = 'top'

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
    }, [data])

    return <div ref={combinedChartDiv} className="h-400" />
}

export default CountryCombinedChart

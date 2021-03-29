/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const CountryCombinedChart = ({ data }) => {
    const combinedchartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(combinedchartDiv.current, am4charts.XYChart)

        // Create axes
        chart.xAxes.push(new am4charts.DateAxis())

        var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis1.title.text = 'World average'

        var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis2.title.text = 'Contract values'
        valueAxis2.renderer.opposite = true
        valueAxis2.renderer.grid.template.disabled = true

        // Create series
        var series1 = chart.series.push(new am4charts.ColumnSeries())
        series1.dataFields.valueY = 'sales1'
        series1.dataFields.dateX = 'date'
        series1.yAxis = valueAxis1
        series1.name = 'Spending'
        series1.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]'
        series1.fill = '#ABBABF'
        series1.strokeWidth = 0
        series1.clustered = false
        series1.columns.template.width = am4core.percent(40)

        var series2 = chart.series.push(new am4charts.LineSeries())
        series2.dataFields.valueY = 'market1'
        series2.dataFields.dateX = 'date'
        series2.name = 'World average'
        series2.strokeWidth = 2
        series2.fill = '#B174FE'
        series2.tensionX = 0.7
        series2.yAxis = valueAxis2
        series2.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]'

        var bullet1 = series2.bullets.push(new am4charts.CircleBullet())
        bullet1.circle.radius = 3
        bullet1.circle.strokeWidth = 2
        bullet1.circle.fill = am4core.color('#fff')

        // Add cursor
        chart.cursor = new am4charts.XYCursor()

        // Add legend
        chart.legend = new am4charts.Legend()
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

    return <div ref={combinedchartDiv} className="h-400" />
}

export default CountryCombinedChart

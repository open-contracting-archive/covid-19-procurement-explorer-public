/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const CombinedChart = (props) => {
    const { data, type, currency } = props
    const combinedchartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(combinedchartDiv.current, am4charts.XYChart)

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis())

        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis1.title.text = 'Covid case / deaths'
        valueAxis1.fontSize = 12

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis2.title.text =
            type == 'value' ? 'Contract values' : 'Contract numbers'
        valueAxis2.fontSize = 12
        valueAxis2.renderer.opposite = true
        valueAxis2.renderer.grid.template.disabled = true

        // Create series
        let series1 = chart.series.push(new am4charts.ColumnSeries())
        series1.dataFields.valueY = 'activeCase'
        series1.dataFields.dateX = 'date'
        series1.yAxis = valueAxis1
        series1.name = 'Active cases'
        series1.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]'
        series1.fill = '#ABBABF'
        series1.strokeWidth = 0
        series1.clustered = false
        series1.columns.template.width = am4core.percent(40)
        series1.fontSize = 12

        let series2 = chart.series.push(new am4charts.ColumnSeries())
        series2.dataFields.valueY = 'deathCase'
        series2.dataFields.dateX = 'date'
        series2.yAxis = valueAxis1
        series2.name = 'Death cases'
        series2.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]'
        // series2.fill = '#d0d0d0'
        series2.fill = '#abbabf80'
        series2.strokeWidth = 0
        series2.clustered = false
        series2.toBack()

        let series3 = chart.series.push(new am4charts.LineSeries())
        series3.dataFields.valueY = 'value'
        series3.dataFields.dateX = 'date'
        series3.name = type == 'value' ? 'Total spending' : 'Total contracts'
        series3.strokeWidth = 2
        series3.tensionX = 0.7
        series3.yAxis = valueAxis2
        series3.tooltipText =
            type == 'value'
                ? `{name}\n[bold font-size: 20]${
                      currency == 'usd' ? '$' : ''
                  }{valueY} [bold font-size: 20 text-transform: uppercase]${currency}[/]`
                : '{name}\n[bold font-size: 20]{valueY}[/]'
        series3.fontSize = 12

        let bullet3 = series3.bullets.push(new am4charts.CircleBullet())
        bullet3.circle.radius = 2
        bullet3.circle.strokeWidth = 2
        bullet3.circle.fill = am4core.color('#fff')

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

export default CombinedChart

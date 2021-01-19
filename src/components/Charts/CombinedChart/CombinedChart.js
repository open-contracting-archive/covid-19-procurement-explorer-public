/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const CombinedChart = ({ data, type }) => {
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
        //dateAxis.renderer.grid.template.location = 0;
        //dateAxis.renderer.minGridDistance = 30;

        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis1.title.text = 'Covid case/ deaths'
        valueAxis1.fontSize = 12

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis2.title.text =
            type == 'by-value' ? 'Contract values' : 'Contract numbers'
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
        series1.columns.template.width = am4core.percent(80)
        series1.fontSize = 12

        // let series2 = chart.series.push(new am4charts.ColumnSeries())
        // series2.dataFields.valueY = 'sales2'
        // series2.dataFields.dateX = 'date'
        // series2.yAxis = valueAxis1
        // series2.name = 'Actual Sales'
        // series2.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]'
        // series2.fill = chart.colors.getIndex(0).lighten(0.5)
        // series2.strokeWidth = 0
        // series2.clustered = false
        // series2.toBack()

        let series3 = chart.series.push(new am4charts.LineSeries())
        series3.dataFields.valueY = 'value'
        series3.dataFields.dateX = 'date'
        // for dummy data
        // series3.dataFields.valueY = 'market1'
        // series3.dataFields.dateX = 'date'
        series3.name = type == 'by-value' ? 'Total spending' : 'Total contracts'
        series3.fill = '#B174FE'
        series3.strokeWidth = 2
        series3.tensionX = 0.7
        series3.yAxis = valueAxis2
        series3.tooltipText =
            type == 'by-value'
                ? '{name}\n[bold font-size: 20]${valueY}[/]'
                : '{name}\n[bold font-size: 20]{valueY}[/]'
        series3.fontSize = 12

        let bullet3 = series3.bullets.push(new am4charts.CircleBullet())
        bullet3.circle.radius = 2
        bullet3.circle.strokeWidth = 2
        bullet3.circle.fill = am4core.color('#fff')

        // let series4 = chart.series.push(new am4charts.LineSeries())
        // series4.dataFields.valueY = 'market2'
        // series4.dataFields.dateX = 'date'
        // series4.name = 'Market Days ALL'
        // series4.strokeWidth = 2
        // series4.tensionX = 0.7
        // series4.yAxis = valueAxis2
        // series4.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]'
        // series4.stroke = chart.colors.getIndex(0).lighten(0.5)
        // series4.strokeDasharray = '3,3'

        // let bullet4 = series4.bullets.push(new am4charts.CircleBullet())
        // bullet4.circle.radius = 3
        // bullet4.circle.strokeWidth = 2
        // bullet4.circle.fill = am4core.color('#fff')

        // Add cursor
        chart.cursor = new am4charts.XYCursor()
        // chart.cursor.behavior = 'none'

        // Add legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'

        // Add scrollbar
        // chart.scrollbarX = new am4charts.XYChartScrollbar()
        // chart.scrollbarX.series.push(series1)
        // chart.scrollbarX.series.push(series3)
        // chart.scrollbarX.parent = chart.bottomAxesContainer

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

    return (
        <div
            ref={combinedchartDiv}
            style={{ width: '100%', height: '400px' }}
        />
    )
}

export default CombinedChart

/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const HorizontalBarChart = ({ data, colors }) => {
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
        chart.exporting.menu = new am4core.ExportMenu()

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.dataFields.category = 'network'
        categoryAxis.renderer.minGridDistance = 1
        categoryAxis.renderer.inversed = true
        categoryAxis.renderer.grid.template.disabled = true

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.min = 0

        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.categoryY = 'network'
        series.dataFields.valueX = 'MAU'
        series.tooltipText = '{valueX.value}'
        series.columns.template.strokeOpacity = 0
        series.columns.template.column.cornerRadiusBottomRight = 5
        series.columns.template.column.cornerRadiusTopRight = 5

        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = 'left'
        labelBullet.label.dx = 10
        labelBullet.label.text =
            "{values.valueX.workingValue.formatNumber('#.0as')}"
        labelBullet.locationX = 1

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add('fill', function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index)
        })

        categoryAxis.sortBySeries = series
        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={horizontalBarChart} style={{ width: '100%', height: '500px' }} />
}

export default HorizontalBarChart

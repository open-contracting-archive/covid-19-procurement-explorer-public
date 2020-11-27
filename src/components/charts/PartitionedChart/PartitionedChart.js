/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const PartitionedChart = ({ data }) => {
    const partitionedChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(partitionedChart.current, am4charts.XYChart)
        chart.exporting.menu = new am4core.ExportMenu()

        // Create axes
        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        yAxis.dataFields.category = 'state'
        yAxis.renderer.grid.template.location = 0
        yAxis.renderer.labels.template.fontSize = 10
        yAxis.renderer.minGridDistance = 10

        let xAxis = chart.xAxes.push(new am4charts.ValueAxis())

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueX = 'sales'
        series.dataFields.categoryY = 'state'
        series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]'
        series.columns.template.strokeWidth = 0
        series.columns.template.adapter.add('fill', function (fill, target) {
            if (target.dataItem) {
                switch (target.dataItem.dataContext.region) {
                    case 'Central':
                        return chart.colors.getIndex(0)
                        
                    case 'East':
                        return chart.colors.getIndex(1)
                        
                    case 'South':
                        return chart.colors.getIndex(2)
                        
                    case 'West':
                        return chart.colors.getIndex(3)
                        
                }
            }
            return fill
        })

        let axisBreaks = {}
        let legendData = []

        // Add ranges
        function addRange(label, start, end, color) {
            let range = yAxis.axisRanges.create()
            range.category = start
            range.endCategory = end
            range.label.text = label
            range.label.disabled = false
            range.label.fill = color
            range.label.location = 0
            range.label.dx = -130
            range.label.dy = 12
            range.label.fontWeight = 'bold'
            range.label.fontSize = 12
            range.label.horizontalCenter = 'left'
            range.label.inside = true

            range.grid.stroke = am4core.color('#396478')
            range.grid.strokeOpacity = 1
            range.tick.length = 200
            range.tick.disabled = false
            range.tick.strokeOpacity = 0.6
            range.tick.stroke = am4core.color('#396478')
            range.tick.location = 0

            range.locations.category = 1
            let axisBreak = yAxis.axisBreaks.create()
            axisBreak.startCategory = start
            axisBreak.endCategory = end
            axisBreak.breakSize = 1
            axisBreak.fillShape.disabled = true
            axisBreak.startLine.disabled = true
            axisBreak.endLine.disabled = true
            axisBreaks[label] = axisBreak

            legendData.push({ name: label, fill: color })
        }

        addRange('Central', 'Texas', 'North Dakota', chart.colors.getIndex(0))
        addRange('East', 'New York', 'West Virginia', chart.colors.getIndex(1))
        addRange('South', 'Florida', 'South Carolina', chart.colors.getIndex(2))
        addRange('West', 'California', 'Wyoming', chart.colors.getIndex(3))

        chart.cursor = new am4charts.XYCursor()

        let legend = new am4charts.Legend()
        legend.position = 'right'
        legend.scrollable = true
        legend.valign = 'top'
        legend.reverseOrder = true

        chart.legend = legend
        legend.data = legendData

        legend.itemContainers.template.events.on('toggled', function (event) {
            let name = event.target.dataItem.dataContext.name
            let axisBreak = axisBreaks[name]
            if (event.target.isActive) {
                axisBreak.animate(
                    { property: 'breakSize', to: 0 },
                    1000,
                    am4core.ease.cubicOut
                )
                yAxis.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext.region == name) {
                        dataItem.hide(1000, 500)
                    }
                })
                series.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext.region == name) {
                        dataItem.hide(1000, 0, 0, ['valueX'])
                    }
                })
            } else {
                axisBreak.animate(
                    { property: 'breakSize', to: 1 },
                    1000,
                    am4core.ease.cubicOut
                )
                yAxis.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext.region == name) {
                        dataItem.show(1000)
                    }
                })

                series.dataItems.each(function (dataItem) {
                    if (dataItem.dataContext.region == name) {
                        dataItem.show(1000, 0, ['valueX'])
                    }
                })
            }
        })

        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return (
        <div
            ref={partitionedChart}
            style={{ width: '100%', height: '800px' }}
        />
    )
}

export default PartitionedChart

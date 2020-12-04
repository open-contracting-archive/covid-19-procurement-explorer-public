/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const StackedChart = ({ data }) => {
    const stackedChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(stackedChart.current, am4charts.XYChart)

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'year'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.grid.template.disabled = true
        categoryAxis.renderer.labels.template.fontSize = 12

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.renderer.inside = true
        valueAxis.renderer.labels.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.min = 0

        // Create series
        function createSeries(field, name) {
            // Set up series
            let series = chart.series.push(new am4charts.ColumnSeries())
            series.name = name
            series.dataFields.valueY = field
            series.dataFields.categoryX = 'year'
            series.sequencedInterpolation = true

            // Make it stacked
            series.stacked = true

            // Configure columns
            series.columns.template.width = am4core.percent(60)
            series.columns.template.tooltipText =
                '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}'

            // Add label
            // let labelBullet = series.bullets.push(new am4charts.LabelBullet())
            // labelBullet.label.text = '{valueY}'
            // labelBullet.locationY = 0.5
            // labelBullet.label.hideOversized = true

            return series
        }

        createSeries('europe', 'Europe')
        createSeries('namerica', 'North America')
        createSeries('asia', 'Asia-Pacific')
        createSeries('lamerica', 'Latin America')
        createSeries('meast', 'Middle-East')
        createSeries('africa', 'Africa')

        // Legend
        chart.legend = new am4charts.Legend()
        chart.legend.useDefaultMarker = true
        let marker = chart.legend.markers.template.children.getIndex(0)
        marker.cornerRadius(0, 0, 0, 0)
        chart.legend.labels.template.fontSize = 12
        let markerTemplate = chart.legend.markers.template
        markerTemplate.width = 10
        markerTemplate.height = 10

        chart.colors.list = [
            am4core.color('#BEBADA'),
            am4core.color('#FCCDE5'),
            am4core.color('#8DD3C7'),
            am4core.color('#FB8072'),
            am4core.color('#BC80BD'),
            am4core.color('#D9D9D9'),
            am4core.color('#FDB462'),
            am4core.color('#FFED6F'),
            am4core.color('#B3DE69')
        ]

        chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={stackedChart} style={{ width: '100%', height: '345px' }} />
}

export default StackedChart

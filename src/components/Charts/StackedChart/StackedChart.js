/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const StackedChart = ({ data, currency }) => {
    const stackedChart = useRef(null)
    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(stackedChart.current, am4charts.XYChart)
        chart.responsive.enabled = true

        chart.colors.list = [
            am4core.color('#BEBADA'),
            am4core.color('#6E44FF'),
            am4core.color('#B3DE69'),
            am4core.color('#BC80BD'),
            am4core.color('#FB8072'),
            am4core.color('#FCCDE5'),
            am4core.color('#FDB462'),
            am4core.color('#99F7AB'),
            am4core.color('#FE654F'),
            am4core.color('#CE96A6'),
            am4core.color('#D6EFFF'),
            am4core.color('#60695C'),
        ]

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'month'
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
            series.dataFields.categoryX = 'month'
            series.sequencedInterpolation = true

            // Make it stacked
            series.stacked = true

            // Configure columns
            series.columns.template.width = am4core.percent(60)
            series.columns.template.tooltipText =
                `[bold]{name}[/]\n[font-size:14px]{categoryX}: ${currency === 'usd' ? '$' : ''}{valueY} [text-transform: uppercase font-size:14px]${currency}`

            return series
        }

        createSeries('construction-works--materials', 'Construction Works & Materials')
        createSeries('covid-tests--testing', 'Covid Tests & Testing')
        createSeries('medical-consumables-except-tests', 'Medical Consumables (except tests)')
        createSeries('medicines', 'Medicines')
        createSeries('other-medical-equipment', 'Other Medical Equipment')
        createSeries('personal-protective-equipment', 'Personal Protective Equipment')
        createSeries('sanitizing-supplies', 'Sanitizing Supplies')
        createSeries('vaccine', 'Vaccine')
        createSeries('ventilator', 'Ventilator')
        createSeries('other', 'Other')
        createSeries('not-identified', 'Not Classified')

        // Legend
        chart.legend = new am4charts.Legend()
        chart.legend.useDefaultMarker = true
        let marker = chart.legend.markers.template.children.getIndex(0)
        marker.cornerRadius(0, 0, 0, 0)
        chart.legend.labels.template.fontSize = 12
        let markerTemplate = chart.legend.markers.template
        markerTemplate.width = 10
        markerTemplate.height = 10

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

    return <div ref={stackedChart} className="h-500" />
}

export default StackedChart

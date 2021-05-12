import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { color, create, percent, useTheme } from '@amcharts/amcharts4/core'
import {
    CategoryAxis,
    ColumnSeries,
    Legend,
    ValueAxis,
    XYChart
} from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const StackedChart = ({ data, currency, viewType }) => {
    const stackedChart = useRef(null)
    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(stackedChart.current, XYChart)
        chart.responsive.enabled = true

        chart.colors.list = [
            color('#BEBADA'),
            color('#6E44FF'),
            color('#B3DE69'),
            color('#BC80BD'),
            color('#FB8072'),
            color('#FCCDE5'),
            color('#FDB462'),
            color('#99F7AB'),
            color('#FE654F'),
            color('#CE96A6'),
            color('#D6EFFF'),
            color('#60695C')
        ]

        // Create axes
        let categoryAxis = chart.xAxes.push(new CategoryAxis())
        categoryAxis.dataFields.category = 'month'
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.grid.template.disabled = true
        categoryAxis.renderer.labels.template.fontSize = 12

        let valueAxis = chart.yAxes.push(new ValueAxis())
        valueAxis.renderer.inside = true
        valueAxis.renderer.labels.template.disabled = true
        valueAxis.renderer.grid.template.disabled = true
        valueAxis.min = 0

        // Create series
        function createSeries(field, name) {
            // Set up series
            let series = chart.series.push(new ColumnSeries())
            series.name = name
            series.dataFields.valueY = field
            series.dataFields.categoryX = 'month'
            series.sequencedInterpolation = true

            // Make it stacked
            series.stacked = true

            // Configure columns
            series.columns.template.width = percent(60)
            series.columns.template.tooltipText = `[bold]{name}[/]\n[font-size:14px]{categoryX}: ${
                viewType === 'value' ? (currency === 'usd' ? '$' : '') : ''
            }{valueY} [text-transform: uppercase font-size:14px] ${
                viewType === 'value' ? currency : ''
            }`

            return series
        }

        createSeries(
            'construction-works--materials',
            'Construction Works & Materials'
        )
        createSeries('covid-tests--testing', 'Covid Tests & Testing')
        createSeries(
            'medical-consumables-except-tests',
            'Medical Consumables (except tests)'
        )
        createSeries('medicines', 'Medicines')
        createSeries('other-medical-equipment', 'Other Medical Equipment')
        createSeries(
            'personal-protective-equipment',
            'Personal Protective Equipment'
        )
        createSeries('sanitizing-supplies', 'Sanitizing Supplies')
        createSeries('vaccine', 'Vaccine')
        createSeries('ventilator', 'Ventilator')
        createSeries('other', 'Other')
        createSeries('not-identified', 'Not Identified')

        // Legend
        chart.legend = new Legend()
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

StackedChart.propTypes = {
    data: PropTypes.array,
    currency: PropTypes.string,
    viewType: PropTypes.string
}

export default StackedChart

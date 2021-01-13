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
        chart.exporting.menu = new am4core.ExportMenu()
        chart.exporting.filePrefix = 'timeline_chart'
        chart.exporting.menu.items = [
            {
                label: 'Download',
                menu: [
                    {
                        label: 'Image',
                        menu: [
                            { type: 'png', label: 'PNG' },
                            { type: 'jpg', label: 'JPG' },
                            { type: 'pdf', label: 'PDF' }
                        ]
                    },
                    {
                        label: 'Data',
                        menu: [
                            { type: 'json', label: 'JSON' },
                            { type: 'csv', label: 'CSV' },
                            { type: 'pdfdata', label: 'PDF' }
                        ]
                    },
                    {
                        label: 'Print',
                        type: 'print'
                    }
                ]
            }
        ]

        chart.colors.list = [
            am4core.color('#BEBADA'),
            am4core.color('#FCCDE5'),
            am4core.color('#B3DE69'),
            am4core.color('#BC80BD'),
            am4core.color('#FB8072'),
            am4core.color('#8DD3C7'),
            am4core.color('#D9D9D9'),
            am4core.color('#FDB462'),
            am4core.color('#FFED6F'),
            am4core.color('#60695C'),
            am4core.color('#99F7AB'),
            am4core.color('#D6EFFF'),
            am4core.color('#FE654F'),
            am4core.color('#6E44FF'),
            am4core.color('#CE96A6'),
            am4core.color('#C5D6D8')
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
                '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}'

            // Add label
            // let labelBullet = series.bullets.push(new am4charts.LabelBullet())
            // labelBullet.label.text = '{valueY}'
            // labelBullet.locationY = 0.5
            // labelBullet.label.hideOversized = true

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
        createSeries('ventilators', 'Ventilators')

        createSeries('sanitizing-supplies', 'Sanitizing Supplies')
        createSeries('goods-services', 'Goods/Services')
        createSeries(
            'personal-protective-equipment',
            'Personal Protective Equipment'
        )
        createSeries('other-medical-equipment', 'Other Medical Equipment')
        createSeries('goodsservices', 'Goods/Services')
        createSeries('not-classified', 'Not Classified')
        createSeries('ventilator', 'Ventilator')
        createSeries('medical-consumables', 'Medical Consumables')
        createSeries('others', 'Others')
        createSeries('vaccine', 'Vaccine')
        createSeries('other', 'Other')

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

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={stackedChart} style={{ width: '100%', height: '500px' }} />
}

export default StackedChart

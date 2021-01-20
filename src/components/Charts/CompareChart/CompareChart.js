import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { toCamelCase } from '../../../helpers/general'

const CompareChart = ({ chartData, equities }) => {
    const compareChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(compareChart.current, am4charts.XYChart)
        chart.padding(0, 15, 0, 15)
        chart.colors.step = 3
        chart.cursor = new am4charts.XYCursor()
        chart.data = chartData
        chart.logo.disabled = true
        chart.numberFormatter.numberFormat = '#.##a'
        chart.numberFormatter.bigNumberPrefixes = [
            { number: 1e3, suffix: 'K' },
            { number: 1e6, suffix: 'M' },
            { number: 1e9, suffix: 'B' }
        ]

        // the following line makes value axes to be arranged vertically.
        chart.leftAxesContainer.layout = 'vertical'

        // uncomment this line if you want to change order of axes
        //chart.bottomAxesContainer.reverseOrder = true;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
        dateAxis.renderer.grid.template.location = 0
        dateAxis.renderer.ticks.template.length = 8
        dateAxis.renderer.ticks.template.strokeOpacity = 0.1
        dateAxis.renderer.grid.template.disabled = true
        dateAxis.renderer.ticks.template.disabled = false
        dateAxis.renderer.ticks.template.strokeOpacity = 0.2
        dateAxis.renderer.minLabelPosition = 0.01
        dateAxis.renderer.maxLabelPosition = 0.99
        dateAxis.keepSelection = true
        dateAxis.groupData = true
        dateAxis.minZoomCount = 5
        // these two lines makes the axis to be initially zoomed-in
        // dateAxis.start = 0.7;
        // dateAxis.keepSelection = true

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis.tooltip.disabled = true
        valueAxis.zIndex = 1
        valueAxis.renderer.baseGrid.disabled = true
        // height of axis
        valueAxis.height = am4core.percent(65)
        valueAxis.renderer.gridContainer.background.fill = am4core.color(
            '#000000'
        )
        valueAxis.renderer.gridContainer.background.fillOpacity = 0.05
        valueAxis.renderer.inside = true
        valueAxis.renderer.labels.template.verticalCenter = 'bottom'
        valueAxis.renderer.labels.template.padding(2, 2, 2, 2)
        //valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.fontSize = '0.8em'

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxis2.tooltip.disabled = true
        // height of axis
        valueAxis2.height = am4core.percent(35)
        valueAxis2.zIndex = 3
        // this makes gap between panels
        valueAxis2.marginTop = 30
        valueAxis2.renderer.baseGrid.disabled = true
        valueAxis2.renderer.inside = true
        valueAxis2.renderer.labels.template.verticalCenter = 'bottom'
        valueAxis2.renderer.labels.template.padding(2, 2, 2, 2)
        //valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis2.renderer.fontSize = '0.8em'
        valueAxis2.renderer.gridContainer.background.fill = am4core.color(
            '#000000'
        )
        valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05

        let volumeSeries = chart.series.push(new am4charts.StepLineSeries())
        volumeSeries.fillOpacity = 1
        volumeSeries.fill = '#ABBABF'
        volumeSeries.stroke = '#ABBABF'
        volumeSeries.dataFields.dateX = 'month'
        volumeSeries.dataFields.valueY = 'sum'
        volumeSeries.yAxis = valueAxis2
        volumeSeries.tooltipText = 'Total: {valueY.value}'
        volumeSeries.name = 'Total'
        // volume should be summed
        volumeSeries.groupFields.valueY = 'sum'
        volumeSeries.tooltip.label.fill = volumeSeries.stroke

        equities.forEach((equityItem) => {
            let equitySeries = chart.series.push(new am4charts.LineSeries())
            equitySeries.dataFields.dateX = 'month'
            equitySeries.dataFields.valueY = toCamelCase(equityItem.equity)
            // equitySeries.dataFields.valueYShow = 'changePercent'
            equitySeries.tooltipText = '{name}: {valueY}'
            equitySeries.name = equityItem.equity
            equitySeries.tooltip.getFillFromObject = false
            equitySeries.tooltip.getStrokeFromObject = true
            equitySeries.tooltip.background.fill = am4core.color('#fff')
            equitySeries.tooltip.background.strokeWidth = 2
            equitySeries.tooltip.label.fill = equitySeries.stroke
            equitySeries.stroke = equityItem.color
            equitySeries.fill = equityItem.color
        })

        return () => {
            chart.dispose()
            chart = null
        }
    }, [chartData, equities])

    return <div className="h-full w-full" ref={compareChart} />
}

export default CompareChart

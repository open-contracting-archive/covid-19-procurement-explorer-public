/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const SankeyChart = ({ data }) => {
    const sankeyChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(sankeyChart.current, am4charts.SankeyDiagram)
        chart.hiddenState.properties.opacity = 0
        chart.responsive.enabled = true

        let hoverState = chart.links.template.states.create('hover')
        hoverState.properties.fillOpacity = 0.6

        chart.dataFields.fromName = 'from'
        chart.dataFields.toName = 'to'
        chart.dataFields.value = 'value'

        // for right-most label to fit
        chart.paddingRight = 120

        // make nodes draggable
        let nodeTemplate = chart.nodes.template
        nodeTemplate.inert = true
        nodeTemplate.readerTitle = 'Drag me!'
        nodeTemplate.showSystemTooltip = true
        nodeTemplate.width = 20

        // make nodes draggable
        nodeTemplate.readerTitle = 'Click to show/hide or drag to rearrange'
        nodeTemplate.showSystemTooltip = true
        nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

        nodeTemplate.nameLabel.height = undefined
        nodeTemplate.nameLabel.label.hideOversized = true

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

    return <div ref={sankeyChart} className="h-400" />
}

export default SankeyChart

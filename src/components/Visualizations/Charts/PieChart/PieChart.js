import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
    color,
    create,
    DropShadowFilter,
    percent,
    useTheme
} from '@amcharts/amcharts4/core'
import { PieChart as Pie_Chart, PieSeries } from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const PieChart = ({ data, colors }) => {
    const pieChartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = create(pieChartDiv.current, Pie_Chart)

        // Add and configure Series
        let pieSeries = chart.series.push(new PieSeries())
        pieSeries.dataFields.value = 'number'
        pieSeries.dataFields.category = 'value'

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = percent(45)

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = color('#fff')
        pieSeries.slices.template.strokeWidth = 2
        pieSeries.slices.template.strokeOpacity = 1
        // change the cursor on hover to make it apparent the object can be interacted with
        pieSeries.slices.template.cursorOverStyle = [
            {
                property: 'cursor',
                value: 'pointer'
            }
        ]

        pieSeries.alignLabels = false
        pieSeries.labels.template.bent = true
        pieSeries.labels.template.radius = 3
        pieSeries.labels.template.padding(0, 0, 0, 0)
        pieSeries.labels.template.disabled = true

        pieSeries.ticks.template.disabled = true

        // Create a base filter effect (as if it's not there) for the hover to return to
        let shadow = pieSeries.slices.template.filters.push(
            new DropShadowFilter()
        )
        shadow.opacity = 0

        // Create hover state
        let hoverState = pieSeries.slices.template.states.getKey('hover') // normally we have to create the hover state, in this case it already exists

        // Slightly shift the shadow and make it more prominent on hover
        let hoverShadow = hoverState.filters.push(new DropShadowFilter())
        hoverShadow.opacity = 0.7
        hoverShadow.blur = 5

        pieSeries.colors.list = colors.map((colorItem) => {
            return color(colorItem)
        })

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

    return <div ref={pieChartDiv} className="w-full h-32" />
}

PieChart.propTypes = {
    data: PropTypes.array,
    colors: PropTypes.array
}

export default PieChart

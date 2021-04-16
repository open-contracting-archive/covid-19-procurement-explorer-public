/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const TreeMapChart = ({ data }) => {
    const treeMapChart = useRef(null)

    function processData(data) {
        return data.map(({ name, value }) => {
            return { name, children: [{ name, count: value }] }
        })
    }

    useLayoutEffect(() => {
        // console.log('date updated')
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)

        // Themes end

        // Create chart instance
        let chart = am4core.create(treeMapChart.current, am4charts.TreeMap)
        chart.padding(0, 0, 0, 0)
        chart.hiddenState.properties.opacity = 0

        // only one level visible initially
        chart.maxLevels = 2
        // define data fields
        chart.dataFields.value = 'count'
        chart.dataFields.name = 'name'
        chart.dataFields.children = 'children'

        // enable navigation
        chart.navigationBar = new am4charts.NavigationBar()
        chart.zoomable = false

        // level 0 series template
        let level0SeriesTemplate = chart.seriesTemplates.create('0')
        level0SeriesTemplate.strokeWidth = 2

        // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
        level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1
        level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true
        // create hover state
        let columnTemplate = level0SeriesTemplate.columns.template
        let hoverState = columnTemplate.states.create('hover')

        // darken
        hoverState.adapter.add('fill', function (fill) {
            if (fill instanceof am4core.Color) {
                return am4core.color(am4core.colors.brighten(fill.rgb, -0.2))
            }
            return fill
        })

        // level1 series template
        let level1SeriesTemplate = chart.seriesTemplates.create('1')
        level1SeriesTemplate.columns.template.fillOpacity = 0
        level1SeriesTemplate.columns.template.strokeOpacity = 0.4

        let bullet1 = level1SeriesTemplate.bullets.push(
            new am4charts.LabelBullet()
        )
        bullet1.locationX = 0.5
        bullet1.locationY = 0.5
        bullet1.label.text = '{name}'
        bullet1.label.fill = am4core.color('#ffffff')
        bullet1.label.fontSize = 14
        bullet1.label.wrap = true
        bullet1.label.fillOpacity = 0.7

        chart.data = processData(data)
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

    return <div ref={treeMapChart} className="h-400" />
}

export default TreeMapChart

/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const TreeMapChart = ({ data }) => {
    const treeMapChart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        function processData(data) {
            let treeData = []

            let smallBrands = { name: 'Other', children: [] }

            for (var brand in data) {
                let brandData = { name: brand, children: [] }
                let brandTotal = 0
                for (var model in data[brand]) {
                    brandTotal += data[brand][model]

                    if (data[brand][model] > 100) {
                        brandData.children.push({
                            name: model,
                            count: data[brand][model]
                        })
                    }
                }

                // only bigger brands
                if (brandTotal > 200000) {
                    treeData.push(brandData)
                }
            }

            return treeData
        }

        // Create chart instance
        let chart = am4core.create(treeMapChart.current, am4charts.TreeMap)
        chart.padding(0, 0, 0, 0)
        chart.hiddenState.properties.opacity = 0

        chart.exporting.menu = new am4core.ExportMenu()

        // only one level visible initially
        chart.maxLevels = 2
        // define data fields
        chart.dataFields.value = 'count'
        chart.dataFields.name = 'name'
        chart.dataFields.children = 'children'
        chart.homeText = 'US Car Sales 2017'

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
        hoverState.adapter.add('fill', function (fill, target) {
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
        bullet1.label.fontSize = 9
        bullet1.label.fillOpacity = 0.7

        chart.data = processData(data)

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={treeMapChart} style={{ width: '100%', height: '400px' }} />
}

export default TreeMapChart

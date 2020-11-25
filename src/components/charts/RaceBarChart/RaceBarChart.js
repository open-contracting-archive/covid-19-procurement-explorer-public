/* Imports */
import React, { useLayoutEffect, useRef, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

const RaceBarChart = ({ data }) => {
    const raceBarchart = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        // Create chart instance
        let chart = am4core.create(raceBarchart.current, am4charts.XYChart)
        chart.padding(40, 40, 40, 40)

        chart.numberFormatter.bigNumberPrefixes = [
            { number: 1e3, suffix: 'K' },
            { number: 1e6, suffix: 'M' },
            { number: 1e9, suffix: 'B' }
        ]

        chart.exporting.menu = new am4core.ExportMenu()

        let label = chart.plotContainer.createChild(am4core.Label)
        label.x = am4core.percent(97)
        label.y = am4core.percent(95)
        label.horizontalCenter = 'right'
        label.verticalCenter = 'middle'
        label.dx = -15
        label.fontSize = 50

        let playButton = chart.plotContainer.createChild(am4core.PlayButton)
        playButton.x = am4core.percent(97)
        playButton.y = am4core.percent(95)
        playButton.dy = -2
        playButton.verticalCenter = 'middle'
        playButton.events.on('toggled', function (event) {
            if (event.target.isActive) {
                play()
            } else {
                stop()
            }
        })

        let stepDuration = 4000

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.dataFields.category = 'network'
        categoryAxis.renderer.minGridDistance = 1
        categoryAxis.renderer.inversed = true
        categoryAxis.renderer.grid.template.disabled = true

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.min = 0
        valueAxis.rangeChangeEasing = am4core.ease.linear
        valueAxis.rangeChangeDuration = stepDuration
        valueAxis.extraMax = 0.1

        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.categoryY = 'network'
        series.dataFields.valueX = 'MAU'
        series.tooltipText = '{valueX.value}'
        series.columns.template.strokeOpacity = 0
        series.columns.template.column.cornerRadiusBottomRight = 5
        series.columns.template.column.cornerRadiusTopRight = 5
        series.interpolationDuration = stepDuration
        series.interpolationEasing = am4core.ease.linear

        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = 'right'
        labelBullet.label.text =
            "{values.valueX.workingValue.formatNumber('#.0as')}"
        labelBullet.label.textAlign = 'end'
        labelBullet.label.dx = -10

        chart.zoomOutButton.disabled = true

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add('fill', function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index)
        })

        let year = 2003
        label.text = year.toString()

        let interval

        function play() {
            interval = setInterval(function () {
                nextYear()
            }, stepDuration)
            nextYear()
        }

        function stop() {
            if (interval) {
                clearInterval(interval)
            }
        }

        function nextYear() {
            year++

            if (year > 2018) {
                year = 2003
            }

            let newData = data[year]
            let itemsWithNonZero = 0
            for (var i = 0; i < chart.data.length; i++) {
                chart.data[i].MAU = newData[i].MAU
                if (chart.data[i].MAU > 0) {
                    itemsWithNonZero++
                }
            }

            if (year == 2003) {
                series.interpolationDuration = stepDuration / 4
                valueAxis.rangeChangeDuration = stepDuration / 4
            } else {
                series.interpolationDuration = stepDuration
                valueAxis.rangeChangeDuration = stepDuration
            }

            chart.invalidateRawData()
            label.text = year.toString()

            categoryAxis.zoom({
                start: 0,
                end: itemsWithNonZero / categoryAxis.dataItems.length
            })
        }

        categoryAxis.sortBySeries = series

        chart.data = JSON.parse(JSON.stringify(data[year]))
        categoryAxis.zoom({ start: 0, end: 1 / chart.data.length })

        series.events.on('inited', function () {
            setTimeout(function () {
                playButton.isActive = true // this starts interval
            }, 2000)
        })

        // chart.data = data

        return () => {
            chart.dispose()

            chart = null
        }
    }, [data])

    return <div ref={raceBarchart} style={{ width: '100%', height: '400px' }} />
}

export default RaceBarChart

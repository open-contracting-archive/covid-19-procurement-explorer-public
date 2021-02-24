/* Imports */
import React, { useLayoutEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { formatYearText } from '../../../helpers/date'

const BarChartRace = ({ data }) => {
    const raceBarChartDiv = useRef(null)

    useLayoutEffect(() => {
        /* Chart code */
        // Themes begin
        am4core.useTheme(am4themes_animated)
        // Themes end

        let chart = am4core.create(raceBarChartDiv.current, am4charts.XYChart)
        chart.padding(40, 40, 40, 40)
        chart.responsive.enabled = true

        let label = chart.plotContainer.createChild(am4core.Label)
        label.x = am4core.percent(97)
        label.y = am4core.percent(90)
        label.horizontalCenter = 'right'
        label.verticalCenter = 'middle'
        label.dx = -15
        label.fontSize = 24

        let playButton = chart.plotContainer.createChild(am4core.PlayButton)
        playButton.x = am4core.percent(97)
        playButton.y = am4core.percent(90)
        playButton.dy = -2
        playButton.verticalCenter = 'middle'
        playButton.events.on('toggled', function (event) {
            if (event.target.isActive) {
                play()
            } else {
                stop()
            }
        })

        let stepDuration = 1000

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'country'
        categoryAxis.renderer.grid.template.disabled = true
        categoryAxis.renderer.grid.template.location = 0
        categoryAxis.renderer.minGridDistance = 1
        categoryAxis.renderer.inversed = true
        categoryAxis.renderer.grid.template.strokeOpacity = 0
        categoryAxis.renderer.tooltip.dx = -40

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.min = 0
        valueAxis.rangeChangeEasing = am4core.ease.linear
        valueAxis.rangeChangeDuration = stepDuration
        valueAxis.extraMax = 0.1
        valueAxis.cursorTooltipEnabled = true

        // valueAxis.renderer.inside = true
        // valueAxis.renderer.labels.template.fillOpacity = 0.3
        // valueAxis.renderer.grid.template.strokeOpacity = 0
        // valueAxis.renderer.baseGrid.strokeOpacity = 0
        // valueAxis.renderer.labels.template.dy = 20

        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.categoryY = 'country'
        series.dataFields.valueX = 'value'
        series.tooltipText = '{valueX.value}'
        series.columns.template.strokeOpacity = 0
        series.columns.template.column.cornerRadiusBottomRight = 5
        series.columns.template.column.cornerRadiusTopRight = 5
        series.interpolationDuration = stepDuration
        series.interpolationEasing = am4core.ease.linear
        series.tooltip.pointerOrientation = 'vertical'
        series.tooltip.dy = -30
        series.columnsContainer.zIndex = 100

        // let columnTemplate = series.columns.template
        // columnTemplate.height = am4core.percent(50)
        // columnTemplate.column.cornerRadius(60, 10, 60, 10)
        // columnTemplate.strokeOpacity = 0

        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = 'right'
        labelBullet.label.text = '{valueX.value}'
        labelBullet.label.truncate = false
        labelBullet.label.hideOversized = false
        labelBullet.label.dx = 50
        labelBullet.label.textAlign = 'end'

        // var bullet = columnTemplate.createChild(am4charts.CircleBullet)
        // bullet.circle.radius = 20
        // bullet.valign = 'middle'
        // bullet.align = 'left'
        // bullet.isMeasured = true
        // bullet.interactionsEnabled = false
        // bullet.horizontalCenter = 'right'
        // bullet.interactionsEnabled = false
        // bullet.dx = -20

        // var image = bullet.createChild(am4core.Image)
        // image.width = 40
        // image.height = 40
        // image.horizontalCenter = 'middle'
        // image.verticalCenter = 'middle'
        // image.propertyFields.href = 'href'

        // image.adapter.add('mask', function (mask, target) {
        //     var circleBullet = target.parent
        //     return circleBullet.circle
        // })

        chart.zoomOutButton.disabled = true

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add('fill', function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index)
        })

        const years = Object.keys(data)
        let currentYearIndex = 0
        const lastYearIndex = years.length - 1
        let currentYear = years[currentYearIndex] || ''
        label.text = formatYearText(currentYear)

        let interval

        function play() {
            interval = setInterval(function () {
                if (chart) {
                    nextYear()
                }
            }, stepDuration)
            // nextYear()
        }

        function stop() {
            if (interval) {
                clearInterval(interval)
            }
        }

        function nextYear() {
            currentYearIndex++

            if (currentYearIndex > lastYearIndex) {
                currentYearIndex = 0
            }

            currentYear = years[currentYearIndex]

            let newData = data[currentYear]
            let itemsWithNonZero = 0
            for (let i = 0; i < chart.data.length; i++) {
                chart.data[i].value = newData[i].value
                // if (chart.data[i].value > 0) {
                itemsWithNonZero++
                // }
            }

            if (currentYearIndex === 0) {
                series.interpolationDuration = stepDuration / 4
                valueAxis.rangeChangeDuration = stepDuration / 4
            } else {
                series.interpolationDuration = stepDuration
                valueAxis.rangeChangeDuration = stepDuration
            }

            chart.invalidateRawData()
            label.text = formatYearText(currentYear)

            categoryAxis.zoom({
                start: 0,
                end: itemsWithNonZero / categoryAxis.dataItems.length
            })
        }

        categoryAxis.sortBySeries = series

        chart.cursor = new am4charts.XYCursor()
        chart.cursor.lineX.opacity = 0
        chart.cursor.lineY.opacity = 0

        chart.data = JSON.parse(JSON.stringify(data[currentYear]))
        chart.logo.disabled = true

        chart.numberFormatter.numberFormat = '##.#a'
        chart.numberFormatter.bigNumberPrefixes = [
            { number: 1e3, suffix: 'K' },
            { number: 1e6, suffix: 'M' },
            { number: 1e9, suffix: 'B' }
        ]

        categoryAxis.zoom({
            start: 0,
            end: data[currentYear].length / chart.data.length
        })

        series.events.on('inited', function () {
            setTimeout(function () {
                playButton.isActive = true // this starts interval
            }, 2000)
        })

        return () => {
            chart.dispose()
            chart = null
        }
    }, [data])

    return <div ref={raceBarChartDiv} className="race-map-section" />
}

export default BarChartRace

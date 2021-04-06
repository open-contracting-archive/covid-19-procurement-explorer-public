import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { T } from '@transifex/react'
import { CountryCombinedChart } from './Charts'
import { Loader, ChartFooter, ErrorHandler } from '../Utilities'
import VisualizationService from '../../services/VisualizationService'
import Select from 'react-select'
import { map, groupBy, sumBy } from 'lodash'

const CountryProductComparisonChart = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { product, country } = props
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([])
    const [chartData, setChartData] = useState([])
    const [compareWithCountry, setCompareWithCountry] = useState(null)
    const [error, setError] = useState(false)
    const fullScreenHandler = useFullScreenHandle()
    const countries = useSelector((state) => state.general.countries)

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.ProductSpendingComparison({ product: product.id })
            .then((result) => {
                setLoading(false)
                if (result) {
                    setOriginalData(result)
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                setError(true)
            })

        return () => {
            setOriginalData([])
        }
    }, [product])

    useEffect(() => {
        if (originalData.length > 0) {
            const finalData = map(
                groupBy(originalData, 'month'),
                (data, month) => {
                    const countryItem = data.find(
                        (item) =>
                            item.country_code === country.country_code_alpha_2
                    )
                    const compareCountryItem =
                        compareWithCountry &&
                        data.find(
                            (item) =>
                                item.country_code === compareWithCountry.value
                        )
                    let monthData = {
                        date: month,
                        average: sumBy(data, 'amount_usd') / data.length,
                        value1: countryItem ? countryItem['amount_usd'] : 0
                    }

                    if (compareWithCountry) {
                        monthData['value2'] = compareCountryItem
                            ? compareCountryItem['amount_usd']
                            : 0
                    }

                    return monthData
                }
            )
            setChartData(finalData)
        }
        return () => {
            setChartData([])
        }
    }, [originalData, countries, compareWithCountry])

    const countryList = () => {
        return countries
            .filter(
                (countryItem) =>
                    countryItem.country_code_alpha_2 !== 'gl' &&
                    countryItem.id !== country.id
            )
            .map((country) => {
                return {
                    label: country.name,
                    value: country.country_code_alpha_2
                }
            })
            .sort((a, b) => {
                return a.label < b.label ? -1 : 0
            })
    }

    return (
        <div className="flex flex-wrap -mb-4">
            <div className="w-full px-4 pb-4 mb-4 border rounded border-blue-0">
                <FullScreen handle={fullScreenHandler}>
                    <h2 className="inline-block px-4 pt-4 font-bold uppercase text-primary-dark">
                        <T _str={product.name} />
                        <span className="ml-2">
                            <T _str="spending comparison with the world" />
                        </span>
                    </h2>

                    <div className="flex items-center px-4 pt-4">
                        <span className="mr-2">
                            <T _str="Compare" />
                        </span>
                        <div className="mr-4">
                            <span className="px-2 py-1 mr-2 text-sm font-medium rounded bg-blue-0">
                                {country.name}
                            </span>
                            <T _str="with" />
                        </div>
                        <div>
                            <Select
                                className="w-2/12 text-sm country select-filter"
                                classNamePrefix="select-filter"
                                options={countryList()}
                                onChange={(selectedCountry) => {
                                    setCompareWithCountry(selectedCountry)
                                }}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : !error ? (
                        <CountryCombinedChart
                            data={chartData}
                            label1={country.name}
                            label2={
                                compareWithCountry
                                    ? compareWithCountry.label
                                    : null
                            }
                        />
                    ) : (
                        <ErrorHandler />
                    )}
                </FullScreen>
                <ChartFooter fullScreenHandler={fullScreenHandler} />
            </div>
        </div>
    )
}

export default CountryProductComparisonChart

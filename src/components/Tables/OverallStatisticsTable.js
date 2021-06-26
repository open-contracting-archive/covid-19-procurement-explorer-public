import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { get } from 'lodash'
import { T } from '@transifex/react'
import { Loader, ChartFooter } from '../Utilities'
import VisualizationService from '../../services/VisualizationService'
import { mediaUrl } from '../../helpers/general'
import { durationInMonths } from '../../helpers/date'

const OverallStatisticsTable = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [originalData, setOriginalData] = useState([])
    const [sortedList, setSortedList] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.OverallStatistics()
            .then((response) => {
                if (response.results) {
                    setOriginalData(response.results)
                }
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {
            setOriginalData([])
        }
    }, [])

    useEffect(() => {
        const sortedList = originalData.sort((a, b) => {
            const country1Name = get(a, 'statistic.country')
            const country2Name = get(b, 'statistic.country')
            return country1Name > country2Name ? 0 : -1
        })
        setSortedList(sortedList)

        return () => {
            setSortedList([])
        }
    }, [originalData])

    // ===========================================================================
    // Helpers and functions
    // ===========================================================================
    const showDetail = (countrySlug) => {
        history.push(`/country/${countrySlug}/data`)
    }

    return (
        <Fragment>
            <FullScreen handle={fullScreenHandler}>
                <div className="world-map-chart-container p-4 bg-white rounded rounded-b-none relative">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <div className="custom-scrollbar table-scroll overflow-x-scroll">
                                <table className="table">
                                    <thead>
                                        <tr className="whitespace-no-wrap border border-gray-e2e">
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Country" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Total Contracts" />
                                            </th>
                                            <th
                                                colSpan={2}
                                                className="text-center border-r border-gray-e2e">
                                                <T _str="Total Amount" />
                                            </th>
                                            <th
                                                colSpan={5}
                                                className="text-center border-r border-gray-e2e">
                                                <T _str="Procurement Procedure wise Number of Contracts" />
                                            </th>
                                            <th
                                                colSpan={5}
                                                className="text-center border-r border-gray-e2e">
                                                <T _str="Procurement Procedure wise Amount (USD)" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Average bids per contract" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Monopolization" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="No of Buyers" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="No of Suppliers" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Quantity of red flags" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Total value of contracts with red flags" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Quantity of equity contracts" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Total value of equity contracts" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e whitespace-pre-wrap">
                                                <T _str="Total value per product category" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Time span (months)" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="GDP per captia" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Healthcare budget" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="% of GDP to healthcare budget" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="$ per covid case" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Covid statistics per country Active cases, current" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Covid statistics per country Total cases" />
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                <T _str="Total death cases, cumulative" />
                                            </th>
                                        </tr>

                                        <tr className="whitespace-no-wrap border border-gray-e2e">
                                            <th className="border-r border-gray-e2e text-center">
                                                USD
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Local" />
                                            </th>

                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Open" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Direct" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Limited" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Selective" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Not Identified" />
                                            </th>

                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Open" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Direct" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Limited" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Selective" />
                                            </th>
                                            <th className="border-r border-gray-e2e text-center">
                                                <T _str="Not Identified" />
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sortedList &&
                                            sortedList.map((item, index) => {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            showDetail(
                                                                get(
                                                                    item,
                                                                    'country.slug'
                                                                )
                                                            )
                                                        }>
                                                        <td className="border-r border-l border-gray-e2e whitespace-no-wrap">
                                                            {get(
                                                                item,
                                                                'statistic.country'
                                                            )}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {Math.floor(
                                                                get(
                                                                    item,
                                                                    'statistic.total_amount_usd',
                                                                    0
                                                                )
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_amount_local',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>

                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.open_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.direct_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.limited_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.selective_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.not_identified_method_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>

                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.open_contracts_amount',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.direct_contracts_amount',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.limited_contracts_amount',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.selective_contracts_amount',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.not_identified_contracts_amount',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-center">
                                                            -
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-center">
                                                            -
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_buyers',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_suppliers',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_red_flag_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_amount_red_flag_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_equity_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.total_amount_equity_contracts',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-center">
                                                            -
                                                        </td>
                                                        <td className="border-r border-gray-e2e">
                                                            {durationInMonths(
                                                                get(
                                                                    item,
                                                                    'statistic.time_span'
                                                                )
                                                            )}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.gdp_per_capita',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.healthcare_budget',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.percentage_of_gdp_to_healthcare_budget',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'statistic.spending_per_covid_case',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'country.covid_active_cases',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'country.covid_cases_total',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                        <td className="border-r border-gray-e2e text-right">
                                                            {get(
                                                                item,
                                                                'country.covid_deaths_total',
                                                                0
                                                            ).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>

                                {!originalData.length && (
                                    <div
                                        className="flex items-center justify-center bg-white rounded-md"
                                        style={{
                                            height: '75%',
                                            minHeight: '250px'
                                        }}>
                                        <p>
                                            <T _str="No data available" />
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-5">
                                <Link
                                    to="/global-overview/data"
                                    className="text-white bg-primary-blue px-12 py-2 rounded">
                                    <T _str="View More" />
                                </Link>
                            </div>
                        </Fragment>
                    )}
                </div>
            </FullScreen>
            <ChartFooter
                fullScreenHandler={fullScreenHandler}
                downloadUrl={mediaUrl('export/Overall Country Summary.xlsx')}
            />
        </Fragment>
    )
}

export default OverallStatisticsTable

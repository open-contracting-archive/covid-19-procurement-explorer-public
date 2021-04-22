import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { get } from 'lodash'
import useTrans from '../../hooks/useTrans'
import { Loader, ChartFooter } from '../Utilities'
import VisualizationService from '../../services/VisualizationService'
import { mediaUrl } from '../../helpers/general'

const OverallStatisticsTable = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [originalData, setOriginalData] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const history = useHistory()
    const fullScreenHandler = useFullScreenHandle()

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationService.OverallStatistics()
            .then((response) => {
                if (response.results) {
                    setOriginalData([...response.results])
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
                                                {trans('Country')}
                                            </th>
                                            <th
                                                rowSpan={2}
                                                className="align-middle border-r border-gray-e2e">
                                                {trans('Total Contracts')}
                                            </th>
                                            <th
                                                colSpan={2}
                                                className={
                                                    'text-center border-r border-gray-e2e'
                                                }>
                                                {trans('Total Amount')}
                                            </th>
                                            <th
                                                colSpan={5}
                                                className={
                                                    'text-center border-r border-gray-e2e'
                                                }>
                                                {trans(
                                                    'Procurement Procedure wise Number of Contracts'
                                                )}
                                            </th>
                                            <th
                                                colSpan={5}
                                                className={
                                                    'text-center border-r border-gray-e2e'
                                                }>
                                                {trans(
                                                    'Procurement Procedure wise Amount (USD)'
                                                )}
                                            </th>
                                        </tr>

                                        <tr className="whitespace-no-wrap border border-gray-e2e">
                                            <th>{trans('USD')}</th>
                                            <th
                                                className={
                                                    'border-r border-gray-e2e'
                                                }>
                                                {trans('Local')}
                                            </th>

                                            <th>{trans('Open')}</th>
                                            <th>{trans('Direct')}</th>
                                            <th>{trans('Limited')}</th>
                                            <th>{trans('Selective')}</th>
                                            <th
                                                className={
                                                    'border-r border-gray-e2e'
                                                }>
                                                {trans('Not Identified')}
                                            </th>

                                            <th>{trans('Open')}</th>
                                            <th>{trans('Direct')}</th>
                                            <th>{trans('Limited')}</th>
                                            <th>{trans('Selective')}</th>
                                            <th
                                                className={
                                                    'border-r border-gray-e2e'
                                                }>
                                                {trans('Not Identified')}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {originalData &&
                                            originalData.map((item, index) => {
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
                                                        <td
                                                            className={
                                                                'border-r border-l border-gray-e2e'
                                                            }>
                                                            {get(
                                                                item,
                                                                'statistic.country'
                                                            )}
                                                        </td>
                                                        <td
                                                            className={
                                                                'border-r border-gray-e2e'
                                                            }>
                                                            {get(
                                                                item,
                                                                'statistic.total_contracts'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.total_amount_usd'
                                                            )}
                                                        </td>
                                                        <td
                                                            className={
                                                                'border-r border-gray-e2e'
                                                            }>
                                                            {get(
                                                                item,
                                                                'statistic.total_amount_local'
                                                            )}
                                                        </td>

                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.open_contracts'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.direct_contracts'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.limited_contracts'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.selective_contracts'
                                                            )}
                                                        </td>
                                                        <td
                                                            className={
                                                                'border-r border-gray-e2e'
                                                            }>
                                                            {get(
                                                                item,
                                                                'statistic.other_method_contracts'
                                                            )}
                                                        </td>

                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.open_contracts_amount'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.direct_contracts_amount'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.limited_contracts_amount'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {get(
                                                                item,
                                                                'statistic.selective_contracts_amount'
                                                            )}
                                                        </td>
                                                        <td
                                                            className={
                                                                'border-r border-gray-e2e'
                                                            }>
                                                            {get(
                                                                item,
                                                                'statistic.not_identified_contracts_amount'
                                                            )}
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
                                        <p>No data available</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center mt-5">
                                <Link
                                    to="/global-overview/data"
                                    className="text-white bg-primary-blue px-12 py-2 rounded">
                                    View More
                                </Link>
                            </div>
                        </Fragment>
                    )}
                </div>
            </FullScreen>
            <ChartFooter
                fullScreenHandler={fullScreenHandler}
                downloadUrl={mediaUrl('export/overall_summary.xlsx')}
            />
        </Fragment>
    )
}

export default OverallStatisticsTable

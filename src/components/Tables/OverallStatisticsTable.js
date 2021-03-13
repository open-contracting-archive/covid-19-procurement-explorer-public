import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { get } from 'lodash'
import ContractService from '../../services/ContractService'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import { formatDate } from '../../helpers/date'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'
import VisualizationService from "../../services/VisualizationService"

const OverallStatisticsTable = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [originalData, setOriginalData] = useState([])
    const [loading, setLoading] = useState(true)
    const { trans } = useTrans()
    const history = useHistory()

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
            .catch((error) => {
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
    const tableRowClass = (redFlagCount) => {
        return redFlagCount
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }

    return (
        <div>
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <div className="world-map-chart-container p-4 bg-white rounded rounded-b-none relative">
                            <div className="custom-scrollbar table-scroll overflow-x-scroll">
                                <table className="table">
                                    <thead>
                                    <tr className="whitespace-no-wrap border">
                                        <th rowSpan={2} className='align-middle border-r'>{trans('Country')}</th>
                                        <th rowSpan={2} className='align-middle border-r'>{trans('Total Contracts')}</th>
                                        <th colSpan={2} className={'text-center border-r'}>{trans('Total Amount')}</th>
                                        <th colSpan={5} className={'text-center border-r'}>{trans('Procurement Procedure wise Number of Contracts')}</th>
                                        <th colSpan={5} className={'text-center border-r'}>{trans('Procurement Procedure wise Amount (USD)')}</th>
                                        <th colSpan={4} className={'text-center border-r'}>{trans('Status wise Number of Contracts')}</th>
                                        <th colSpan={4} className={'text-center'}>{trans('Status wise Amount (USD)')}</th>
                                    </tr>

                                    <tr className="whitespace-no-wrap border">
                                        <th>{trans('USD')}</th>
                                        <th className={'border-r'}>{trans('Local')}</th>

                                        <th>{trans('Open')}</th>
                                        <th>{trans('Direct')}</th>
                                        <th>{trans('Limited')}</th>
                                        <th>{trans('Selective')}</th>
                                        <th className={'border-r'}>{trans('Not Identified')}</th>

                                        <th>{trans('Open')}</th>
                                        <th>{trans('Direct')}</th>
                                        <th>{trans('Limited')}</th>
                                        <th>{trans('Selective')}</th>
                                        <th className={'border-r'}>{trans('Not Identified')}</th>

                                        <th>{trans('Active')}</th>
                                        <th>{trans('Completed')}</th>
                                        <th>{trans('Cancelled')}</th>
                                        <th className={'border-r'}>{trans('Not Identified')}</th>

                                        <th>{trans('Active')}</th>
                                        <th>{trans('Completed')}</th>
                                        <th>{trans('Cancelled')}</th>
                                        <th>{trans('Not Identified')}</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {originalData &&
                                    originalData.map(
                                        (item, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                        showDetail(
                                                            get(item, 'country.slug')
                                                        )
                                                    }>
                                                    <td className={'border-r'}>{get(item, 'statistic.country')}</td>
                                                    <td className={'border-r'}>{get(item, 'statistic.total_contracts')}</td>
                                                    <td>{get(item, 'statistic.total_amount_usd')}</td>
                                                    <td className={'border-r'}>{get(item, 'statistic.total_amount_local')}</td>

                                                    <td>{get(item, 'statistic.open_contracts')}</td>
                                                    <td>{get(item, 'statistic.direct_contracts')}</td>
                                                    <td>{get(item, 'statistic.limited_contracts')}</td>
                                                    <td>{get(item, 'statistic.selective_contracts')}</td>
                                                    <td className={'border-r'}>{get(item, 'statistic.other_method_contracts')}</td>

                                                    <td>{get(item, 'statistic.open_contracts_amount')}</td>
                                                    <td>{get(item, 'statistic.direct_contracts_amount')}</td>
                                                    <td>{get(item, 'statistic.limited_contracts_amount')}</td>
                                                    <td>{get(item, 'statistic.selective_contracts_amount')}</td>
                                                    <td className={'border-r'}>{get(item, 'statistic.not_identified_contracts_amount')}</td>

                                                    <td>{get(item, 'statistic.active_contracts')}</td>
                                                    <td>{get(item, 'statistic.completed_contracts')}</td>
                                                    <td>{get(item, 'statistic.cancelled_contracts')}</td>
                                                    <td className={'border-r'}>{get(item, 'statistic.not_indentifed_contracts')}</td>

                                                    <td>{get(item, 'statistic.active_contracts_sum')}</td>
                                                    <td>{get(item, 'statistic.completed_contracts_sum')}</td>
                                                    <td>{get(item, 'statistic.cancelled_contracts_sum')}</td>
                                                    <td>{get(item, 'statistic.not_indentifed_contracts_sum')}</td>
                                                </tr>
                                            )
                                        }
                                    )}
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
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </div>
    )
}

export default OverallStatisticsTable

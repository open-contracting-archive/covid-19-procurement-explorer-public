import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { get } from 'lodash'
import ContractService from '../../services/ContractService'
import useTrans from '../../hooks/useTrans'
import Loader from '../Loader/Loader'
import { formatDate } from '../../helpers/date'
import { ReactComponent as FlagIcon } from '../../assets/img/icons/ic_flag.svg'

const ShortTenderTable = () => {
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
        ContractService.ContractList({ limit: 20 })
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
    const showDetail = (id) => {
        history.push(`/contracts/${id}`)
    }
    const tableRowClass = (redFlagCount) => {
        return redFlagCount
            ? 'table-row has-red-flag cursor-pointer'
            : 'table-row cursor-pointer'
    }

    return (
        <div>
            <Fragment>
                {loading ? (<Loader />) : (
                    <Fragment>
                        <div className="relative">
                            <div className="custom-scrollbar table-scroll">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th style={{ width: '25%' }}>
                                            <span className="flex items-center cursor-pointer">
                                                {trans('Contract Title')}{' '}
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                                <span className="flex items-center">
                                                    {trans('Country')}{' '}
                                                </span>
                                        </th>
                                        <th style={{ width: '15%' }}>
                                                <span className="flex items-center">
                                                    {trans('Buyer')}{' '}
                                                </span>
                                        </th>
                                        <th style={{ width: '15%' }}>
                                                <span className="flex items-center">
                                                    {trans('Supplier')}{' '}
                                                </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span className="flex items-center cursor-pointer">
                                                {trans('Method')}{' '}
                                            </span>
                                        </th>
                                        <th style={{ width: '15%' }}>
                                            <span className="flex items-center">
                                                {trans('Product Category')}{' '}
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span className="flex items-center">
                                                {trans('Date')}{' '}
                                            </span>
                                        </th>
                                        <th style={{ width: '10%' }}>
                                            <span className="flex items-center">
                                                {trans('Value (USD)')}{' '}
                                            </span>
                                        </th>
                                        <th style={{ width: '3%' }} />
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {originalData && originalData.map((tender, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                onClick={() =>
                                                    showDetail(tender.id)
                                                }
                                                className={tableRowClass(
                                                    tender.red_flag_count
                                                )}>
                                                <td>{tender.contract_title}</td>
                                                <td>{tender.country_name}</td>
                                                <td>{tender.buyer_name}</td>
                                                <td>{tender.supplier_name}</td>
                                                <td className="capitalize">
                                                    {
                                                        tender.procurement_procedure
                                                    }
                                                </td>
                                                <td>
                                                    {get(
                                                        tender,
                                                        'product_category'
                                                    )}
                                                </td>
                                                <td>
                                                    {formatDate(
                                                        tender.contract_date
                                                    )}
                                                </td>
                                                <td>
                                                    {tender.contract_value_usd &&
                                                        tender.contract_value_usd.toLocaleString(
                                                            'en'
                                                        )}
                                                </td>
                                                <td>
                                                    {tender.red_flag_count && (
                                                        <span className="mr-4">
                                                            <FlagIcon />
                                                        </span>
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
                                    to="/global-overview/contracts"
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

export default ShortTenderTable

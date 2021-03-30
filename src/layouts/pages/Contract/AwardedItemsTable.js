import React, { Fragment, useEffect, useState } from 'react'
import useTrans from '../../../hooks/useTrans'
import { get } from 'lodash'

const AwardedItemTable = (props) => {
    const { items = [] } = props
    const [listItem, setListItem] = useState([])
    const { trans } = useTrans()
    const [sorting, setSorting] = useState(() => {
        return {
            column: 'goods_services_category__category_name',
            direction: ''
        }
    })

    console.log(items)

    useEffect(() => {
        console.log(items)
        const sortedItems = items.sort((a, b) => {
            if (sorting.column === 'ppu_including_vat') {
                return sorting.direction === '-'
                    ? a[sorting.column] - b[sorting.column]
                    : b[sorting.column] - a[sorting.column]
            } else {
                if (sorting.direction === '-') {
                    return (
                        (a[sorting.column] > b[sorting.column]) -
                        (a[sorting.column] < b[sorting.column])
                    )
                } else {
                    return (
                        (a[sorting.column] < b[sorting.column]) -
                        (a[sorting.column] > b[sorting.column])
                    )
                }
            }
        })

        setListItem(sortedItems)

        return () => {
            setListItem([])
        }
    }, [sorting])

    const appendSort = (columnName) => {
        setSorting((previous) => {
            if (previous.column === columnName) {
                return {
                    ...previous,
                    direction: previous.direction === '-' ? '' : '-'
                }
            }
            return {
                column: columnName,
                direction: ''
            }
        })
    }

    const columnSorting = (columnName) => {
        return (
            <span className="icon-sort">
                <span
                    className={`icon-sort-arrow-up ${
                        sorting.column === columnName &&
                        sorting.direction === '' &&
                        'active'
                    }`}
                />
                <span
                    className={`icon-sort-arrow-down ${
                        sorting.column === columnName &&
                        sorting.direction === '-' &&
                        'active'
                    }`}
                />
            </span>
        )
    }

    return (
        <Fragment>
            <div className="relative overflow-hidden">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr className="whitespace-no-wrap">
                                <th style={{ width: '20%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort(
                                                'goods_services_category__category_name'
                                            )
                                        }>
                                        {trans('Item description')}
                                        {columnSorting(
                                            'goods_services_category__category_name'
                                        )}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('classification_code')
                                        }>
                                        {trans('cpv code')}
                                        {columnSorting('classification_code')}
                                    </span>
                                </th>
                                <th style={{ width: '6%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('quantity_units')
                                        }>
                                        {trans('Quantity')}
                                        {columnSorting('quantity_units')}
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            appendSort('ppu_including_vat')
                                        }>
                                        {trans('Unit price (usd)')}
                                        {columnSorting('ppu_including_vat')}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItem.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="hover:text-primary-blue">
                                            <p
                                                className="truncate-text"
                                                title={get(
                                                    service,
                                                    'goods_services_category__category_name'
                                                )}>
                                                {get(
                                                    service,
                                                    'goods_services_category__category_name'
                                                )}
                                            </p>
                                        </td>
                                        <td>
                                            {get(
                                                service,
                                                'classification_code'
                                            )}
                                        </td>
                                        <td>
                                            {get(service, 'quantity_units')}
                                        </td>
                                        <td>
                                            {get(service, 'ppu_including_vat')}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {!listItem.length && (
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
            </div>

            <div className="mt-6 flex items-center justify-end">
                <span>
                    Total Awarded items: <strong>{items.length}</strong>
                </span>
            </div>
        </Fragment>
    )
}

export default AwardedItemTable

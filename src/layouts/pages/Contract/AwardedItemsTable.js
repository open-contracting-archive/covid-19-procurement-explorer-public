import React, { Fragment } from 'react'
import { T } from '@transifex/react'
import { get } from 'lodash'
import useTableSorting from '../../../hooks/useTableSorting'

const AwardedItemTable = (props) => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const { items = [] } = props
    const { sortedItems: listItem, tableHeaderSpan } = useTableSorting({
        items,
        defaultSorting: {
            column: 'contract_desc',
            direction: ''
        },
        columnTypeMapping: {
            ppu_including_vat: 'number'
        },
        sortTableData: true
    })

    return (
        <Fragment>
            <div className="relative overflow-hidden">
                <div className="custom-scrollbar table-scroll">
                    <table className="table">
                        <thead>
                            <tr className="whitespace-no-wrap">
                                <th style={{ width: '20%' }}>
                                    {tableHeaderSpan(
                                        'contract_desc',
                                        <T _str="Item description" />
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'classification_code',
                                        <T _str="cpv code" />
                                    )}
                                </th>
                                <th style={{ width: '6%' }}>
                                    {tableHeaderSpan(
                                        'quantity_units',
                                        <T _str="Quantity" />
                                    )}
                                </th>
                                <th style={{ width: '10%' }}>
                                    {tableHeaderSpan(
                                        'ppu_including_vat',
                                        <T _str="Unit price (usd)" />
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItem.map((service, index) => {
                                return (
                                    <tr
                                        key={`${service.classification_code} - ${index}`}>
                                        <td className="hover:text-primary-blue">
                                            <p className="truncate-text">
                                                {get(
                                                    service,
                                                    'contract_desc',
                                                    '-'
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
                            <p>
                                <T _str="No data available" />
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end mt-6">
                <span>
                    <T _str="Total Awarded items" />:{' '}
                    <strong>{items.length}</strong>
                </span>
            </div>
        </Fragment>
    )
}

export default AwardedItemTable

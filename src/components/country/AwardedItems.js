import React, { Fragment, useState } from 'react'
import { ReactComponent as SortIcon } from '../../assets/img/icons/ic_sort.svg'
import useTrans from '../../hooks/useTrans'

const AwardedItems = () => {
    const { trans } = useTrans()
    return (
        <div style={{ color: '#293E45' }}>
            <Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '35%' }}>
                                <span className="flex items-center">
                                    {trans('item description')}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    {trans('cpv code')}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    {trans('quantity')}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th>
                                <span className="flex items-center">
                                    {trans('unit')}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                            <th style={{ width: '18%' }}>
                                <span className="flex items-center">
                                    {trans('unit price(USD)')}
                                    <SortIcon className="ml-1 cursor-pointer" />
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>N95 Mask</td>
                            <td>45234399-7</td>
                            <td>15,000</td>
                            <td>pieces</td>
                            <td>
                                {/* {tender.value_usd.toLocaleString(
                                                    'en'
                                                )} */}
                                0.5
                            </td>
                        </tr>
                        <tr>
                            <td>Reagent Strips</td>
                            <td>339344</td>
                            <td>10,700</td>
                            <td>strips</td>
                            <td>
                                {/* {tender.value_usd.toLocaleString(
                                                    'en'
                                                )} */}
                                1.2
                            </td>
                        </tr>
                        <tr>
                            <td>Laboratory tests and reagents - Covid-19</td>
                            <td>3375970</td>
                            <td>2,340</td>
                            <td>strips</td>
                            <td>
                                {/* {tender.value_usd.toLocaleString(
                                                    'en'
                                                )} */}
                                3.5
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        </div>
    )
}

export default AwardedItems

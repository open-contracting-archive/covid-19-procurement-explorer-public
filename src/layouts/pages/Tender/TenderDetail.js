import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { get } from 'lodash'
import { ReactComponent as RedIcon } from '../../../assets/img/icons/ic_flag.svg'
import CountryFlag from '../../../components/CountryFlagIcon'
import useTrans from '../../../hooks/useTrans'
import CountryService from '../../../services/CountryService'
import AwardedItems from './tabs/AwardedItems'
import { formatNumber } from '../../../helpers/number'
import { formatDate } from '../../../helpers/date'

const TenderDetail = () => {
    const [contractDetail, setContractDetail] = useState({})
    let history = useHistory()
    const { trans } = useTrans()
    let { id: countryId, contractId } = useParams()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        CountryService.ContractDetail(contractId).then((response) => {
            setContractDetail(response)
        })

        return () => {
            setContractDetail({})
        }
    }, [contractId])

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 ">
                <div className="text-sm mb-4 text-blue-5">
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Contracts')}{' '}
                    </span>{' '}
                    /
                </div>
                <h2
                    className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark truncate-text"
                    title={contractDetail && contractDetail.contract_title}>
                    {contractDetail && contractDetail.contract_title}
                </h2>
                <div className="flex flex-wrap mb-5 text-primary-dark">
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <RedIcon />
                        <p className="mx-2 text-sm">0 Red flags identified</p>
                    </div>
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <span
                            className={`status-indicator ${
                                contractDetail && contractDetail.status
                            }`}></span>
                        <p className="mr-2 text-sm">
                            {contractDetail && contractDetail.status}
                        </p>
                    </div>
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <CountryFlag
                            className="rounded-sm mr-2"
                            code={
                                contractDetail &&
                                get(
                                    contractDetail,
                                    'country_alpha_code'
                                ).toLowerCase()
                            }
                        />
                        <p className="mr-2 text-sm">
                            {contractDetail && contractDetail.country_name}
                        </p>
                    </div>
                </div>
                <div className="p-8 rounded-md grid grid-cols-12 gap-y-6 md:gap-y-10 mb-8 bg-primary-gray">
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Contract signed')}
                        </p>
                        <p className="font-bold text-sm">
                            {formatDate(
                                contractDetail && contractDetail.contract_date,
                                'MMM D, YYYY'
                            )}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procurement procedure')}
                        </p>
                        <p className="font-bold text-sm capitalize">
                            {(contractDetail && contractDetail.procurement_procedure) ||
                            '-'}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Number of bidders')}
                        </p>
                        <p className="font-bold text-xl">
                            {(contractDetail &&
                                formatNumber(contractDetail.bidders_no)) ||
                            '-'}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Tender value')}
                        </p>
                        <p className="font-bold text-xl">
                            {contractDetail && contractDetail.tender_usd ? (
                                <>
                                    {formatNumber(contractDetail.tender_usd)}{' '}
                                    <span className="font-normal text-base uppercase">
                                        USD
                                    </span>
                                </>
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Award value')}
                        </p>
                        <p className="font-bold text-xl">
                            {contractDetail && contractDetail.award_usd ? (
                                <>
                                    {formatNumber(contractDetail.award_usd)}{' '}
                                    <span className="font-normal text-base uppercase">
                                        USD
                                    </span>
                                </>
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Contract value')}
                        </p>
                        <p className="font-bold text-xl">
                            {contractDetail && contractDetail.contract_value_usd ? (
                                <>
                                    {formatNumber(
                                        contractDetail.contract_value_usd
                                    )}{' '}
                                    <span className="font-normal text-base uppercase">
                                        USD
                                    </span>
                                </>
                            ) : (
                                '-'
                            )}
                        </p>
                    </div>
                </div>
                <div className="mb-16 grid grid-cols-12 gap-x-6 gap-y-6 md:gap-y-8">
                    <div className="col-span-12 md:col-span-5 md:row-span-2">
                        <h5 className="text-sm font-normal uppercase mb-2">
                            {trans('Contract description')}
                        </h5>
                        <p>{contractDetail && contractDetail.contract_desc}</p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-7">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procuring entity')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            <Link
                                to={`/buyers/${get(
                                    contractDetail,
                                    'buyer.buyer_id'
                                )}`}>
                                <p className="font-bold text-sm uppercase">
                                    {get(contractDetail, 'buyer.buyer_name')}
                                </p>
                            </Link>
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procurement entity address')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            {get(contractDetail, 'buyer.buyer_address') || '-'}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-7 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Supplier')}
                        </p>
                        <Link
                            to={`/suppliers/${get(
                                contractDetail,
                                'supplier.supplier_id'
                            )}`}>
                            <p className="font-bold text-sm uppercase">
                                {get(contractDetail, 'supplier.supplier_name')}
                            </p>
                        </Link>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-10 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Supplier address')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            {get(contractDetail, 'supplier.supplier_address') ||
                            '-'}
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="container mx-auto px-4" /> */}
            {/* <Tabs>
                <div className="container mx-auto px-4 ">
                    <TabList>
                        <Tab>{trans('Awarded items')}</Tab>
                    </TabList>
                </div>
                <div
                    style={{
                        borderTop: '5px solid #1fbbec'
                    }}
                    className="pt-16 pb-24 bg-primary-gray">
                    <div className="container mx-auto px-4 ">
                        <TabPanel>
                            <AwardedItems />
                        </TabPanel>
                    </div>
                </div>
            </Tabs> */}
        </section>
    )
}

export default TenderDetail

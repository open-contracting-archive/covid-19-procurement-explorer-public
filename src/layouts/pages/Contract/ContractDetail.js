import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { get } from 'lodash'
import { ReactComponent as RedIcon } from '../../../assets/img/icons/ic_flag.svg'
import useTrans from '../../../hooks/useTrans'
import CountryService from '../../../services/CountryService'
import { formatNumber } from '../../../helpers/number'
import { formatDate } from '../../../helpers/date'
import {
    Loader,
    CountryFlagIcon,
    MetaInformation
} from '../../../components/Utilities'

const AwardedItemTable = React.lazy(() =>
    import(/* webpackChunkName: "app-data-page" */ './AwardedItemsTable')
)

const ContractDetail = () => {
    const { contractId } = useParams()
    const [loading, setLoading] = useState(true)
    const [contractDetail, setContractDetail] = useState({})
    let history = useHistory()
    const { trans } = useTrans()
    window.scrollTo(0, 0)

    const previousPage = () => {
        history.goBack()
    }

    useEffect(() => {
        CountryService.ContractDetail(contractId).then((result) => {
            if (result) {
                setContractDetail(result)
            }
            setLoading(false)
        })

        return () => {
            setContractDetail({})
            setLoading(true)
        }
    }, [contractId])

    return loading ? (
        <Loader />
    ) : (
        <section className="pt-8">
            <MetaInformation
                title={contractDetail && contractDetail.contract_title}
                description={contractDetail && contractDetail.contract_desc}
                canonicalLink={window.location.href}
            />
            <div className="container mx-auto px-4">
                <div className="text-sm mb-4 text-blue-5">
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Contracts')}{' '}
                    </span>{' '}
                    /
                </div>
                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark truncate-text">
                    <a
                        className="hover:text-primary-blue focus:text-primary-blue"
                        href={contractDetail.link_to_contract}
                        title={contractDetail && contractDetail.contract_title}
                        target="_blank"
                        rel="noreferrer">
                        {trans(contractDetail && contractDetail.contract_title)}{' '}
                        #{contractDetail && contractDetail.contract_id}
                    </a>
                </h2>
                <div className="flex flex-wrap mb-5 text-primary-dark">
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        #{contractDetail && contractDetail.contract_id}
                    </div>
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <RedIcon />
                        <div className="mx-2 text-sm">
                            {trans(
                                contractDetail &&
                                    contractDetail.red_flag &&
                                    contractDetail.red_flag.length
                            )}
                            <span className="inline-block ml-1">
                                {trans('Red flag identified')}
                            </span>
                            {contractDetail &&
                            contractDetail.red_flag &&
                            contractDetail.red_flag.length > 0 ? (
                                <div className="inline-block relative ml-2">
                                    <button className="focus:outline-none context-menu"></button>
                                    <ul className="context-menu-dropdown custom-scrollbar">
                                        {contractDetail &&
                                            contractDetail.red_flag.map(
                                                (value, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <h3 className="font-bold mb-1">
                                                                {trans(
                                                                    value.title
                                                                )}
                                                            </h3>
                                                            <p>
                                                                {trans(
                                                                    value.description
                                                                )}
                                                            </p>
                                                        </li>
                                                    )
                                                }
                                            )}
                                    </ul>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <CountryFlagIcon
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
                            {get(contractDetail, 'country_name', '-')}
                        </p>
                    </div>
                </div>
                <div className="p-4 md:p-8 rounded-md grid grid-cols-12 gap-y-6 md:gap-y-10 mb-8 bg-primary-gray">
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Contract signed')}
                        </p>
                        <p className="font-bold text-sm">
                            {formatDate(
                                get(
                                    contractDetail,
                                    'contract_date',
                                    'MMM D, YYYY'
                                )
                            )}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procurement procedure')}
                        </p>
                        <p className="font-bold text-sm capitalize">
                            {get(contractDetail, 'procurement_procedure', 0)}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Number of bidders')}
                        </p>
                        <p className="font-bold text-xl">
                            {contractDetail &&
                                formatNumber(
                                    get(contractDetail, 'bidders_no', 0)
                                )}
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
                            {contractDetail &&
                            contractDetail.contract_value_usd ? (
                                <>
                                    {formatNumber(
                                        contractDetail.contract_value_usd
                                    )}{' '}
                                    <span className="font-normal text-base uppercase">
                                        {trans('USD')}
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
                        <p>{get(contractDetail, 'contract_desc', '-')}</p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-7">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procuring entity')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            <Link
                                to={`/buyers/${get(
                                    contractDetail,
                                    'buyer_id'
                                )}`}
                                className="hover:text-primary-blue focus:text-primary-blue">
                                <span className="font-bold text-sm uppercase block">
                                    {get(contractDetail, 'buyer_name', '-')}
                                </span>
                            </Link>
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3">
                        <p className="text-sm uppercase mb-1">
                            {trans('Procurement entity address')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            {get(contractDetail, 'buyer_address', '-')}
                        </p>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-7 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Supplier')}
                        </p>
                        <Link
                            to={`/suppliers/${get(
                                contractDetail,
                                'supplier_id'
                            )}`}>
                            <p className="font-bold text-sm uppercase">
                                {get(contractDetail, 'supplier_name', '-')}
                            </p>
                        </Link>
                    </div>
                    <div className="col-span-12 xs:col-span-6 md:col-span-3 md:col-start-10 md:row-start-2">
                        <p className="text-sm uppercase mb-1">
                            {trans('Supplier address')}
                        </p>
                        <p className="font-bold text-sm uppercase">
                            {get(contractDetail, 'supplier_address', '-')}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="border-b-4 border-primary-blue">
                    <ul className="flex container mt-16 mx-auto px-4">
                        <li className="bg-primary-blue p-2 px-3 rounded-t text-lg text-white">
                            <span>Awarded items</span>
                        </li>
                    </ul>
                </div>

                <div className="pt-16 bg-primary-gray pb-6 xl:pb-24">
                    <div className="container mx-auto px-4">
                        <AwardedItemTable
                            items={contractDetail.goods_services}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContractDetail

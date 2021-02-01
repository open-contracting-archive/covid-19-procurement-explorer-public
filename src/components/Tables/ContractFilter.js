import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import ContractService from '../../services/ContractService'
import useTrans from '../../hooks/useTrans'
import useContractFilters from "../../hooks/useContractFilters"
import { formatDate } from '../../helpers/date'
import 'react-datepicker/dist/react-datepicker.css'

const ContractFilter = (props) => {
    const { params, appendFilter, hasCountry, hasBuyer, hasSupplier, hasProduct } = props
    const { countrySelectList, contractMethodSelectList, productSelectList, valueRanges } = useContractFilters()
    const [contractTitleParameter, setContractTitleParameter] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [buyersFilterOption, setBuyersFilterOption] = useState([])
    const [suppliersFilterOption, setSuppliersFilterOption] = useState([])
    const { trans } = useTrans()
    const ref = useRef()

    useEffect(() => {
        if (params && params.country) {
            if (!params.buyer) {
                getBuyersFilterParameter({ country: params.country })
            }
            if (!params.supplier) {
                getSuppliersFilterParameter({ country: params.country })
            }
        }
    }, [params])

    useEffect(() => {
        if (startDate && endDate) {
            appendFilter({
                date_from: formatDate(startDate, 'YYYY-MM-DD'),
                date_to: formatDate(endDate, 'YYYY-MM-DD')
            })
        }
    }, [startDate, endDate])

    const handleCountrySelection = (country) => {
        getBuyersFilterParameter({ country })
        getSuppliersFilterParameter({ country })
        appendFilter({ country, buyer: '', supplier: '' })
    }
    const handleSearchInput = (event, contractTitle) => {
        event.preventDefault()
        appendFilter({ title: contractTitle })
    }

    const onDateChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    const handleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
        if (!showDatePicker) {
            document.addEventListener('mousedown', handleClickOutside, false)
        } else {
            document.removeEventListener('mousedown', handleClickOutside, false)
        }
    }
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowDatePicker(false)
        }
    }

    const getBuyersFilterParameter = (params) => {
        ContractService.FilterBuyersParameter(params)
            .then((response) => {
                const options = response.map((buyer) => {
                    return {
                        label: buyer.name,
                        value: buyer.id
                    }
                })
                setBuyersFilterOption([{ label: 'All', value: '' }, ...options])
            })
    }

    const getSuppliersFilterParameter = (params) => {
        ContractService.FilterSuppliersParameter(params)
            .then((response) => {
                const options = response.map((supplier) => {
                    return {
                        label: supplier.name,
                        value: supplier.id
                    }
                })
                setSuppliersFilterOption([{ label: 'All', value: '' }, ...options])
            })
    }

    return (
        <div className="mb-12 flex gap-8 flex-wrap">
            <div className="w-40">
                <p className="uppercase text-xs opacity-50 leading-none">
                    {trans('Contract title')}
                </p>
                <form
                    className="mt-2 select-filter--input"
                    onSubmit={(event) =>
                        handleSearchInput(event, contractTitleParameter)
                    }>
                    <input
                        type="text"
                        className="select-filter"
                        placeholder="Enter contract name"
                        value={contractTitleParameter}
                        onChange={(event) =>
                            setContractTitleParameter(event.target.value)
                        }
                    />
                </form>
            </div>

            {!hasCountry() && (
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Country')}
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={countrySelectList}
                        onChange={(selectedOption) =>
                            handleCountrySelection(selectedOption.value)
                        }
                    />
                </div>
            )}
            {!hasBuyer() && (
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Buyer')}
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={buyersFilterOption}
                        onChange={(selectedOption) =>
                            appendFilter({
                                buyer: selectedOption.value
                            })
                        }
                    />
                </div>
            )}
            {!hasSupplier() && (
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none">
                        {trans('Supplier')}
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={suppliersFilterOption}
                        onChange={(selectedOption) =>
                            appendFilter({
                                supplier: selectedOption.value
                            })
                        }
                    />
                </div>
            )}
            <div className="w-40">
                <p className="uppercase text-xs opacity-50 leading-none">
                    {trans('Method')}
                </p>
                <Select
                    className="select-filter text-sm"
                    classNamePrefix="select-filter"
                    options={contractMethodSelectList}
                    onChange={(selectedOption) =>
                        appendFilter({
                            procurement_procedure: selectedOption.value
                        })
                    }
                />
            </div>

            {!hasProduct() && (
                <div className="w-40">
                    <p className="uppercase text-xs opacity-50 leading-none whitespace-no-wrap">
                        {trans('Product category')}
                    </p>
                    <Select
                        className="select-filter text-sm"
                        classNamePrefix="select-filter"
                        options={productSelectList}
                        onChange={(selectedOption) =>
                            appendFilter({
                                product: selectedOption.value
                            })
                        }
                    />
                </div>
            )}
            <div className="w-40">
                <p className="uppercase text-xs opacity-50 leading-none">
                    {trans('Data range')}
                </p>
                <div ref={ref}>
                    <div
                        onClick={handleDatePicker}
                        className="select-filter--input mt-2">
                        <p className="field whitespace-no-wrap">
                            {startDate && endDate ? (
                                `${formatDate(
                                    startDate,
                                    "DD MMM 'YY"
                                )} - ${formatDate(
                                    endDate,
                                    "DD MMM 'YY"
                                )}`
                            ) : (
                                <span className="opacity-50">
                                            Select date range
                                        </span>
                            )}
                        </p>
                    </div>
                    {showDatePicker && (
                        <div className="absolute z-10">
                            <DatePicker
                                selected={startDate}
                                onChange={onDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                inline
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-40">
                <p className="uppercase text-xs opacity-50 leading-none">
                    {trans('Value range')}
                </p>
                <Select
                    className="select-filter text-sm"
                    classNamePrefix="select-filter"
                    options={valueRanges}
                    onChange={(selectedOption) =>
                        appendFilter({
                            contract_value_usd:
                            selectedOption.value.value,
                            value_comparison: selectedOption.value.sign
                        })
                    }
                />
            </div>
        </div>
    )
}

export default ContractFilter

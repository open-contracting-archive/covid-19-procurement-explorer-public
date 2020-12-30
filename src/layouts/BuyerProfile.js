import React, { Fragment, useState } from 'react'
import { ReactComponent as SortIcon } from '../assets/img/icons/ic_sort.svg'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs'
import PieChart from '../components/charts/PieChart/PieChart'
import AreaChart from '../components/charts/AreaChart/AreaChart'
import AreaChartBlock from '../components/charts/AreaChart/AreaChartBlock'
import SimpleBarChart from '../components/charts/SimpleBarChart/SimpleBarChart'
import SimpleBarListSection from '../components/SimpleBarListSection/SimpleBarListSection'
import StackedChart from '../components/charts/StackedChart/StackedChart'
import BarListSection from '../components/BarListSection/BarListSection'
import ContractRedFlag from '../components/ContractRedFlag/ContractRedFlag'
import CountryFlag from '../components/CountryFlagIcon'
import useTrans from '../hooks/useTrans'

const top_supply_bar_data = [
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'TECNOLOGIA Y CALIFORNIA',
        value: '45%'
    },
    {
        name: 'REACTIVOS EXPERIMENT',
        value: '12%'
    },
    {
        name: 'Kit de detección single',
        value: '5%'
    },
    {
        name: 'TaqPath 1-Step RT-qPC',
        value: '68%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    },
    {
        name: 'LABORATORIO MEDICO',
        value: '85%'
    }
]

// Add Bar Chart data
const bar_chart_data = [
    {
        method: 'Open',
        value: 2025
    },
    {
        method: 'Limited',
        value: 1882
    },
    {
        method: 'Selective',
        value: 1809
    },
    {
        method: 'Direct',
        value: 1322
    }
]

const contract_status_data = [
    {
        name: 'Active',
        value: '85%'
    },
    {
        name: 'Completed',
        value: '45%'
    },
    {
        name: 'Cancelled',
        value: '12%'
    }
]

// Add Area Chart data
const area_chart_data = [
    {
        month: 'FEB',
        value: 22324,
        expenses: 21.1
    },
    {
        month: 'MAR',
        value: 45990,
        expenses: 30.5
    },
    {
        month: 'APR',
        value: 10003,
        expenses: 34.9
    },
    {
        month: 'MAY',
        value: 77070,
        expenses: 23.1
    },
    {
        month: 'JUN',
        value: 23489,
        expenses: 28.2
    },
    {
        month: 'JUL',
        value: 58902,
        expenses: 31.9
    },
    {
        month: 'AUG',
        value: 29190,
        expenses: 31.9
    },
    {
        month: 'SEP',
        value: 45908,
        expenses: 31.9
    }
]

// Add Pie Chart data
const pie_chart_data = [
    {
        value: 'Value',
        number: 30
    },
    {
        value: 'Number',
        number: 70
    }
]

// Stacked Chart Data
const stacked_chart_data = [
    {
        month: 'Apr',
        ppe: 2.5,
        ventilator: 2.5,
        covid_tests: 2.1,
        vaccine: 0.3,
        construction_works_and_materials: 0.2,
        medicines: 0.1,
        sanitizing_supplies: 0.4,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'May',
        ppe: 2.6,
        ventilator: 2.7,
        covid_tests: 2.2,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.9,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Jun',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Jul',
        ppe: 2.5,
        ventilator: 2.5,
        covid_tests: 2.1,
        vaccine: 0.3,
        construction_works_and_materials: 0.2,
        medicines: 0.1,
        sanitizing_supplies: 0.2,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Aug',
        ppe: 2.6,
        ventilator: 2.7,
        covid_tests: 2.2,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Sep',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.1,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Oct',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 0.7,
        medical_consumables: 1.5,
        other: 2
    },
    {
        month: 'Nov',
        ppe: 2.8,
        ventilator: 2.9,
        covid_tests: 2.4,
        vaccine: 0.3,
        construction_works_and_materials: 0.3,
        medicines: 0.1,
        sanitizing_supplies: 1,
        medical_consumables: 1.5,
        other: 2
    }
]

const barColorValue = '#ABBABF'
const colors = ['#ABBABF', '#DCEAEE']

const BuyerProfile = () => {
    const { trans } = useTrans()
    let history = useHistory()

    const previousPage = () => {
        history.goBack()
    }

    const options = [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' }
    ]

    let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const tempTableData = tempArray.map((index) => {
        return (
            <tr className="table-row" key={index}>
                <td className="uppercase">SERVICIOS DE LABORATORIO CLÍNICO</td>
                <td>Mexico</td>
                <td>21</td>
                <td>3</td>
                <td>5</td>
                <td>2,352,045</td>
                <td className="uppercase">1.2</td>
            </tr>
        )
    })

    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 ">
                <div className="text-sm mb-4 text-blue-5">
                    <span className="cursor-pointer text-primary-blue">
                        Mexico
                    </span>{' '}
                    /{' '}
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        {trans('Buyers')}
                    </span>
                </div>
                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 uppercase text-primary-dark">
                    CONALITEG-DIRECCIÓN DE RECURSOS MATERIALES Y SERVICIOS
                    GENERALES #011L6J001
                </h2>
                <div className="flex flex-wrap mb-5 text-primary-dark">
                    <div className="flex items-center py-1 px-3 mr-2 mb-2 rounded-full bg-primary-gray">
                        <CountryFlag
                            className="rounded-sm mr-2"
                            // code={`${
                            //     tenderInfo &&
                            //     get(
                            //         tenderInfo,
                            //         'country_alpha_code'
                            //     ).toLowerCase()
                            // }`}
                            code="mx"
                        />
                        <p className="mr-2 text-sm">Mexico</p>
                    </div>
                </div>
            </div>
            <div
                style={{
                    borderTop: '5px solid #1fbbec'
                }}
                className="pt-16 pb-24 bg-primary-gray">
                <div className="container mx-auto px-4 ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Total Spending
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark pb-4 w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                87M
                                            </strong>
                                            USD
                                        </p>
                                        <p className="text-sm text-green-30 font-bold">
                                            +8%
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <SimpleBarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Total contracts
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark pb-4 w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                87M
                                            </strong>
                                            USD
                                        </p>
                                        <p className="text-sm text-green-30 font-bold">
                                            +8%
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <SimpleBarChart
                                            data={bar_chart_data}
                                            barColorValue={barColorValue}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Average bids per contract
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                218
                                            </strong>
                                        </p>
                                        <p className="text-sm text-red-30 font-bold">
                                            -11%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Monopolization
                                </h3>
                                <div className="flex items-end">
                                    <div className=" text-primary-dark w-2/5">
                                        <AreaChart data={area_chart_data} />
                                        <p>
                                            <strong className="text-xl inline-block mr-3">
                                                67
                                            </strong>
                                        </p>
                                        <p className="text-sm text-red-30 font-bold">
                                            -11%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <SimpleBarListSection
                                label="Contract status"
                                bar_data={contract_status_data}
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="flex flex-col justify-between h-full">
                                <div className="bg-white rounded p-4 py-2 mb-2 simple-tab">
                                    <Tabs>
                                        <div className="flex items-center justify-between">
                                            <h3 className="uppercase font-bold  text-primary-dark">
                                                Equity indicators
                                            </h3>
                                            <div className="flex">
                                                <TabList>
                                                    <Tab>
                                                        {trans('By value')}
                                                    </Tab>
                                                    <Tab>
                                                        {trans('By number')}
                                                    </Tab>
                                                </TabList>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                                <div className="bg-white rounded p-4 py-2 simple-tab">
                                    <Tabs>
                                        <div className="flex items-center justify-between">
                                            <h3 className="uppercase font-bold  text-primary-dark">
                                                Direct/Open
                                            </h3>
                                            <div className="flex">
                                                <TabList>
                                                    <Tab>
                                                        {trans('By value')}
                                                    </Tab>
                                                    <Tab>
                                                        {trans('By number')}
                                                    </Tab>
                                                </TabList>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex items-end">
                                                    <div className=" text-primary-dark">
                                                        <span>
                                                            <strong className="text-xl inline-block mr-3">
                                                                51
                                                            </strong>
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <PieChart
                                                            data={
                                                                pie_chart_data
                                                            }
                                                            colors={colors}
                                                        />
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <div className="bg-white rounded p-4">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Products timeline
                                </h3>
                                <div className="flex">
                                    <div className="flex-1">
                                        <StackedChart
                                            data={stacked_chart_data}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Product distribution"
                                bar_data={top_supply_bar_data}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <BarListSection
                                label="Top suppliers"
                                bar_data={top_supply_bar_data}
                            />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            <ContractRedFlag />
                        </div>
                    </div>
                    {/* Table */}
                    <div className="mb-12 flex gap-8">
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Buyers
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Products
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Country
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                        <div className="w-40">
                            <p className="uppercase text-xs opacity-50 leading-none">
                                Value range
                            </p>
                            <Select
                                className="select-filter text-sm"
                                classNamePrefix="select-filter"
                                options={options}
                                defaultValue={options[0]}
                            />
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>
                                    <span className="flex items-center">
                                        Buyer{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        Country{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        # of contracts{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        # of suppliers{' '}
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        product categories
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        value (usd)
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                                <th style={{ width: '10%' }}>
                                    <span className="flex items-center">
                                        % red flags
                                        <SortIcon className="ml-1 cursor-pointer" />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>{tempTableData}</tbody>
                    </table>
                    <div className="text-center mt-8">
                        <button className="text-primary-blue">Load more</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BuyerProfile

import React from 'react'
import { ReactComponent as SortIcon } from '../../../assets/img/icons/ic_sort.svg'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import PieChart from '../../../components/Charts/PieChart/PieChart'
import CountryFlag from '../../../components/CountryFlagIcon'
import useTrans from '../../../hooks/useTrans'
import {
    ContractsRedFlags,
    GlobalSuppliers,
    ProductDistribution,
    ProductsTimeline,
    TopSuppliers,
    TotalContracts,
    TotalSpending
} from '../../../components/Visualizations'

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

const colors = ['#ABBABF', '#DCEAEE']

const SupplierProfile = () => {
    const { trans } = useTrans()
    let history = useHistory()
    const handle = useFullScreenHandle()

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
                        {trans('Supplier')}
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
                <div className="w-full px-2 mb-4">
                    <GlobalSuppliers />
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
                            {/* <div className="bg-white rounded p-4 h-full">
                                <h3 className="uppercase font-bold  text-primary-dark">
                                    Total Income
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
                            </div> */}
                            <TotalSpending label="Total income" />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            {/* <div className="bg-white rounded p-4">
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
                            </div> */}
                            <TotalContracts />
                        </div>
                        <div className="w-full lg:w-1/3 px-2 mb-6">
                            <div className="bg-white rounded p-4 py-2 mb-2 simple-tab h-full">
                                <Tabs>
                                    <div className="flex items-center justify-between">
                                        <h3 className="uppercase font-bold  text-primary-dark">
                                            Equity indicators
                                        </h3>
                                        <div className="flex">
                                            <TabList>
                                                <Tab>{trans('By value')}</Tab>
                                                <Tab>{trans('By number')}</Tab>
                                            </TabList>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <TabPanel>
                                            <div className="flex items-center">
                                                <div className=" text-primary-dark">
                                                    <span>
                                                        <strong className="text-xl inline-block mr-3">
                                                            51
                                                        </strong>
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <PieChart
                                                        data={pie_chart_data}
                                                        colors={colors}
                                                        large
                                                    />
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="flex items-center">
                                                <div className=" text-primary-dark">
                                                    <span>
                                                        <strong className="text-xl inline-block mr-3">
                                                            51
                                                        </strong>
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <PieChart
                                                        data={pie_chart_data}
                                                        colors={colors}
                                                        large
                                                    />
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            {/* <div className="bg-white rounded p-4">
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
                            </div> */}
                            <ProductsTimeline />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            {/* <BarListSection
                                label="Product distribution"
                                bar_data={top_supply_bar_data}
                            /> */}
                            <ProductDistribution />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            {/* <BarListSection
                                label="Top suppliers"
                                bar_data={top_supply_bar_data}
                            /> */}
                            <TopSuppliers />
                        </div>
                        <div className="w-full lg:w-1/2 px-2 mb-6">
                            {/* <ContractRedFlag /> */}
                            <ContractsRedFlags />
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

export default SupplierProfile

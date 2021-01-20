import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Select from 'react-select'
import useTrans from '../../../../hooks/useTrans'
import Map from '../../../../components/Charts/Map/Map'
import RaceMap from '../../../../components/Charts/RaceMap/RaceMap'
import RaceBarChart from '../../../../components/Charts/RaceBarChart/RaceBarChart'
import { ReactComponent as ShareIcon } from '../../../../assets/img/icons/ic_share.svg'
import { ReactComponent as DownloadIcon } from '../../../../assets/img/icons/ic_download.svg'
import { ReactComponent as FullViewIcon } from '../../../../assets/img/icons/ic_fullscreen.svg'
import { ReactComponent as ChartsIcon } from '../../../../assets/img/icons/ic_charts.svg'
import { ReactComponent as MapIcon } from '../../../../assets/img/icons/ic_map.svg'
import { ReactComponent as TableIcon } from '../../../../assets/img/icons/ic_table.svg'
import { ReactComponent as SourcesIcon } from '../../../../assets/img/icons/ic_sources.svg'
import CountryService from '../../../../services/CountryService'
import Loader from '../../../../components/Loader/Loader'
import ShareButtons from '../../../../components/Library/ShareButtons'
import TenderTable from '../../../../components/Tables/TenderTable'

const WorldMapRace = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [loading, setLoading] = useState(true)
    const [contractType, setContractType] = useState('value')
    const [raceBarType, setRaceBarType] = useState('value')
    const [sliderData, setSliderData] = useState([])
    const [yearMonth, setYearMonth] = useState('2020-01')
    const [dataFromApi, setDataFromApi] = useState()
    const [contractDataApi, setContractDataApi] = useState({})
    const [raceBarDataApi, setRaceBarDataApi] = useState(null)
    const [selectedContinent, setSelectedContinent] = useState({
        value: 'all',
        label: 'All Continent'
    })

    const { trans } = useTrans()
    const handle = useFullScreenHandle()
    const options = [
        { value: 'all', label: 'All Continent' },
        { value: 'asia', label: 'Asia' },
        { value: 'europe', label: 'Europe' },
        { value: 'africa', label: 'Africa' },
        { value: 'oceania', label: 'Oceania' },
        { value: 'south_america', label: 'South America' },
        { value: 'north_america', label: 'North America' },
        { value: 'middle_east', label: 'Middle East' }
    ]

    const url = () => {
        window.location.href
    }

    useEffect(() => {
        CountryService.GetGlobalMapData().then((response) => {
            const raceBarChartformatted = response.result.reduce(
                (formattedData, d) => ({
                    ...formattedData,
                    [d.month]: d.details.map((detail) => ({
                        country: detail.country,
                        value:
                            raceBarType === 'value'
                                ? detail.amount_usd
                                : detail.tender_count
                    }))
                }),
                {}
            )
            setRaceBarDataApi(raceBarChartformatted)
            setDataFromApi(response)
            setLoading(false)
        })
    }, [raceBarType])

    useEffect(() => {
        let dateObject = {}
        dataFromApi &&
            dataFromApi.result.map((data) => {
                let countryObject = {}
                data.details.map((detail) => {
                    if (detail.country_code !== 'ALL') {
                        countryObject = {
                            ...countryObject,
                            [detail.country_code]: {
                                value: detail.amount_usd,
                                number: detail.tender_count,
                                url: `/country/${detail.country
                                    .toLowerCase()
                                    .replace(' ', '-')}/data`
                            }
                        }
                    }
                })
                dateObject = {
                    ...dateObject,
                    [data.month]: countryObject
                }
            })
        setContractDataApi(dateObject)
        setYearMonth(dataFromApi && dataFromApi.result[0].month)

        const keys =
            dataFromApi &&
            dataFromApi.result.map((data) => {
                return data.month
            })
        setSliderData(keys)
    }, [dataFromApi])

    const handleContinentChange = (selectedOption) => {
        setSelectedContinent(selectedOption)
    }

    const continent = {
        all: {
            lat: 0,
            long: 0,
            zoomLevel: 1
        },
        asia: {
            lat: 44.94789322476297,
            long: 95.75037267845751,
            zoomLevel: 1.8
        },
        europe: {
            lat: 55.85406929584602,
            long: 28.24904034876191,
            zoomLevel: 1.8
        },
        africa: {
            lat: 6.426117205286786,
            long: 18.276615276175992,
            zoomLevel: 1.6
        },
        oceania: {
            lat: -31.065922730080157,
            long: 152.78101519406331,
            zoomLevel: 1.6
        },
        south_america: {
            lat: -15.173251268423256,
            long: -60.792112817153885,
            zoomLevel: 1.6
        },
        north_america: {
            lat: 56.51520886670177,
            long: -92.32043635079269,
            zoomLevel: 1.6
        },
        middle_east: {
            lat: 27.0,
            long: 38.25,
            zoomLevel: 1.6
        }
    }

    return (
        <section className="pt-16 bg-primary-gray pb-24">
            <div className="text-center mb-10">
                <h3 className="uppercase text-3xl font-bold leading-none">
                    <span className="block text-base font-bold">
                        {trans('Explore')}
                    </span>
                    {trans('Countries')}
                </h3>
                <p className="text-base text-opacity-50  text-primary-dark">
                    {trans('Government spending to fight COVID-19')}
                </p>
            </div>
            {!contractDataApi || !raceBarDataApi ? (
                <Loader />
            ) : (
                <div className="container mx-auto">
                    <div className="bg-white rounded p-6 simple-tab">
                        <FullScreen handle={handle}>
                            <Tabs>
                                <div className="flex">
                                    <div className="flex w-full">
                                        <div className="worldmap-tab">
                                            <TabList>
                                                <Tab>
                                                    <MapIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Map')}
                                                    </span>
                                                </Tab>
                                                <Tab>
                                                    <ChartsIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Charts')}
                                                    </span>
                                                </Tab>
                                                <Tab>
                                                    <TableIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Table')}
                                                    </span>
                                                </Tab>
                                                <Tab>
                                                    <SourcesIcon className="inline-block" />
                                                    <span className="text-sm mt-1 inline-block">
                                                        {trans('Sources')}
                                                    </span>
                                                </Tab>
                                            </TabList>
                                        </div>
                                        <div
                                            className="flex-1 relative"
                                            style={{
                                                width: 'calc(100% - 91px)'
                                            }}>
                                            <TabPanel>
                                                <div className="flex justify-end world-map-chart mb-4">
                                                    <ul className="contract-switch flex">
                                                        <li
                                                            className={`mr-4 cursor-pointer ${
                                                                contractType ===
                                                                'value'
                                                                    ? 'active'
                                                                    : ''
                                                            }`}
                                                            onClick={() =>
                                                                setContractType(
                                                                    'value'
                                                                )
                                                            }>
                                                            {trans(
                                                                'By contract value'
                                                            )}
                                                        </li>
                                                        <li
                                                            className={`cursor-pointer ${
                                                                contractType ===
                                                                'number'
                                                                    ? 'active'
                                                                    : ''
                                                            }`}
                                                            onClick={() =>
                                                                setContractType(
                                                                    'number'
                                                                )
                                                            }>
                                                            {trans(
                                                                'By number of contracts'
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="w-1/5 absolute top-0 left-0 z-10 -mt-3">
                                                    <Select
                                                        className="select-filter text-sm"
                                                        classNamePrefix="select-filter"
                                                        options={options}
                                                        value={
                                                            selectedContinent
                                                        }
                                                        defaultValue={
                                                            options[0]
                                                        }
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleContinentChange(
                                                                selectedOption
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <RaceMap
                                                    contractData={
                                                        contractDataApi
                                                    }
                                                    contractType={contractType}
                                                    yearMonth={yearMonth}
                                                    sliderData={
                                                        sliderData || []
                                                    }
                                                    coordinates={
                                                        continent[
                                                            selectedContinent
                                                                .value
                                                        ]
                                                    }
                                                />
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex justify-end">
                                                    <ul className="contract-switch flex">
                                                        <li
                                                            className={`mr-4 cursor-pointer ${
                                                                raceBarType ===
                                                                'value'
                                                                    ? 'active'
                                                                    : ''
                                                            }`}
                                                            onClick={() =>
                                                                setRaceBarType(
                                                                    'value'
                                                                )
                                                            }>
                                                            {trans(
                                                                'By contract value'
                                                            )}
                                                        </li>
                                                        <li
                                                            className={`cursor-pointer ${
                                                                raceBarType ===
                                                                'number'
                                                                    ? 'active'
                                                                    : ''
                                                            }`}
                                                            onClick={() =>
                                                                setRaceBarType(
                                                                    'number'
                                                                )
                                                            }>
                                                            {trans(
                                                                'By number of contracts'
                                                            )}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="w-1/5 absolute top-0 left-0 z-10 -mt-3">
                                                    <Select
                                                        className="select-filter text-sm"
                                                        classNamePrefix="select-filter"
                                                        options={options}
                                                        value={
                                                            selectedContinent
                                                        }
                                                        defaultValue={
                                                            options[0]
                                                        }
                                                        onChange={(
                                                            selectedOption
                                                        ) =>
                                                            handleContinentChange(
                                                                selectedOption
                                                            )
                                                        }
                                                    />
                                                </div>
                                                {loading ? (
                                                    <Loader />
                                                ) : (
                                                    <RaceBarChart
                                                        data={raceBarDataApi}
                                                    />
                                                )}
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="pb-4">
                                                    <TenderTable />
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                Sources section coming soon !!
                                            </TabPanel>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </FullScreen>
                        <div
                            className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                            <div className="flex items-center">
                                <div className="flex items-center mr-6">
                                    <DownloadIcon className="mr-2 inline-block" />
                                    <span>Download</span>
                                </div>

                                <div className="flex">
                                    <span className="worldmap-share flex items-center relative">
                                        <ShareIcon className="mr-2 inline-block" />{' '}
                                        <span className="cursor-pointer">
                                            Share
                                        </span>
                                        <div className="worldmap-share--buttons absolute px-6 py-6 rounded bg-white">
                                            <ShareButtons url={url} />
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="flex items-center">
                                    <button onClick={handle.enter}>
                                        <span className="cursor-pointer">
                                            View full screen
                                        </span>
                                        <FullViewIcon className="ml-2 inline-block" />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-sm">
                        Don’t see your country data?{' '}
                        <a href="#" className="text-primary-blue">
                            Here’s how you can add your country data
                        </a>
                    </p>
                </div>
            )}
        </section>
    )
}

export default WorldMapRace

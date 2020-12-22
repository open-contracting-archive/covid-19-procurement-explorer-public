import React, { Fragment, useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Select from 'react-select'

import { ReactComponent as HeroIcon } from '../assets/img/icons/covid.svg'
import { ReactComponent as MouseScroll } from '../assets/img/icons/mouse-scroll.svg'
import { ReactComponent as CircleIcon } from '../assets/img/icons/circle-ring.svg'
import { ReactComponent as BottomCurve } from '../assets/img/icons/circle_bottom.svg'
import useTrans from '../hooks/useTrans'
import Library from './home/library'
// import geo_data from '../data/GeoChart.world.geo.json'
// import GeoChart from '../components/charts/GeoChart/GeoChart'
import Map from '../components/charts/Map/Map'
import RaceMap from '../components/charts/RaceMap/RaceMap'
import NewsSection from './home/newsSection'
import { ReactComponent as DownloadIcon } from '../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../assets/img/icons/ic_fullscreen.svg'
import { ReactComponent as ChartsIcon } from '../assets/img/icons/ic_charts.svg'
import { ReactComponent as MapIcon } from '../assets/img/icons/ic_map.svg'
import { ReactComponent as TableIcon } from '../assets/img/icons/ic_table.svg'
import { ReactComponent as SourcesIcon } from '../assets/img/icons/ic_sources.svg'
// import { ReactComponent as SortIcon } from '../assets/img/icons/ic_sort.svg'
import CountryContractMapServices from '../services/countryContractMapServices'

const Home = () => {
    const [data, setData] = useState({})
    const [contractData, setContractData] = useState(null)
    const [contractType, setContractType] = useState('value')
    const [sliderData, setSliderData] = useState([])

    const [loading, setLoading] = useState(true)

    const [yearMonth, setYearMonth] = useState('2020-01')
    const [dataFromApi, setDataFromApi] = useState()
    const [contractDataApi, setContractDataApi] = useState({})
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

    // useEffect(() => {
    //     CountryContractMapServices.getContractData().then((response) => {
    //         setContractData(response)

    //         const keys = Object.entries(response).map(([key]) => key)

    //         setSliderData(keys)
    //     })
    // }, [])

    useEffect(() => {
        CountryContractMapServices.GetGlobalMapData().then((response) => {
            setDataFromApi(response)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let dateObject = {}
        dataFromApi &&
            dataFromApi.result.map((data) => {
                let countryObject = {}
                data.details.map((detail) => {
                    if (detail.country_code != 'ALL') {
                        countryObject = {
                            ...countryObject,
                            [detail.country_code]: {
                                value: detail.amount_usd,
                                number: detail.tender_count,
                                url: `/country/${detail.country
                                    .toLowerCase()
                                    .replace(' ', '-')}`
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

    // console.log(continent[selectedContinent])

    if (!contractDataApi) {
        return ''
    }

    return (
        <Fragment>
            <section className="hero-section relative [ mx-auto px-4 ] [ flex flex-col justify-center ]">
                <div className="outer-circle mt-40 mx-auto relative [ flex justify-center items-center ]">
                    <CircleIcon className="circle-ring absolute h-full w-full z-negative" />
                    <HeroIcon className="covid-icon" />
                    <div className="inner-circle rounded-full bg-yellow-20 overflow-hidden [ flex flex-col justify-center items-center ]">
                        <div className="[ flex-1 flex flex-col justify-end items-center ] pb-8">
                            <h1 className="[ text-3xl md:text-4xl font-bold uppercase leading-none ] text-center">
                                {trans('EMERGENCY PROCUREMENT')}
                            </h1>
                            <p className="uppercase mt-6">
                                {trans(
                                    'DATA, BEST PRACTICES AND RECOMMENDATIONS'
                                )}
                            </p>
                        </div>
                        <div
                            style={{
                                height: '200px'
                            }}
                            className="[ flex flex-wrap md:flex-no-wrap justify-center ] pt-12 w-full text-white bg-primary-dark">
                            <a
                                href=""
                                className="flex [ mr-12 mb-10 ] text-center">
                                <div>
                                    <p className="[ text-lg font-bold uppercase ] border-b-4 border-primary-blue">
                                        {trans('Explore data')}
                                    </p>
                                    <p className="text-sm opacity-50 mt-1">
                                        {trans('Stats from countries')}
                                    </p>
                                </div>
                            </a>
                            <a href="" className="flex text-center">
                                <div>
                                    <p className="[ text-lg font-bold uppercase ] border-b-4 border-primary-blue">
                                        {trans('Explore library')}
                                    </p>
                                    <p className="text-sm opacity-50 mt-1">
                                        {trans('Best practices and resources')}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-white text-center mt-12 mb-40">
                    <MouseScroll className="m-auto" />
                    <p className="text-sm mt-3">Scroll down for more</p>
                </div>

                <BottomCurve className="absolute bottom-0 left-0 h-auto w-full" />
            </section>
            <section className="pt-16 bg-primary-gray pb-24">
                <div className="text-center mb-10">
                    <h3 className="uppercase text-3xl font-bold leading-none">
                        <span className="block text-base font-bold">
                            Explore
                        </span>
                        Countries
                    </h3>
                    <p className="text-base text-opacity-50  text-primary-dark">
                        Government spendings to fight COVID-19
                    </p>
                </div>
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
                                        <div className="flex-1 relative">
                                            <TabPanel>
                                                <div className="flex justify-end">
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
                                                Chart section under construction
                                                !!
                                            </TabPanel>
                                            <TabPanel>
                                                Table Section under construction
                                                !!
                                            </TabPanel>
                                            <TabPanel>
                                                Sources section under
                                                construction !!
                                            </TabPanel>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>
                        </FullScreen>
                        <div
                            className="flex items-center justify-between pt-4 border-t border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
                            <div className="flex">
                                <span className="flex items-center">
                                    <DownloadIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Download
                                    </span>
                                </span>
                                <span className="ml-8 flex items-center">
                                    <ShareIcon className="mr-2 inline-block" />{' '}
                                    <span className="cursor-pointer">
                                        Share
                                    </span>
                                </span>
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
                {/* <GeoChart data={geo_data} /> */}
            </section>
            <NewsSection />
            <Library />
        </Fragment>
    )
}

export default Home

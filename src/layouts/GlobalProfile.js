import React, { useCallback, Fragment, useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import * as dayjs from 'dayjs'
import Select from 'react-select'

import GlobalDataCharts from '../components/globalProfile/GlobalDataCharts'
import Map from '../components/charts/Map/Map'
import Loader from '../components/loader/Loader'
import useTrans from '../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../assets/img/icons/ic_fullscreen.svg'
import CountryContractMapServices from '../services/countryContractMapServices'
import GlobalMap from '../components/GlobalMap/GlobalMap'

const GlobalProfile = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    // const [contractData, setContractData] = useState(null)
    const [contractType, setContractType] = useState('value')
    const [sliderData, setSliderData] = useState([])
    const [yearMonth, setYearMonth] = useState('')

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
    //     })
    // }, [])

    useEffect(() => {
        CountryContractMapServices.GetGlobalMapData().then((response) => {
            setDataFromApi(response)
            setLoading(false)
        })
    }, [])

    const handleContinentChange = (selectedOption, value) => {
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

    useEffect(() => {
        let dateObject = {}
        dataFromApi &&
            dataFromApi.result.map((data) => {
                let countryObject = {}
                data.details.map((detail) => {
                    if (detail.country_code != 'ALL') {
                        countryObject = {
                            ...countryObject,
                            [detail.aplha2_code]: {
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

    if (!contractDataApi) {
        return ''
    }

    return (
        <Fragment>
            <section className="global-profile -mt-8">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <section className="bg-blue-0 pt-20 px-4">
                            <div className="container mx-auto">
                                <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                                    Global Overview
                                </h2>
                                <div className="flex flex-wrap -mx-4 -mb-4">
                                    <div className="w-full px-4 mb-4">
                                        <div className="bg-white rounded p-6">
                                            <FullScreen handle={handle}>
                                                <div className="relative">
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

                                                    <div>
                                                        {/* <Map
                                                            contractData={
                                                                contractDataApi
                                                            }
                                                            contractType={
                                                                contractType
                                                            }
                                                            yearMonth={
                                                                yearMonth
                                                            }
                                                            sliderData={
                                                                sliderData
                                                            }
                                                        /> */}
                                                        <GlobalMap
                                                            coordinates={
                                                                continent[
                                                                    selectedContinent
                                                                        .value
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                </div>
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
                                                        <button
                                                            onClick={
                                                                handle.enter
                                                            }>
                                                            <span className="cursor-pointer">
                                                                View full screen
                                                            </span>
                                                            <FullViewIcon className="ml-2 inline-block" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Tabs>
                            <div className="container mx-auto">
                                <TabList>
                                    <Tab>{trans('Data')}</Tab>
                                </TabList>
                            </div>
                            <div
                                style={{
                                    borderTop: '5px solid #1fbbec'
                                }}
                                className="py-16 bg-primary-gray px-4">
                                <div className="container mx-auto">
                                    <TabPanel>
                                        <GlobalDataCharts />
                                    </TabPanel>
                                </div>
                            </div>
                        </Tabs>
                    </>
                )}
            </section>
        </Fragment>
    )
}

export default GlobalProfile

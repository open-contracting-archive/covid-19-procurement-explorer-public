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
import VisualizationServices from '../services/visualizationServices'
import GlobalMap from '../components/GlobalMap/GlobalMap'
import { CONTINENTS } from '../helpers'

const GlobalProfile = () => {
    // ===========================================================================
    // State and variables
    // ===========================================================================
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [contractType, setContractType] = useState('value')
    const [mapData, setMapData] = useState()
    // const [contractData, setContractData] = useState(null)
    // const [dataFromApi, setDataFromApi] = useState()
    // const [contractDataApi, setContractDataApi] = useState({})
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

    // ===========================================================================
    // Hooks
    // ===========================================================================
    useEffect(() => {
        VisualizationServices.GlobalMap().then((response) => {
            setData(response)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        let mapData = {}
        const parsedMapData =
            data.result &&
            data.result.map((data) => {
                return (mapData = {
                    ...mapData,
                    id: data.country_code,
                    value:
                        contractType == 'value'
                            ? data.amount_usd
                            : data.tender_count,
                    url: `/country/${data.country
                        .toLowerCase()
                        .replace(' ', '-')}`
                })
            })
        setMapData(parsedMapData)
    }, [data, contractType])

    // ===========================================================================
    // Handler and functions
    // ===========================================================================
    const handleContinentChange = (selectedOption, value) => {
        setSelectedContinent(selectedOption)
    }

    // ===========================================================================
    // Others
    // ===========================================================================
    // if (!contractDataApi) {
    //     return ''
    // }
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
                                                        <GlobalMap
                                                            data={mapData}
                                                            contractType={
                                                                contractType
                                                            }
                                                            coordinates={
                                                                CONTINENTS[
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

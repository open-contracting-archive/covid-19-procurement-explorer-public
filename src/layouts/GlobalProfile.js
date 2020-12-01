import React, { useCallback, Fragment, useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GlobalDataCharts from '../components/globalProfile/GlobalDataCharts'
import GlobalMap from '../components/GlobalMap/GlobalMap'
import ChartShare from '../components/ChartShare/ChartShare'
import Loader from '../components/loader/Loader'
import useTrans from '../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

function GlobalProfile() {
    const [loading, setLoading] = useState(false)
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    useEffect(() => {
        setLoading(true)
    }, [])

    return (
        <Fragment>
            {loading ? (
                <section className="global-profile -mt-8">
                    <section className="bg-blue-0 pt-20 px-4">
                        <div className="container mx-auto">
                            <h2 className="font-normal mb-5 text-2xl  text-primary-dark">
                                Global Profile
                            </h2>
                            <div className="flex flex-wrap -mx-4 -mb-4">
                                <div className="w-full px-4 mb-4">
                                    <div className="bg-white rounded p-6">
                                        <FullScreen handle={handle}>
                                            <div className="simple-tab">
                                                <Tabs>
                                                    <div className="flex">
                                                        <TabList>
                                                            <Tab>
                                                                {trans(
                                                                    'By contract value'
                                                                )}
                                                            </Tab>
                                                            <Tab>
                                                                {trans(
                                                                    'By number of contracts'
                                                                )}
                                                            </Tab>
                                                        </TabList>
                                                    </div>

                                                    <div>
                                                        <TabPanel>
                                                            <GlobalMap />
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <GlobalMap />
                                                        </TabPanel>
                                                    </div>
                                                </Tabs>
                                            </div>
                                        </FullScreen>
                                        <div
                                            className="flex items-center justify-between pt-4 border-t mt-10 border-blue-0 text-sm
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
                                                        onClick={handle.enter}>
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
                </section>
            ) : (
                <Loader />
            )}
        </Fragment>
    )
}

export default GlobalProfile

import React, { useCallback } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import RaceBarChart from '../charts/RaceBarChart/RaceBarChart'
import useTrans from '../../hooks/useTrans'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

// Add Race Bar Chart data
const race_bar_chart_data = {
    2003: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },

        {
            network: 'Friendster',
            MAU: 4470000
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 0
        }
    ],
    2004: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 3675135
        },
        {
            network: 'Friendster',
            MAU: 5970054
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 980036
        },
        {
            network: 'Orkut',
            MAU: 4900180
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 0
        }
    ],
    2005: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 7399354
        },
        {
            network: 'Friendster',
            MAU: 7459742
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 9731610
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 19490059
        },
        {
            network: 'Orkut',
            MAU: 9865805
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 1946322
        }
    ],
    2006: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 14949270
        },
        {
            network: 'Friendster',
            MAU: 8989854
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 19932360
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 54763260
        },
        {
            network: 'Orkut',
            MAU: 14966180
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 248309
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 19878248
        }
    ],
    2007: [
        {
            network: 'Facebook',
            MAU: 0
        },
        {
            network: 'Flickr',
            MAU: 29299875
        },
        {
            network: 'Friendster',
            MAU: 24253200
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 29533250
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 69299875
        },
        {
            network: 'Orkut',
            MAU: 26916562
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 488331
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 143932250
        }
    ],
    2008: [
        {
            network: 'Facebook',
            MAU: 100000000
        },
        {
            network: 'Flickr',
            MAU: 30000000
        },
        {
            network: 'Friendster',
            MAU: 51008911
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 55045618
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 72408233
        },
        {
            network: 'Orkut',
            MAU: 44357628
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 1944940
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 294493950
        }
    ],
    2009: [
        {
            network: 'Facebook',
            MAU: 276000000
        },
        {
            network: 'Flickr',
            MAU: 41834525
        },
        {
            network: 'Friendster',
            MAU: 28804331
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 57893524
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 70133095
        },
        {
            network: 'Orkut',
            MAU: 47366905
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 3893524
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 0
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 0
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 413611440
        }
    ],
    2010: [
        {
            network: 'Facebook',
            MAU: 517750000
        },
        {
            network: 'Flickr',
            MAU: 54708063
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 166029650
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 59953290
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 68046710
        },
        {
            network: 'Orkut',
            MAU: 49941613
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 43250000
        },
        {
            network: 'WeChat',
            MAU: 0
        },
        {
            network: 'Weibo',
            MAU: 19532900
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 480551990
        }
    ],
    2011: [
        {
            network: 'Facebook',
            MAU: 766000000
        },
        {
            network: 'Flickr',
            MAU: 66954600
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 0
        },
        {
            network: 'Hi5',
            MAU: 46610848
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 46003536
        },
        {
            network: 'Orkut',
            MAU: 47609080
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 0
        },
        {
            network: 'Twitter',
            MAU: 92750000
        },
        {
            network: 'WeChat',
            MAU: 47818400
        },
        {
            network: 'Weibo',
            MAU: 48691040
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 642669824
        }
    ],
    2012: [
        {
            network: 'Facebook',
            MAU: 979750000
        },
        {
            network: 'Flickr',
            MAU: 79664888
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 107319100
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 0
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 45067022
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 146890156
        },
        {
            network: 'Twitter',
            MAU: 160250000
        },
        {
            network: 'WeChat',
            MAU: 118123370
        },
        {
            network: 'Weibo',
            MAU: 79195730
        },
        {
            network: 'Whatsapp',
            MAU: 0
        },
        {
            network: 'YouTube',
            MAU: 844638200
        }
    ],
    2013: [
        {
            network: 'Facebook',
            MAU: 1170500000
        },
        {
            network: 'Flickr',
            MAU: 80000000
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 205654700
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 117500000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 0
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 293482050
        },
        {
            network: 'Twitter',
            MAU: 223675000
        },
        {
            network: 'WeChat',
            MAU: 196523760
        },
        {
            network: 'Weibo',
            MAU: 118261880
        },
        {
            network: 'Whatsapp',
            MAU: 300000000
        },
        {
            network: 'YouTube',
            MAU: 1065223075
        }
    ],
    2014: [
        {
            network: 'Facebook',
            MAU: 1334000000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 254859015
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 250000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 135786956
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 388721163
        },
        {
            network: 'Twitter',
            MAU: 223675000
        },
        {
            network: 'WeChat',
            MAU: 444232415
        },
        {
            network: 'Weibo',
            MAU: 154890345
        },
        {
            network: 'Whatsapp',
            MAU: 498750000
        },
        {
            network: 'YouTube',
            MAU: 1249451725
        }
    ],
    2015: [
        {
            network: 'Facebook',
            MAU: 1516750000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 170000000
        },
        {
            network: 'Google+',
            MAU: 298950015
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 400000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 0
        },
        {
            network: 'Reddit',
            MAU: 163346676
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 475923363
        },
        {
            network: 'Twitter',
            MAU: 304500000
        },
        {
            network: 'WeChat',
            MAU: 660843407
        },
        {
            network: 'Weibo',
            MAU: 208716685
        },
        {
            network: 'Whatsapp',
            MAU: 800000000
        },
        {
            network: 'YouTube',
            MAU: 1328133360
        }
    ],
    2016: [
        {
            network: 'Facebook',
            MAU: 1753500000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 398648000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 550000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 143250000
        },
        {
            network: 'Reddit',
            MAU: 238972480
        },
        {
            network: 'Snapchat',
            MAU: 238648000
        },
        {
            network: 'TikTok',
            MAU: 0
        },
        {
            network: 'Tumblr',
            MAU: 565796720
        },
        {
            network: 'Twitter',
            MAU: 314500000
        },
        {
            network: 'WeChat',
            MAU: 847512320
        },
        {
            network: 'Weibo',
            MAU: 281026560
        },
        {
            network: 'Whatsapp',
            MAU: 1000000000
        },
        {
            network: 'YouTube',
            MAU: 1399053600
        }
    ],
    2017: [
        {
            network: 'Facebook',
            MAU: 2035750000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 495657000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 750000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 195000000
        },
        {
            network: 'Reddit',
            MAU: 297394200
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 239142500
        },
        {
            network: 'Tumblr',
            MAU: 593783960
        },
        {
            network: 'Twitter',
            MAU: 328250000
        },
        {
            network: 'WeChat',
            MAU: 921742750
        },
        {
            network: 'Weibo',
            MAU: 357569030
        },
        {
            network: 'Whatsapp',
            MAU: 1333333333
        },
        {
            network: 'YouTube',
            MAU: 1495657000
        }
    ],
    2018: [
        {
            network: 'Facebook',
            MAU: 2255250000
        },
        {
            network: 'Flickr',
            MAU: 0
        },
        {
            network: 'Friendster',
            MAU: 0
        },
        {
            network: 'Google Buzz',
            MAU: 0
        },
        {
            network: 'Google+',
            MAU: 430000000
        },
        {
            network: 'Hi5',
            MAU: 0
        },
        {
            network: 'Instagram',
            MAU: 1000000000
        },
        {
            network: 'MySpace',
            MAU: 0
        },
        {
            network: 'Orkut',
            MAU: 0
        },
        {
            network: 'Pinterest',
            MAU: 246500000
        },
        {
            network: 'Reddit',
            MAU: 355000000
        },
        {
            network: 'Snapchat',
            MAU: 0
        },
        {
            network: 'TikTok',
            MAU: 500000000
        },
        {
            network: 'Tumblr',
            MAU: 624000000
        },
        {
            network: 'Twitter',
            MAU: 329500000
        },
        {
            network: 'WeChat',
            MAU: 1000000000
        },
        {
            network: 'Weibo',
            MAU: 431000000
        },
        {
            network: 'Whatsapp',
            MAU: 1433333333
        },
        {
            network: 'YouTube',
            MAU: 1900000000
        }
    ]
}

function ProcurementTimeline() {
    const { trans } = useTrans()
    const handle = useFullScreenHandle()

    return (
        <div className="bg-white rounded p-6 procurement-timeline">
            <FullScreen handle={handle}>
                <h3 className="uppercase font-bold  text-primary-dark mb-6">
                    Procurement Timeline
                </h3>
                <div className="flex simple-tab">
                    <Tabs>
                        <div className="flex justify-end">
                            <TabList>
                                <Tab>{trans('By contract value')}</Tab>
                                <Tab>{trans('By number of contracts')}</Tab>
                            </TabList>
                        </div>

                        <div className="flex">
                            <div>
                                <ul className="arrow-nav">
                                    <li className="active py-2 border-b border-blue-0 text-blue-50">
                                        Spending
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Number of Contracts
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Buyers
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Suppliers
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Avg. bids
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Cancelled Awards
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Monopolisation
                                    </li>
                                    <li className="py-2 border-b border-blue-0 text-blue-50 opacity-50">
                                        Direct/ Open contracts
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <TabPanel>
                                    <RaceBarChart data={race_bar_chart_data} />
                                </TabPanel>
                                <TabPanel>
                                    <RaceBarChart data={race_bar_chart_data} />
                                </TabPanel>
                            </div>
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
                        <span className="cursor-pointer">Download</span>
                    </span>
                    <span className="ml-8 flex items-center">
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">Share</span>
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
    )
}

export default ProcurementTimeline

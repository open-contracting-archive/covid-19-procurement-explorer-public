import React from 'react'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import useTrans from '../../hooks/useTrans'

const ChartFooter = (props) => {
    const { trans } = useTrans()
    function showFullScreenAction() {
        if (props.fullScreenHandler) {
            return (
                <div>
                    <span className="flex items-center">
                        <button onClick={props.fullScreenHandler.enter}>
                            <span className="cursor-pointer">
                                {trans('View full screen')}
                            </span>
                            <FullViewIcon className="ml-2 inline-block" />
                        </button>
                    </span>
                </div>
            )
        }
    }

    return (
        <div
            className="flex items-center justify-between pt-4 border-t mt-10 border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
            <div className="flex items-center">
                <div className="flex items-center mr-6">
                    <DownloadIcon className="mr-2 inline-block" />
                    <span>{trans('Download')}</span>
                </div>
                <span className="flex items-center">
                    <ShareIcon className="mr-2 inline-block" />{' '}
                    <span className="cursor-pointer">{trans('Share')}</span>
                </span>
            </div>

            {showFullScreenAction()}
        </div>
    )
}

export default ChartFooter

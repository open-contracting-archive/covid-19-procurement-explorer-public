import React from "react"
import { ReactComponent as ShareIcon } from "../../assets/img/icons/ic_share.svg"
import { ReactComponent as FullViewIcon } from "../../assets/img/icons/ic_fullscreen.svg"

const ChartFooter = (props) => {
    function showFullScreenAction() {
        if (props.fullScreenHandler) {
            return (<div>
                <span className="flex items-center">
                    <button onClick={props.fullScreenHandler.enter}>
                        <span className="cursor-pointer">
                            View full screen
                        </span>
                        <FullViewIcon className="ml-2 inline-block" />
                    </button>
                </span>
            </div>)
        }
    }

    return (
        <div
            className="flex items-center justify-between pt-4 border-t mt-10 border-blue-0 text-sm
                                             text-primary-blue -mx-6 px-6">
            <div className="flex">
                <span className="flex items-center">
                    <ShareIcon className="mr-2 inline-block" />{' '}
                    <span className="cursor-pointer">Share</span>
                </span>
            </div>

            {showFullScreenAction()}
        </div>
    )
}

export default ChartFooter

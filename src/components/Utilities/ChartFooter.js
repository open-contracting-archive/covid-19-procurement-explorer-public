import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import useTrans from '../../hooks/useTrans'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import { twitterHandle } from '../../helpers/general'
import socialIcons from '../../assets/img/icons/social'

const ChartFooter = (props) => {
    const { linkText } = props
    const { trans } = useTrans()

    function showFullScreenAction() {
        if (props.fullScreenHandler) {
            return (
                <div>
                    <span className="flex items-center">
                        <button onClick={props.fullScreenHandler.enter}>
                            <span className="hidden md:inline-block cursor-pointer">
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
            className="chart-footer flex-wrap md:flex-no-wrap bg-white flex items-center justify-between border-t md:mt-4
             border-blue-0 text-sm text-primary-blue -mx-4 p-4 md:pb-0 rounded-b">
            <div className="flex items-center">
                <div className="flex items-center mr-6">
                    <DownloadIcon className="mr-2 inline-block" />
                    <span>{trans('Download')}</span>
                </div>
                <div className="flex items-center relative">
                    <button>
                        <ShareIcon className="mr-2 inline-block" />{' '}
                        <span className="cursor-pointer">{trans('Share')}</span>
                    </button>
                    <nav className="share-menu">
                        <span className="mb-3 inline-block text-primary-dark">
                            Share on
                        </span>
                        <div className="flex flex-col">
                            <FacebookShareButton
                                url={window.location.href}
                                className="social-icon">
                                <socialIcons.fbIcon />
                                <span>Facebook</span>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={window.location.href}
                                via={twitterHandle}
                                className="social-icon">
                                <socialIcons.twitterIcon />
                                <span>Twitter</span>
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={window.location.href}
                                className="social-icon">
                                <socialIcons.linkedIcon />
                                <span>Linkedin</span>
                            </LinkedinShareButton>

                            <EmailShareButton
                                url={window.location.href}
                                className="social-icon email">
                                <socialIcons.mailIcon />
                                <span>Email</span>
                            </EmailShareButton>
                        </div>

                        <span className="block mt-1 pt-3 mb-2 -mx-3 px-3 text-primary-dark">
                            Share as
                        </span>

                        <div className="social-embed flex items-center">
                            <socialIcons.codingIcon className="w-5" />
                            <span className="ml-4">Embeded</span>
                        </div>
                    </nav>
                </div>
            </div>

            {linkText && (
                <div className="w-full md:w-auto my-4 md:my-0">
                    <Link
                        to={linkText}
                        className="text-primary-blue inline-block text-sm">
                        View in detail →
                    </Link>
                </div>
            )}

            {showFullScreenAction()}
        </div>
    )
}

export default ChartFooter

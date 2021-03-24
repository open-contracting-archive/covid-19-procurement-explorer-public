import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import EmbeddedModal from '../Modals/EmbeddedModal'
import useTrans from '../../hooks/useTrans'
import { twitterHandle } from '../../helpers/general'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'
import socialIcons from '../../assets/img/icons/social'
import { useDetectOutsideClick } from '../Utilities/useDetectOutsideClick'

const currentLocation = window.location.href

const ChartFooter = (props) => {
    const { fullScreenHandler, embeddedVisualization = null, linkText, downloadUrl = null } = props
    const { isModalOpen, openModal, closeModal } = useModal()
    const modalHandler = () => {
        if (!isModalOpen) {
            openModal()
        }
    }
    const dropdownRef = useRef(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const onClick = () => setIsActive(!isActive)
    const { trans } = useTrans()

    function showFullScreenAction() {
        if (fullScreenHandler) {
            return (
                <div>
                    <span className="flex items-center">
                        <button onClick={fullScreenHandler.enter}>
                            <span className="hidden cursor-pointer md:inline-block">
                                {trans('View full screen')}
                            </span>
                            <FullViewIcon className="inline-block ml-2" />
                        </button>
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="flex flex-wrap items-center justify-between p-4 text-sm bg-white border-t rounded rounded-t-none rounded-b chart-footer md:flex-no-wrap border-blue-0 text-primary-blue">
            <div className="flex items-center">
                {downloadUrl && (
                    <div className="flex items-center mr-4 md:mr-6">
                        <a href={downloadUrl} target="_blank" rel="noreferrer">
                            <DownloadIcon className=" mr-2 inline-block" />
                            <span className=" hidden md:inline-block">
                                {trans('Download')}
                            </span>
                        </a>
                    </div>
                )}
                <div className="relative flex items-center">
                    <button onClick={onClick} className="dropdown-menu-trigger">
                        <ShareIcon className="inline-block mr-2" />{' '}
                        <span className="hidden cursor-pointer md:inline-block">
                            {trans('Share')}
                        </span>
                    </button>
                    <nav
                        ref={dropdownRef}
                        className={`dropdown-menu ${
                            isActive ? 'active' : 'inactive'
                        }`}>
                        <span className="inline-block mb-3 text-primary-dark">
                            {trans('Share on')}
                        </span>
                        <div className=" flex flex-col">
                            <FacebookShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <socialIcons.fbIcon />
                                <span>{trans('Facebook')}</span>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={currentLocation}
                                via={twitterHandle}
                                className=" social-icon">
                                <socialIcons.twitterIcon />
                                <span>{trans('Twitter')}</span>
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <socialIcons.linkedIcon />
                                <span>{trans('LinkedIn')}</span>
                            </LinkedinShareButton>

                            <EmailShareButton
                                url={currentLocation}
                                className=" social-icon email">
                                <socialIcons.mailIcon />
                                <span>{trans('Email')}</span>
                            </EmailShareButton>
                        </div>

                        {embeddedVisualization && (
                            <Fragment>
                                <div className="embedded-share">
                                    <span className="block px-3 mb-2 -mx-3 text-primary-dark">
                                        {trans('Share as')}
                                    </span>
                                    <div
                                        className="flex items-center cursor-pointer social-embed"
                                        onClick={() => modalHandler()}>
                                        <socialIcons.codingIcon className=" w-5" />
                                        <span className=" ml-4">
                                            {trans('Embedded')}
                                        </span>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </nav>
                </div>
            </div>

            {linkText && (
                <div className="absolute left-0 right-0 w-full m-0 text-center md:relative md:text-left md:w-auto md:my-0">
                    <Link
                        to={linkText}
                        className="inline-block text-sm text-primary-blue">
                        View in detail →
                    </Link>
                </div>
            )}

            {showFullScreenAction()}

            <Modal
                id=" embedded-visualization-modal"
                isOpen={isModalOpen}
                transition={ModalTransition.NONE}>
                <EmbeddedModal
                    params={embeddedVisualization}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    )
}

export default ChartFooter

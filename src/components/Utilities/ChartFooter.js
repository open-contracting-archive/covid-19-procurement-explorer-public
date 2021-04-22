import React, { Fragment, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import { EmbeddedModal } from './index'
import { t } from '@transifex/native'
import { countryContractsUrl, twitterHandle } from '../../helpers/general'
import socialIcons from '../../assets/img/icons/social'
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick'
import useCountries from '../../hooks/useCountries'
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/ic_download.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/icons/ic_share.svg'
import { ReactComponent as FullViewIcon } from '../../assets/img/icons/ic_fullscreen.svg'

const currentLocation = window.location.href

const ChartFooter = (props) => {
    const {
        fullScreenHandler,
        embeddedVisualization = null,
        linkText,
        downloadUrl = null
    } = props
    const { isModalOpen, openModal, closeModal } = useModal()
    const modalHandler = () => {
        if (!isModalOpen) {
            openModal()
        }
    }
    const dropdownRef = useRef(null)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const onClick = () => setIsActive(!isActive)
    const { countrySlug } = useParams()
    const { currentCountry } = useCountries()

    function showFullScreenAction() {
        if (fullScreenHandler) {
            return (
                <div>
                    <span className="flex items-center">
                        <button onClick={fullScreenHandler.enter}>
                            <span className="hidden cursor-pointer md:inline-block">
                                {t('View full screen')}
                            </span>
                            <FullViewIcon className="inline-block ml-2" />
                        </button>
                    </span>
                </div>
            )
        }
    }

    function downloadCountryContracts() {
        const country = currentCountry(countrySlug)
        return countryContractsUrl(country.name)
    }

    return (
        <div className="flex flex-wrap items-center justify-between p-4 text-sm bg-white border-t rounded rounded-t-none rounded-b chart-footer md:flex-no-wrap border-blue-0 text-primary-blue">
            <div className="flex items-center">
                {downloadUrl ? (
                    <div className="flex items-center mr-4 md:mr-6">
                        <a href={downloadUrl} target="_blank" rel="noreferrer">
                            <DownloadIcon className=" mr-2 inline-block" />
                            <span className=" hidden md:inline-block">
                                {t('Download')}
                            </span>
                        </a>
                    </div>
                ) : (
                    countrySlug && (
                        <div className="flex items-center mr-4 md:mr-6">
                            <a
                                href={downloadCountryContracts()}
                                target="_blank"
                                rel="noreferrer">
                                <DownloadIcon className=" mr-2 inline-block" />
                                <span className=" hidden md:inline-block">
                                    {t('Download')}
                                </span>
                            </a>
                        </div>
                    )
                )}
                <div className="relative flex items-center">
                    <button onClick={onClick} className="dropdown-menu-trigger">
                        <ShareIcon className="inline-block mr-2" />{' '}
                        <span className="hidden cursor-pointer md:inline-block">
                            {t('Share')}
                        </span>
                    </button>
                    <nav
                        ref={dropdownRef}
                        className={`dropdown-menu ${
                            isActive ? 'active' : 'inactive'
                        }`}>
                        <span className="inline-block mb-3 text-primary-dark">
                            {t('Share on')}
                        </span>
                        <div className=" flex flex-col">
                            <FacebookShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <socialIcons.fbIcon />
                                <span>{t('Facebook')}</span>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={currentLocation}
                                via={twitterHandle}
                                className=" social-icon">
                                <socialIcons.twitterIcon />
                                <span>{t('Twitter')}</span>
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <socialIcons.linkedIcon />
                                <span>{t('LinkedIn')}</span>
                            </LinkedinShareButton>

                            <EmailShareButton
                                url={currentLocation}
                                className=" social-icon email">
                                <socialIcons.mailIcon />
                                <span>{t('Email')}</span>
                            </EmailShareButton>
                        </div>

                        {embeddedVisualization && (
                            <Fragment>
                                <div className="embedded-share">
                                    <span className="block px-3 mb-2 -mx-3 text-primary-dark">
                                        {t('Share as')}
                                    </span>
                                    <div
                                        className="flex items-center cursor-pointer social-embed"
                                        onClick={() => modalHandler()}>
                                        <socialIcons.codingIcon className=" w-5" />
                                        <span className=" ml-4">
                                            {t('Embedded')}
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

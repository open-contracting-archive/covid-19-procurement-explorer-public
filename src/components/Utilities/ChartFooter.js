import React, { Fragment, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Modal, useModal, ModalTransition } from 'react-simple-hook-modal'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import { T } from '@transifex/react'
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick'
import { EmbeddedModal } from './index'
import { countryContractsUrl, twitterHandle } from '../../helpers/general'
import useCountries from '../../hooks/useCountries'
import SocialIcon from '../../assets/img/icons/social'
import Icon from '../../assets/img/icons'

const currentLocation = window.location.href

const ChartFooter = (props) => {
    const {
        fullScreenHandler,
        embeddedVisualization = null,
        detailViewURL,
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
                                <T _str="View full screen" />
                            </span>
                            <Icon.Fullscreen className="inline-block ml-2" />
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
                            <Icon.Download className=" mr-2 inline-block" />
                            <span className=" hidden md:inline-block">
                                <T _str="Download" />
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
                                <Icon.Download className=" mr-2 inline-block" />
                                <span className=" hidden md:inline-block">
                                    <T _str="Download" />
                                </span>
                            </a>
                        </div>
                    )
                )}
                <div className="relative flex items-center">
                    <button onClick={onClick} className="dropdown-menu-trigger">
                        <Icon.Share className="inline-block mr-2" />{' '}
                        <span className="hidden cursor-pointer md:inline-block">
                            <T _str="Share" />
                        </span>
                    </button>
                    <nav
                        ref={dropdownRef}
                        className={`dropdown-menu ${
                            isActive ? 'active' : 'inactive'
                        }`}>
                        <span className="inline-block mb-3 text-primary-dark">
                            <T _str="Share on" />
                        </span>
                        <div className=" flex flex-col">
                            <FacebookShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <SocialIcon.Facebook />
                                <span>
                                    <T _str="Facebook" />
                                </span>
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={currentLocation}
                                via={twitterHandle}
                                className=" social-icon">
                                <SocialIcon.Twitter />
                                <span>
                                    <T _str="Twitter" />
                                </span>
                            </TwitterShareButton>

                            <LinkedinShareButton
                                url={currentLocation}
                                className=" social-icon">
                                <SocialIcon.Linked />
                                <span>
                                    <T _str="LinkedIn" />
                                </span>
                            </LinkedinShareButton>

                            <EmailShareButton
                                url={currentLocation}
                                className=" social-icon email">
                                <SocialIcon.Mail />
                                <span>
                                    <T _str="Email" />
                                </span>
                            </EmailShareButton>
                        </div>

                        {embeddedVisualization && (
                            <Fragment>
                                <div className="embedded-share">
                                    <span className="block px-3 mb-2 -mx-3 text-primary-dark">
                                        <T _str="Share as" />
                                    </span>
                                    <div
                                        className="flex items-center cursor-pointer social-embed"
                                        onClick={() => modalHandler()}>
                                        <SocialIcon.Embedded className=" w-5" />
                                        <span className=" ml-4">
                                            <T _str="Embedded" />
                                        </span>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </nav>
                </div>
            </div>

            {detailViewURL && (
                <div className="absolute left-0 right-0 w-full m-0 text-center md:relative md:text-left md:w-auto md:my-0">
                    <Link
                        to={detailViewURL}
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

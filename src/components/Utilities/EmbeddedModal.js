import React, { useEffect, useState } from 'react'
import { t } from '@transifex/native'
import { siteUrl } from '../../helpers/general'
import { ReactComponent as CodingIcon } from '../../assets/img/icons/ic_coding.svg'
import { ReactComponent as CopyIcon } from '../../assets/img/icons/ic_copy.svg'

const copyToClipboard = (elementId) => {
    const element = document.getElementById(elementId)
    element.select()
    element.setSelectionRange(0, 99999)
    document.execCommand('copy')
}

const getSiteUrl = (params) => {
    const { key: visualizationKey, options = null } = params
    let url = `${siteUrl}/visualization/embedded/${visualizationKey}`

    if (options) {
        url += `?`
        Object.keys(options).forEach((key) => {
            url += `${key}=${options[key]}`
        })
    }

    return url
}

const EmbeddedModal = (props) => {
    const { params, closeModal } = props
    const [snippet, setSnippet] = useState('')

    useEffect(() => {
        const iframeHTMLElement = document.createElement('IFRAME')
        iframeHTMLElement.src = getSiteUrl(params)
        iframeHTMLElement.className = 'embed-responsive-item'
        iframeHTMLElement.frameBorder = '0'
        iframeHTMLElement.scrolling = 'no'
        iframeHTMLElement.setAttribute('allowFullScreen', 'true')
        iframeHTMLElement.setAttribute('mozAllowFullScreen', 'true')
        iframeHTMLElement.setAttribute('webkitAllowFullScreen', 'true')
        iframeHTMLElement.style.width = '100%'
        iframeHTMLElement.style.height = '50vh'
        iframeHTMLElement.style.margin = '0'
        iframeHTMLElement.style.border = 'none'
        setSnippet(iframeHTMLElement.outerHTML)
    }, [params?.key, params?.country])

    return (
        <div className="container mx-auto p-6">
            <div>
                <h3 className="text-lg mb-4">
                    {t('Share this chart on your website')}
                </h3>
                <button
                    className="icon-close"
                    title="Close"
                    onClick={closeModal}
                />
            </div>
            <div>
                <div className="flex items-center">
                    <span className="inline-block mr-2">
                        <CodingIcon className="w-4 h-4" />
                    </span>
                    <span>{t('Copy/paste this code snippet')}</span>
                </div>
                <div>
                    <div className="flex items-center">
                        <textarea
                            id={'embed-code-snippet'}
                            name="embedded-visualization-code-snippet"
                            className="w-full bg-gray py-2 px-3 rounded ml-6 mt-1 focus:outline-none resize-none"
                            rows={3}
                            readOnly
                            value={snippet}
                        />
                        <CopyIcon
                            className="ml-4 w-4 h-4 cursor-pointer"
                            onClick={() =>
                                copyToClipboard('embed-code-snippet')
                            }
                        />
                    </div>
                    {/*<div className="ml-6 mt-3">*/}
                    {/*    <label>*/}
                    {/*        <input type="radio" name="format" value="iframe" />{' '}*/}
                    {/*        Iframe*/}
                    {/*    </label>*/}
                    {/*</div>*/}
                    {/*<div className="flex items-center ml-6 mt-3">*/}
                    {/*    <div className="flex items-center mr-4">*/}
                    {/*        <label className="mr-2">Width</label>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            name="width"*/}
                    {/*            placeholder="100%"*/}
                    {/*            value=""*/}
                    {/*            className="w-full bg-gray py-2 px-3 rounded"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="flex items-center">*/}
                    {/*        <label className="mr-2">Height</label>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            name="height"*/}
                    {/*            placeholder="600px"*/}
                    {/*            value=""*/}
                    {/*            className="w-full bg-gray py-2 px-3 rounded"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="ml-6 mt-10">
                    <button
                        className="focus:outline-none bg-primary-blue text-center rounded text-white py-2 px-6"
                        onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmbeddedModal

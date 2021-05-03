import React, { useEffect, useState } from 'react'
import { T } from '@transifex/react'
import { siteUrl } from '../../helpers/general'
import Icon from '../../assets/img/icons'

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
                    <T _str="Share this chart on your website" />
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
                        <Icon.Coding className="w-4 h-4" />
                    </span>
                    <span>
                        <T _str="Copy/paste this code snippet" />
                    </span>
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
                        <Icon.Copy
                            className="ml-4 w-4 h-4 cursor-pointer"
                            onClick={() =>
                                copyToClipboard('embed-code-snippet')
                            }
                        />
                    </div>
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

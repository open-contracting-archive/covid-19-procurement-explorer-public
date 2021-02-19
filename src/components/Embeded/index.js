import React from 'react'
import { ReactComponent as CodingIcon } from '../../assets/img/icons/ic_coding.svg'
import { ReactComponent as CopyIcon } from '../../assets/img/icons/ic_copy.svg'

const EmbededSection = () => {
    return (
        <div className="container mx-auto p-6">
            <div>
                <h3 className="text-lg mb-4">Share the embeded chart</h3>
            </div>
            <div>
                <div className="flex items-center">
                    <span className="inline-block mr-2">
                        <CodingIcon className="w-4 h-4" />
                    </span>
                    <span>Embed on your website</span>
                </div>
                <div>
                    <div className="flex items-center">
                        <input
                            className="w-full bg-gray py-2 px-3 rounded ml-6 mt-1"
                            type="text"
                            name="embed"
                            value="<iframe src='https://flo.uri.sh/visualisation/5337451/embed' title='' frameborder='0' scrolling='no'>"
                        />
                        <CopyIcon className="ml-4 w-4 h-4" />
                    </div>
                    <div className="ml-6 mt-3">
                        <label>
                            <input type="radio" name="format" value="iframe" />{' '}
                            Iframe
                        </label>
                    </div>
                    <div className="flex items-center ml-6 mt-3">
                        <div className="flex items-center mr-4">
                            <label className="mr-2">Width</label>
                            <input
                                type="text"
                                name="width"
                                placeholder="100%"
                                value=""
                                className="w-full bg-gray py-2 px-3 rounded"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="mr-2">Height</label>
                            <input
                                type="text"
                                name="height"
                                placeholder="600px"
                                value=""
                                className="w-full bg-gray py-2 px-3 rounded"
                            />
                        </div>
                    </div>
                </div>
                <div className="ml-6 mt-10">
                    <button className="focus:outline-none bg-primary-blue text-center rounded text-white py-2 px-6">
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmbededSection

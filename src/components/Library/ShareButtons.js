import React from 'react'
import socialIcons from '../../assets/img/icons/social'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import { twitterHandle } from "../../helpers/general"
import useTrans from "../../hooks/useTrans"

const ShareButtons = (props) => {
    const { url = window.location.href } = props
    const { trans } = useTrans()

    return (
        <div className="flex">
            <p className="inline-block lg:block font-bold opacity-40 mb-2 mr-4">
                {trans('Share on')}
            </p>
            <div className="flex">
                <FacebookShareButton url={url} className="social-icon">
                    <socialIcons.fbIcon />
                </FacebookShareButton>

                <TwitterShareButton url={url} via={twitterHandle} className="social-icon">
                    <socialIcons.twitterIcon />
                </TwitterShareButton>

                <LinkedinShareButton url={url} className="social-icon">
                    <socialIcons.linkedIcon />
                </LinkedinShareButton>

                <EmailShareButton url={url} className="social-icon">
                    <socialIcons.mailIcon />
                </EmailShareButton>
            </div>
        </div>
    )

}
export default ShareButtons

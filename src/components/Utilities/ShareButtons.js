import React from 'react'
import PropTypes from 'prop-types'
import { T } from '@transifex/react'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share'
import { twitterHandle } from '../../helpers/general'
import SocialIcon from '../../assets/img/icons/social'

const ShareButtons = (props) => {
    const { url = window.location.href } = props

    return (
        <div className="flex flex-wrap">
            <p className="w-full font-bold opacity-40 mb-2">
                <T _str="Share on" />
            </p>
            <div className="flex">
                <FacebookShareButton url={url} className="social-icon">
                    <SocialIcon.Facebook />
                </FacebookShareButton>

                <TwitterShareButton
                    url={url}
                    via={twitterHandle}
                    className="social-icon">
                    <SocialIcon.Twitter />
                </TwitterShareButton>

                <LinkedinShareButton url={url} className="social-icon">
                    <SocialIcon.Linked />
                </LinkedinShareButton>

                <EmailShareButton url={url} className="social-icon">
                    <SocialIcon.Mail />
                </EmailShareButton>
            </div>
        </div>
    )
}

ShareButtons.propTypes = {
    url: PropTypes.string
}

export default ShareButtons

import React from 'react'
import socialIcons from '../../assets/img/icons/social'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} from 'react-share'

const ShareButtons = ({title, url, twitterHandle, tags}) => {

    return(
        <div>
          <FacebookShareButton url={url} className="social-icon">
                <socialIcons.fbIcon />
         </FacebookShareButton>

          <TwitterShareButton url={url}  via={twitterHandle} className="social-icon">
                <socialIcons.twitterIcon />
          </TwitterShareButton>

          <LinkedinShareButton url={url} className="social-icon">
            <socialIcons.linkedIcon />
          </LinkedinShareButton>

          <EmailShareButton url={url}  className="social-icon">
              <socialIcons.mailIcon />
           </EmailShareButton>
        </div>
      )

}
export default ShareButtons
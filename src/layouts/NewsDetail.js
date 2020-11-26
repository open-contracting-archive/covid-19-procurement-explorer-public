import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import otherNewsImage from '../assets/img/news.jpg'
import newsImage from '../assets/img/news-detail.jpg'
import socialIcons from '../assets/img/icons/social'

const NewsDetail = () => {
    let history = useHistory()

    const previousPage = () => {
        history.goBack()
    }
    return (
        <section className="pt-8">
            <div className="container mx-auto px-4 news-detail">
                <div className="text-sm mb-4 text-blue-5">
                    <span
                        className="cursor-pointer text-primary-blue"
                        onClick={previousPage}>
                        News
                    </span>{' '}
                    /
                </div>
                <h2 className="md:w-3/4 text-lg md:text-xl leading-tight mb-6 md:mb-10 uppercase text-primary-dark">
                    EU public procurement policy in the context of COVID-19
                </h2>
                <div className="img-wrapper mb-6 md:mb-10">
                    <img src={newsImage} alt="" />
                </div>
                <div className="flex flex-wrap justify-between mb-10">
                    <div className="mb-4">
                        <p className="inline-block lg:block font-bold opacity-40 mb-2">
                            Published on
                        </p>
                        <p className="inline-block lg:block ml-3 lg:ml-0">
                            November 19, 2020
                        </p>
                    </div>
                    <div>
                        <div className="mb-10 news-detail__content">
                            <h2>
                                What has the Commission proposed to keep
                                procurement practice within EU rules?
                            </h2>
                            <p>
                                At the height of the COVID-19 crisis in Europe,
                                the European Commission published guidance on
                                options and flexibilities for Member States
                                under the EU public procurement framework in the
                                light of this emergency situation. Concerns have
                                been aired, however, that contracts may have
                                been awarded without any competitive tendering
                                and away from public scrutiny. As a result,
                                taxpayers’ money could easily be wasted on
                                overpriced equipment or substandard services.
                                This Briefing will examine the Guidance look at
                                the publication of notices for medical
                                equipment, and discuss possible implications of
                                the COVID-19 crisis for procurement.
                            </p>
                            <h2>
                                What has the Commission proposed to keep
                                procurement practice within EU rules
                            </h2>
                            <p>
                                Public authorities in the EU Member States have
                                had to act as quickly as possible in response to
                                the pandemic. Recognizing the urgency, but also
                                anxious to help Member States remain within EU
                                rules, the European Commission published a
                                Communication entitled, ‘Guidance on using the
                                public procurement framework in the emergency
                                situation related to the COVID-19 crisis’ on 1
                                April 2020.
                            </p>
                            <p>
                                The Commission recognises that ‘hospitals and
                                healthcare professionals urgently need medical
                                supplies and personal protective equipment
                                purchased by public authorities’. The Guidance
                                is intended ’to help public authorities use the
                                flexibility provided by the EU’s public
                                procurement framework to ensure rapid and
                                efficient purchases of all necessary equipment’.
                                It refers to three options for public purchasers
                                in responding to the current COVID-19 emergency:
                            </p>
                            <ul>
                                <li>
                                    alternative solutions and engaging with the
                                    market
                                    <li>use of accelerated procedures</li>
                                    <li>
                                        negotiated procedure without publication
                                    </li>
                                </li>
                            </ul>
                            <p>
                                <strong>
                                    Alternative solutions and engaging with the
                                    market
                                </strong>
                            </p>
                            <p>
                                The key message from the Commission in this case
                                is that contracting authorities could contact
                                directly potential contractors, hire agents with
                                direct market knowledge, or send representatives
                                to the relevant countries to ensure delivery and
                                to contact potential suppliers for an increase
                                or renewal of production. Examples of how
                                companies have retooled or revamped their
                                production for{' '}
                                <a href="">
                                    Personal Protective Equipment (PPE){' '}
                                </a>{' '}
                                and medical devices can be found on the EC
                                website.
                            </p>
                            <h2>Conclusion</h2>
                            <p>
                                Procurement rules cannot stay in the way when
                                the protection of health and life of humans is
                                at stake. During this emergency situation, some
                                contracts may have been awarded without any
                                transparency, and this may lead in some cases to
                                challenges or enquiries. Those contracting
                                authorities which have applied the exceptional
                                procedure under extreme urgency have an ex-post
                                transparency requirement. When relying on
                                exceptional procedures and direct awards,
                                contracting authorities have a duty to publish
                                notices and keep a detailed record of all
                                decisions, justifications of key decisions and
                                actions taken to support transparency and future
                                scrutiny. As time passes, it may be very
                                difficult to rely on extreme urgency and
                                unforeseeable circumstances, since COVID-19 will
                                stay with us until a vaccine or medication is
                                found. The Guidance from the Commission does not
                                provide a time-line for urgency, although the
                                economic repercussions of the COVID-19 crisis
                                are apparent. Contracting authorities require
                                further certainty with respect to the duration
                                and scope of application of the state of
                                urgency.
                            </p>
                        </div>
                        <div className="flex justify-between mb-6 lg:mb-0">
                            <div className="tags flex flex-wrap">
                                <div className="tag">
                                    <p>Covid-19</p>
                                </div>
                                <div className="tag">
                                    <p>Corona</p>
                                </div>
                                <div className="tag">
                                    <p>Virus</p>
                                </div>
                                <div className="tag">
                                    <p>News</p>
                                </div>
                                <div className="tag">
                                    <p>Article</p>
                                </div>
                            </div>
                            <div className="hidden lg:flex">
                                <a href="" className="social-icon">
                                    <socialIcons.fbIcon />
                                </a>
                                <a href="" className="social-icon">
                                    <socialIcons.twitterIcon />
                                </a>
                                <a href="" className="social-icon">
                                    <socialIcons.linkedIcon />
                                </a>
                                <a href="" className="social-icon">
                                    <socialIcons.mailIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold opacity-40 mb-2">Share on</p>
                        <div className="flex">
                            <a href="" className="social-icon">
                                <socialIcons.fbIcon />
                            </a>
                            <a href="" className="social-icon">
                                <socialIcons.twitterIcon />
                            </a>
                            <a href="" className="social-icon">
                                <socialIcons.linkedIcon />
                            </a>
                            <a href="" className="social-icon">
                                <socialIcons.mailIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="mb-10 text-primary-gray" />
                <div className="mb-20">
                    <h2 className="text-xl mb-6">Other News</h2>
                    <div className="grid grid-cols-12 gap-10 mb-10">
                        <div className="news-thumbnail">
                            <div className="img-wrapper">
                                <img src={otherNewsImage} alt="" />
                            </div>
                            <div>
                                <h3 className="news-caption__title">
                                    EU public procurement policy in the context
                                    of COVID-19
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </div>
                        <div className="news-thumbnail">
                            <div className="img-wrapper">
                                <img src={otherNewsImage} alt="" />
                            </div>
                            <div>
                                <h3 className="news-caption__title">
                                    EU public procurement policy in the context
                                    of COVID-19
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </div>
                        <div className="news-thumbnail">
                            <div className="img-wrapper">
                                <img src={otherNewsImage} alt="" />
                            </div>
                            <div>
                                <h3 className="news-caption__title">
                                    EU public procurement policy in the context
                                    of COVID-19
                                </h3>
                                <p className="news-caption__date">
                                    Nov 19, 2020
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link to="/news" className="text-blue-20">
                            View all news --&gt;{' '}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsDetail

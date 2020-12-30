import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as FooterBlob } from '../../assets/img/icons/footer-blob.svg'
import { ReactComponent as FooterIcon } from '../../assets/img/icons/footer-virus-icon.svg'
import FooterImage from '../../assets/img/icons/cc-img.png'
const Footer = () => {
    return (
        <footer className="relative pt-16 pb-20  px-4 text-white text-sm bg-yellow-50 overflow-hidden">
            <div className="container mx-auto relative z-10">
                <div className="grid-cols-12 grid gap-4">
                    <div className="col-span-12 md:col-span-4">
                        <p className="font-bold leading-tight">
                            Covid-19 <br /> Contract <br /> Explorer
                        </p>
                        <div className="mt-12">
                            <a href="https://creativecommons.org/">
                                <img src={FooterImage} alt="" />
                                <p className="mt-4 opacity-50">
                                    Creative Commons
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <h4 className="mb-1">Explore</h4>
                        <ul>
                            <li className="opacity-50">
                                <Link to="/global-overview">Data</Link>
                            </li>
                            <li className="opacity-50">Countries</li>
                            <li className="opacity-50">Tenders</li>
                            <li className="opacity-50">Suppliers</li>
                            <li className="opacity-50">
                                <Link to="/resources">Resources</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <ul className="mt-5">
                            <li className="opacity-50">
                                <Link to="/about">About</Link>
                            </li>
                            <li className="opacity-50">Terms of use</li>
                            <li className="opacity-50">Privacy policy</li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <p className="mb-3">Subscribe and get weekly updates</p>
                        <form>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Type your email address"
                                    className="px-3 py-4 w-full rounded-sm  text-primary-dark"
                                />
                                <button className=" subscribe absolute right-0 bg-blue-20 h-full p-4">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <FooterIcon
                    className="absolute z-negative"
                    style={{ bottom: '-70px', right: '-30px' }}
                />
            </div>
            <FooterBlob className="absolute bottom-0 left-0" />
        </footer>
    )
}

export default Footer

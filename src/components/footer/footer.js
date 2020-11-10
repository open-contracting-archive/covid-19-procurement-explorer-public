import React from 'react'

const Footer = () => {
    return (
        <footer style={{backgroundColor: "#3D393D"}} className="py-16 px-4 text-white text-sm">
            <div className="container mx-auto">
                <div className="grid-cols-12 grid gap-4">
                    <div className="col-span-12 md:col-span-4">
                        <p>
                            Covid-19 <br /> procurement <br /> explorer
                        </p>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <h4 className="mb-1">Explore</h4>
                        <ul>
                            <li className="opacity-50">Data</li>
                            <li className="opacity-50">Countries</li>
                            <li className="opacity-50">Tenders</li>
                            <li className="opacity-50">Suppliers</li>
                            <li className="opacity-50">Resources</li>
                        </ul>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <ul className="mt-5">
                            <li className="opacity-50">About</li>
                            <li className="opacity-50">Terms of use</li>
                            <li className="opacity-50">Privacy policy</li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <p className="mb-3">Subscribe and get weekly updates</p>
                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type your email address"
                                    className="px-3 py-5 w-full rounded-sm text-gray-900"
                                />
                                <button className="absolute right-0 bg-blue-600 h-full p-5">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

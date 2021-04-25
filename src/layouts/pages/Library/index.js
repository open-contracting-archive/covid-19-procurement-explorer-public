import React from 'react'
import { T } from '@transifex/react'
import { MetaInformation } from '../../../components/Utilities'

const LibraryResources = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/LibraryResources')
)
const LibraryUpcomingEvents = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ './sections/LibraryUpcomingEvents'
    )
)
const LibraryBlogs = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/LibraryBlogs')
)
const LibraryNews = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ './sections/LibraryNews')
)

const Library = () => {
    window.scrollTo(0, 0)

    return (
        <div className="library">
            <MetaInformation
                title="Library"
                description="Welcome Covid-19 Contract Explorer"
            />
            <section className="news px-4 py-12 md:py-24 bg-blue-0 -mt-8">
                <div className="container mx-auto">
                    <p className="text-xl md:text-2xl mb-6 md:mb-10">
                        <T _str="Library" />
                    </p>
                    <LibraryNews />
                </div>
            </section>

            <LibraryBlogs />

            <LibraryUpcomingEvents />

            <LibraryResources />
        </div>
    )
}

export default Library

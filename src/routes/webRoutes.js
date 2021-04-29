import React from 'react'

const Home = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Homepage')
)
const StaticPage = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/StaticPage')
)
const Tags = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Library/Tags')
)
const Library = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Library')
)
const ResourceDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ '../layouts/pages/Resources/ResourceDetail'
    )
)
const Resources = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Resources')
)
const EventDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ '../layouts/pages/Events/EventDetail'
    )
)
const Events = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Events')
)
const BlogDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ '../layouts/pages/Blog/BlogDetail'
    )
)
const Blogs = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/Blog')
)
const NewsDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "app-common" */ '../layouts/pages/News/NewsDetail'
    )
)
const News = React.lazy(() =>
    import(/* webpackChunkName: "app-common" */ '../layouts/pages/News')
)
const ContractDetail = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/Contract/ContractDetail'
    )
)
const CountryProfile = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/CountryProfile'
    )
)
const ProductProfile = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/Product/ProductProfile'
    )
)
const GlobalOverview = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/GlobalOverview'
    )
)
const BuyerProfile = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/Buyer/BuyerProfile'
    )
)
const SupplierProfile = React.lazy(() =>
    import(
        /* webpackChunkName: "app-data-page" */ '../layouts/pages/Supplier/SupplierProfile'
    )
)

export const webRoutes = [
    {
        exact: true,
        path: '/',
        component: <Home />
    },
    {
        path: '/global-overview/products/:productId',
        component: <ProductProfile />
    },
    {
        exact: true,
        path: '/global-overview/:tabSlug',
        component: <GlobalOverview />
    },
    {
        exact: true,
        path: '/global-overview/',
        component: <GlobalOverview />
    },
    {
        exact: true,
        path: '/country/:countrySlug/products/:productId',
        component: <ProductProfile />
    },
    {
        exact: true,
        path: '/country/:countrySlug/:tabSlug',
        component: <CountryProfile />
    },
    {
        exact: true,
        path: '/country/:countrySlug/',
        component: <CountryProfile />
    },
    {
        exact: true,
        path: '/news',
        component: <News />
    },
    {
        exact: true,
        path: '/news/:id',
        component: <NewsDetail />
    },
    {
        exact: true,
        path: '/blogs',
        component: <Blogs />
    },
    {
        exact: true,
        path: '/blogs/:id',
        component: <BlogDetail />
    },
    {
        exact: true,
        path: '/events',
        component: <Events />
    },
    {
        exact: true,
        path: '/events/:id',
        component: <EventDetail />
    },
    {
        exact: true,
        path: '/resources',
        component: <Resources />
    },
    {
        exact: true,
        path: '/resources/:id',
        component: <ResourceDetail />
    },
    {
        path: '/library',
        component: <Library />
    },
    {
        path: '/tags',
        component: <Tags />
    },
    {
        path: '/contracts/:contractId',
        component: <ContractDetail />
    },
    {
        path: '/buyers/:id',
        component: <BuyerProfile />
    },
    {
        path: '/suppliers/:id',
        component: <SupplierProfile />
    },
    {
        path: '/pages/:slug',
        component: <StaticPage />
    }
]

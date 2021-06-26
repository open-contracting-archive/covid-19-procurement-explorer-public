import React from 'react'

import Home from '../layouts/pages/Homepage'
import StaticPage from '../layouts/pages/StaticPage'
import Tags from '../layouts/pages/Library/Tags'
import Library from '../layouts/pages/Library'
import ResourceDetail from '../layouts/pages/Resources/ResourceDetail'
import Resources from '../layouts/pages/Resources'
import EventDetail from '../layouts/pages/Events/EventDetail'
import Events from '../layouts/pages/Events'
import BlogDetail from '../layouts/pages/Blog/BlogDetail'
import Blogs from '../layouts/pages/Blog'
import NewsDetail from '../layouts/pages/News/NewsDetail'
import News from '../layouts/pages/News'
import ContractDetail from '../layouts/pages/Contract/ContractDetail'
import CountryProfile from '../layouts/pages/CountryProfile'
import ProductProfile from '../layouts/pages/Product/ProductProfile'
import GlobalOverview from '../layouts/pages/GlobalOverview'
import BuyerProfile from '../layouts/pages/Buyer/BuyerProfile'
import SupplierProfile from '../layouts/pages/Supplier/SupplierProfile'

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

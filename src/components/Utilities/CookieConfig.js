const cookieConfig = {
    policies: [
        {
            id: 'essential',
            label: 'Essential Cookies',
            description:
                'We need to save some technical cookies, for the website to function properly.',
            category: 'essential'
        },
        {
            id: 'functional',
            label: 'Functional Cookies',
            category: 'functional',
            description: 'We need to save some basic preferences eg. language.'
        },
        {
            id: 'statistics',
            label: 'Statistics',
            category: 'statistics',
            description:
                'We need to save some technical cookies, for the website to function properly.'
        }
    ],
    essentialLabel: 'Always on',
    permissionLabels: {
        accept: 'Accept',
        acceptAll: 'Accept all',
        decline: 'Decline'
    },
    cookiePreferenceKey: 'cookie-preferences',
    header: {
        title: 'Your privacy?',
        subTitle: 'Let us know you agree to cookies',
        description:
            'We use cookies to give you the best online experience. Please let us know if you agree to all of these cookies'
    },
    cookiePolicy: {
        url: 'https://open-contracting.health/pages/privacy-policy',
        label: 'Read our privacy policy'
    }
}

export default cookieConfig

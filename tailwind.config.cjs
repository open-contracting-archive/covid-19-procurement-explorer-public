module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true
    },
    purge: [
        'src/**/*.js',
        'src/**/*.jsx',
        'src/**/*.ts',
        'src/**/*.tsx',
        'public/**/*.html'
    ],
    target: 'relaxed',
    prefix: '',
    important: false,
    separator: ':',
    theme: {
        extend: {
            width: {
                38: '38%',
                62: '62%'
            }
        },
        screens: {
            xs: '500px',
            sm: '640px',
            md: '768px',
            lg: '992px',
            xl: '1170px'
        },
        colors: {
            // primary: '#ff0',
            'primary-green': '#C8D419',
            'primary-blue': '#1FBBEC',
            'primary-dark': '#293E45',
            'primary-gray': '#F1F1F1',
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000',
            white: '#fff',
            gray: '#f7f7f7',
            'gray-e2e': '#e2e8f0',

            // 'black-3d3': '#3D393D',
            // 'black-3d3-50': 'rgba(50,57,72,0.5)',
            // 'black-50': 'rgba(0,0,0,0.5)',
            // 'blue-50': '#293E45',
            // gray: {
            //     100: '#f7fafc',
            //     200: '#edf2f7',
            //     300: '#e2e8f0',
            //     400: '#cbd5e0',
            //     500: '#a0aec0',
            //     600: '#718096',
            //     700: '#4a5568',
            //     800: '#2d3748',
            //     900: '#1a202c'
            // },
            red: {
                0: '#FAE9E9',
                5: '#E7D6D6',
                10: '#FE5151',
                20: '#F97878',
                30: '#C35A5A',
                40: '#986161',
                50: '#4E4242'
                // 300: '#feb2b2',
                // 400: '#fc8181',
                // 500: '#f56565',
                // 600: '#e53e3e',
                // 700: '#c53030',
                // 800: '#9b2c2c',
                // 900: '#742a2a'
            },
            yellow: {
                0: '#E7E8D9',
                5: '#CDCEB8',
                10: '#E1F005',
                20: '#C8D419',
                30: '#B4BC3E',
                40: '#82864B',
                50: '#3D393D'
            },
            green: {
                0: '#E2F5ED',
                5: '#C2D3CC',
                10: '#3EEDA4',
                20: '#43CE94',
                30: '#51AF88',
                40: '#53836F',
                50: '#354740'
            },
            blue: {
                0: '#DCEAEE',
                5: '#ABBABF',
                10: '#60D9FF',
                20: '#1FBBEC',
                30: '#419AB7',
                40: '#447483',
                50: '#293E45'
            },
            purple: {
                0: '#ECE3F6',
                5: '#C3BDCC',
                10: '#A054FF',
                20: '#B174FE',
                30: '#A783D3',
                40: '#8975A4',
                50: '#473F52'
            }
        },
        spacing: {
            0: '0',
            1: '0.25rem', //4px
            2: '0.5rem', //8px
            3: '0.75rem', //12px
            4: '1rem', //16px
            5: '1.25rem', //20px
            6: '1.5rem', //24px
            8: '2rem', //32px
            10: '2.5rem', //40px
            12: '3rem', //48px
            16: '4rem', //64px
            20: '5rem', //80px
            24: '6rem', //96px
            32: '8rem', //128px
            40: '10rem', //160px
            48: '12rem', //192px
            56: '14rem', //224px
            64: '16rem', //256px
            80: '17.5rem', //280px
            px: '1px'
        },
        backgroundImage: {
            none: 'none',
            'gradient-to-t':
                'linear-gradient(to top, var(--gradient-color-stops))',
            'gradient-to-tr':
                'linear-gradient(to top right, var(--gradient-color-stops))',
            'gradient-to-r':
                'linear-gradient(to right, var(--gradient-color-stops))',
            'gradient-to-br':
                'linear-gradient(to bottom right, var(--gradient-color-stops))',
            'gradient-to-b':
                'linear-gradient(to bottom, var(--gradient-color-stops))',
            'gradient-to-bl':
                'linear-gradient(to bottom left, var(--gradient-color-stops))',
            'gradient-to-l':
                'linear-gradient(to left, var(--gradient-color-stops))',
            'gradient-to-tl':
                'linear-gradient(to top left, var(--gradient-color-stops))'
        },
        backgroundPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top'
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain'
        },
        borderRadius: {
            none: '0',
            sm: '0.125rem',
            default: '0.25rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            full: '9999px'
        },
        borderWidth: {
            0: '0',
            2: '2px',
            4: '4px',
            8: '8px',
            default: '1px'
        },
        boxShadow: {
            xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            default:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            none: 'none'
        },
        container: {},
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            wait: 'wait',
            text: 'text',
            move: 'move',
            'not-allowed': 'not-allowed'
        },
        fill: {
            current: 'currentColor'
        },
        flex: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none'
        },
        flexGrow: {
            0: '0',
            default: '1'
        },
        flexShrink: {
            0: '0',
            default: '1'
        },
        fontFamily: {
            sans: [
                'GTEestiPro',
                'Lato',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"'
            ],
            serif: [
                'Georgia',
                'Cambria',
                '"Times New Roman"',
                'Times',
                'serif'
            ],
            mono: [
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace'
            ]
        },
        fontSize: {
            xxs: '0.625rem', // 10px
            xs: '0.75rem', // 12px
            sm: '0.875rem', // 14px
            base: '1rem', // 16px
            lg: '1.375rem', // 22px
            xl: '2rem', // 32px
            '2xl': '2.625rem', // 42px
            '3xl': '3.25rem', // 52px
            '4xl': '4.5rem' // 72px
            // '5xl': '48px',
            // '6xl': '64px'
        },
        fontWeight: {
            // hairline: '100',
            // thin: '200',
            // light: '300',
            normal: '400',
            // medium: '500',
            // semibold: '600',
            bold: '700'
            // extrabold: '800',
            // black: '900'
        },
        inset: {
            0: '0',
            auto: 'auto'
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },
        lineHeight: {
            3: '.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2'
        },
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal'
        },
        maxHeight: {
            full: '100%',
            screen: '100vh'
        },
        minHeight: {
            0: '0',
            full: '100%',
            screen: '100vh'
        },
        minWidth: {
            0: '0',
            full: '100%'
        },
        objectPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top'
        },
        opacity: {
            0: '0',
            25: '0.25',
            40: '0.4',
            50: '0.5',
            75: '0.75',
            100: '1'
        },
        order: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            first: '-9999',
            last: '9999',
            none: '0'
        },
        outline: {
            none: ['2px solid transparent', '2px'],
            white: ['2px dotted white', '2px'],
            black: ['2px dotted black', '2px']
        },
        stroke: {
            current: 'currentColor'
        },
        strokeWidth: {
            0: '0',
            1: '1',
            2: '2'
        },
        zIndex: {
            negative: '-1',
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50',
            auto: 'auto'
        },
        gridTemplateColumns: {
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            7: 'repeat(7, minmax(0, 1fr))',
            8: 'repeat(8, minmax(0, 1fr))',
            9: 'repeat(9, minmax(0, 1fr))',
            10: 'repeat(10, minmax(0, 1fr))',
            11: 'repeat(11, minmax(0, 1fr))',
            12: 'repeat(12, minmax(0, 1fr))',
            none: 'none'
        },
        gridAutoColumns: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)'
        },
        gridColumn: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-7': 'span 7 / span 7',
            'span-8': 'span 8 / span 8',
            'span-9': 'span 9 / span 9',
            'span-10': 'span 10 / span 10',
            'span-11': 'span 11 / span 11',
            'span-12': 'span 12 / span 12',
            'span-full': '1 / -1'
        },
        gridColumnStart: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            auto: 'auto'
        },
        gridColumnEnd: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            auto: 'auto'
        },
        gridTemplateRows: {
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            none: 'none'
        },
        gridAutoRows: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)'
        },
        gridRow: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-full': '1 / -1'
        },
        gridRowStart: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            auto: 'auto'
        },
        gridRowEnd: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            auto: 'auto'
        },
        transformOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left'
        },
        scale: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5'
        },
        rotate: {
            0: '0',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            45: '45deg',
            90: '90deg',
            180: '180deg',
            '-180': '-180deg',
            '-90': '-90deg',
            '-45': '-45deg',
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg'
        },
        skew: {
            0: '0',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg'
        },
        transitionProperty: {
            none: 'none',
            all: 'all',
            default:
                'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            colors: 'background-color, border-color, color, fill, stroke',
            opacity: 'opacity',
            shadow: 'box-shadow',
            transform: 'transform'
        },
        transitionTimingFunction: {
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        transitionDuration: {
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms'
        },
        transitionDelay: {
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms'
        },
        animation: {
            none: 'none',
            spin: 'spin 1s linear infinite',
            ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            bounce: 'bounce 1s infinite'
        },
        keyframes: {
            spin: {
                to: {
                    transform: 'rotate(360deg)'
                }
            },
            ping: {
                '75%, 100%': {
                    transform: 'scale(2)',
                    opacity: '0'
                }
            },
            pulse: {
                '50%': {
                    opacity: '.5'
                }
            },
            bounce: {
                '0%, 100%': {
                    transform: 'translateY(-25%)',
                    animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
                },
                '50%': {
                    transform: 'none',
                    animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
                }
            }
        }
    },
    variants: {
        accessibility: ['responsive', 'focus'],
        alignContent: ['responsive'],
        alignItems: ['responsive'],
        alignSelf: ['responsive'],
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundClip: ['responsive'],
        backgroundColor: ['responsive', 'hover', 'focus'],
        backgroundImage: ['responsive'],
        gradientColorStops: ['responsive', 'hover', 'focus'],
        backgroundOpacity: ['responsive', 'hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: ['responsive'],
        borderColor: ['responsive', 'hover', 'focus'],
        borderOpacity: ['responsive', 'hover', 'focus'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive'],
        boxShadow: ['responsive', 'hover', 'focus'],
        boxSizing: ['responsive'],
        container: ['responsive'],
        cursor: ['responsive'],
        display: ['responsive'],
        divideColor: ['responsive'],
        divideOpacity: ['responsive'],
        divideStyle: ['responsive'],
        divideWidth: ['responsive'],
        fill: ['responsive'],
        flex: ['responsive'],
        flexDirection: ['responsive'],
        flexGrow: ['responsive'],
        flexShrink: ['responsive'],
        flexWrap: ['responsive'],
        float: ['responsive'],
        clear: ['responsive'],
        fontFamily: ['responsive'],
        fontSize: ['responsive'],
        fontSmoothing: ['responsive'],
        fontVariantNumeric: ['responsive'],
        fontStyle: ['responsive'],
        fontWeight: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        inset: ['responsive'],
        justifyContent: ['responsive'],
        justifyItems: ['responsive'],
        justifySelf: ['responsive'],
        letterSpacing: ['responsive'],
        lineHeight: ['responsive'],
        listStylePosition: ['responsive'],
        listStyleType: ['responsive'],
        margin: ['responsive'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        objectFit: ['responsive'],
        objectPosition: ['responsive'],
        opacity: ['responsive', 'hover', 'focus'],
        order: ['responsive'],
        outline: ['responsive', 'focus'],
        overflow: ['responsive'],
        overscrollBehavior: ['responsive'],
        padding: ['responsive'],
        placeContent: ['responsive'],
        placeItems: ['responsive'],
        placeSelf: ['responsive'],
        placeholderColor: ['responsive', 'focus'],
        placeholderOpacity: ['responsive', 'focus'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        resize: ['responsive'],
        space: ['responsive'],
        stroke: ['responsive'],
        strokeWidth: ['responsive'],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColor: ['responsive', 'hover', 'focus'],
        textOpacity: ['responsive', 'hover', 'focus'],
        textDecoration: ['responsive', 'hover', 'focus'],
        textTransform: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        wordBreak: ['responsive'],
        zIndex: ['responsive'],
        gap: ['responsive'],
        gridAutoFlow: ['responsive'],
        gridTemplateColumns: ['responsive'],
        gridAutoColumns: ['responsive'],
        gridColumn: ['responsive'],
        gridColumnStart: ['responsive'],
        gridColumnEnd: ['responsive'],
        gridTemplateRows: ['responsive'],
        gridAutoRows: ['responsive'],
        gridRow: ['responsive'],
        gridRowStart: ['responsive'],
        gridRowEnd: ['responsive'],
        transform: ['responsive'],
        transformOrigin: ['responsive'],
        scale: ['responsive', 'hover', 'focus'],
        rotate: ['responsive', 'hover', 'focus'],
        translate: ['responsive', 'hover', 'focus'],
        skew: ['responsive', 'hover', 'focus'],
        transitionProperty: ['responsive'],
        transitionTimingFunction: ['responsive'],
        transitionDuration: ['responsive'],
        transitionDelay: ['responsive'],
        animation: ['responsive']
    },
    corePlugins: {},
    plugins: []
}

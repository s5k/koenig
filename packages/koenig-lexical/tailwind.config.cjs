module.exports = {
    corePlugins: {
        preflight: false // we're providing our own scoped CSS reset
    },
    important: '.koenig-lexical',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './demo/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        colors: {
            accent: 'var(--kg-accent-color, #ff0095)',
            transparent: 'transparent',
            current: 'currentColor',
            white: '#FFF',
            black: '#15171A',
            grey: {
                DEFAULT: '#ABB4BE',
                50: '#FAFAFB',
                100: '#F4F5F6',
                200: '#EBEEF0',
                300: '#DDE1E5',
                400: '#CED4D9',
                500: '#AEB7C1',
                600: '#95A1AD',
                700: '#7C8B9A',
                800: '#626D79',
                900: '#394047',
                950: '#23292F'
            },
            green: {
                DEFAULT: '#30CF43',
                100: '#E1F9E4',
                400: '#58DA67',
                500: '#30CF43',
                600: '#2AB23A'
            },
            blue: {
                DEFAULT: '#14B8FF',
                100: '#DBF4FF',
                400: '#42C6FF',
                500: '#14B8FF',
                600: '#00A4EB'
            },
            purple: {
                DEFAULT: '#8E42FF',
                100: '#EDE0FF',
                400: '#A366FF',
                500: '#8E42FF',
                600: '7B1FFF'
            },
            pink: {
                DEFAULT: '#FB2D8D',
                100: '#FFDFEE',
                400: '#FF5CA8',
                500: '#FB2D8D',
                600: '#F70878'
            },
            red: {
                DEFAULT: '#F50B23',
                100: '#FFE0E0',
                400: '#F9394C',
                500: '#F50B23',
                600: '#DC091E'
            },
            yellow: {
                DEFAULT: '#FFB41F',
                100: '#FFF1D6',
                400: '#FFC247',
                500: '#FFB41F',
                600: '#F0A000'
            },
            lime: {
                DEFAULT: '#B5FF18',
                300: '#CFFF99',
                500: '#B5FF18',
                800: '#466600',
                900: '#344D00'
            }
        },
        fontFamily: {
            sans: 'Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
            serif: 'Georgia, Times, serif',
            mono: 'Consolas, Liberation Mono, Menlo, Courier, monospace'
        },
        boxShadow: {
            DEFAULT: '0 0 1px rgba(0,0,0,.05), 0 5px 18px rgba(0,0,0,.08)',
            sm: '0 0 1px rgba(0,0,0,.12), 0 1px 6px rgba(0,0,0,0.03), 0 6px 10px -8px rgba(0,0,0,.1)',
            md: '0 0 1px rgba(0,0,0,.05), 0 8px 28px rgba(0,0,0,.12)',
            lg: '0 0 7px rgba(0, 0, 0, 0.08), 0 2.1px 2.2px -5px rgba(0, 0, 0, 0.011), 0 5.1px 5.3px -5px rgba(0, 0, 0, 0.016), 0 9.5px 10px -5px rgba(0, 0, 0, 0.02), 0 17px 17.9px -5px rgba(0, 0, 0, 0.024), 0 31.8px 33.4px -5px rgba(0, 0, 0, 0.029), 0 76px 80px -5px rgba(0, 0, 0, 0.04)',
            xl: '0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05), 0 100px 80px rgba(0, 0, 0, 0.07)',
            inner: 'inset 0 0 4px 0 rgb(0 0 0 / 0.08)',
            insetgreen: '0px 0px 0px 1px inset var(--green)',
            none: '0 0 #0000'
        },
        extend: {
            spacing: {
                px: '1px',
                0: '0px',
                0.5: '0.125rem',
                1: '0.25rem',
                1.5: '0.375rem',
                2: '0.5rem',
                2.5: '0.625rem',
                3: '0.75rem',
                3.5: '0.875rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                14: '3.5rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            maxWidth: {
                none: 'none',
                0: '0',
                'xs': '512px',
                'sm': '615px',
                'md': '717px',
                'lg': '820px',
                'xl': '922px',
                '2xl': '1076px',
                '3xl': '1229px',
                '4xl': '1434px',
                '5xl': '1639px',
                '6xl': '1844px',
                '7xl': '2048px',
                '8xl': '2240px',
                '9xl': '2496px',
                full: '100%',
                min: 'min-content',
                max: 'max-content',
                fit: 'fit-content',
                prose: '65ch'
            },
            borderRadius: {
                sm: '3.2px',
                DEFAULT: '6.4px',
                md: '9.6px',
                lg: '12.8px',
                xl: '19.2px',
                '2xl': '25.6px',
                '3xl': '38.4px',
                full: '9999px'
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                md: '0.9375rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': ['3rem', '1.15'],
                '6xl': ['3.75rem', '1'],
                '7xl': ['4.5rem', '1'],
                '8xl': ['6rem', '1'],
                '9xl': ['8rem', '1']
            },
            screens: {
                xs: '500px'
            }
        }
    },
    plugins: []
};

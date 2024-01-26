/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            width: {
                18: '72px',
                21: '84px',
                22: '88px',
                25: '100px',
                25.8: '103px',
                26: '104px',
                37.5: '150px',
                38: '152px',
                120: '480px',
                154: '617px',
                172: '688px',
                182.5: '730px',
            },
            height: {
                22: '88px',
            },
            borderRadius: {
                xs: '4px',
                '2.5xl': '20px',
            },
            colors: {
                light: '#F8F8FB',
                dark: '#141625',
                'elem-light': '#FFFFFF',
                'elem-dark': '#1E2139',
                'elem-sub-light': '#F9FAFE',
                'elem-sub-dark': '#252945',
                primary: '#7C5DFA',
                'primary-active': '#9277FF',
                secondary: '#EC5757',
                'secondary-active': '#FF9797',
                paid: '#33D69F',
                pending: '#FF8F00',
                draft: '#373B53',
                important: '#0C0E16',
                labels: '#7E88C3',
                border: '#DFE3FA',
                paragraph: '#888EB0',
                name: '#858BB2',
            },
            margin: {
                1.5: '6px',
                4.5: '18px',
                5.5: '22px',
                6.5: '26px',
                10.5: '42px',
                16.5: '66px',
            },
            padding: {
                4.5: '17px',
                5.5: '22px',
                19.2: '77px',
                25.8: '103px',
                46: '184px',
            },
            lineHeight: {
                4.5: '18px',
            },
            fontSize: {
                'Heading-L': [
                    '36px',
                    {
                        lineHeight: '33px',
                        letterSpacing: '-1px',
                        fontWeight: 'bold',
                    },
                ],
                'Heading-M': [
                    '24px',
                    {
                        lineHeight: '22px',
                        letterSpacing: '-0.75px',
                        fontWeight: 'bold',
                    },
                ],
                'Heading-S': [
                    '15px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '-0.25px',
                        fontWeight: 'bold',
                    },
                ],
                'Heading-S-variant': [
                    '15px',
                    {
                        lineHeight: '15px',
                        letterSpacing: '-0.25px',
                        fontWeight: 'bold',
                    },
                ],
                body: [
                    '13px',
                    {
                        lineHeight: '18px',
                        letterSpacing: '-0.1px',
                    },
                ],
                'body-variant': [
                    '13px',
                    {
                        lineHeight: '15px',
                        letterSpacing: '-0.25px',
                    },
                ],
                error: [
                    '10px',
                    {
                        lineHeight: '15px',
                        letterSpacing: '-0.208px',
                    },
                ],
            },
            boxShadow: {
                menu: '0px 10px 20px 0px rgba(72, 84, 159, 0.25)',
                'menu-dark': '0px 10px 20px 0px rgba(0, 0, 0, 0.25)',
                generic: '0px 10px 10px -10px rgba(72, 84, 159, 0.10)',
            },
            gap: {
                3.8: '15px',
            },
        },
    },
    plugins: [],
}

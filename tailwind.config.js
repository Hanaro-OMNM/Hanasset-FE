/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        /*bg컬러*/
        bgColor: '#f4f6f9',
        /* hanaGreen*/
        hanaGreen: '#008485',
        hanaGreen80: '#5D9588',
        hanaGreen60: '#ABCEC8',
        hanaGreen40: '#D9E9E6',
        hanaGreen20: '#F5F9F8',

        /* hanaRed*/
        hanaRed: '#CB1136',
        hanaRed80: '#D3514F',
        hanaRed60: '#DB8174',
        hanaRed40: '#E7ACA0',
        hanaRed20: '#F3D8D1',

        /* hanaGold*/
        hanaGold: '#8B6F47',
        hanaGold80: '#B49F85',
        hanaGold60: '#D4CBBA',
        hanaGold40: '#ECE8DF',
        hanaGold20: '#FAF9F7',

        /* hanaSilver*/
        hanaSilver: '#8D8C88',
        hanaSilver80: '#979797',
        hanaSilver60: '#D5D5D3',
        hanaSilver40: '#EEEEEC',
        hanaSilver20: '#FAFAFA',

        /* hanaBlack*/
        hanaBlack: '#000000',
        hanaBlack80: '#5A5657',
        hanaBlack60: '#898989',
        hanaBlack40: '#B5B6B6',
        hanaBlack20: '#F7F7F7',
      },
      screens: {
        xs: '420px', // 420px 이하에서만 적용할 수 있는 사용자 정의 단위 추가
      },
      width: {
        420: '420px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};

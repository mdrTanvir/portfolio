export const projects = [
    {
        id: 1,
        name: 'Weather Prediction Dashboard',
        photo: '/images/projects/weather-prediction-dashboard.png',
        description: 'A live IoT weather dashboard that combines a Raspberry Pi Sense HAT, PHP-ML forecasting service, and observations across five Tasmanian sites. It uses interpretable seasonal regression to estimate daily temperature and humidity ranges, then presents historical patterns and expected conditions in one clear dashboard.',
        url: 'https://weather.tanvirrahman.dev/',
        repository: 'https://github.com/mdrTanvir/Weather-prediction-IOT',
        for: 'IoT & Machine Learning Project',
        date: '2026',
        skills: ['PHP', 'PHP-ML', 'Raspberry Pi / Sense HAT', 'IoT', 'Docker', 'Vercel'],
    },
    {
        id: 2,
        name: 'Global Health Analytics',
        photo: '/images/projects/sdg-health-analytics.svg',
        description: 'A public-facing global health research project that translates data from 207 countries into clear evidence on maternal mortality and life expectancy. It compares country outcome patterns, tests forecasting approaches with time-aware validation, and links to the reproducible analysis behind the findings.',
        url: 'https://health.tanvirrahman.dev/',
        repository: 'https://github.com/mdrTanvir/SDG-Health-Analytics',
        for: 'Global Health & Data Analytics Project',
        date: '2026',
        skills: ['Python', 'Pandas', 'Scikit-learn', 'Clustering', 'Time Series Forecasting', 'Jupyter'],
    },
    {
        id: 3,
        name: 'Melbourne Airport Operational Efficiency Analysis',
        photo: '/images/projects/melbourne-airport-analysis.svg',
        description: 'Analysed 730 days of luggage-handling data across four Melbourne Airport terminals. Applied Kruskal-Wallis, Dunn post-hoc, paired t-tests, and ANOVA to identify operational inefficiencies; findings included a year-on-year improvement of about 12% in Terminal 3 handling time.',
        url: '',
        repository: 'https://github.com/mdrTanvir/Melbourne-airport-efficiency-analysis',
        for: 'Data Analytics Project',
        date: '2025',
        skills: ['Python', 'Data Analytics', 'Statistical Analysis'],
    },
    {
        id: 4,
        name: 'ExerTime Platform',
        photo: '/images/images/exertime.png',
        description: 'Contributed to ExerTime, a digital health platform used in a research environment, by improving usability, accessibility, and navigation flow across important user journeys. During my University of Tasmania placement, I worked on front-end refinements, clearer interaction patterns, and maintainable Vue.js updates that made the platform easier for users and researchers to navigate. The work helped reduce user navigation time by around 20 percent while strengthening my experience with agile delivery, accessibility-aware design, and research-driven product improvement.',
        url: 'https://www.exertime.com',
        repository: '',
        for: 'UTAS Placement',
        date: '2025',
        skills: ['JavaScript & Vue.js', 'Accessibility & UX', 'Agile Delivery'],
    },
]

export const otherProjects = [
    // {
    //     active: true,
    //     progress: false,
    //     name: 'Nuxt, Vuetify Admin Template',
    //     year: '2024',
    //     photo: '/images/projects/trinmora-admin-vuetify.webp',
    //     skills: ['Nuxt Js', 'Vuetify'],
    //     subtitle: '',
    //     link: 'https://trinmora-admin-vuetify.vercel.app/',
    //     type: 'UI Design',
    // },
    // {
    //     active: true,
    //     progress: false,
    //     name: 'Cube Design',
    //     year: '2023',
    //     photo: '/images/projects/cube-design.webp',
    //     skills: ['Nuxt Js', 'Tailwind Css'],
    //     subtitle: '',
    //     link: 'https://cube-design-nuxt.vercel.app',
    //     type: 'UI Design',
    // },
]


export default projects

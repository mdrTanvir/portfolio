export const projects = [
    {
        id: 1,
        name: 'Weather Prediction Dashboard',
        photo: '/images/projects/weather-prediction-dashboard.png',
        description: 'Built a weather dashboard and JSON prediction endpoint connecting a Raspberry Pi Sense HAT workflow with temperature and humidity information for five Tasmanian locations. Integrated a 10-day Open-Meteo forecast, a PHP-ML seasonal fallback and precomputed historical charts. Documented the synthetic 2022–2026 data extension and distinguished model fit from real-world forecast accuracy.',
        url: 'https://weather.tanvirrahman.dev/',
        repository: 'https://github.com/mdrTanvir/Weather-prediction-IOT',
        for: 'IoT & Machine Learning Project',
        date: '2026',
        skills: ['PHP', 'PHP-ML', 'Raspberry Pi / Sense HAT', 'IoT', 'Docker', 'Vercel'],
    },
    {
        id: 2,
        name: 'Global Health Analytics',
        photo: '/images/projects/global-health-analytics-site.jpg',
        description: 'Analysed maternal mortality and life expectancy across 207 countries using Python, Pandas and Scikit-learn. Compared K-Means and Ward clustering, then evaluated forecasting baselines against later observations. Persistence produced the lowest held-out error for both indicators; executable notebooks and a public dashboard explain the methods, findings and limitations.',
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
        description: 'Investigated luggage-handling performance across four Melbourne Airport terminals using Python. Applied Kruskal-Wallis, Dunn post-hoc, paired t-tests and ANOVA to compare performance across terminals and time periods. Presented the analysis and operational recommendations in a repository that makes the methods available for review.',
        url: '',
        repository: 'https://github.com/mdrTanvir/Melbourne-airport-luggage-efficiency-analysis',
        for: 'Data Analytics Project',
        date: '2025',
        skills: ['Python', 'Data Analytics', 'Statistical Analysis'],
    },
    {
        id: 4,
        name: 'ExerTime Platform',
        photo: '/images/images/exertime.png',
        description: 'Improved interface components, navigation and accessibility on the ExerTime digital health platform during my University of Tasmania placement. Contributed Vue.js updates and component restructuring through sprint planning, code reviews and iterative delivery. The work connected front-end development with the needs of health researchers and academic stakeholders.',
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

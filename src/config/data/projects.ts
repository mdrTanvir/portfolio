export const projects = [
    {
        id: 1,
        name: 'IoT Weather Prediction Dashboard',
        photo: '/images/projects/weather-prediction-dashboard.png',
        description: 'Built a full-stack IoT weather prediction system that connects sensor-device readings, a machine learning prediction server, and a live dashboard for clear environmental monitoring. The dashboard compares real-time sensor inputs with modelled weather predictions across five Tasmanian sites using more than 10 years of Bureau of Meteorology data. I focused on the end-to-end flow from data preparation and REST API integration through to dashboard presentation, making temperature and humidity trends easier to inspect while achieving R2 scores around 0.82 to 0.84.',
        url: 'https://weather-prediction-dashboard-production.up.railway.app/',
        repository: 'https://github.com/mdrTanvir/Weather-Prediction-Dashboard',
        for: 'Academic Project',
        date: '2025',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'REST APIs'],
    },
    {
        id: 2,
        name: 'Sustainable Development Goals Global Health Analytics',
        photo: '/images/projects/sdg-health-analytics.svg',
        description: 'Analysed WHO and UN health indicators across more than 190 countries to model Sustainable Development Goal 3 achievement levels and understand patterns in global health outcomes. The project involved cleaning and combining historical datasets, selecting meaningful indicators, applying statistical analysis, and building linear regression models with cross-validation. I turned the results into readable insights that explain how health, development, and country-level indicators relate to progress toward better wellbeing outcomes.',
        url: '',
        repository: 'https://github.com/mdrTanvir/SDG-Health-Analytics',
        for: 'Data Analytics Project',
        date: '2025',
        skills: ['Python', 'Machine Learning', 'Data Analysis'],
    },
    {
        id: 3,
        name: 'Melbourne Airport Operational Efficiency Analysis',
        photo: '/images/projects/melbourne-airport-analysis.svg',
        description: 'Completed a quantitative analysis of luggage handling performance across four Melbourne Airport terminals using 730 days of operational data from 2018 to 2019. I prepared the dataset for comparison across terminals and time periods, then applied Kruskal-Wallis testing, Dunn post-hoc testing, paired t-tests, and ANOVA to identify statistically meaningful operational differences. The final analysis translated the numbers into practical recommendations for spotting bottlenecks, comparing terminal efficiency, and improving decision-making around luggage handling performance.',
        url: '',
        repository: 'https://github.com/mdrTanvir/Melbourne-airport-efficiency-analysis',
        for: 'Data Analytics Project',
        date: '2025',
        skills: ['Python', 'Data Analysis', 'Problem Solving'],
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
        skills: ['Vue.js', 'JavaScript', 'Accessibility', 'Agile'],
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

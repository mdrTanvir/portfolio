import {calculateXP} from "~/config/helper";

const experiences = [
    {
        title: 'Team Lead',
        company: 'Softech Limited',
        logo: '',
        link: 'https://google.com/',
        type: 'Software Company',
        startDate: 'March 2024',
        endDate: 'Present',
        xp: calculateXP('March 2024', null),
        description: 'I am working at Encoder IT, as a Backend Web Developer. ' +
            'I am engaged in maintaining and developing new features for existing projects working directly with clients.',
        skills: ['Laravel', 'Nest.js', 'Javascript', 'jQuery', 'MySQL', 'MongoDB'],
        projectLinks: [
            {name: 'Project A', url: 'https://project-a.com'},
            {name: 'Project B', url: 'https://project-b.com'}
        ],
    },
    {
        title: 'Full-Stack Web Developer',
        company: 'Tech Solutions',
        logo: '',
        link: 'https://google.com/',
        type: 'Software Company',
        startDate: 'April 2023',
        endDate: 'September 2023',
        // xp: calculateXP('April 2023', new Date()),
        xp: calculateXP('April 2023', 'September 2023'),
        description: 'I worked at Softic, as a Backend Web Developer. ' +
            'I mainly build admin panels and apis for the frontend web and mobile apps. ' +
            'The main technologies I work with are:',
        skills: ['Laravel', 'WebSocket', 'Pusher', 'MySQL', 'React.js']
    },
    {
        title: 'Backend Developer',
        company: 'Softech Limited',
        logo: '',
        link: 'https://google.com/',
        type: 'Edu-tech',
        startDate: 'July 2021',
        endDate: 'February 2023',
        xp: calculateXP('July 2021', 'February 2023'),
        description: 'I worked at Nextive Solution, as a Full-Stack Web Developer. ' +
            'It is an ed-tech company. ' +
            'Besides the web for some time i also had to work on a Hybrid mobile application using Ionic framework and Vue.js.\n ' +
            'The main technologies I worked with are: ',
        skills: ['Laravel', 'MySQL', 'Nuxt.js', 'Vue.js', 'Ionic', 'Vuetify', 'Sass'],
        projectLinks: [
            {name: 'Project A', url: ''},
        ]
    },
    {
        title: 'Backend Developer 2',
        company: 'Softech Limited',
        logo: '',
        link: 'https://google.com/',
        type: 'Edu-tech',
        startDate: 'July 2021',
        endDate: 'February 2023',
        xp: calculateXP('July 2021', 'February 2023'),
        description: 'I worked at Nextive Solution, as a Full-Stack Web Developer. ' +
            'It is an ed-tech company. ' +
            'Besides the web for some time i also had to work on a Hybrid mobile application using Ionic framework and Vue.js.\n ' +
            'The main technologies I worked with are: ',
        skills: ['Laravel', 'MySQL', 'Nuxt.js', 'Vue.js', 'Ionic', 'Vuetify', 'Sass'],
        projectLinks: [
            {name: 'Project A', url: ''},
        ]
    },
]

export default experiences
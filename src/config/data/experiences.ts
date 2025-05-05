import {calculateXP} from "~/config/helper";

const experiences = [
    {
        title: 'Intern',
        company: 'Active Laboratory, UTAS',
        logo: '',
        link: '',
        type: 'Research Laboratory',
        startDate: '2025',
        endDate: 'Present',
        xp: calculateXP('2025', null),
        description: 'Working on the Exertime project to enhance the website’s structure and user experience, focusing on implementing user state management and improving code quality through thorough reviews and refactoring.',
        skills: ['UX Design', 'State Management', 'Code Refactoring', 'Vue.js', 'JavaScript', 'User Experience'],
        projectLinks: [
            {name: 'Exertime', url: 'https://exertime.com'}
        ],
    },
    {
        title: 'Software Developer',
        company: 'Business Automation Ltd, Bangladesh',
        logo: '',
        link: 'https://ba-systems.com/',
        type: 'Software Company',
        startDate: '2020',
        endDate: '2022',
        xp: calculateXP('2020', '2022'),
        description: 'Worked on multiple high-profile projects including the Mortgage System, A21 Dashboard, BSCIC, and BHTPA, ensuring timely delivery and alignment with client requirements. Focused on developing scalable web applications with technologies such as Laravel, Python, and Vue.js, while optimizing performance through efficient data management in MySQL and MongoDB.',
        skills: ['Laravel', 'PHP', 'Python', 'Vue.js', 'Vuex', 'Bootstrap', 'MySQL', 'MongoDB', 'OOP', 'RESTful APIs', 'Git/GitHub'],
        projectLinks: [
            {name: 'A2I Dashboard', url: 'https://a2i.gov.bd/'},
            {name: 'BSCIC', url: 'https://bscic.gov.bd/'},
        ],
    },
    

]

export default experiences
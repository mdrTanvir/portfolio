import skills from "~/config/data/skills";
import projects from "~/config/data/projects";
import {otherProjects} from "~/config/data/projects";
import experiences from "~/config/data/experiences";
import educations from "~/config/data/educations";

export {
    skills,
    projects as works,
    otherProjects,
    experiences,
    educations,
}

const fullName = 'Tanvir Rahman'
const siteBrand = 'Tanvir'

const siteData = {
    name: siteBrand,
    logoName: 'Tanvir',
    address: 'Launceston, Tasmania, Australia',
    phone: '+61 450469323',
    email: 'md.tanvir.rahman.au@gmail.com',
    profile: '',
    // profile: '/images/profile2.webp',
    cvLink: '/Md-Tanvir-Rahman-Resume.pdf',
    meta: {
        name: siteBrand,
        siteUrl: 'https://www.tanvirrahman.dev',
        description: 'IT graduate in Launceston with experience in technical support, SQL, operational reporting, and customer service across utilities, software development, and retail.',
        image: '/og.png',
        keywords: `${fullName}, IT Graduate, Software Developer, Cybersecurity, Data, Systems`,
    },
    hero: {
        greeting: `I'm ${fullName},`,
        headline: 'IT Graduate',
        headlineTags: ['PHP / Vue.js / SQL', 'Python / Data Analytics', 'IT & User Support'],
        subheadline: 'Software development experience, reproducible data projects and practical user support. Based in Launceston, Tasmania, with a UTAS master’s degree specialising in Artificial Intelligence and Cybersecurity.',
        impacts: [
            {value: '2020–2022', label: 'Software Developer · Business Automation Ltd'},
            {value: '6.75 / 7', label: 'UTAS GPA · Roll of Excellence 2025'},
            {value: '207 countries', label: 'Reproducible global health analysis'},
        ],
    },
    about: [
        "I'm Tanvir, an IT graduate based in Launceston and a Customer Service Officer at Aurora Energy. I combine technical problem-solving with practical customer support, data, and systems experience.",

        "My background spans utilities, software development, and retail. I am comfortable investigating account and data discrepancies, working with operational systems, and explaining outcomes clearly to people with different levels of technical knowledge.",

        "During my University of Tasmania placement, I improved the ExerTime digital health platform through targeted interface, accessibility, and system enhancements. I worked on clearer navigation and maintainable front-end components for researchers and academic stakeholders.",

        "Earlier, at Business Automation Ltd, I delivered features for enterprise and government applications in live production environments. I developed a careful approach to performance, reliability, testing, and collaboration across technical teams.",

        "I want to help Tasmanian communities build digital confidence through practical technology, clear explanations and patient support. I bring experience working with technical teams, customers and research stakeholders."
    ],
    github: 'https://github.com/mdrTanvir',
    socials: [
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/md-tanvir-rahman-88a239148/', icon: '/brand/linkedin.svg'},
        {name: 'GitHub', link: 'https://github.com/mdrTanvir', icon: '/brand/github.svg'},
    ],
}

export default siteData;

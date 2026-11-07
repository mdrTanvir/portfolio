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
    email: 'tanvirrahman.au@gmail.com',
    profile: '',
    // profile: '/images/profile2.webp',
    cvLink: '/Md-Tanvir-Rahman-Resume.pdf',
    meta: {
        name: siteBrand,
        siteUrl: 'https://www.tanvirrahman.dev',
        description: 'Tanvir Rahman: software development, Python analytics and practical IT support in Launceston, Tasmania. Explore professional experience, reproducible projects and CV.',
        image: '/og.png',
        keywords: `${fullName}, IT Graduate, Software Developer, Cybersecurity, Data, Systems`,
    },
    hero: {
        greeting: `I'm ${fullName},`,
        headline: 'IT Graduate',
        headlineTags: ['PHP / Vue.js / SQL', 'Python / Data Analytics', 'IT & User Support'],
        subheadline: 'I build applications, turn data into clear findings and help people work confidently with technology. My experience spans PHP and Vue.js development, Python analytics and operational systems support, backed by a UTAS master’s degree in IT and Systems.',
        impacts: [
            {value: '2020–2022', label: 'Software Developer · Business Automation Ltd'},
            {value: '6.75 / 7', label: 'UTAS GPA · Roll of Excellence 2025'},
            {value: '207 countries', label: 'Reproducible global health analysis'},
        ],
    },
    about: [
        "I’m Tanvir Rahman, an IT graduate based in Launceston, Tasmania. I bring software development experience, applied data analysis and the communication skills to connect technical work with the people who use it.",
        "At Business Automation Ltd, I developed features for enterprise and government applications, optimised SQL queries and worked with QA colleagues through testing and delivery. At the University of Tasmania’s Active Work Laboratory, I contributed Vue.js interface, navigation and accessibility improvements to the ExerTime digital health platform.",
        "My projects make my approach visible: executable Python notebooks for global health analysis, statistical comparisons of airport operations, and an IoT weather dashboard with documented data and model limitations. I explain how a result was reached so others can inspect and build on the work.",
        "Customer-facing work at Aurora Energy and operational experience at Coles have strengthened my ability to investigate discrepancies, guide users through systems and explain practical next steps. I value accurate records, clear communication and dependable follow-through.",
        "I want to contribute to Tasmania through useful software, better-informed decisions and patient technology support. My aim is to help people build digital confidence while continuing to develop my skills in software, data and systems."
    ],
    github: 'https://github.com/mdrTanvir',
    socials: [
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/md-tanvir-rahman-88a239148/', icon: '/brand/linkedin.svg'},
        {name: 'GitHub', link: 'https://github.com/mdrTanvir', icon: '/brand/github.svg'},
    ],
}

export default siteData;

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
        siteUrl: 'https://mdr-tanvir.dev',
        description: 'IT graduate in Launceston with experience in technical support, SQL, operational reporting, and customer service across utilities, software development, and retail.',
        image: '/og.png',
        keywords: `${fullName}, IT Graduate, Software Developer, Cybersecurity, Data, Systems`,
    },
    hero: {
        greeting: `I'm ${fullName},`,
        headline: 'IT Graduate',
        headlineTags: ['Technical Support', 'Data & Reporting', 'Systems'],
        subheadline: 'I combine technical problem-solving with practical experience in customer support, operational reporting, and clear communication across utilities, software, and retail.',
        impacts: [
            {value: '20%', label: 'faster navigation on the ExerTime health platform'},
            {value: '0.84', label: 'R² achieved in an IoT weather dashboard'},
            {value: '190+', label: 'countries analysed in global health research'},
        ],
    },
    about: [
        "I'm Tanvir, an IT graduate based in Launceston and a Customer Service Officer at Aurora Energy. I combine technical problem-solving with practical customer support, data, and systems experience.",

        "My background spans utilities, software development, and retail. I am comfortable investigating account and data discrepancies, working with operational systems, and explaining outcomes clearly to people with different levels of technical knowledge.",

        "During my University of Tasmania placement, I improved the ExerTime digital health platform through targeted interface, accessibility, and system enhancements. The work reduced user navigation time by around 20 percent for researchers and academic stakeholders.",

        "Earlier, at Business Automation Ltd, I delivered features for enterprise and government applications in live production environments. I developed a careful approach to performance, reliability, testing, and collaboration across technical teams.",

        "What I bring is curiosity, reliability, strong communication, and a calm approach to problem-solving. I hold full Australian working rights and an Australian driver's licence, and am available for regular travel across Tasmania."
    ],
    github: 'https://github.com/mdrTanvir',
    socials: [
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/md-tanvir-rahman-88a239148/', icon: '/brand/linkedin.svg'},
        {name: 'GitHub', link: 'https://github.com/mdrTanvir', icon: '/brand/github.svg'},
    ],
}

export default siteData;

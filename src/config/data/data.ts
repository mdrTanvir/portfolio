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
    address: 'Hobart, Tasmania, Australia',
    phone: '+61 450469323',
    email: 'md.tanvir.rahman.au@gmail.com',
    profile: '',
    // profile: '/images/profile2.webp',
    cvLink: '/Md-Tanvir-Rahman-Resume.pdf',
    meta: {
        name: siteBrand,
        description: 'IT graduate based in Hobart with hands-on experience across software, data, systems, and security. I enjoy building reliable digital solutions, improving user experiences, and contributing thoughtfully within collaborative teams.',
        image: '/images/projects/p2.png',
        keywords: `${fullName}, IT Graduate, Software Developer, Cybersecurity, Data, Systems`,
    },
    hero: {
        greeting: `I'm ${fullName},`,
        headline: 'Emerging IT Professional',
        headlineTags: ['Ai', 'Cybersecurity', 'Data'],
        subheadline: 'With practical experience across software, data, systems, and security, I enjoy creating dependable solutions, improving digital experiences, and solving real problems through thoughtful, collaborative work.',
    },
    about: [
        "I'm Tanvir, an IT graduate based in Hobart who enjoys making technology more useful, approachable, and dependable. I recently completed a Master of Information Technology and Systems at the University of Tasmania, where I was recognised on the Roll of Excellence in 2025 for strong academic performance and practical engagement.",

        "My background brings together software development, data handling, systems thinking, and security awareness. I am most engaged when I can understand a problem clearly, improve the experience for real users, and contribute work that is both technically sound and genuinely helpful.",

        "During my University of Tasmania placement, I helped improve the usability of the ExerTime platform by contributing front-end refinements, accessibility improvements, and cleaner user flows. That work supported a measurable reduction in navigation time of around 20 percent and strengthened my confidence in research-driven product work.",

        "Earlier, at Business Automation Ltd, I worked on enterprise and government systems where I contributed to feature delivery, debugging, database optimisation, and production support. That experience taught me how to work carefully within live environments, collaborate across teams, and focus on reliability as much as implementation.",

        "What I bring is curiosity, reliability, and a calm, steady approach to problem-solving. I am open to graduate opportunities across software, IT support, systems, and wider technology teams, and I am eager to keep growing while contributing meaningfully from day one."
    ],
    github: 'https://github.com/mdr11UTAS',
    socials: [
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/md-tanvir-rahman-88a239148/', icon: 'fa:linkedin'},
        {name: 'GitHub', link: 'https://github.com/mdr11UTAS', icon: 'fa:github-square'},
    ],
}

export default siteData;

import {calculateXP} from "~/config/helper";
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

const siteData = {
    name: fullName,
    logoName: 'Tanvir',
    address: 'King Street, Sandy Bay, Tasmania, Australia',
    phone: '+61 450469323',
    email: 'md.tanvir.rahman.au@gmail.com',
    profile: '',
    // profile: '/images/profile2.webp',
    cvLink: 'https://drive.google.com/file/d/1w9_B1sCVZBAuQuxHGARSFSSudF64MSdT/view?usp=sharing',
    meta: {
        name: fullName,
        description: ` A highly motivated and detail-oriented individual with strong problem-solving and communication skills. Experienced in managing projects, collaborating with cross-functional teams, and delivering high-quality solutions within deadlines.`,
        image: '/images/profile2.webp',
        keywords: fullName,
    },
    slogan: 'Motivated Developer | Problem Solver | Lifelong Learner',
    stats: [
        {title: '7 Years +', subtitle: 'Experience'},
        {title: '10+', subtitle: 'Projects'},
    ],
    descriptions: [
        "I’m a highly motivated and curious individual with a deep-rooted passion for technology. I hold a <strong>Master’s degree in Information Technology and Systems</strong>, with specializations in both <strong>Cybersecurity</strong> and <strong>Artificial Intelligence</strong>. This academic background has equipped me with a strong foundation in securing digital systems, identifying vulnerabilities, and working with intelligent algorithms that solve complex, real-world problems.",
    
        "<div style='margin-bottom: 12px;'></div>I also bring practical experience as a <strong>Web Developer</strong>, where I have designed and built dynamic, responsive applications with a focus on usability, performance, and security. My work emphasizes creating <strong>scalable</strong> and <strong>user-friendly web platforms</strong> using modern development tools, delivering real value through clean, efficient code and thoughtful UI/UX design.",
    
        "<div style='margin-bottom: 12px;'></div>I am particularly interested in bridging the gap between <strong>AI-powered innovation</strong> and <strong>secure, high-performing web systems</strong>. Whether it’s implementing intelligent features, strengthening authentication flows, or optimizing performance, I strive to craft seamless digital experiences driven by modern technology and best practices.",
    
        "<div style='margin-bottom: 12px;'></div>With a strong growth mindset, I am always eager to <strong>collaborate</strong>, <strong>explore new technologies</strong>, and contribute to <strong>impactful, forward-thinking solutions</strong> that make a difference in how people interact with the digital world."
    ]    ,
    github: 'https://github.com/Tanvir',
    socials: [
        {name: 'Facebook', link: 'https://www.facebook.com/Tanveershuvos/', icon: 'fa:facebook-square'},
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/tanvir-rahman-88a239148/', icon: 'fa:linkedin'},
    // {name: 'Instagram', link: 'https://www.instagram.com/tanvirrahman7547/', icon: 'fa:instagram'},
    // {name: 'Twitter', link: 'https://twitter.com/tanvirrahman7547', icon: 'fa:twitter'},
        {name: 'Github', link: 'https://github.com/mdr11UTAS', icon: 'fa:github-square'},
    ],
}

export default siteData;
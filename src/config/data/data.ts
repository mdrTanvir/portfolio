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
    address: 'Dhaka, Bangladesh',
    phone: '+04 222 333 444',
    email: 'taanvir@gmail.com',
    profile: '/images/profile2.webp',
    cvLink: 'https://drive.google.com/file/d/1GfBCRYzrduXnudbbfsltAPABmMcDphUs/view?usp=sharing',
    meta: {
        name: fullName,
        description: `${fullName} is a Full Stack Web Developer specializing in Laravel and Vue.js. With over 4 years of experience, he creates dynamic and user-friendly web applications. Passionate about coding and always eager to learn new technologies.`,
        image: '/images/profile2.webp',
        keywords: fullName,
    },
    slogan: 'A Full-Stack Developer turning ideas into seamless digital experiences.',
    stats: [
        {title: '4 Years +', subtitle: 'Experience'},
        {title: '20+', subtitle: 'Projects'},
        {title: '14+', subtitle: 'Happy Clients'},
    ],
    descriptions: [
        'Hello! I’m a passionate and detail-oriented <strong>Full Stack Web Developer</strong> with a strong foundation in both backend and frontend technologies. ' +
        'I specialize in <strong>Laravel (PHP)</strong> and <strong>Vue.js</strong>, ' +
        'and I enjoy building dynamic, responsive, and user-friendly web applications.' +
        ' My toolbox includes technologies like <b>JavaScript</b>, <b>Tailwind CSS</b>, <b>Bootstrap</b>, and <b>CSS</b>, which ' +
        'I use to craft elegant interfaces and seamless user experiences.',

        '<div style="margin-bottom: 6px"></div> I’m always eager to learn, grow, and take on exciting new challenges.' +
        ' Whether it’s building complex APIs with Laravel or creating smooth, interactive UIs with Vue.js, ' +
        'I take pride in delivering clean, efficient, and scalable code.\n',

        '<div style="margin-bottom: 6px"></div> Let’s build something amazing together!',
    ],
    github: 'https://github.com/Tanvir',
    socials: [
        {name: 'Facebook', link: 'https://www.facebook.com/tanvir.rahman.7547', icon: 'fa:facebook-square'},
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/tanvirrahman7547/', icon: 'fa:linkedin'},
        {name: 'Instagram', link: 'https://www.instagram.com/tanvirrahman7547/', icon: 'fa:instagram'},
        {name: 'Twitter', link: 'https://twitter.com/tanvirrahman7547', icon: 'fa:twitter'},
        {name: 'Github', link: 'https://github.com', icon: 'fa:github-square'},
    ],
}

export default siteData;
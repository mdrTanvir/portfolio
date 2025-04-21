const siteData = {
    name: 'Tanvir Rahman',
    logoName: 'Tanvir',
    profile: '/images/profile2.jpg',
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
        ' Whether it’s building complex APIs with Laravel or creating smooth, interactive UIs with Vue.js, I take pride in delivering clean, efficient, and scalable code.\n' +
        '\n',
        '<div style="margin-bottom: 6px"></div> Let’s build something amazing together!',
    ],
    meta_description: 'Tanvir Rahman is a Full Stack Web Developer specializing in Laravel and Vue.js. With over 4 years of experience, he creates dynamic and user-friendly web applications. Passionate about coding and always eager to learn new technologies.',
    educations: [
        {
            title: 'M.Sc in Information Technology',
            institution: 'University of Tasmania (UTAS) Australia',
            duration: '2023 - 2025',
            description: ''
        },
        {
            title: 'B.Sc Hons. in Computer Science',
            institution: 'University of Greenwich (UoG) UK',
            duration: '2016 - 2020',
            description: ''
        },
    ],
    github: 'https://github.com/Tanvir',
    address: 'Dhaka, Bangladesh',
    email: 'taanvir@gmail.com',
    socials: [
        {name: 'Facebook', link: 'https://www.facebook.com/tanvir.rahman.7547', icon: 'fa:facebook-square'},
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/tanvirrahman7547/', icon: 'fa:linkedin'},
        {name: 'Instagram', link: 'https://www.instagram.com/tanvirrahman7547/', icon: 'fa:instagram'},
        {name: 'Twitter', link: 'https://twitter.com/tanvirrahman7547', icon: 'fa:twitter'},
        {name: 'Github', link: 'https://github.com', icon: 'fa:github-square'},
    ],
    skills: {
        // logos downloaded from https://devicon.dev/
        backend: [
            {name: 'PHP', logo: '/images/skills/php-original.svg'},
            {name: 'Laravel', logo: '/images/skills/laravel-original.svg'},
        ],
        database: [
            {name: 'MySQL', logo: '/images/skills/mysql-original.svg'},
            {name: 'PostgreSQL', logo: '/images/skills/postgresql-original.svg'},
        ],
        frontend: [
            {name: 'HTML', logo: '/images/skills/html5-original.svg'},
            {name: 'CSS', logo: '/images/skills/css3-original.svg'},
            {name: 'Sass', logo: '/images/skills/sass-original.svg'},
            {name: 'JavaScript', logo: '/images/skills/javascript-plain.svg'},
            {name: 'Vue.js', logo: '/images/skills/vuejs-original.svg'},
            {name: 'Nuxt.js', logo: '/images/skills/nuxtjs-original.svg'},
            {name: 'Tailwind CSS', logo: '/images/skills/tailwindcss-original.svg'},
            {name: 'Bootstrap', logo: '/images/skills/bootstrap-original.svg'},
        ],
        tools: [
            {name: 'Git', logo: '/images/skills/git-original.svg'},
            {name: 'Github', logo: '/images/skills/github-original.svg'},
            {name: 'Gitlab', logo: '/images/skills/gitlab-original.svg'},
            {name: 'Docker', logo: '/images/skills/docker-original.svg'},
            {name: 'Linux', logo: '/images/skills/linux-original.svg'},
            {name: 'Nginx', logo: '/images/skills/nginx-original.svg'},
            {name: 'Postman', logo: '/images/skills/postman-plain.svg'},
        ]
    },
    experiences: [
        {
            title: 'Team Lead',
            company: 'Softech Limited',
            duration: 'Jan 2023 - Present',
            description: 'Led the development of web applications using Laravel, Vue.js, and MySQL. Managed a small team, ensured code quality, and streamlined deployment processes across multiple projects.',
            skills: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
            projectLinks: [
                {name: 'Project A', link: 'https://project-a.com'},
                {name: 'Project B', link: 'https://project-b.com'}
            ]
        },
        {
            title: 'Full-Stack Web Developer',
            company: 'Tech Solutions',
            duration: 'Jan 2022 - Dec 2022',
            description: 'Built responsive websites using HTML, CSS, JavaScript, and PHP. Collaborated with designers and backend developers to deliver user-friendly interfaces and efficient backend logic.',
            skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        },
        {
            title: 'Backend Developer',
            company: 'Softech Limited',
            duration: 'Jan 2021 - Dec 2021',
            description: 'Maintained and developed backend systems using Laravel and MySQL. Integrated Vue.js for dynamic features and contributed to full project cycles from planning to deployment.',
            skills: ['PHP', 'Laravel', 'Vue.js', 'MySQL'],
            projectLinks: [
                {name: 'Project A', link: 'https://project-a.com'},
                {name: 'Project B', link: 'https://project-b.com'}
            ]
        },
    ],
    works: [
        {
            title: 'E-commerce Platform',
            tag: 'personal',
            date: 'August 2023',
            description: 'An e-commerce platform built with Laravel and Vue.js.',
            skills: ['Laravel', 'Vue.js', 'MySQL'],
            projectLink: 'https://ecommerce.com',
            image: '/images/projects/p1.png',
        },
        {
            title: 'Social App UI Design',
            tag: 'personal',
            date: 'September 2023',
            description: 'A social media app design focusing on clean UI and user experience.',
            skills: ['Figma', 'UX', 'UI'],
            projectLink: 'https://dribbble.com',
            gitHub: 'https://github.com/june',
            image: '/images/projects/p2.png',
        },
        {
            title: 'Blog CMS Platform',
            tag: 'client',
            date: 'October 2023',
            description: 'Custom CMS for blogging, built with Nuxt and Firebase.',
            skills: ['Nuxt.js', 'Firebase', 'Tailwind'],
            projectLink: 'https://blogcms.com',
            image: '/images/projects/p3.png',
        },
        {
            title: 'Portfolio Website',
            tag: 'client',
            date: 'June 2023',
            description: 'A personal portfolio website to showcase my projects and skills. A personal portfolio website to showcase my projects and skills. A personal portfolio website to showcase my projects and skills. A personal portfolio website to showcase my projects and skills. A personal portfolio website to showcase my projects and skills. A personal portfolio website to showcase my projects and skills. ',
            skills: ['HTML', 'CSS', 'JavaScript'],
            projectLink: 'https://myportfolio.com',
            gitHub: 'https://github.com/june',
            image: '/images/projects/p4.png',
        },
    ],
}

export default siteData;
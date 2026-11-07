const experiences = [
    {
        title: 'Customer Service Officer',
        company: 'Aurora Energy, Launceston',
        logo: '',
        link: '',
        type: 'Utilities',
        startDate: 'Oct 2026',
        endDate: 'Present',
        xp: 'Current role',
        description: 'Work in a call-centre Customer Service Officer role at Aurora Energy, answering customer enquiries and providing clear, accurate support for customers across Tasmania.',
        highlights: [
            'Answer customer account and service enquiries clearly, professionally, and with a focus on practical next steps.',
            'Follow relevant legislation, policies, and procedures when handling customer enquiries and account information.',
            'Manage concurrent calls and document interactions accurately to support follow-up and consistent service delivery.',
        ],
        skills: ['Customer Service', 'Data Validation', 'Operational Systems'],
    },
    {
        title: 'Fresh Produce Team Member',
        company: 'Coles, Tasmania',
        logo: '',
        link: '',
        type: 'Retail',
        startDate: '2023',
        endDate: '2026',
        xp: '3 years',
        description: 'Supported stock-management processes and day-to-day operations, combining customer service, data checks, and team support.',
        highlights: [
            'Coached colleagues in stock management processes, handheld device use, and day-to-day procedures.',
            'Troubleshot handheld scanners and operational-system issues to keep daily workflows moving.',
            'Used SAP operational reports, gap scans, and stock checks to investigate inventory and price discrepancies.',
        ],
        skills: ['SAP Reporting', 'Data Validation', 'Operational Systems', 'User Training & Documentation'],
    },
    {
        title: 'Software Developer',
        company: 'Business Automation Ltd, Bangladesh',
        logo: '',
        link: 'https://ba-systems.com/',
        type: 'Software Company',
        startDate: 'Jan 2020',
        endDate: 'Dec 2022',
        xp: '3 years',
        description: 'Delivered software features for enterprise and government client applications in production, with a focus on performance, reliability, testing, and cross-functional delivery.',
        highlights: [
            'Delivered production features for enterprise and government client applications.',
            'Optimised database queries and system architecture for responsiveness and reliability under high-volume load.',
            'Partnered with QA through structured testing cycles to strengthen platform resilience and reduce defects.',
        ],
        skills: ['PHP & Laravel', 'JavaScript & Vue.js', 'SQL & Query Optimisation', 'REST API Development', 'Git & GitHub', 'Software Testing & QA'],
        projectLinks: [
            {name: 'a2i Dashboard', url: 'https://a2i.gov.bd/'},
            {name: 'BSCIC', url: 'https://bscic.gov.bd/'},
        ],
    },
    {
        title: 'Software Developer Intern',
        company: 'Active Work Laboratory, University of Tasmania',
        logo: '',
        link: '',
        type: 'Research Placement',
        startDate: 'Feb 2025',
        endDate: 'Jun 2025',
        xp: '5 months',
        description: 'Improved the ExerTime digital health platform for real-world research use through targeted interface, accessibility, and system enhancements for health researchers and academic stakeholders.',
        highlights: [
            'Improved navigation and interface components on the ExerTime digital health platform.',
            'Resolved accessibility gaps using user-centred design thinking on a live research platform.',
            'Contributed to sprint planning, code reviews, iterative delivery, and component restructuring to reduce maintenance effort.',
        ],
        skills: ['JavaScript & Vue.js', 'Accessibility & UX', 'Agile Delivery', 'Software Testing & QA'],
        projectLinks: [
            {name: 'ExerTime Platform', url: 'https://www.exertime.com'}
        ],
    },
]

const orderedExperiences = [experiences[0], experiences[3], experiences[2], experiences[1]]
export default orderedExperiences

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
        description: 'Support Tasmanian customers with account and service enquiries, combining clear explanations, accurate records and careful handling of customer information.',
        highlights: [
            'Clarify customer enquiries and explain account information and practical next steps in accessible language.',
            'Handle account information in line with relevant legislation, policies and procedures.',
            'Record customer interactions accurately so follow-up is informed and service remains consistent.',
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
        description: 'Supported daily retail operations through stock checks, SAP reporting, device troubleshooting and guidance for colleagues.',
        highlights: [
            'Guided colleagues through stock-management procedures and handheld-device workflows.',
            'Investigated handheld-scanner and operational-system issues affecting daily tasks.',
            'Cross-checked SAP reports, gap scans and stock records to investigate inventory and pricing discrepancies.',
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
        description: 'Developed and maintained features for enterprise and government applications, working across application code, database queries and quality assurance.',
        highlights: [
            'Implemented application features using PHP, Laravel, JavaScript, Vue.js and SQL.',
            'Reviewed database queries and application components to address performance and reliability concerns.',
            'Worked with QA colleagues to test changes, investigate defects and prepare features for delivery.',
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
        description: 'Contributed to ExerTime during a University of Tasmania research placement, improving how research users navigate and interact with the digital health platform.',
        highlights: [
            'Refined Vue.js interfaces and navigation across key platform workflows.',
            'Addressed accessibility and interaction issues with attention to research users’ needs.',
            'Participated in sprint planning and code reviews, and restructured components for clearer, more maintainable code.',
        ],
        skills: ['JavaScript & Vue.js', 'Accessibility & UX', 'Agile Delivery', 'Software Testing & QA'],
        projectLinks: [
            {name: 'ExerTime Platform', url: 'https://www.exertime.com'}
        ],
    },
]

const orderedExperiences = [experiences[0], experiences[3], experiences[2], experiences[1]]
export default orderedExperiences

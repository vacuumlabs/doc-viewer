export default [
  {
    title: 'Vacuum Handbook',
    description:
      'The first thing you should read when you start working at Vacuumlabs.',
    icon: 'fa fa-users',
    //updatedAt: '20160107T14:39:21',
    link: '/vacuum-book/',
  },
  {
    title: 'Tools',
    description: 'Learn how to properly use all the tools in Vacuum',
    icon: 'fas fa-tools',
    link: '/vacuum-book/tools/',
  },
  {
    title: 'Delivery (tech, design, product)',
    description:
      'Daily life of engineers and designers, client communication, hiring process, and more.',
    icon: 'fas fa-laptop-code',
    submenu: [
      ['Delivery Process', '/vacuum-book/delivery-process/'],
      ['Interviewing Engineers', '/assessment/'],
      ['Estimating Projects', '/vacuum-book/delivery-estimation/'],
      ['Coding Tips', '/coding-tips/'],
    ],
  },
  {
    title: 'Management Tips',
    description:
      'Vacuumlabs Management tips, tricks, guidelines, and best practices.',
    icon: 'fas fa-tasks',
    link: '/management-tips/',
  },
  {
    title: 'Finance Handbook',
    description: 'No money, no honey.',
    icon: 'fa fa-euro-sign',
    link: '/finance-handbook/',
  },
  {
    title: 'HQ',
    description: "Relevant information for the Vacuumlabs' management.",
    icon: 'fa fa-chart-line',
    link: '/hq/',
  },
  {
    title: 'Marketing & Design',
    description: 'Vacuumlabs brand manual.',
    icon: 'fas fa-bullhorn',
    link: '/marketing-design/',
  },
  {
    title: 'Security Handbook',
    description: 'Security is always excessive until it’s not enough.',
    icon: 'fa fa-lock',
    link: '/security-book/',
  },
  {
    title: 'House Rules',
    description: 'House rules for offices.',
    icon: 'fa fa-building',
    submenu: [
      ['Bratislava (The Spot)', '/vacuum-book/office-ba/'],
      ['Bratislava (Flat)', '/vacuum-book/office-ba-flat/'],
      ['Brno', 'vacuum-book/office-brn/'],
      ['Budapest', 'vacuum-book/office-bud/'],
      ['Košice', 'vacuum-book/office-ke/'],
      ['Prague', 'vacuum-book/office-prg/'],
      ['Prešov', 'vacuum-book/office-po/'],
    ],
  },
  {
    title: 'ReactiveConf',
    description: 'How to organize ReactiveConf.',
    icon: 'fab fa-react',
    link: '/reactiveconf/',
  },
  {
    title: 'Travel Tips',
    description: 'How to survive jet lag and much more.',
    icon: 'fas fa-plane',
    link: '/travel-tips/',
  },
  {
    title: 'Asciidoctor Cheatsheet',
    description:
      'The ultimate copy & paste guide to writing Asciidoctor documents.',
    icon: 'fas fa-pencil-alt',
    link: '/asciidoctor-cheatsheet/',
  },
  {
    title: 'ReportBot',
    description: 'ReportBot collecting reports from Slack.',
    icon: 'fab fa-slack',
    link: 'https://report.vacuumlabs.com/',
    newPage: true,
  },
]

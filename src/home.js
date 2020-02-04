import React from 'react'
import Style from './app.style'

const sampleCardsData = [
  {
    title: 'Vacuum Handbook',
    description: 'The first thing you should read when you start working at Vacuumlabs.',
    icon: 'fa fa-users',
    //updatedAt: '20160107T14:39:21',
    link: '/vacuum-book/',
  },
  {
    title: 'Management Tips',
    description: 'Vacuumlabs Management tips, tricks, guidelines, and best practices.',
    icon: 'fas fa-tasks',
    link: '/management-tips/',
  },
  {
    title: 'PM Handbook',
    description: 'Vacuumlabs PM tips, tricks, guidelines, and best practices.',
    icon: 'fas fa-tasks',
    link: '/pm-book/',
  },
  {
    title: 'HQ',
    description: 'Relevant information for the Vacuumlabs\' management.',
    icon: 'fa fa-chart-line',
    link: '/hq/',
  },
  {
    title: 'Marketing & Design',
    description: 'Vacuumlabs brand manual.',
    icon: 'fas fa-bullhorn',
    link: '/marketing-design/'
  },
  {
    title: 'Assessment and Interview',
    description: 'Set of guides, tips, and interview questions for our technical assessments.',
    icon: 'fa fa-user-plus',
    //updatedAt: '20160307T14:23:21',
    link: '/assessment/',
  },
  {
    title: 'Project Estimation',
    description: 'How we estimate projects at Vacuumlabs.',
    icon: 'fa fa-clock',
    link: '/estimation-book/',
  },
  {
    title: 'Coding Tips',
    description: 'This public handbook provides useful tips and tricks for programmers.',
    icon: 'fa fa-code',
    //updatedAt: '20160207T11:39:21',
    link: '/coding-tips/',
  },
  {
    title: 'Tech Handbook',
    description: 'Various technical stuff such as Google Drive backup, or JIRA management are documented here.',
    icon: 'fa fa-terminal',
    //updatedAt: '20160307T14:23:21',
    link: '/tech-book/',
  },
  {
    title: 'Security Handbook',
    description: 'Security is always excessive until it’s not enough.',
    icon: 'fa fa-lock',
    link: '/security-book/',
  },
  {
    title: 'House Rules — Radlinského',
    description: 'House rules for Radlinského 10 office.',
    icon: 'fa fa-building',
    link: '/house-rules-radlinskeho/',
  },
  {
    title: 'House Rules — Košice',
    description: 'House rules for Košice office.',
    icon: 'fa fa-building',
    link: '/house-rules-kosice/',
  },
  {
    title: 'House Rules — Prague',
    description: 'House rules for our Prague office.',
    icon: 'fa fa-building',
    link: '/house-rules-prague/',
  },
  {
    title: 'House Rules — Brno',
    description: 'House rules for Brno office.',
    icon: 'fa fa-building',
    link: '/house-rules-brno/',
  },
  {
    title: 'House Rules — Budapest',
    description: 'House rules for Budapest office.',
    icon: 'fa fa-building',
    link: '/house-rules-budapest/',
  },
  {
    title: 'Company flats',
    description: 'How things work at our company flats',
    icon: 'fa fa-home',
    link: '/company_flats/',
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
    description: 'The ultimate copy & paste guide to writing Asciidoctor documents.',
    icon: 'fas fa-pencil-alt',
    link: '/asciidoctor-cheatsheet/'
  },
  {
    title: 'ReportBot',
    description: 'ReportBot collecting reports from Slack.',
    icon: 'fab fa-slack',
    link: 'https://report.vacuumlabs.com/',
    newPage: true,
  },
]

export default () => (
  <div>
    <Style />
    <div className="line" />
    <div className="wrapper">
      <Header />
      <Cards cards={sampleCardsData} />
    </div>
  </div>
)

const Header = ({title = 'We Vacuumlabs'}) => (
  <header className="header">
    <a href="/" className="header__logo" title={title}>{title}</a>
  </header>
)

const Cards = ({cards}) => (
  <section className="cards">
    {cards.length > 0
      ? cards.map((card, index) => <Card key={index} {...card} />)
      : <p>There are no books. They disappeared in vacuum.</p>
    }
  </section>
)

const Card = ({title, description, icon, updatedAt, link, newPage}) => (
  <a href={link} className="card" {...(newPage && {target: '_blank', rel: 'noopener noreferrer'})}>
    <header className="card__header">
      {icon && <i className={`${icon} card__header__icon`} />}
      <h2 className="card__header__title">{title}</h2>
    </header>
    {description && <p className="card__description">{description}</p>}
    {updatedAt && <p className="card__date">Last updated: {updatedAt}</p>}
  </a>
)

import React from 'react'
import Style from './app.style'

const sampleCardsData = [
  {
    title: "Vacuum Handbook",
    description: `The first thing you should read when you start working at VacuumLabs.`,
    icon: "fa fa-users",
    //updatedAt: "20160107T14:39:21",
    link: "/vacuum-book/",
  },
  {
    title: "House Rules — Radlinského",
    description: "House rules for Radlinského 10 office.",
    icon: "fa fa-home",
    link: "/house-rules-radlinskeho/",
  },
  {
    title: "House Rules — Prague",
    description: "House rules for our Prague office.",
    icon: "fa fa-home",
    link: "/house-rules-prague/",
  },
  {
    title: "Coding Tips",
    description: `This public handbook provides useful tips and tricks for programmers.`,
    icon: "fa fa-code",
    //updatedAt: "20160207T11:39:21",
    link: "/coding-tips/",
  },
  {
    title: "Tech Handbook",
    description: `Various technical stuff such as Google Drive backup, or JIRA management are documented here.`,
    icon: "fa fa-terminal",
    //updatedAt: "20160307T14:23:21",
    link: "/tech-book/",
  },
  {
    title: "Assessment and Interview",
    description: `Set of guides, tips, and interview questions for our technical assessments.`,
    icon: "fa fa-user-plus",
    //updatedAt: "20160307T14:23:21",
    link: "/assessment/",
  },
  {
    title: "HQ",
    description: "Relevant information for the VacuumLabs' management.",
    icon: "fa fa-chart-line",
    link: "/hq/",
  },
  {
    title: "ReactiveConf",
    description: "How to organize ReactiveConf.",
    icon: "fab fa-react",
    link: "/reactiveconf/",
  },
  {
    title: "ReactiveMeetups",
    description: "How to organize ReactiveMeetups.",
    icon: "fab fa-react",
    link: "/reactivemeetups/",
  },
]

export default () => (
  <div>
    <Style />
    <div className="line"></div>
    <div className="wrapper">
      <Header />
      <Cards cards={sampleCardsData} />
    </div>
  </div>
)

const Header = ({title = "We Vacuumlabs"}) => (
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

const Card = ({title, description, icon, updatedAt, link}) => (
  <a href={link} className="card">
    <header className="card__header">
      {icon && <i className={`${icon} card__header__icon`} />}
      <h2 className="card__header__title">{title}</h2>
    </header>
    {description && <p className="card__description">{description}</p>}
    {updatedAt && <p className="card__date">Last updated: {updatedAt}</p>}
  </a>
)

import React from 'react'

const houses = [
  {
    title: 'Digital Park',
    link: '/house-rules-radlinskeho/',
  },
  {
    title: 'Košice',
    link: '/house-rules-kosice/',
  },
  {
    title: 'Prague',
    link: '/house-rules-prague/',
  },
  {
    title: 'Brno',
    link: '/house-rules-brno/',
  },
  {
    title: 'Budapest',
    link: '/house-rules-budapest/',
  },
]

export default ({isOpen}) => {
  return (
    <div className="card__dialog__wrapper">
      <div className={`card__dialog ${isOpen ? 'open' : ''}`}>
        {houses.map(({title, link}, index) => (
          <a href={link} key={index}>
            <header className="card__dialog__header">
              <h2 className="card__header__title">{title}</h2>
            </header>
          </a>
        ))}
      </div>
    </div>
  )
}

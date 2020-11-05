import React, {useState} from 'react'
import Style from './app.style'
import {sampleCardsData} from './data'

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
    <a href="/" className="header__logo" title={title}>
      {title}
    </a>
  </header>
)

const Cards = ({cards}) => (
  <section className="cards">
    {cards.length > 0 ? (
      cards.map((card, index) => <Card key={index} {...card} />)
    ) : (
      <p>There are no books. They disappeared in vacuum.</p>
    )}
  </section>
)

// NOTE: nested anchors don't work
const CardBase = ({newPage, link, children, setIsOpen, isOpen}) => {
  return link ? (
    <a
      href={link}
      className="card"
      {...(newPage && {target: '_blank', rel: 'noopener noreferrer'})}
    >
      {children}
    </a>
  ) : (
    <div
      onClick={() => setTimeout(() => setIsOpen(!isOpen))}
      onMouseEnter={() => setTimeout(() => setIsOpen(true))}
      onMouseLeave={() => setTimeout(() => setIsOpen(false))}
      className="card"
    >
      {children}
    </div>
  )
}

const Card = ({title, description, icon, updatedAt, link, newPage, Menu}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CardBase
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      link={link}
      className="card"
      {...(newPage && {target: '_blank', rel: 'noopener noreferrer'})}
    >
      <header className="card__header">
        {icon && <i className={`${icon} card__header__icon`} />}
        <h2 className="card__header__title">{title}</h2>
        {Menu && (
          <i
            className={`${
              isOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
            } card__header__chevronicon`}
          />
        )}
      </header>
      {Menu && <Menu isOpen={isOpen} />}
      {description && <p className="card__description">{description}</p>}
      {updatedAt && <p className="card__date">Last updated: {updatedAt}</p>}
    </CardBase>
  )
}

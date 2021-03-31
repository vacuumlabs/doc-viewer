import React from 'react'
import Style from './app.style'
import menu from './menu.js'

export default () => (
  <div>
    <Style />
    <div className="line" />
    <div className="wrapper">
      <header className="header">
        <a href="/" className="header__logo" title="We Vacuumlabs">
          We Vacuumlabs
        </a>
      </header>
      <section className="cards">
        {menu.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </section>
    </div>
  </div>
)

const MenuItem = ({item}) => (
  <Card {...item}>{item.submenu && <SubMenu items={item.submenu} />}</Card>
)

const Card = ({link, newPage, icon, title, description, children}) => {
  const blank = {target: '_blank', rel: 'noopener noreferrer'}
  const hasSubmenu = children != null
  const A = (props, {children}) =>
    hasSubmenu ? (
      <div {...props} />
    ) : (
      <a href={link} {...(newPage && blank)} {...props} />
    )

  return (
    <A className="card">
      <header className="card__header">
        {icon && <i className={`${icon} card__header__icon`} />}
        <h2 className="card__header__title">{title}</h2>
      </header>
      {children}
      {description && <p className="card__description">{description}</p>}
    </A>
  )
}

const SubMenu = ({items}) => {
  return (
    <div className="card__submenu__wrapper">
      <div className="card__submenu">
        {items.map(([title, link], index) => (
          <SubMenuItem title={title} link={link} key={index} />
        ))}
      </div>
    </div>
  )
}

const SubMenuItem = ({title, link}) => (
  <a href={link}>
    <header className="card__submenu__header">
      <h2 className="card__header__title">{title}</h2>
    </header>
  </a>
)

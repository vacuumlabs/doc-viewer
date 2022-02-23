import React from 'react'

function r([component, attr, ...children]) {
  return React.createElement(
    component,
    attr,
    ...children.map((c) => Array.isArray(c) ? r(c) : c),
  )
}

const Card = ({link, newPage, icon, title, description, children}) => {
  const blank = {target: '_blank', rel: 'noopener noreferrer'}
  const hasSubmenu = children != null

  const A = (props, {children}) => hasSubmenu
     ? r(['div', {...props, tabIndex: '-1'}])
     : r(['a', {href:link, ...(newPage && blank), ...props}])

  return r(
    [A, {className:'card'},
      ['header', {className:'card__header'},
        icon && ['i', {className:`${icon} card__header__icon`}],
        ['h2', {className:'card__header__title'}, title],
      ],
      children,
      description && ['p', {className:'card__description'}, description],
    ])
}

const SubMenuItem = ({title, link}) => r(
  ['a', {href: link},
    ['header', {className:'card__submenu__header'},
      ['h2', {className:'card__header__title'}, title],
    ],
  ])

const SubMenu = ({items}) => r(
  ['div', {className:'card__submenu__wrapper'},
    ['div', {className:'card__submenu'},
      ...items.map(([title, link], index) => [SubMenuItem, {title, link, key: index}]),
    ],
  ])

const MenuItem = ({item}) => r(
  [Card, item,
    item.submenu && [SubMenu, {items: item.submenu}],
  ])

const TextWithLink = ({descriptionBefore, descriptionAfter, link, linkText}) => r(
    ['p', {className: 'text__wrapper'},
      descriptionBefore,
      ['a', {href:link ?? '', className:'link__text'}, linkText],
      descriptionAfter,
    ])

export default (menu, notionLinkProps) => r(
  ['div', null,
    ['div', {className: 'line'}],
    ['div', {className: 'wrapper'},
      ['header', {className: 'header'},
        ['a', {href: '/', className: 'header__logo', title: 'We Vacuumlabs'},
          'We Vacuumlabs',
        ],
      ],
      ['section', {className: 'cards'},
        ...menu.map((item, index) => [MenuItem, {key: index, item}]),
      ],
      ['section', {className: 'text_with_link'}, [TextWithLink, notionLinkProps]],
    ],
  ])

import data from './data.json'

const content = document.querySelector('.content')
const timeframeBtns = document.querySelectorAll('.profile-card__timeframe')
const timeframes = ['daily', 'weekly', 'monthly']

let timeframe = 'weekly'

createCards(data)

timeframeBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    timeframe = timeframes[i]
    console.log(timeframes[i])
    removeCards()
    createCards(data)

    timeframeBtns.forEach((btn) => (btn.dataset.state = 'inactive'))
    btn.dataset.state = 'active'
  })
})

function createCards(data) {
  data.forEach((datum) => {
    // Create card
    const card = document.createElement('div')
    card.className = `card card--${datum.title
      .replace(/\s+/g, '-')
      .toLowerCase()}`

    // Add icon to card
    const icon = document.createElement('img')

    const imgUrl = `/images/icon-${datum.title
      .replace(/\s+/g, '-')
      .toLowerCase()}.svg`

    icon.src = imgUrl
    icon.alt = 'icon'
    icon.ariaHidden = 'true'
    icon.className = 'card__icon'

    card.appendChild(icon)

    // Add info inside card
    const cardInfo = document.createElement('div')
    cardInfo.className = 'card__info'

    const cardMain = document.createElement('div')
    cardMain.className = 'card__main'

    const cardSecondary = document.createElement('div')
    cardSecondary.className = 'card__secondary'

    const cardTitle = document.createElement('h2')
    cardTitle.className = 'card__title'
    cardTitle.innerText = `${datum.title}`
    cardSecondary.appendChild(cardTitle)

    const cardCurrentTime = document.createElement('p')
    cardCurrentTime.className = 'card__current-time'
    cardCurrentTime.innerText = `${datum.timeframes[timeframe].current}hrs`
    cardMain.appendChild(cardCurrentTime)

    const kebabIcon = document.createElement('a')
    const kebabIconSvg =
      '<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>'
    kebabIcon.innerHTML = kebabIconSvg
    kebabIcon.className = 'card__kebab-icon'
    cardSecondary.appendChild(kebabIcon)

    const cardPreviousTime = document.createElement('p')
    cardPreviousTime.className = 'card__previous-time'
    cardPreviousTime.innerText = `Last Week - ${datum.timeframes[timeframe].previous}hrs`
    cardMain.appendChild(cardPreviousTime)

    cardInfo.appendChild(cardSecondary)

    cardInfo.appendChild(cardMain)

    card.appendChild(cardInfo)

    content.appendChild(card)
  })
}

function removeCards() {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => card.remove())
}

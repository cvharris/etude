export const handleCardTitleUpdate = updatedCardTitle => ({
  type: 'UPDATE_CARD_TITLE',
  payload: updatedCardTitle
})
export const handleCardFrontUpdate = cardFront => ({
  type: 'UPDATE_CARD_FRONT',
  payload: cardFront
})
export const handleCardBackUpdate = cardBack => ({
  type: 'UPDATE_CARD_BACK',
  payload: cardBack
})

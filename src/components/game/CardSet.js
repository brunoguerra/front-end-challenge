// @flow

import React from 'react'
import Card from './Card'
import styled from 'styled-components'
import type CardListType from './Game.types'

const CardSetContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`
type CardSetPropsType = {
  cards: CardListType,
  flip: boolean,
}

const CardSet = ({ cards = [], flip = false } : CardSetPropsType) => (
  <CardSetContainer>
    {cards.map((card, index) =>
      <Card key={index} {...card} flip={flip} />
    )}
  </CardSetContainer>
)

export default CardSet
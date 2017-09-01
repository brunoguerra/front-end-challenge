// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import v from  '../kit/variables'
import { ContentContainer } from '../kit/Layout'
import { connect } from 'react-redux'
import CardSet from './CardSet'
import { gameStartAction, tarotRequestAction } from './GameActions'
import { GAME_STATE } from './constants'

import type { GameStateType, CardListType} from './Game.types'

const Button = styled.button`
  border: 1px solid ${v.primaryColor}
`

export const l18n = {
  start: 'Iniciar',
  restart: 'Re-Iniciar',
  sorting: 'Embaralhando',
}

export const ControlButton = ({
  gameState = GAME_STATE.initial,
  handleStartClick,
  handleRestartClick,
} : GameStateType) => {
  switch(gameState) {
    case GAME_STATE.starting:
    case GAME_STATE.started:
    case GAME_STATE.showSelected:
      return (<Button onClick={handleRestartClick}>{l18n.restart}</Button>)
    case GAME_STATE.sorting:
      return (<div>{l18n.sorting}</div>)
    case GAME_STATE.initial:
    default:
      return (<Button onClick={handleStartClick}>{l18n.start}</Button>)
  }
}

// Game Component Isolation
type GameProps = {
  gameState: GameStateType,
  handleStartClick: () => void,
  cards?: CardListType,
}

const cardSetShouldFlip = (gameState : GameStateType) => [
  GAME_STATE.starting,
  GAME_STATE.sorting,
  GAME_STATE.started,
].indexOf(gameState) !== -1

export const Game = ({
  gameState = GAME_STATE.initial,
  handleStartClick,
  cards
} : GameProps) => (
  <ContentContainer>
    <ControlButton
      gameState={gameState}
      handleStartClick={handleStartClick}
    />
    <CardSet cards={cards} flip={cardSetShouldFlip(gameState)} />
  </ContentContainer>
)

// GameContainer
type Props = {
  tarot: CardListType,
  gameState: GameStateType,
  tarotRequestAction: () => void,
  gameStartAction: () => void,
}

type State = {}

export class GameContainer extends Component<Props, State> {

  state = {}

  componentDidMount() {
    return this.props.tarotRequestAction()
  }

  handleStartClick = () => {
    return this.props.gameStartAction()
  }

  render = () => (
    <Game
      gameState={this.props.gameState}
      handleStartClick={this.handleStartClick}
      cards={this.props.tarot}
    />
  )

}

const mapsToProps = ({ game: { tarot, gameState } }) => ({ tarot, gameState })

export default connect(mapsToProps, {
  tarotRequestAction,
  gameStartAction,
})(GameContainer)

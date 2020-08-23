import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../utils/colorUtils'
import PlaylistPicker from '../components/Dropdown'
import changeSelectedPlaylist from '../features/playlist/playlistSlice'
import playlists from '../features/playlist/playlistMocks'

const Container = styled.div`
  background-color: ${COLORS.spotify};
  height: 100%;
`

const TitleContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.text`
  color: ${props => props.theme.text.primary};
  font-size: 39px;
`

const PickerContainer = styled.div`
  height: 100%;
  align-items: center;
  background-color: black;
`

export default function Index() {
  const dispatch = useDispatch()
  function handlePlaylistSelected(playlist) {
    dispatch(changeSelectedPlaylist(playlist.label))
  }


const statex = useSelector(state => state)

useEffect(() => {
  console.log('state', statex)
}, [statex])

  return (
    <Container>
      <TitleContainer>
        <Title>Quickify</Title>
      </TitleContainer>
      <PickerContainer>
        <PlaylistPicker
          items={playlists}
          onChange={handlePlaylistSelected}
          placeholder="Choose a playlist"
        />
      </PickerContainer>
    </Container>
  )
}

/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../utils/colorUtils'
import { setAccessToken, setIsAuthenticated } from '../features/auth/authSlice'
// import PlaylistPicker from '../components/Dropdown'
// import changeSelectedPlaylist from '../features/playlist/playlistSlice'

import hash from '../services/hash'
import { createURLParams } from '../utils/apiUtils'

const Container = styled.div`
  background-color: ${COLORS.spotify};
  height: 100%;
  flex-direction: column;
`

const TitleContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.text`
  color: ${(props) => props.theme.text.primary};
  font-size: 39px;
`

const PickerContainer = styled.div`
  height: 100%;
  align-items: center;
  background-color: black;
`

export default function Index() {
  const [sessionError, setSessionError] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [currentTrackUri, setCurrentTrackUri] = useState(null)

  const interval = useRef(null)

  const BASE_URL = 'https://api.spotify.com/v1'
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCurrentPlayingSong() {
    const requestData = {
      url: `${BASE_URL}/me/player/currently-playing`,
    }

    try {
      fetch(requestData.url, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + auth.access_token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((result) => {
          if (result) {
            setCurrentTrack(
              `${result?.item?.name} - ${result?.item?.artists[0]?.name}`,
            )
            setCurrentTrackUri(result?.item.uri)
          }
        })
    } catch (err) {
      console.log('err', err)
      setCurrentTrack('An error occured')
    }
  }

  useEffect(() => {
    const token = hash?.access_token
    if (token) {
      dispatch(setAccessToken(token))
      dispatch(setIsAuthenticated(true))
      setShowLogin(false)
    }

    function Tick() {
      if (auth.access_token) {
        getCurrentPlayingSong()
        setIsAuthenticated(!!token)
      }
    }
    interval.current = setInterval(() => Tick(), 5000)

    return () => {
      clearInterval(interval.current)
    }
  }, [auth.access_token, dispatch, getCurrentPlayingSong])

  function handleAddCurentSongToPlaylist() {
    const playlistId = '5LhDuj8sHVyR6H2k2RESCv'

    const requestData = {
      url: `${BASE_URL}/playlists/${playlistId}/tracks`,
    }

    try {
      fetch(requestData.url + `?uris=${currentTrackUri}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + auth.access_token,
        },
        'Content-Type': 'application/json',
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((result) => {
          console.log('result', result)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  function getMyData() {
    const requestData = {
      url: `${BASE_URL}/me/playlists`,
    }

    try {
      fetch(requestData.url, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + auth.access_token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((result) => {
          console.log('result', result)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  const scope =
    'playlist-modify-public playlist-modify-private user-read-private user-read-email user-read-currently-playing user-read-playback-state'

  const queryParams = {
    client_id: '54232bc5456443da81ac5918d86338b0',
    response_type: 'token',
    redirect_uri: 'http://localhost:3000/callback',
    scope,
    show_dialog: true,
  }

  const url = `https://accounts.spotify.com/authorize${createURLParams(
    queryParams,
  )}`

  return (
    <Container>
      <TitleContainer>
        <Title>Quickify</Title>
      </TitleContainer>
      {showLogin && (
        <TitleContainer>
          <a href={url}>Login to Spotify</a>
        </TitleContainer>
      )}
      {!showLogin && (
        <>
          <TitleContainer>
            <button onClick={getCurrentPlayingSong}>
              <text>Get current song</text>
            </button>
          </TitleContainer>
          <TitleContainer>
            <text>{currentTrack}</text>
          </TitleContainer>
          <TitleContainer>
            <button onClick={handleAddCurentSongToPlaylist}>
              Add current song to your chosen playlist
            </button>
          </TitleContainer>
          <TitleContainer>
            <button onClick={getMyData}>GetMyData</button>
          </TitleContainer>
        </>
      )}
      {sessionError && (
        <TitleContainer>
          <text>Something went wrong</text>
        </TitleContainer>
      )}
      {/* <PickerContainer>
        <PlaylistPicker
          items={playlists}§
          onChange={handlePlaylistSelected}
          placeholder="Choose a playlist"
        />
      </PickerContainer> */}
    </Container>
  )
}

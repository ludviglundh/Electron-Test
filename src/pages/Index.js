/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setAccessToken, setIsAuthenticated } from '../features/auth/authSlice'
import {
  setActivePlaylist,
  saveUserPlaylists,
} from '../features/playlist/playlistSlice'
import PlaylistPicker from '../components/Dropdown'
import { APP_NAME } from '../features/app/constants'

import hash from '../services/hash'
import { createURLParams } from '../utils/apiUtils'

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100%;
  flex-direction: column;
`

const TitleContainer = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
`

const Title = styled.text`
  color: ${(props) => props.theme.text.primary};
  font-size: 39px;
`

const TrackName = styled.text`
  flex-grow: 1;
  text-align: center;
  margin-top: 20px;
  color: ${(props) => props.theme.text.secondary};
`

const PickerContainer = styled.div`
  height: 100%;
  align-items: center;
  background-color: black;
`

const LoginContainer = styled.div`
  display: flex;
  margin-top: 20%;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
`
const Login = styled.a`
  font-size: 20px;
  color: ${(props) => props.theme.text.secondary};
  text-decoration: none;
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
  const playlists = useSelector((state) => state.playlist)
  const state = useSelector((state) => state)

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
        'Content-Type:': 'application/json',
      })
        .then((response) => {
          if (response.status !== 200) return null
          return response.json()
        })
        .then((result) => {
          if (!result) return
          setCurrentTrack(
            `${result?.item?.name} - ${result?.item?.artists[0]?.name}`,
          )
          setCurrentTrackUri(result?.item.uri)
        })
    } catch (err) {
      console.log('err', err)
      setCurrentTrack('An error occured')
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getMyData() {
    if (playlists.savedPlaylists.length > 0) return
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
          if (response.status !== 200) return null
          return response.json()
        })
        .then((result) => {
          if (result?.items) {
            dispatch(saveUserPlaylists(result.items))
          }
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  function handleAddCurentSongToPlaylist() {
    if (!playlists.selectedPlaylist) return
    const playlistId = playlists.selectedPlaylist
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
          if (response.status !== 200) return null
          return response.json()
        })
        .then((result) => {
          console.log('add track to playlist result', result)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    const token = hash?.access_token
    if (token) {
      setShowLogin(false)
      dispatch(setAccessToken(token))
      dispatch(setIsAuthenticated(true))

      getCurrentPlayingSong()
      getMyData()
      if (playlists?.savedPlaylists) {
        if (playlists.selectedPlaylist) {
          dispatch(setActivePlaylist(playlists?.selectedPlaylist))
        } else {
          dispatch(setActivePlaylist(playlists?.savedPlaylists[0]?.id))
        }
      }
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
  }, [
    auth.access_token,
    dispatch,
    getCurrentPlayingSong,
    getMyData,
    playlists,
    state,
  ])

  function handlePlaylistPicked(playlist) {
    try {
      dispatch(setActivePlaylist(playlist))
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
        <Title>{APP_NAME}</Title>
      </TitleContainer>
      {showLogin && !sessionError && (
        <LoginContainer>
          <Login href={url}>Login to Spotify</Login>
        </LoginContainer>
      )}
      {!showLogin && !sessionError && (
        <>
          {!currentTrack && (
            <TitleContainer>
              <TrackName>Play a song on spotify to continue</TrackName>
            </TitleContainer>
          )}
          {currentTrack && (
            <>
              <TitleContainer>
                <TrackName>{currentTrack}</TrackName>
              </TitleContainer>
              <TitleContainer>
                <button onClick={handleAddCurentSongToPlaylist}>
                  Add current song to your chosen playlist
                </button>
              </TitleContainer>
            </>
          )}
          <PickerContainer>
            <PlaylistPicker
              items={playlists.savedPlaylists}
              onChange={({ value }) => {
                handlePlaylistPicked(value)
              }}
              placeholder="Choose a playlist"
            />
          </PickerContainer>
        </>
      )}
      {sessionError && (
        <TitleContainer>
          <text>Something went wrong</text>
        </TitleContainer>
      )}
    </Container>
  )
}

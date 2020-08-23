import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { COLORS } from '../utils/colorUtils'
import PlaylistPicker from '../components/Dropdown'
import changeSelectedPlaylist from '../features/playlist/playlistSlice'

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
  const [hashParams, setHashParams] = useState(null)
  const [data, setData] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [currentTrackUri, setCurrentTrackUri] = useState(null)
  const BASE_URL = 'https://api.spotify.com/v1'

  const dispatch = useDispatch()
  function handlePlaylistSelected(playlist) {
    dispatch(changeSelectedPlaylist(playlist.label))
  }

  function makeRequest(requestData, type) {
    try {
      let data
      fetch(requestData.url, {
        method: type,
        headers: {
          Authorization: 'Bearer ' + hashParams.access_token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('result', result)
          setData(data)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  async function getCurrentPlayingSong() {
    const requestData = {
      url: `${BASE_URL}/me/player/currently-playing`,
    }
    console.log('hashParams', hashParams)
    if (!hashParams?.access_token) {
      setSessionError(true)
    }

    try {
      fetch(requestData.url, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + hashParams.access_token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('result', result)
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

  function handleAddCurentSongToPlaylist() {
    const playlistId = '5LhDuj8sHVyR6H2k2RESCv'

    const requestData = {
      url: `${BASE_URL}/playlists/${playlistId}/tracks`,
    }

    const body = {
      uris: [
        {
          currentTrackUri,
        },
      ],
    }

    console.log('body', body)
    try {
      fetch(requestData.url + `?uris=${currentTrackUri}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + hashParams.access_token,
        },
        'Content-Type': 'application/json',
      })
        .then((res) => res.json())
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
          Authorization: 'Bearer ' + hashParams.access_token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log('result', result)
        })
    } catch (err) {
      console.log('err', err)
    }
  }

  const statex = useSelector((state) => state)

  useEffect(() => {
    console.log('state', statex)
  }, [statex])

  useEffect(() => {
    function getHashParams() {
      let hashParams = {}
      let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1)
      e = r.exec(q)
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2])
        e = r.exec(q)
      }
      setHashParams(hashParams)
    }

    getHashParams()
  }, [])

  useEffect(() => {
    console.log('hashParams', hashParams)
    if (!hashParams?.access_token) {
      setSessionError(true)
    }
    setSessionError(false)
    if (sessionError) return

    getCurrentPlayingSong()
  }, [getCurrentPlayingSong, hashParams, sessionError])

  return (
    <Container>
      <TitleContainer>
        <Title>Quickify</Title>
      </TitleContainer>
      {sessionError && (
        <TitleContainer>
          <a href="http://localhost:8888">Login to Spotify</a>
        </TitleContainer>
      )}
      {!sessionError && (
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

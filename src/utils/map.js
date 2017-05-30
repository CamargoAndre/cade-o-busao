import GMaps from '../assets/js/gmaps'
import mapStyle from '../assets/js/mapStyle'

import user from '../assets/img/user.png'
import bus from '../assets/img/bus-icon.png'
import busStop from '../assets/img/bus-stop.png'
import busAccessible from '../assets/img/bus-icon-accessible.png'
import flagStart from '../assets/img/flag-start.png'
import flagFinish from '../assets/img/flag-finish.png'

import { store } from '../store'
import { updateGeolocation } from '../actions'
import { geolocation } from './'

const markerIcons = {
  user,
  bus,
  busStop,
  busAccessible,
  flagStart,
  flagFinish
}

export function buildMap (lat, lng, zoom=13) {
  window.map = new GMaps({
    div: '#map',
    lat: Number(lat),
    lng: Number(lng),
    styles: mapStyle,
    disableDefaultUI: true,
    zoom
  })
}

export function buildMarkers (markers, remove=false) {
  if (markers.length) {
    if (remove) {
      window.map.removeMarkers()
    }
    markers.forEach(marker => {
      window.map.addMarker({
        lat: Number(marker.lat),
        lng: Number(marker.lng),
        icon: markerIcons[marker.icon]
      })
    })
  }
}

export function buildPolyline (path) {
  if (path.length) {
    window.map.removePolylines()
    const middle = Math.round(path.length / 2)
    window.map.setCenter(path[middle][0], path[middle][1])
    window.map.drawPolyline({
      path,
      strokeColor: '#00bcd4',
      strokeOpacity: 0.6,
      strokeWeight: 5
    })
  }
}

export async function centerMap () {
  const pos = store.getState().userState.geolocation
  window.map.setCenter(pos.lat, pos.lng, () => {
    geolocation().then(geo => {
      if (geo.coords.latitude !== pos.lat && geo.coords.longitude !== pos.lng) {
        store.dispatch(updateGeolocation({
          lat: geo.coords.latitude,
          lng: geo.coords.longitude
        }))
        centerMap()
      }
    })
  })
}
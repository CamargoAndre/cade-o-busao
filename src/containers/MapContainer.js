import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map } from '../components'
import { updateMap } from '../actions'

class MapContainer extends Component {

  componentDidMount () {
    window.addEventListener('resize', () => this.updateMapHeight())
    this.updateMapHeight()    
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => this.updateMapHeight())
  }

  updateMapHeight () {
    this.props.updateMap({ mapHeight: window.innerHeight })
  }

  render () {
    return (
      <Map
        height={this.props.mapState.mapHeight}
        lat={this.props.mapState.lat}
        lng={this.props.mapState.lng}
        markers={this.props.mapState.markers}
        polyline={this.props.mapState.polyline}
      />
    )
  }
}

const mapStateToProps = state => ({
  mapState: state.mapState
})

const mapDispatchToProps = dispatch => ({
  updateMap: payload => dispatch(updateMap(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
import KeenClient from './keenClient'
import UserAgent from './userAgent'
import URI from 'urijs'

module.exports = {
  recordPageView (callback) {
    var {
      host, protocol, href, pathname
    } = window.location

    var url = { host, protocol, href, pathname }
    var referrer = document.referrer
    var userAgent = UserAgent.getResult()

    this._recordEvent('pageViews', { url, referrer, userAgent }, callback)
  },

  _recordEvent (eventName, event, callback) {
    event.sessionId = this.getSessionId()
    event.referrer = URI.parseQuery(window.location.search).referrer || null

    KeenClient.addEvent(eventName, event, callback)
  },

  getSessionId () {
    var sessionId = localStorage.sessionId

    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(7)
      localStorage.sessionId = sessionId
    }

    return sessionId
  }
}

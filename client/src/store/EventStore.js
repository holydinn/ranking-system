import {makeAutoObservable} from "mobx";

export default class EventStore {
  constructor() {
    this._events = []
    this._experts = []
    this._alternatives = []
    makeAutoObservable(this)
  }

  setEvents(events) {
    this._events = events
  }

  setExperts(experts) {
    this._experts = experts
  }

  setAlternatives(alternatives) {
    this._alternatives = alternatives
  }

  get events() {
    return this._events
  }

  get experts() {
    return this._experts
  }

  get alternatives() {
    return this._alternatives
  }
}
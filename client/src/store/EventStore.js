import {makeAutoObservable} from "mobx";

export default class EventStore{
  constructor() {
    this._events=[
      {id: 1, name:"event1"},
      {id: 2, name:"event2"}
    ]
    this._experts=[
      {id: 1, name:"exp1",eventId:1},
      {id: 2, name:"exp2",eventId:1},
      {id: 3, name:"exp1",eventId:2},
      {id: 4, name:"exp2",eventId:2}
    ]
    this._alternatives=[
      {id: 1, name:"alt1",eventId:1},
      {id: 2, name:"alt2",eventId:1},
      {id: 3, name:"alt1",eventId:2},
      {id: 4, name:"alt1",eventId:2}
    ]
    makeAutoObservable(this)
  }

  setEvents(events){
    this._events=events
  }
  setExperts(experts){
    this._experts=experts
  }
  setAlternatives(alternatives){
    this._alternatives=alternatives
  }

  get events(){
    return this._events
  }
  get experts(){
    return this._experts
  }
  get alternatives(){
    return this._alternatives
  }
}
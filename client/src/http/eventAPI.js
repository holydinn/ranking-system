import {$authHost} from "./index.js";

export const createEvent = async (event) => {
  const {data} = await $authHost.post('api/event', event)
  return data
}

export const fetchEvents = async (adminId) => {
  const {data} = await $authHost.get('api/event',{params:{
    adminId
    }})
  return data
}

export const fetchOneEvent = async (adminId,id) => {
  const {data} = await $authHost.get('api/event/' +id,{params:{
      adminId
    }})

  return data
}
export const createExpert = async (expert) => {
  const {data} = await $authHost.post('api/expert', expert)
  return data
}

export const fetchExperts = async () => {
  const {data} = await $authHost.get('api/expert')
  return data
}
export const createAlternative = async (alternative) => {
  const {data} = await $authHost.post('api/alternative', alternative)
  return data
}

export const fetchAlternatives = async () => {
  const {data} = await $authHost.get('api/alternative')
  return data
}
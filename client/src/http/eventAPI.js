import {$authHost, $host} from "./index.js";

export const createEvent = async (event) => {
  const {data} = await $authHost.post('api/event', event)
  return data
}

export const fetchEvents = async (adminId) => {
  const {data} = await $authHost.get('api/event', {
    params: {
      adminId
    }
  })
  return data
}

export const fetchOneEvent = async (adminId, id) => {
  const {data} = await $authHost.get('api/event/' + id, {
    params: {
      adminId
    }
  })
  return data
}

export const fetchEventByExpertId = async (expertId) => {
  const {data} = await $host.get('api/event/vote/' + expertId)
  return data
}

export const deleteOneEvent = async (adminId, id) => {
  const {data} = await $authHost.delete('api/event/' + id, {
    params: {
      adminId
    }
  })
  return data
}

export const createExpert = async (expert) => {
  const {data} = await $authHost.post('api/expert', expert)
  return data
}

export const deleteExpert = async (eventId) => {
  const {data} = await $authHost.delete('api/expert', {params: {eventId}})
  return data
}

export const fetchExperts = async (eventId) => {
  const {data} = await $authHost.get('api/expert', {params: {eventId}})
  return data
}
export const fetchOneExpert = async (id) => {
  const {data} = await $authHost.get('api/expert/' + id)
  return data
}
export const fetchOneExpertForVote = async (id) => {
  const {data} = await $host.get('api/expert/' + id)
  return data
}
export const updateExpertAuth = async (id, ranking) => {
  const {data} = await $authHost.patch('api/expert/' + id, ranking)
  return data
}
export const updateExpert = async (id, ranking) => {
  const {data} = await $host.patch('api/expert/' + id, ranking)
  return data
}

export const createAlternative = async (alternative) => {
  const {data} = await $authHost.post('api/alternative', alternative)
  return data
}

export const fetchAlternatives = async (eventId) => {
  const {data} = await $authHost.get('api/alternative', {params: {eventId}})
  return data
}
export const fetchAlternativesForVote = async (eventId) => {
  const {data} = await $host.get('api/alternative', {params: {eventId}})
  return data
}

export const deleteAlternatives = async (eventId) => {
  const {data} = await $authHost.delete('api/alternative', {params: {eventId}})
  return data
}
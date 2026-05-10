import { apiFetch } from '~~/server/utils/api'
export default defineEventHandler(async (event) => apiFetch(event, '/games/'))

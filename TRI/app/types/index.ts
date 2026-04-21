export interface User {
  id: number
  username: string
  email: string
  is_admin: boolean
  created_at: string
}

export interface Item {
  id: number
  name: string
  about: string
  characteristics: string
  creators_name: string
  created_at: string
}

export interface Location {
  id: number
  name: string
  about: string
  creators_name: string
  rules: string
  items_name: string[]
  created_at: string
}

export interface Character {
  id: number
  name: string
  about: string
  characteristics: string
  owners_name: string
  location_name: string
  status: string
  created_at: string
  updated_at: string
}

export interface Game {
  id: number
  title: string
  about: string
  rules: string
  status: 'active' | 'paused' | 'ended' | 'abandoned' | 'pending'
  max_players: number
  players_name: string[]
  characters_name: string[]
  locations_name: string[]
  invite_code: string
  created_at: string
}

export interface GameParticipant {
  id: number
  game_title: string
  player_username: string
  role: 'gm' | 'moderator' | 'player' | 'spectator'
  joined_at: string
}

export interface Post {
  id: number
  game_title: string
  user_username: string
  character_name: string
  content: string
  reply_to_id: number | null
  created_at: string
  updated_at: string
}

export interface Notification {
  id: number
  user_username: string
  post_id: number | null
  title: string
  content: string
  character_name: string
  game_title: string
  type: string
  is_read: boolean
  created_at: string
  expires_at: string
}

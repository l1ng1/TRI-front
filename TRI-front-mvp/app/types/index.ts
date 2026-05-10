export interface User {
  id: number
  username: string
  about: string
  avatar: string | null
  is_admin: boolean
  created_at: string
}

export interface Item {
  id: number
  name: string
  about: string
  characteristics: string
  creators_name: string | null
  created_at: string
}

export interface Location {
  id: number
  name: string
  about: string
  creators_name: string | null
  rules: string
  items_name: string[]
  created_at: string
}

export interface Character {
  id: number
  name: string
  about: string
  characteristics: string
  strength: number
  owners_name: string | null
  location_name: string | null
  status: string
  created_at: string
  updated_at: string
}

export type GameStatus = 'active' | 'paused' | 'ended' | 'abandoned' | 'pending'

export interface Game {
  id: number
  title: string
  about: string
  rules: string
  status: GameStatus
  max_players: number
  participants_count: number
  invite_code: string
  created_at: string
}

export type ParticipantRole = 'gm' | 'moderator' | 'player' | 'spectator'

export interface GameParticipant {
  id: number
  user_id: number
  username: string
  role: ParticipantRole
  character_id: number | null
  character_name: string | null
  character_strength: number | null
  joined_at: string
}

export interface GameDetail {
  id: number
  title: string
  about: string
  rules: string
  status: GameStatus
  max_players: number
  invite_code: string
  is_master: boolean
  participants: GameParticipant[]
  created_at: string
}

export type PostKind = 'chat' | 'event' | 'action' | 'system'

export interface ActionData {
  target_kind: 'npc' | 'character'
  target_name: string
  target_strength: number
  target_id?: number
  actor_strength: number
  success: boolean
}

export interface EventData {
  npc?: {
    name: string
    strength: number
  }
}

export interface Post {
  id: number
  kind: PostKind
  content: string
  user_id: number | null
  user_username: string | null
  character_id: number | null
  character_name: string | null
  character_strength: number | null
  action_data: ActionData | null
  event_data: EventData | null
  created_at: string
}

export interface Notification {
  id: number
  user_username: string
  post_id: number | null
  title: string
  content: string
  character_name: string | null
  game_title: string
  type: string
  is_read: boolean
  created_at: string
  expires_at: string
}

// ===== WebSocket события =====

// от клиента к серверу
export type WSOutgoing =
  | { type: 'chat';    content: string; character_id: number }
  | { type: 'action';  content: string; character_id: number;
      target?:
        | { kind: 'npc'; name: string; strength: number }
        | { kind: 'character'; id: number } }
  | { type: 'event';   content: string;
      npc?: { name: string; strength: number } }
  | { type: 'end_game' }

// от сервера к клиенту
export type WSIncoming =
  | { type: 'post.new';     post: Post }
  | { type: 'user.joined';  username: string; user_id: number }
  | { type: 'user.left';    username: string; user_id: number }
  | { type: 'game.ended';   ended_by: string }
  | { type: 'error';        message: string }

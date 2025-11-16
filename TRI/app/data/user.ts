import type {Genre} from "./genres"
import type { Game } from "./games"
import { GAME_GENRES } from "./genres"
import { GAMES } from "./games"

export interface User {
    userId: number,
    userIcon: string
    userName: string,
    userEmail: string,
    userType: string,
    userDesc: string,
    userFavGenres: Genre[],
    userUnfavGenres: Genre[],
    userFavGames: Game[],
    userCharList: Array<string>
}

export const UserExample: User = {
    userId: 0,
    userName: 'Example',
    userIcon: 'https://i.pinimg.com/736x/04/91/fc/0491fc12a230f0013e3e563be70ac725.jpg',
    userEmail: 'example@mail.com',
    userType: 'manual',
    userDesc: 'example',
    userFavGenres: GAME_GENRES,
    userUnfavGenres: GAME_GENRES,
    userFavGames: GAMES,
    userCharList: ['https://action-figure.ru/wp-content/uploads/2023/05/Figurka-statuetka-Dovakin-The-Elder-Scrolls-V-Skyrim-Dovahkiin-Pop-Up-Parade-ot-Good-Smile-Company-GSC0071.png', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo1y6D0SXycGzllo7u_Nds-Ig51YzVmKRorQ&s',
        'https://www.zbrushcentral.com/uploads/default/original/4X/f/c/e/fce2b42a54e45a618b8b8add7943abce88ab5dfc.jpeg']
}
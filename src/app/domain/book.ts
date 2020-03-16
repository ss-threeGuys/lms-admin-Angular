import {Author} from './author'
import {Genre} from './genre'
import {Publisher} from './publisher'
export interface Book {
    _id?
    title?
    authors?: Author[]
    genres?: Genre[]
    publisher? : Publisher
    
    
}

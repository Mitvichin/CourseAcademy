import { Rating } from "./Rating";

export interface Course {
    id:number,
    title: string,
    description: string,
    rating:number,
    userIDs: number[],
    ratings: Rating[]
}
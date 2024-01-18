import { GameScreenshotProps } from "@/Types/Game"

export function randomBackground(screenshots: GameScreenshotProps[]){
    const background = screenshots?.map((screenshot) => screenshot.url)
    if(background){
        return `http:${background[Math.floor(Math.random() * background.length)].replace('t_thumb', 't_1080p')}`
    }
    return ""
}
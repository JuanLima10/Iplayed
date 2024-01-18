export function convertImgToHd(img?: string){
  if(img){
    return `https:${img.replace('t_thumb', 't_1080p')}`
  }
  return `/img-not-found.png`
}
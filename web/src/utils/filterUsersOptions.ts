import { GameProps } from '@/Types/Game'

export function filterUserOptions(userOptions: GameProps[], profileData: number){
  const data = [profileData]
  const result = userOptions.map((item: GameProps) => item.id).filter(categoria => data.filter(produto => produto === categoria).length)
  return result.length > 0 ? true : false
}
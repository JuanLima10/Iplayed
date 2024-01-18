export function concatArray(items: any){
  let memory: any = { game: [], data: [] }

  items.map((item: any) => {
    if (item.slug && !memory.game.includes(item.slug)) {
      memory.game.push(item.slug)
      const group = items.filter((g: any) => g.slug === item.slug)
      memory.data.push({ slug: item.slug, data: group })
    }
  })
  return memory.data
}
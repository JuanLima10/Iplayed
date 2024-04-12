'use client'
import { ConfigProvider, Rate } from "antd"

import { RatingProps } from "@/Types/Form"
import { postGame } from "@/lib/fetch/game"

export function RatingForm(props: RatingProps) {
  async function handleStar(value: any) {
    const data = {
      rating: value,
    }
    const rating = await postGame(props.slug, data)
    return rating
  }

  return (
    <button>
      <ConfigProvider theme={{
        token: { colorFillContent: "#ffffff50", marginXS: 0.3 }
      }}>
        <Rate
          className="w-[162px] text-xl text-yellow-500 mt-1"
          count={5}
          defaultValue={Number(props.value)}
          onChange={(value: number) => handleStar(value)}
          allowHalf
        />
      </ConfigProvider>
    </button>
  )
}
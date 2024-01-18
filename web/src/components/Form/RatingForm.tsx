import { RatingProps } from "@/Types/Form"
import { api } from "@/lib/api"
import { headers } from "@/lib/header"
import { ConfigProvider, Rate } from "antd"

export function RatingForm(props: RatingProps) {
  async function handleStar(value: any) {
    const data = {
      rating: value,
    }
    const rating = await api.post(`/game/${props.slug}`, data, headers)
      .then(response => response.data)
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
'use client'
import { StarProps } from '@/Types/Stars';
import { ConfigProvider, Rate } from 'antd';
import { clsx } from 'clsx';

export function Stars(props: StarProps) {
  return (
    <ConfigProvider theme={{
      token: { colorFillContent: "#ffffff50", marginXS: 0.3 }
    }}>
      <Rate
        className={(clsx("w-[105px] text-yellow-500 mt-1 responsive:w-[52px] responsive:text-xs", {
          "text-xs": props.small === true,
          "text-md": props.small === false,
        }))}
        defaultValue={props.value}
        disabled={props.disabled}
        count={5}
        allowHalf
      />
    </ConfigProvider>
  )
}
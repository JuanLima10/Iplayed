'use client'
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';

export function TabsTrigger(props: Tabs.TabsTriggerProps) {
  const router = useRouter()
  return (
    <Tabs.Trigger className={props.className} value={props.value}>
      {props.children}
    </Tabs.Trigger>
  )
}
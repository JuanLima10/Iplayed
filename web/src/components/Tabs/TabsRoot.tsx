'use client'
import * as Tabs from '@radix-ui/react-tabs';

export function TabsRoot(props: Tabs.TabsProps) {
  return (
    <Tabs.Root className={props.className} defaultValue={props.defaultValue}>
      {props.children}
    </Tabs.Root>
  )
}
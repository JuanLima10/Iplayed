'use client'
import * as Tabs from '@radix-ui/react-tabs';


export function TabsList(props: Tabs.TabsListProps) {
  return (
    <Tabs.List className={props.className}>
        {props.children}
    </Tabs.List>
  )
}
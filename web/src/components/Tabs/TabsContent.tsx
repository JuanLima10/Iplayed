'use client'
import * as Tabs from '@radix-ui/react-tabs';

export function TabsContent(props: Tabs.TabsContentProps) {
  return (
    <Tabs.Content className={props.className} value={props.value}>
        {props.children}
    </Tabs.Content>
  )
}
'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/common/utils/cn.util'
import { useSwipe } from '@/src/hooks/swipe.hook'

const TabsValueContext = React.createContext<string | null>(null)

type TabsTriggerElement = React.ReactElement<
  React.ComponentProps<typeof TabsPrimitive.Trigger>
>
type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
  values?: string[]
}

function Tabs({
  className,
  orientation = 'horizontal',
  value: controlledValue,
  defaultValue,
  onValueChange,
  values = [],
  ...props
}: TabsProps) {
  const [value, setValue] = React.useState(defaultValue ?? values[0])
  const currentValue = controlledValue ?? value

  const swipe = useSwipe((dir) => {
    if (!currentValue) return

    const index = values.indexOf(currentValue)
    if (index === -1) return

    const next = dir === 'left' ? values[index + 1] : values[index - 1]

    if (next) {
      setValue(next)
      onValueChange?.(next)
    }
  })

  return (
    <TabsValueContext.Provider value={currentValue ?? null}>
      <TabsPrimitive.Root
        value={currentValue}
        onValueChange={(v) => {
          setValue(v)
          onValueChange?.(v)
        }}
        data-orientation={orientation}
        {...swipe}
        className={cn(
          'group/tabs flex touch-pan-y gap-2 data-horizontal:flex-col',
          className
        )}
        {...props}
      />
    </TabsValueContext.Provider>
  )
}

const tabsListVariants = cva(
  `relative inline-flex w-fit items-center gap-8 text-muted-foreground data-[variant=line]:rounded-none`,
  {
    variants: {
      variant: {
        default: 'rounded-lg bg-muted p-0.5',
        line: 'w-full border-b border-border bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function TabsList({
  className,
  variant = 'default',
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const activeValue = React.useContext(TabsValueContext)

  const [style, setStyle] = React.useState({ left: 0, width: 0 })
  const refs = React.useRef<Record<string, HTMLButtonElement | null>>({})

  React.useEffect(() => {
    if (!activeValue) return
    const el = refs.current[activeValue]
    if (!el) return

    setStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    })
  }, [activeValue])

  return (
    <TabsPrimitive.List
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
      suppressHydrationWarning
    >
      {variant === 'line' && (
        <span
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={{ left: style.left, width: style.width }}
        />
      )}

      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        const element = child as TabsTriggerElement
        const value = element.props.value

        if (!value) return element

        return React.cloneElement(element, {
          ref: (node: HTMLButtonElement | null) => {
            refs.current[value] = node
          },
        })
      })}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        `relative inline-flex cursor-pointer items-center justify-center px-1 pb-4 text-sm font-semibold tracking-wide text-foreground/60 uppercase transition-colors hover:text-foreground data-active:text-primary`,
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 text-sm outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger }

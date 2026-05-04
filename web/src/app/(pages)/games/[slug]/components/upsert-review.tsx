'use client'

import {
  GameStatusProgress,
  IGameStatus,
  StatusProgressColor,
  StatusProgressIcon,
  StatusProgressLabel,
} from '@/common/interfaces/game-status.interface'

import { IGame } from '@/common/interfaces/game.interface'
import { ReviewCreate, ReviewSchema } from '@/common/schemas/review.schema'
import { normalizeDefaults } from '@/common/utils/default-normalize.util'
import { Button } from '@/src/components/ui/button'
import { DatePicker } from '@/src/components/ui/date-picker'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/components/ui/drawer'
import { HeartToggle } from '@/src/components/ui/heart-toggle'
import { Label } from '@/src/components/ui/label'
import { Slider } from '@/src/components/ui/slider'
import { Stars } from '@/src/components/ui/stars'
import { Textarea } from '@/src/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/src/components/ui/toggle-group'
import { useUpsertReview } from '@/src/hooks/review.hook'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export function UpsertReview(props: { game: IGame; status?: IGameStatus }) {
  const {
    status: defaultValues,
    game: { slug, title },
  } = props
  const text = defaultValues?.review?.text

  const [open, setOpen] = useState(false)
  const { upsert, isPending } = useUpsertReview()

  const { handleSubmit, control, watch } = useForm<ReviewCreate>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { slug, text, ...normalizeDefaults(defaultValues) },
    mode: 'onSubmit',
  })

  async function onSubmit(body: ReviewCreate) {
    await upsert(body)
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button className="min-w-full" size="md">
          <Star suppressHydrationWarning /> Rate/Review
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-h-full w-full max-w-xl space-y-2 p-5">
        <div className="mx-auto w-full overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Rate/Review</DrawerTitle>
            <DrawerDescription>{title}</DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
            <Controller
              name="status"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <ToggleGroup
                  label="status"
                  size="lg"
                  type="single"
                  variant="outline"
                  onValueChange={(val) => val && field.onChange(val)}
                  error={error?.message}
                  required
                  {...field}
                >
                  {Object.values(GameStatusProgress).map((status) => {
                    const Icon = StatusProgressIcon[status]
                    const label = StatusProgressLabel[status]
                    const color = StatusProgressColor[status]

                    return (
                      <ToggleGroupItem
                        className={color}
                        key={status}
                        value={status}
                      >
                        <Icon /> {label}
                      </ToggleGroupItem>
                    )
                  })}
                </ToggleGroup>
              )}
            />

            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <Label>Rating</Label>

                  <div className="flex items-center gap-2">
                    <Stars {...field} />
                    <Controller
                      name="isFavorite"
                      control={control}
                      render={({ field }) => <HeartToggle {...field} />}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {watch('rating') ?? 0} / 5
                  </span>
                </div>
              )}
            />

            <Controller
              name="progress"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <Slider label="Progress" error={error?.message} {...field} />
              )}
            />

            <Controller
              name="lastPlayedAt"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <DatePicker
                  label="Last played at"
                  placeholder="Pick the last played date"
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="text"
              control={control}
              render={({ fieldState: { error }, field }) => (
                <Textarea
                  label="Review"
                  placeholder={`What you think about ${title}?`}
                  error={error?.message}
                  {...field}
                />
              )}
            />

            <DrawerFooter className="px-0">
              <Button type="submit" size="md" loading={isPending}>
                Save
              </Button>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

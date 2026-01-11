'use client'

import { useCalendarStore } from '@/store/calendar-store'
import { useState, useEffect } from 'react'
import { parseISO, format } from 'date-fns'
import { ColorPicker } from './ColorPicker'
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'sintacks-design-system'
import { Button } from 'sintacks-design-system'
import { Input } from 'sintacks-design-system'
import { Label } from 'sintacks-design-system'
import { Textarea } from 'sintacks-design-system'
import { cn } from '@/lib/utils'

export function EventEditorModal() {
  const {
    isEventModalOpen,
    selectedEventId,
    closeEventModal,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendarStore()

  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    color: '#3b82f6',
    description: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const event = selectedEventId ? getEvent(selectedEventId) : null
  const isEditing = !!event

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        start: format(parseISO(event.start), "yyyy-MM-dd'T'HH:mm"),
        end: format(parseISO(event.end), "yyyy-MM-dd'T'HH:mm"),
        color: event.color,
        description: event.description || '',
      })
    } else {
      // Default to current time
      const now = new Date()
      const endTime = new Date(now.getTime() + 60 * 60 * 1000) // +1 hour
      setFormData({
        title: '',
        start: format(now, "yyyy-MM-dd'T'HH:mm"),
        end: format(endTime, "yyyy-MM-dd'T'HH:mm"),
        color: '#3b82f6',
        description: '',
      })
    }
    setErrors({})
  }, [event, isEventModalOpen])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.start) {
      newErrors.start = 'Start time is required'
    }

    if (!formData.end) {
      newErrors.end = 'End time is required'
    }

    if (formData.start && formData.end) {
      const startDate = new Date(formData.start)
      const endDate = new Date(formData.end)
      if (endDate <= startDate) {
        newErrors.end = 'End time must be after start time'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const eventData = {
      title: formData.title.trim(),
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      color: formData.color,
      description: formData.description.trim(),
    }

    if (isEditing && selectedEventId) {
      updateEvent(selectedEventId, eventData)
    } else {
      addEvent(eventData)
    }

    closeEventModal()
  }

  const handleDelete = () => {
    if (selectedEventId && confirm('Are you sure you want to delete this event?')) {
      deleteEvent(selectedEventId)
      closeEventModal()
    }
  }

  if (!isEventModalOpen) return null

  return (
    <Dialog open={isEventModalOpen} onOpenChange={closeEventModal}>
      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Event' : 'Create Event'}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
              className={cn(errors.title && 'border-destructive focus-visible:ring-destructive')}
              placeholder="Event title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Start & End Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">
                Start <span className="text-destructive">*</span>
              </Label>
              <Input
                type="datetime-local"
                id="start"
                value={formData.start}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, start: e.target.value })}
                className={cn(errors.start && 'border-destructive focus-visible:ring-destructive')}
              />
              {errors.start && (
                <p className="text-sm text-destructive">{errors.start}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="end">
                End <span className="text-destructive">*</span>
              </Label>
              <Input
                type="datetime-local"
                id="end"
                value={formData.end}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, end: e.target.value })}
                className={cn(errors.end && 'border-destructive focus-visible:ring-destructive')}
              />
              {errors.end && (
                <p className="text-sm text-destructive">{errors.end}</p>
              )}
            </div>
          </div>

          {/* Color Picker */}
          <ColorPicker
            value={formData.color}
            onChange={(color) => setFormData({ ...formData, color })}
          />

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Add a description..."
            />
          </div>

          {/* Actions */}
          <DialogFooter className="flex items-center justify-between pt-4 border-t">
            <div>
              {isEditing && (
                <Button
                  type="button"
                  onClick={handleDelete}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={closeEventModal}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
              >
                {isEditing ? 'Save Changes' : 'Create Event'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

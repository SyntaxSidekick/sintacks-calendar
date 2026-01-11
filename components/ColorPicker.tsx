'use client'

import { useState } from 'react'
import { EVENT_COLORS, getColorByValue } from '@/lib/colors'
import { EventColor } from '@/types/calendar'
import clsx from 'clsx'
import { Check } from 'lucide-react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value)
  const [showCustomPicker, setShowCustomPicker] = useState(false)

  const selectedColor = getColorByValue(value)

  const handleSwatchClick = (color: EventColor) => {
    onChange(color.value)
    setShowCustomPicker(false)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Event Color
      </label>

      {/* Color Swatches */}
      <div className="grid grid-cols-6 gap-2">
        {EVENT_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => handleSwatchClick(color)}
            className={clsx(
              'relative h-10 w-10 rounded-full border-2 transition-all hover:scale-110',
              selectedColor?.id === color.id
                ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                : 'border-gray-300 hover:border-gray-400'
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor?.id === color.id && (
              <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />
            )}
          </button>
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowCustomPicker(!showCustomPicker)}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          {showCustomPicker ? 'Hide' : 'Custom Color'}
        </button>

        {showCustomPicker && (
          <div className="mt-3 flex items-center gap-3">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="h-10 w-20 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
            />
            <div className="flex-1">
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value)
                  if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    onChange(e.target.value)
                  }
                }}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

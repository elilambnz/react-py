import React from 'react'
import clsx from 'clsx'

interface ControlProps {
  items: {
    label: string
    icon: any
    onClick: () => void
    disabled?: boolean
    hidden?: boolean
  }[]
}

export default function Controls(props: ControlProps) {
  const { items } = props
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div className="z-10 -mb-16 flex justify-end p-2">
      <div className="rounded-md bg-white p-1 opacity-80 shadow-md hover:opacity-100">
        <span className="isolate inline-flex rounded-md">
          {visibleItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={clsx(
                'relative inline-flex items-center border border-none border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-0',
                !item.disabled
                  ? 'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
                  : 'opacity-50',
                i === 0 && 'rounded-l-md',
                i === visibleItems.length - 1 && 'rounded-r-md'
              )}
            >
              <item.icon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {item.label}
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}

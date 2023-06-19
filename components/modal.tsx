'use client'
/**
 * from NextGram
 * https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
 */
import { useCallback, useRef, useEffect, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RiCloseLine } from 'react-icons/ri'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <>
      <div
        ref={overlay}
        className="fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen mx-auto overflow-hidden backdrop-blur-sm"
        onClick={onClick}
      />
      <div
        ref={wrapper}
        className="fixed z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:w-10/12 md:w-8/12 lg:w-1/2"
      >
        {children}
        <RiCloseLine
          className="absolute text-2xl text-white cursor-pointer top-4 right-4"
          onClick={onDismiss}
        />
      </div>
    </>
  )
}

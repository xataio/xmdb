'use client'
/**
 * Adapted from NextGram
 * https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
 */
import { useCallback, useRef, useEffect, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RiCloseLine as CloseIcon } from 'react-icons/ri'

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
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onKeyDown])

  return (
    <>
      <div
        ref={overlay}
        className="fixed md:py-6 top-0 left-0 right-0 z-10 w-screen h-screen backdrop-blur-sm"
        onClick={onClick}
      />
      <div
        ref={wrapper}
        className="fixed max-w-4xl rounded-lg bg-slate-900 z-20 md:-translate-x-1/2 md:-translate-y-1/2 md:top-1/2 md:left-1/2 sm:w-full md:w-10/12 lg:w-1/2 max-h-screen overscroll-contain overflow-y-auto"
      >
        <button
          onClick={onDismiss}
          className="absolute z-10 text-2xl text-white cursor-pointer top-4 right-4 focus:text-pink-400 focus:scale-110 focus:outline-0"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </>
  )
}

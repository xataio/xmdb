'use client'
/**
 * Adapted from NextGram
 * https://github.com/vercel-labs/nextgram/blob/main/components/modal/index.js
 */
import { useCallback, useRef, useEffect, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RiCloseLine as CloseIcon } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'

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

  const dropIn = {
    hidden: {
      opacity: 0,
      top: '45%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 1,
      transition: {
        duration: 1,
        type: 'spring',
      },
    },
    exit: {
      opacity: 0,
      top: '55%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 0.8,
    },
  }

  return (
    <div
      ref={overlay}
      className="fixed top-0 left-0 right-0 z-10 w-screen h-screen moveUp md:py-6 backdrop-blur-sm"
      onClick={onClick}
    >
      <AnimatePresence>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={wrapper}
          className="fixed z-20 w-full max-w-4xl max-h-screen overflow-y-auto rounded-lg bg-slate-900 sm:w-full md:w-10/12 lg:w-1/2 overscroll-contain"
        >
          <button
            onClick={onDismiss}
            className="absolute z-10 text-2xl text-white cursor-pointer top-4 right-4 focus:text-pink-400 focus:scale-110 focus:outline-0"
          >
            <CloseIcon />
          </button>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

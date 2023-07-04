import { motion } from 'framer-motion'

const tooltipYposition = 16

const tooltipVariants = {
  hidden: { translateY: -tooltipYposition, opacity: 0 },
  visible: {
    translateY: [0, -(tooltipYposition * 2), -(tooltipYposition * 3)],
    opacity: [0, 1, 0],
    transition: { duration: 4 },
  },
}

export const Tooltip = ({
  animate,
  votedRate,
}: {
  animate: boolean
  votedRate: number
}) => {
  return (
    <motion.div
      animate={animate ? 'visible' : 'hidden'}
      variants={tooltipVariants}
      id="tooltip-light"
      role="tooltip"
      className="absolute left-0 min-w-20 px-2 py-1 text-xs font-medium text-white -translate-y-1/2 bg-pink-500 rounded-lg shadow-sm whitespace-nowrap"
    >
      <p>You rated: {votedRate}</p>
    </motion.div>
  )
}

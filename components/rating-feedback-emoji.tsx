import { motion } from 'framer-motion'

const emojisVariants = (yPosition: number) => {
  return {
    hidden: { translateY: -yPosition, opacity: 0 },
    visible: {
      translateY: [0, -yPosition, -(yPosition * 2)],
      opacity: [0, 1, 0],
      transition: { duration: 2 },
    },
  }
}

export const RatingFeedbackEmoji = ({
  animate,
  yPosition,
  emoji,
  xPosition,
}: {
  animate: boolean
  yPosition: number
  emoji: string
  xPosition: 'left' | 'right' | 'center'
}) => {
  let xPositionObj = {}

  if (xPosition === 'left') {
    xPositionObj = { right: '0' }
  } else if (xPosition === 'right') {
    xPositionObj = { left: '0' }
  } else if (xPosition === 'center') {
    xPositionObj = { left: '50%', transform: 'translateX(-50%)' }
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...xPositionObj,
      }}
      animate={animate ? 'visible' : 'hidden'}
      variants={emojisVariants(yPosition)}
      initial="hidden"
    >
      {emoji}
    </motion.div>
  )
}

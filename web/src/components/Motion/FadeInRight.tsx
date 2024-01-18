import { MotionProps, motion } from 'framer-motion';

export function FadeInRightDiv(props: MotionProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.02, duration: 0.8 }}
      viewport={{ once: true }}
    >
      {props.children}
    </motion.div>
  )
}
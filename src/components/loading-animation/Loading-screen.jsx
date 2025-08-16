
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Generate random positions for floating elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black to-purple-950 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Floating background elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
          }}
        />
      ))}

      {/* Central content */}
      <div className="w-full max-w-md px-4 relative z-10">
        {/* Rotating logo */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 relative"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-l-4 border-r-4 border-blue-500"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Text with staggered animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <motion.h1
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% auto" }}
          >
            Welcome
          </motion.h1>
          <motion.div className="overflow-hidden">
            <motion.p
              className="text-gray-300"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              This may take few times...
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Advanced progress bar */}
        <div className="relative h-3 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "linear",
            }}
          />
        </div>

        {/* Percentage counter with animation */}
        <motion.p
          className="text-white text-center font-mono text-lg"
          animate={{
            scale: progress === 100 ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            key={progress}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {progress}%
          </motion.span>
        </motion.p>

        {/* Animated dots with glow */}
        <div className="flex justify-center mt-8 space-x-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{
                y: [0, -15, 0],
                boxShadow: [
                  "0 0 5px 2px rgba(79, 70, 229, 0.3)",
                  "0 0 20px 5px rgba(79, 70, 229, 0.6)",
                  "0 0 5px 2px rgba(79, 70, 229, 0.3)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
            />
          ))}
        </div>
      </div>
    </div>
  )
}


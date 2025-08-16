import { useEffect, useRef, useState } from "react"

const technicalSkills = [
  { name: "MongoDB", logo: "/mongodb-logo.png" },
  { name: "React", logo: "/react-logo.png" },
  { name: "Express", logo: "/expressjs-logo.png" },
  { name: "Node.js", logo: "/nodejs-logo.png" },
  { name: "Next.js", logo: "/nextjs-logo.png" },
  { name: "Git", logo: "/git-logo.png" },
  { name: "GitHub", logo: "/github-logo.png" },
  { name: "Socket.io", logo: "/socketio-logo.png" },
  { name: "TypeScript", logo: "/typescript-logo.png" },
  { name: "Tailwind CSS", logo: "/tailwind-css-logo.png" },
]

const CircularIcon = ({
  skill,
  index,
  hoveredIndex,
  setHoveredIndex,
  isDragging,
  setIsDragging,
  customAngles,
  setCustomAngles,
}) => {
  const isHovered = hoveredIndex === index
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
  const isBeingDragged = isDragging === index
  const isAnyDragging = isDragging !== null

  const baseAngle = customAngles[index] !== undefined ? customAngles[index] : (index * 360) / technicalSkills.length
  const radius = 160

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(index)
    setHoveredIndex(null)
  }

  const handleMouseMove = (e) => {
    if (isDragging === index) {
      const container = document.querySelector(".skills-container")
      if (container) {
        const rect = container.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY

        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
        if (angle < 0) angle += 360

        const newAngles = [...customAngles]
        newAngles[index] = angle
        setCustomAngles(newAngles)
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging === index) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, index])

  return (
    <div
      className={`absolute w-16 h-16 cursor-pointer transition-all duration-500 ${
        isOtherHovered && !isAnyDragging ? "blur-sm opacity-50" : ""
      } ${isBeingDragged ? "cursor-grabbing z-50" : "cursor-grab"}`}
      style={{
        left: "50%",
        top: "50%",
        transformOrigin: "50% 50%",
        transform: `
          translate(-50%, -50%)
          rotate(${baseAngle}deg) 
          translateY(-${radius}px) 
          rotate(-${baseAngle}deg)
          ${isHovered && !isAnyDragging ? "scale(1.6)" : "scale(1)"}
          ${isBeingDragged ? "scale(1.2)" : ""}
        `,
        zIndex: isHovered || isBeingDragged ? 50 : 10,
        ...(isHovered || isBeingDragged
          ? {
              animationName: "orbit",
              animationDuration: "20s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${index * -2}s`,
              animationPlayState: "paused",
            }
          : {
              animationName: "orbit",
              animationDuration: "20s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${index * -2}s`,
              animationPlayState: "running",
            }),
      }}
      onMouseEnter={() => !isAnyDragging && setHoveredIndex(index)}
      onMouseLeave={() => !isAnyDragging && setHoveredIndex(null)}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-500 shadow-lg ${
          isHovered && !isAnyDragging
            ? "bg-white/15 border-purple-400/50 shadow-2xl shadow-purple-400/30 ring-2 ring-purple-400/20"
            : isBeingDragged
              ? "bg-white/20 border-cyan-400/60 shadow-2xl shadow-cyan-400/40 ring-2 ring-cyan-400/30"
              : "hover:bg-white/10 hover:border-white/20 hover:shadow-white/10"
        }`}
      >
        <img
          src={skill.logo || "/placeholder.svg"}
          alt={`${skill.name} logo`}
          className={`object-contain transition-all duration-500 ${
            isHovered && !isAnyDragging ? "w-10 h-10" : "w-8 h-8"
          }`}
          draggable={false}
        />
      </div>

      <div
        className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none ${
          isHovered && !isAnyDragging ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl border border-purple-400/30 ring-1 ring-purple-400/20">
          {skill.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
        </div>
      </div>

      {isBeingDragged && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-cyan-300 font-medium bg-cyan-900/90 px-2 py-1 rounded border border-cyan-400/30">
          Dragging...
        </div>
      )}
    </div>
  )
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(null)
  const [customAngles, setCustomAngles] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      

      <div className="flex justify-center">
        <div className="skills-container relative w-full max-w-2xl h-[80vh] bg-transparent backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl shadow-purple-900/20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-dashed border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-dashed border-white/35 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {isVisible &&
            technicalSkills.map((skill, index) => (
              <CircularIcon
                key={skill.name}
                skill={skill}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                customAngles={customAngles}
                setCustomAngles={setCustomAngles}
              />
            ))}

           <div className="text-center mt-8">
        <p className="text-sm text-gray-300 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 inline-block">
          {isDragging !== null ? "Release to place" : " • I can work with these •"}
        </p>
      </div> 
        </div>
      </div>

    </section>
  )
}
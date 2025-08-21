import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

export default function ScrollTriggered() {
    return (
        <div className="mx-auto my-[100px] max-w-[500px] w-full pb-[100px]">
            {food.map(([emoji, hueA, hueB], i) => (
                <Card i={i} emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
            ))}
        </div>
    )
}

interface CardProps {
    emoji: string
    hueA: number
    hueB: number
    i: number
}

function Card({ emoji, hueA, hueB, i }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            className={`card-container-${i} overflow-hidden flex justify-center items-center relative pt-5 -mb-[120px]`}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div className="absolute inset-0" style={{ background, clipPath: getSplashClipPath() }} />
            <motion.div 
                className="text-[164px] w-[300px] h-[430px] flex justify-center items-center rounded-[20px] bg-[#f5f5f5] shadow-[0_0_1px_hsla(0,0%,0%,0.075),0_0_2px_hsla(0,0%,0%,0.075),0_0_4px_hsla(0,0%,0%,0.075),0_0_8px_hsla(0,0%,0%,0.075),0_0_16px_hsla(0,0%,0%,0.075)] origin-[10%_60%]"
                variants={cardVariants}
            >
                {emoji}
            </motion.div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

const getSplashClipPath = () => {
    return `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`
}

/**
 * ==============   Data   ================
 */

const food: [string, number, number][] = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
]

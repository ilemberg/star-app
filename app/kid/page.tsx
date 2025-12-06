"use client";

import { useState, useEffect } from "react";
import { useApp, Kid } from "../context/AppContext";
import { Star, Gift, Trophy, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function KidDashboard() {
    const { kids } = useApp();
    const [selectedKidId, setSelectedKidId] = useState<string | null>(null);
    const { width, height } = useWindowSize();
    const [showCelebration, setShowCelebration] = useState(false);

    const selectedKid = kids.find((k) => k.id === selectedKidId);

    // Trigger celebration when a kid is selected
    useEffect(() => {
        if (selectedKidId) {
            setShowCelebration(true);
            const timer = setTimeout(() => setShowCelebration(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [selectedKidId]);

    const [showInspiration, setShowInspiration] = useState(false);
    const [inspirationItems, setInspirationItems] = useState<{ name: string; image: string; price: number }[]>([]);
    const [inspirationTitle, setInspirationTitle] = useState("");

    const prizeIdeasLow = [
        { name: "Lego Set", price: 30 }, { name: "Art Kit", price: 25 }, { name: "Board Game", price: 20 },
        { name: "Soccer Ball", price: 25 }, { name: "Doll", price: 20 }, { name: "Action Figure", price: 15 },
        { name: "Puzzle", price: 15 }, { name: "Science Kit", price: 30 }, { name: "Slime Kit", price: 20 },
        { name: "Stuffed Animal", price: 20 }, { name: "Coloring Book", price: 10 }, { name: "Crayons", price: 5 },
        { name: "Stickers", price: 5 }, { name: "Play-Doh", price: 10 }, { name: "Hot Wheels", price: 5 },
        { name: "Jump Rope", price: 10 }, { name: "Sidewalk Chalk", price: 5 }, { name: "Bubble Wand", price: 5 },
        { name: "Water Gun", price: 15 }, { name: "Kite", price: 15 }
    ];

    const prizeIdeasHigh = [
        { name: "Video Game", price: 60 }, { name: "Scooter", price: 50 }, { name: "Tablet", price: 60 },
        { name: "Headphones", price: 50 }, { name: "Smart Watch", price: 60 }, { name: "Bicycle", price: 60 },
        { name: "Skateboard", price: 45 }, { name: "Camera", price: 55 }, { name: "Telescope", price: 60 },
        { name: "Guitar", price: 60 }, { name: "Microscope", price: 50 }, { name: "Drone", price: 60 },
        { name: "Karaoke Machine", price: 50 }, { name: "Rollerblades", price: 50 }, { name: "Bean Bag Chair", price: 40 },
        { name: "Electric Toothbrush", price: 40 }, { name: "Kindle", price: 60 }, { name: "Fitbit", price: 60 },
        { name: "Instant Camera", price: 60 }, { name: "Keyboard", price: 50 }
    ];

    const handleShowInspiration = (tier: 'low' | 'high') => {
        const list = tier === 'low' ? prizeIdeasLow : prizeIdeasHigh;
        const title = tier === 'low' ? "Prize Ideas for $30!" : "Prize Ideas for $60 (200 Stars)!";

        const shuffled = [...list].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3).map((item, i) => ({
            name: item.name,
            price: item.price,
            // Use Pollinations.ai for better semantic matching
            image: `https://image.pollinations.ai/prompt/high%20quality%20product%20photo%20of%20${encodeURIComponent(item.name)}%20isolated%20on%20white%20background?width=300&height=200&nologo=true&seed=${Date.now() + i}`
        }));

        setInspirationItems(selected);
        setInspirationTitle(title);
        setShowInspiration(true);
    };

    if (!selectedKidId) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 p-4 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">
                    Who are you?
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
                    {kids.map((kid) => (
                        <motion.button
                            key={kid.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedKidId(kid.id)}
                            className="flex flex-col items-center gap-4"
                        >
                            <div
                                className={`w-24 h-24 rounded-full ${kid.color} flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white`}
                            >
                                {kid.name[0].toUpperCase()}
                            </div>
                            <span className="text-xl font-bold text-gray-700">{kid.name}</span>
                        </motion.button>
                    ))}
                </div>
                {kids.length === 0 && (
                    <div className="text-center text-gray-500">
                        <p className="mb-4">No kids found!</p>
                        <Link
                            href="/parent"
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                            Ask your parent to add you first.
                        </Link>
                    </div>
                )}
                <Link
                    href="/"
                    className="mt-12 text-gray-400 hover:text-gray-600 flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    if (!selectedKid) return null;

    const progress = Math.min(100, (selectedKid.stars / selectedKid.goal) * 100);
    const isGoalReached = selectedKid.stars >= selectedKid.goal;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 p-4 md:p-8 text-white relative overflow-hidden">
            {showCelebration && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.2}
                    />
                    {/* Floating Balloons */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: height, x: Math.random() * width, opacity: 1 }}
                            animate={{ y: -100, opacity: 0 }}
                            transition={{ duration: 4 + Math.random() * 2, ease: "easeOut" }}
                            className="absolute text-6xl"
                        >
                            🎈
                        </motion.div>
                    ))}
                    {/* Exploding Stars */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`star-${i}`}
                            initial={{ scale: 0, x: width / 2, y: height / 2, opacity: 1 }}
                            animate={{
                                scale: [0, 1.5, 0],
                                x: (Math.random() - 0.5) * width,
                                y: (Math.random() - 0.5) * height,
                                opacity: 0
                            }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute text-yellow-400"
                        >
                            <Star className="w-12 h-12 fill-current" />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Low Tier Inspiration Button (Left) */}
            <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShowInspiration('low')}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-purple-600 p-4 rounded-r-2xl shadow-lg flex flex-col items-center gap-2 max-w-[120px] z-10 border-l-8 border-yellow-400"
            >
                <Gift className="w-8 h-8 text-purple-500" />
                <span className="text-xs font-bold text-center leading-tight">
                    See what you can buy!
                </span>
            </motion.button>

            {/* High Tier Inspiration Button (Right) */}
            <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShowInspiration('high')}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-purple-600 p-4 rounded-l-2xl shadow-lg flex flex-col items-center gap-2 max-w-[120px] z-10 border-r-8 border-green-400"
            >
                <Trophy className="w-8 h-8 text-green-500" />
                <span className="text-xs font-bold text-center leading-tight">
                    See what 200 stars gets you!
                </span>
            </motion.button>

            {/* Inspiration Modal */}
            <AnimatePresence>
                {showInspiration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowInspiration(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {inspirationTitle}
                                </h2>
                                <button
                                    onClick={() => setShowInspiration(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {inspirationItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4 text-center">
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {item.name}
                                            </h3>
                                            <p className="text-purple-600 font-bold mt-1">
                                                ~${item.price}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => handleShowInspiration(inspirationTitle.includes("200") ? 'high' : 'low')}
                                    className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                                >
                                    Show Me More!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-md mx-auto relative">
                <button
                    onClick={() => setSelectedKidId(null)}
                    className="absolute top-0 left-0 p-2 text-white/80 hover:text-white"
                >
                    <ArrowLeft className="w-8 h-8" />
                </button>

                <div className="flex flex-col items-center pt-12">
                    <div
                        className={`w-32 h-32 rounded-full ${selectedKid.color} flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white mb-6`}
                    >
                        {selectedKid.name[0].toUpperCase()}
                    </div>

                    <h1 className="text-4xl font-bold mb-2">{selectedKid.name}</h1>
                    <p className="text-white/80 text-lg mb-8 flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        Working for: <strong>{selectedKid.reward}</strong>
                    </p>

                    {/* Star Count */}
                    <div className="relative mb-12">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={selectedKid.stars} // Re-animate on change
                            className="text-9xl font-black text-yellow-300 drop-shadow-lg"
                        >
                            {selectedKid.stars}
                        </motion.div>
                        <Star className="absolute -top-4 -right-8 w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" />
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/20 rounded-full h-8 mb-4 overflow-hidden backdrop-blur-sm border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                            className={`h-full ${isGoalReached ? "bg-green-400" : "bg-yellow-400"
                                } relative`}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                    </div>

                    <div className="flex justify-between w-full text-sm font-bold text-white/80 mb-12">
                        <span>0 Stars</span>
                        <span>{selectedKid.goal} Stars Goal</span>
                    </div>

                    {isGoalReached && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white text-purple-600 p-6 rounded-3xl shadow-xl text-center w-full"
                        >
                            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Goal Reached!</h2>
                            <p className="text-gray-600">
                                You did it! Ask your parent for your <strong>{selectedKid.reward}</strong>!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

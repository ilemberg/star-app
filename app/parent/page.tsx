"use client";

import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, Trash2, Star, Minus, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ParentDashboard() {
    const { kids, addKid, addStar, removeStar, deleteKid } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [newKidName, setNewKidName] = useState("");
    const [newKidGoal, setNewKidGoal] = useState(10);
    const [newKidReward, setNewKidReward] = useState("");

    const handleAddKid = (e: React.FormEvent) => {
        e.preventDefault();
        if (newKidName && newKidReward) {
            // Assign a random color for now
            const colors = [
                "bg-red-500",
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-purple-500",
                "bg-pink-500",
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            addKid(newKidName, newKidGoal, newKidReward, randomColor);
            setNewKidName("");
            setNewKidGoal(10);
            setNewKidReward("");
            setIsAdding(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Add Kid Button */}
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center gap-2 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors mb-8"
                    >
                        <Plus className="w-6 h-6" />
                        <span className="font-medium">Add a Kid</span>
                    </button>
                )}

                {/* Add Kid Form */}
                <AnimatePresence>
                    {isAdding && (
                        <motion.form
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleAddKid}
                            className="bg-white rounded-2xl p-6 shadow-lg mb-8"
                        >
                            <h2 className="text-xl font-bold mb-4">Add New Kid</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newKidName}
                                        onChange={(e) => setNewKidName(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="e.g. Alice"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Star Goal
                                    </label>
                                    <input
                                        type="number"
                                        value={newKidGoal}
                                        onChange={(e) => setNewKidGoal(Number(e.target.value))}
                                        className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Reward
                                    </label>
                                    <input
                                        type="text"
                                        value={newKidReward}
                                        onChange={(e) => setNewKidReward(e.target.value)}
                                        className="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="e.g. Ice Cream"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add Kid
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Kids List */}
                <div className="grid gap-6">
                    {kids.map((kid) => (
                        <motion.div
                            key={kid.id}
                            layout
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6"
                        >
                            <div
                                className={`w-16 h-16 rounded-full ${kid.color} flex items-center justify-center text-white font-bold text-2xl shrink-0`}
                            >
                                {kid.name[0].toUpperCase()}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-gray-800">{kid.name}</h3>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mt-1">
                                    <Gift className="w-4 h-4" />
                                    <span>
                                        Working towards: <strong>{kid.reward}</strong> ({kid.goal}{" "}
                                        stars)
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => removeStar(kid.id)}
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                    disabled={kid.stars === 0}
                                >
                                    <Minus className="w-5 h-5" />
                                </button>

                                <div className="flex flex-col items-center w-20">
                                    <span className="text-3xl font-bold text-yellow-500">
                                        {kid.stars}
                                    </span>
                                    <span className="text-xs text-gray-400 uppercase font-bold">
                                        Stars
                                    </span>
                                </div>

                                <button
                                    onClick={() => addStar(kid.id)}
                                    className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 hover:bg-yellow-200 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="border-l pl-6 ml-2 hidden md:block">
                                <button
                                    onClick={() => deleteKid(kid.id)}
                                    className="text-red-400 hover:text-red-600 p-2"
                                    title="Delete Kid"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {kids.length === 0 && !isAdding && (
                        <div className="text-center py-12 text-gray-400">
                            <p>No kids added yet. Click "Add a Kid" to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

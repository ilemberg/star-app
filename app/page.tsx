"use client";

import Link from "next/link";
import { User, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-blue-600 mb-12">
          Star App
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/parent" className="block group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-4 border-transparent group-hover:border-blue-400 transition-colors h-full flex flex-col items-center justify-center gap-6 cursor-pointer"
            >
              <div className="bg-blue-100 p-6 rounded-full">
                <User className="w-16 h-16 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">I am a Parent</h2>
              <p className="text-gray-500 text-center">
                Manage kids, give stars, and set goals.
              </p>
            </motion.div>
          </Link>

          <Link href="/kid" className="block group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-4 border-transparent group-hover:border-yellow-400 transition-colors h-full flex flex-col items-center justify-center gap-6 cursor-pointer"
            >
              <div className="bg-yellow-100 p-6 rounded-full">
                <Star className="w-16 h-16 text-yellow-500 fill-yellow-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">I am a Kid</h2>
              <p className="text-gray-500 text-center">
                Check your stars and see your rewards!
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

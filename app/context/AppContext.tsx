"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Kid = {
    id: string;
    name: string;
    stars: number;
    goal: number;
    reward: string;
    color: string; // e.g., "bg-red-500"
};

type AppContextType = {
    kids: Kid[];
    addKid: (name: string, goal: number, reward: string, color: string) => void;
    updateKid: (id: string, data: Partial<Kid>) => void;
    addStar: (id: string) => void;
    removeStar: (id: string) => void;
    deleteKid: (id: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [kids, setKids] = useState<Kid[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("star-app-data");
        if (saved) {
            try {
                setKids(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse local storage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever kids change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("star-app-data", JSON.stringify(kids));
        }
    }, [kids, isLoaded]);

    const addKid = (name: string, goal: number, reward: string, color: string) => {
        const newKid: Kid = {
            id: crypto.randomUUID(),
            name,
            stars: 0,
            goal,
            reward,
            color,
        };
        setKids((prev) => [...prev, newKid]);
    };

    const updateKid = (id: string, data: Partial<Kid>) => {
        setKids((prev) =>
            prev.map((kid) => (kid.id === id ? { ...kid, ...data } : kid))
        );
    };

    const addStar = (id: string) => {
        setKids((prev) =>
            prev.map((kid) => (kid.id === id ? { ...kid, stars: kid.stars + 1 } : kid))
        );
    };

    const removeStar = (id: string) => {
        setKids((prev) =>
            prev.map((kid) =>
                kid.id === id ? { ...kid, stars: Math.max(0, kid.stars - 1) } : kid
            )
        );
    };

    const deleteKid = (id: string) => {
        setKids((prev) => prev.filter((kid) => kid.id !== id));
    };

    return (
        <AppContext.Provider
            value={{ kids, addKid, updateKid, addStar, removeStar, deleteKid }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}

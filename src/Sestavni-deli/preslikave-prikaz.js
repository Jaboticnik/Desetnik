import React from "react";
import toast from 'react-hot-toast';
import Prevodi from "./Prevodi";

// Najboljsi cas
export function Preverinajboljsicas(Cas, jezik){
    const Vrednost = JSON.parse(localStorage.getItem('najboljsicas'))
    const Prevod = {...Prevodi[jezik]}
    if (Cas < Vrednost || Vrednost === 0 || Vrednost === null) {
        localStorage.setItem('najboljsicas', JSON.stringify(Cas))
        toast(Prevod.obvestilonajcas, {
            duration: 4000,
            position: 'top-center',
            // Slog
            style: {},
            className: '',
            // Slika
            icon: "🔥",
            // Barve
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },
            // Aria
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    }

}

export function KoncnicaZenskispol(opazovalec, jezik, beseda = "") {
    if (jezik === "slo") {
        if (opazovalec === 1) {
            return "a"
        }else if (opazovalec === 2) {
            return "i"
        }else if (opazovalec === 3 || opazovalec === 4) {
            return "e"
        }else return ""
    } else if (jezik === "nem") {
        if (opazovalec === 1 && beseda === "Mischung") {
            return ""
        }
        if (opazovalec === 1) {
            return "e"
        }else if (opazovalec === 2) {
            return "en"
        }else if (opazovalec === 3 || opazovalec === 4) {
            return "en"
        }else return "en"
    }

}
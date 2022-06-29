import React from "react";


export function Izbrisizapomnjenost() {
    const Shramba = JSON.parse(localStorage.getItem('ime'))
    if (Shramba !== null || Shramba !== "") {
        localStorage.setItem('ime', null)
        localStorage.setItem('jezik', null)
    }

}

export function Nastavizapomnjenost(Ime, Jezik) {
    localStorage.setItem('ime', JSON.stringify(Ime))
    localStorage.setItem('jezik', JSON.stringify(Jezik))
}


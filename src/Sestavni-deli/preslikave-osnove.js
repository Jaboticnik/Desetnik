import React from "react";
import {nanoid} from "nanoid";

 export const Nakljucnostevilo = () => {

    let Niz = []

    for (let i = 0;  i < 10; i++) {
        Niz.push(Ustvarinovostevilo())
    }

    return Niz
}

export function Ustvarinovostevilo() {
    return {
        vrednost: Math.ceil(Math.random() * 6),
        zadrzan: false,
        id: nanoid()
    }
}
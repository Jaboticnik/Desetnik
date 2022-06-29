import React from "react";

export default function Kocka(props) {
    const izgled = {
        backgroundColor: props.zadrzan ? "#59E391" : "white"
    }

    //DODAJ ZVOK OB VSAKEM KLIKU NA KOCKO ALI PREMESAVO

    let stevilo = []

    for (let i = 0; i < props.vrednost; i++) {
        stevilo.push(i)
    }

    const Notranjost = stevilo.map((stevilo) => {
        return (
            <span key={stevilo} className="pika"/>
        )
    })

    const imeklasa = `prostora${props.vrednost}`
    return (
        <div
            className="kocka"
            style={izgled}
            onClick={() => {
                props.preslikava(props.id)
            }}>
                {Notranjost}
        </div>
    )
}
//<p>{props.vrednost}</p>

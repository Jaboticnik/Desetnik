import React from "react";
import Igra from "./Sestavni-deli/Igra";
import Zacetek from "./Sestavni-deli/Zacetek"
import Prevodi from "./Sestavni-deli/Prevodi";
import {Izbrisizapomnjenost, Nastavizapomnjenost} from "./Sestavni-deli/App-poenastavitev";
import toast, { Toaster } from 'react-hot-toast';

//Slogi
//Telefon
import './slogi/telefon-pokoncno/slog.css'
import './slogi/telefon-pokoncno/slog-zacetek.css'
import './slogi/telefon-pokoncno/slog-igre.css'
//Tablica
import './slogi/Tablica/slog.css'
import './slogi/Tablica/slog-zacetek.css'
import './slogi/Tablica/slog-igre.css'
//Manjsi zasloni
import './slogi/Manjsi-zasloni/slog.css'
import './slogi/Manjsi-zasloni/slog-zacetek.css'
import './slogi/Manjsi-zasloni/slog-igre.css'
//Racunalnik
import './slogi/Racunalnik/slog.css'
import './slogi/Racunalnik/slog-zacetek.css'
import './slogi/Racunalnik/slog-igre.css'

export default function Prikaz() {

    const [Prikazigre, spremeniprikaz] = React.useState(false)
    const [Najboljsicas, spremenicas] = React.useState("")
    const [podatki, spremenipodatke] = React.useState({
        ime: "",
        zapomni: false,
        jezik: "slo"
    })

    const Prevod = {...Prevodi[podatki.jezik]}


    React.useEffect(() => {
        const Ime = JSON.parse(localStorage.getItem('ime'))
        const Jezik = JSON.parse(localStorage.getItem('jezik'))
        if (Ime !== "" && Ime !== null) {
            spremenipodatke((staro) => {
                return {
                    ...staro,
                    ime: Ime
                }
            })
            if (Jezik !== null && Jezik !== "") {
                spremenipodatke(staro => {
                    return {
                        ...staro,
                        jezik: Jezik
                    }
                })
            }
            const Prevodpreslikava = {...Prevodi[Jezik]}
            spremeniprikaz(true)
            toast(`${Prevodpreslikava.dobrodosel}, ${Ime}!`,{duration: 4000, icon: "👋"})
        }
    }, [])


    function Prenesipodatke(ime2, zapomni2, jezik2) {
        const Prevodpreslikava = {...Prevodi[jezik2]}
        spremenipodatke(() => {
            return {
                ime: ime2,
                zapomni: zapomni2,
                jezik: jezik2
            }
        })
        zapomni2 ? Nastavizapomnjenost(ime2, jezik2) : Izbrisizapomnjenost()
        toast(`${Prevodpreslikava.dobrodosel}, ${ime2}!`,{duration: 4000, icon: "👋"})
        spremeniprikaz(true)
    }

    React.useEffect(() => {
        const Shrambacas = JSON.parse(localStorage.getItem('najboljsicas'))
        if (Shrambacas === 0 || Shrambacas === null) {
            spremenicas("/")
        }else {
            spremenicas(Shrambacas)
        }

    }, [Prikazigre])


    return (
        <div>
            <Toaster />
            {Prikazigre && <Igra
            Najboljsicas={Najboljsicas}
            Jezik={podatki.jezik}
            Zacetek={true}
            Ponastavi={() => {
                Izbrisizapomnjenost()
                spremeniprikaz(false)
                toast(`${Prevod.nasvidenje}, ${podatki.ime}!`,{duration: 4000, icon: "👋"})
            }}
            Ime={podatki.ime}
            />}
            {!Prikazigre && <Zacetek
            preslikava={Prenesipodatke}
            jezik={podatki.jezik}
            />}
        </div>
    )
}
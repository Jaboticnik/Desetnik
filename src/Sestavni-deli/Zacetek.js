import React from "react";
import Prevodi from "./Prevodi";



export default function Zacetek(props) {


    const [podatki, spremenipodatke] = React.useState({
        ime: "",
        zapomni: false,
        jezik: props.jezik
    })

    const [napaka, spremeninapako] = React.useState("")

    function Spremenijezik() {
        spremenipodatke((prejsnje) => {
            let jezik = ""
            if (prejsnje.jezik === "slo") {
                jezik = "nem"
            }else if (prejsnje.jezik === "nem") {
                jezik = "slo"
            }
            return {
                ...prejsnje,
                jezik: jezik
            }
        })
    }

    const Pritiskgumba = () => {
        if (podatki.ime !== "") {
            spremeninapako("")
            props.preslikava(podatki.ime, podatki.zapomni, podatki.jezik)
        }else {
            console.log(Prevod.izpolnipolja)
            spremeninapako(Prevod.vpisiuporabniskoime)
        }
    }

    function Nastavipodatke(Sprememba) {
        spremenipodatke((prejsnjipodatki) => {
            const {name, value, type, checked} = Sprememba.target
            return {
                ...prejsnjipodatki,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }


    //PREVODI

    const Prevod = {...Prevodi[podatki.jezik]}

    return (
        <div className="zacetek">
            <div className="naslovnica-zacetek">
                <div className="zacetek-nevidno"></div>
                <h1 className={podatki.jezik === "nem" ? "naslov-zacetek-nem" : "naslov-zacetek"}>{Prevod.imeigre}</h1>
                <p className="jezik" onClick={Spremenijezik}>{Prevod.prikaznijezik}</p>
            </div>
            <p className="besedilo">{Prevod.opisigre}</p>
            <p className="vprasanje">{Prevod.ui}</p>
            <div className="vnosnik">
                <input
                    className="vnosnik-imena"
                    type="text"
                    placeholder={Prevod.naprimer}
                    onChange={Nastavipodatke}
                    name="ime"
                    value={podatki.ime}

                />
            </div>
            <div className={podatki.jezik === "nem" ? "vnosnik2-nem" : "vnosnik2"}>
                <input
                    type="checkbox"
                    id="vprasanje"
                    name="zapomni"
                    checked={podatki.zapomni}
                    onChange={Nastavipodatke}
                />
                <label htmlFor="vprasanje" >{Prevod.zapomni}</label>
            </div>
            <p className="napaka">{napaka}</p>
            <div className="nosilec-gumba">
            <button onClick={Pritiskgumba} className="potrdi">{Prevod.igraj}</button>
            </div>
        </div>
    )
}
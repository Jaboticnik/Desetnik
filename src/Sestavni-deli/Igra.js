import React from "react";
import Kocka from "./kocka";
import Confetti from "react-confetti";
import useWindowSize from "react-hook-usewindowsize";
import {Nakljucnostevilo, Ustvarinovostevilo} from "./preslikave-osnove";
import {Preverinajboljsicas, KoncnicaZenskispol} from "./preslikave-prikaz";
import Odjavaslika from '../odjava.png'
import toast from 'react-hot-toast';
import Prevodi from "./Prevodi";


export default function Igra(props) {
    const [Stevila, spremenistevila] = React.useState(Nakljucnostevilo)
    const [Desetnik, spremenidesetnik] = React.useState(false)
    const [Premesave, spremembapremesav] = React.useState(0)

    React.useEffect(() => {
        const ENAKOST = Nizstevil => Nizstevil.every( v => v.vrednost === Nizstevil[0].vrednost )
        const PRIDRZANOST = Nizstevil => Nizstevil.every(v => v.zadrzan)

        if (PRIDRZANOST(Stevila) === true && ENAKOST(Stevila) === true) {
            Prikaznisklop(Prevod.zmaga, "🎉")
            spremenidesetnik(true)
            nastavitrenutnost(false)
            Preverinajboljsicas(Cas, props.Jezik)
            Nastavinajboljsicas()
        }

    }, [Stevila])

    let Niz = Stevila.map(test => {
        return (
            <Kocka key={test.id} id={test.id} preslikava={Spremembazadrzanosti} vrednost={test.vrednost} zadrzan={test.zadrzan}/>
        )
    })

    function Spremembazadrzanosti(id) {
        if (!Desetnik) {
            spremenistevila(staro => {
                return staro.map((predmet) => {
                    return predmet.id === id ? {...predmet, zadrzan: !predmet.zadrzan} : predmet
                })
            })
        }
    }


    const Sprememba = () => {

        if (!Desetnik) {
            spremenistevila((staro) => {
                return staro.map(predmet => {
                    return  predmet.zadrzan
                        ? predmet
                        : Ustvarinovostevilo()
                })
            })
            spremembapremesav(prejsnje => prejsnje + 1)
        }else {
            spremenidesetnik(false)
            spremembapremesav(0)
            spremembacasa(0)
            Zacnisteti()
            spremenistevila(Nakljucnostevilo())
        }


    }

    // Prikazne stvari
    const { dolzinaokna, visinaokna } = useWindowSize()
    const [Cas, spremembacasa] = React.useState(0)
    const [trenutnost, nastavitrenutnost] = React.useState(false)
    const [najboljsicas, nastavinajboljsicas] = React.useState(props.Najboljsicas)
    const [Zacetek, spremenizacetek] = React.useState(props.Zacetek)

    if (Zacetek) {
        Zacnisteti()
        spremenizacetek(false)
    }

    function Zacnisteti() {
        nastavitrenutnost(true)
    }

    function Nastavinajboljsicas() {
        const Shrambacas = JSON.parse(localStorage.getItem('najboljsicas'))
        if (Shrambacas === 0) {
            nastavinajboljsicas(Prevod.nidosezeno)
        }else {
            nastavinajboljsicas(Shrambacas)
        }

    }

    function Prikaznisklop(sporocilo, slika) {
        toast(sporocilo, {
            duration: 4000,
            position: 'top-center',
            // Slog
            style: {},
            className: '',
            // Slika
            icon: slika,
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

    //Casovnik
    React.useEffect(()=> {
        let interval = null
        if (trenutnost) {
            interval = setInterval(() => {
                spremembacasa(sekunda => sekunda + 1)
            }, 1000)
        }else if (!trenutnost && Cas !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [trenutnost, Cas])

    //Prevod
    const Prevod = {...Prevodi[props.Jezik]}

    return (
        <div className="glavno">
            {Desetnik && <Confetti
                width={dolzinaokna}
                height={visinaokna}
            />}
            <div className="vsebina-igre">
            <h1 className="Naslov">{Prevod.imeigre}</h1>
            <p className="ime-osebe">{Prevod.uporabnik}<span id="imeosebe"> {props.Ime} </span></p>
            <p className="Navodila">{Prevod.opisigre}</p>
            <div className="kocke">
                {Niz}
            </div>
            <button className="Sprememba" onClick={Sprememba}>{Desetnik ? Prevod.novaigra : Prevod.premesaj}</button>
            <p className="stevnik-premesav">
                <span id="premesava">{Premesave} </span>
                {Prevod.premesav}{KoncnicaZenskispol(Premesave, props.Jezik, Prevod.premesav)}
            </p>
            <p className="stevnik-casovnik">{Prevod.cas}:
                <span id="cas"> {Cas} </span>
                {Prevod.sekund}{KoncnicaZenskispol(Cas, props.Jezik)}</p>
            <p className="stevnik-najboljsi-cas">{Prevod.najboljsicas}:
                <span id="najboljsicas"> {najboljsicas}</span>
                {najboljsicas !== Prevod.nidosezeno && ` ${Prevod.sekund}${KoncnicaZenskispol(najboljsicas, props.Jezik)}`}</p>
            <img src={Odjavaslika} className="Ponastavitev" onClick={props.Ponastavi}/>
            </div>
        </div>

        
    )
}
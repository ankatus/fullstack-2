import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = (props) => {
    const osat = props.kurssi.osat
    return (
        <div>
            {osat.map((osa, i) => <Osa key={i} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
        </div>
    )
}

const Yhteensa = ({ kurssi }) => {
    const reducer = (accumulator, osa) => accumulator + osa.tehtavia
    const summa = kurssi.osat.reduce(reducer, 0)

    return (
        <p>yhteensä {summa} tehtävää</p>
    )
}

export default Kurssi
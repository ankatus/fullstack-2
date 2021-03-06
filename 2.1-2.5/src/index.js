import React from 'react'
import ReactDOM from 'react-dom'
import Kurssi from './components/Kurssi'

const SivunOtsikko = () => (
    <h1>Opetusohjelma</h1>
)

const Kurssit = ({ kurssit }) => {
    return (
        <div>
            {kurssit.map((kurssi, i) =>
                <Kurssi key={i} kurssi={kurssi} />
            )}
        </div>
    )
}

const App = () => {
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            osat: [
                {
                    nimi: 'Reactin perusteet',
                    tehtavia: 10
                },
                {
                    nimi: 'Tiedonvälitys propseilla',
                    tehtavia: 7
                },
                {
                    nimi: 'Komponenttien tila',
                    tehtavia: 14
                }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]
    return (
        <div>
            <SivunOtsikko />
            <Kurssit kurssit={kurssit} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
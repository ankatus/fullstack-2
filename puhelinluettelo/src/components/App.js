import React from 'react'
import personService from '../services/persons'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className='notification'>
            {message}
        </div>
    )
}

const Person = ({ person, app }) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={app.handleDelete(person.id)}>poista</button></td></tr>
    )
}

const Persons = ({ persons, filter, app }) => {
    const passedFilter = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <table>
            <tbody>
                {passedFilter.map(person => <Person key={person.name} person={person} app={app} />)}
            </tbody>
        </table>
    )
}

const Phonebook = ({ onSubmit, newName, nameChangeHandler, newNumber, numberChangeHandler }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                nimi: <input value={newName} onChange={nameChangeHandler} />
            </div>
            <div>
                numero: <input value={newNumber} onChange={numberChangeHandler} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}
const Filtering = ({ filter, valueChangeHandler }) => {
    return (
        <div>
            <FilteringHeader />
            <form>
                <input value={filter} onChange={valueChangeHandler} />
            </form>
        </div>
    )
}

const FilteringHeader = () => (
    <h2>rajaa näytettäviä</h2>
)
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notification: null
        }
    }

    findPerson = (id) => {
        const person = this.state.persons.find(person => person.id === id)
        return person
    }

    handleDelete = (id) => {
        return () => {
            const person = this.findPerson(id)
            if (window.confirm('poistetaanko ' + person.name + '?')) {
                personService
                    .deletePerson(id)
                const persons = this.state.persons.filter(person => person.id !== id)
                this.setState({ persons })
                this.setState({ notification: person.name + " poistettu" })
                setTimeout(() => {
                    this.setState({ notification: null })
                }, 5000)
            }
        }
    }

    componentDidMount = () => {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }

    findByName = (name) => {
        const result = this.state.persons.find(person => person.name === name)
        return result
    }

    addPerson = (event) => {
        event.preventDefault()
        const check = this.findByName(this.state.newName)
        if (check != null) {
            const windowResult = window.confirm(this.state.newName + 'on jo listassa, korvataanko numero?')
            if (windowResult) {
                const updatedPerson = {
                    name: this.state.newName,
                    number: this.state.newNumber
                }
                personService.update(check.id, updatedPerson)
                    .then(updatedPerson => {
                        const personsCopy = this.state.persons
                        const index = personsCopy.findIndex(person => person.id === updatedPerson.id)
                        personsCopy[index] = {
                            name: updatedPerson.name,
                            number: updatedPerson.number
                        }
                        this.setState({ persons: personsCopy })
                        this.setState({ notification: 'henkilön ' + updatedPerson.name + ' numeroa muutettu' })
                        setTimeout(() => {
                            this.setState({ notification: null })
                        }, 5000)
                    })
                    .catch(error => {
                        alert('tiedot on jo poistettu')
                        this.setState({ persons: this.state.persons.filter(person => person.id !== check.id) })
                    })
            }
            return
        }
        const person = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        personService
            .create(person)
            .then(person => {
                this.setState({
                    persons: this.state.persons.concat(person),
                    newName: '',
                    newNumber: ''
                })
            })
        this.setState({ notification: person.name + ' lisätty' })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 5000)
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div>
                <Notification message={this.state.notification} />
                <Filtering filter={this.state.filter} valueChangeHandler={this.handleFilterChange} />
                <h2>Puhelinluettelo</h2>
                <Phonebook onSubmit={this.addPerson}
                    newName={this.state.newName}
                    nameChangeHandler={this.handleNameChange}
                    newNumber={this.state.newNumber}
                    numberChangeHandler={this.handleNumberChange}
                />
                <h2>Persons</h2>
                <Persons persons={this.state.persons} filter={this.state.filter} app={this} />
            </div>
        )
    }
}

export default App
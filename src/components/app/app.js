import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'John C.', salary: 800, increase: false, isClicked: false},
                {id: 2, name: 'Alex M.', salary: 3000, increase: true, isClicked: true},
                {id: 3, name: 'Carl W.', salary: 15000, increase: false, isClicked: false}
            ]
        }
        this.maxId = this.state.data.length+1;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            isClicked: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    render() {
        const length = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase === true).length;

        return (
            <div className="app">
                <AppInfo
                length={length}
                increased={increased}/>
    
                <div className='search-panel'>
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployersList 
                    data={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleProp ={this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    };
}


export default App;
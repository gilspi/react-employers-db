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
            ],
            term: '',
            active: 'isClicked'
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

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterEmp = (items, active) => {
        switch(active) {
            case 'isClicked':
                return items.filter(item => item.isClicked === true);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (active) => {
        this.setState({active: active})
    }


    render() {
        const {data, term, active} = this.state;
        const length = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase === true).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), active);

        return (
            <div className="app">
                <AppInfo
                length={length}
                increased={increased}/>
    
                <div className='search-panel'>
                    <SearchPanel
                     onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    active={active}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp ={this.onToggleProp}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        );
    };
}


export default App;
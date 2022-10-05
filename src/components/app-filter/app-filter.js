import { Component } from 'react';
import './app-filter.css';

class AppFilter extends Component {
    render() {
        const buttonsData = [
            {
                name: 'all',
                label: 'All employees'
            },
            {
                name: 'isClicked',
                label: 'Employees for promotion'
            },
            {
                name: 'moreThen1000',
                label: 'Salary over 1000$'
            }
        ];

        const buttons = buttonsData.map(({name, label}) => {
            const active = this.props.active === name;
            return (
                <button 
                    type="button"
                    className={active ? "btn btn-light" : "btn btn-outline-light"}
                    key={name}
                    onClick={() => this.props.onFilterSelect(name)}>
                    {label}
                </button>
            );
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

export default AppFilter;
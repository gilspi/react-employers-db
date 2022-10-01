import './app-info.css';

const AppInfo = ({length, increased}) => {
    return (
        <div className="app-info">
            <h1>Company employers data</h1>
            <h2>Count employers: {length}</h2>
            <h3>Money get: {increased}</h3>
        </div>
    );
}

export default AppInfo;
import {Link} from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Admin Dashboard</h1>
            <ul>
                <li><Link to="/add-animal">Add Animal</Link></li>
                <li><Link to="/update-animals">Update Animal</Link></li>
                <li><Link to="/list-animals">List Animals</Link></li> 
                <li><Link to="/delete-animal">Delete Animal</Link></li> 
                <li><Link to="/serch-animal">Search Animal</Link></li>
            </ul>
        </div>
    );
}   
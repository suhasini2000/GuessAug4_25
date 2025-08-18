import logo from "../assets/logo1.jpg";
export default function Home() {
    return (
        <div style={{ padding: "2rem" }}>
            <img src={logo} alt="Gen Games Logo" style={{ width: "100px", marginBottom: "1rem" }} />    
        <h1>Welcome to Gen Games</h1>
        <p>
            This platform offers fun and educational games covering a variety of subjects. 
            Start with animal games and look forward to more games on different topics coming soon!
        </p>
        <p>
            Use the navigation links above to explore different sections of the site,
            including the admin dashboard for managing game data.
        </p>
        </div>
    );
}
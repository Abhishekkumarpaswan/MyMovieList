import banner from '../assets/banner.jpg';
const Navbar = () => (
  <nav className="navbar">
    <div className="nav-item">
      <img src={banner} alt="Banner" className="nav-img" />
      <span className="nav-title">My Movie List</span>
    </div>
    <div className="nav-btns">
      <button className="nav-btn">Login</button>
      <button className="nav-btn">Register</button>
    </div>
  </nav>
);

export default Navbar;

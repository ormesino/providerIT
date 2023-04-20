import { Link } from 'react-router-dom';
import './style.css';
import Logo from '../../assets/logo.png';
import Btn from '../Btn';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        <img src={Logo} alt="Logo da plataforma" />
      </Link>

      <div className="buttons">
        <Link to="/favorites">
          <Btn title="Favoritos" />
        </Link>
        <Link to="/conta">
          <Btn title="Minha Conta" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
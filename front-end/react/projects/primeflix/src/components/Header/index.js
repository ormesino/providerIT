import { Link } from 'react-router-dom';
import './style.css';
import Logo from '../../assets/logo.png';
import Btn from '../Btn';

function Header() {
  return (
    <header>
      <Link className="logo" to="/">
        <img src={Logo} alt="Logo da plataforma" />
        <p className="title">Prime Flix</p>
      </Link>

      <div className="buttons">
        <Link to="/favoritos">
          <Btn title="Favoritos" />
        </Link>
        <Link to="/entrar">
          <Btn title="Entrar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
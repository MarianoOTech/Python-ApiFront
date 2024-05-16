import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

//CSS
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex pa1 justify-between nowrap orange header-container">
      <div className="title">STAR  WAPIS</div>
      <div className="button-container">
        <Link to="/" className="button">
          TODO
        </Link>
        <Link to="/search" className="button">
          BUSCAR
        </Link>
        {authToken && (
          <div className="flex">
            <div></div>
            <Link to="/create" className="button">
              AGREGAR
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="button ml1 pointer"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            SALIR
          </div>
        ) : (
          <Link to="/login" className="button ml1">
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
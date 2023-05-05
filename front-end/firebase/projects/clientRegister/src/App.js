import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";

import "./primereact/theme.css";
import "primereact/resources/primereact.min.css";    

import { addLocale, locale } from 'primereact/api';
import localePTBR from './primereact/locale.json';
        
export default function App() {
  addLocale('pt-br', localePTBR);
  locale('pt-br');

  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}
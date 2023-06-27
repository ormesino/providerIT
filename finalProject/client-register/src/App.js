import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import "primereact/resources/primereact.min.css";
import "./primereact/theme.css";

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
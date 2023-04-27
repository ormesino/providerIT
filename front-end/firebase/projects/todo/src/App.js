import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";

import "./primereact-theme.css";
import "primereact/resources/primereact.min.css";    

import { addLocale, locale } from 'primereact/api';
        
export default function App() {
  addLocale('pt-br', {
    "weak": "Fraca",
    "medium": "Média",
    "strong": "Forte",
    "passwordPrompt": "Digite uma senha",
  });
  locale('pt-br');

  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}
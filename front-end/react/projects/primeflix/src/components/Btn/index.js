import './style.css';

function Btn(props) {
  return (
    <div>
      {
        (props.title === "Favoritos") ?
          <button className="btnFavorites">
            {props.title}
          </button>
          :
          <button className="btnAccount">
            {props.title}
          </button>
      }
    </div>
  );
}

export default Btn;
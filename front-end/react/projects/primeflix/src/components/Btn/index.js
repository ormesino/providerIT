import './style.css';

function Btn(props) {
  return (
    <>
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
    </>
  );
}

export default Btn;
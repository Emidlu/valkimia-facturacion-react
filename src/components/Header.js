const Header = ({mensaje, switchButton, onSearch , display}) => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <div
          className="navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          {display && <form className="form-inline">
            <input
              className="form-control"
              onChange={onSearch}
              type="search"
              name="search"
              placeholder="Buscar"
            />
          </form>}{" "}
          <div>
            <a href={`${switchButton}`} id="switch" className="btn btn-info hooverShadow">
              {mensaje}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

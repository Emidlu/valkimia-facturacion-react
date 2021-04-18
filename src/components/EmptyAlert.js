const EmptyAlert = ({text, icon}) => {
  return (
    <div className="emptyAlertContainer">
      <div className="emptyAlert">
        <div className="emptyAlert3 text-center">
          <i className={`fas ${icon} fa-10x`}></i>
          <h2 className="emptyText">{text}</h2>
        </div>
      </div>
    </div>
  );
};

export default EmptyAlert;

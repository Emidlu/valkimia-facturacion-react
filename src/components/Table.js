import React from "react";

const Table = ({ children, primero, segundo, tercer, cuarto }) => {
  return (
    <div className="general">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">{primero}</th>
            <th scope="col">{segundo}</th>
            <th scope="col">{tercer}</th>
            <th scope="col">{cuarto}</th>
            <th scope="col"></th>

          </tr>
        </thead>

        {children}
        
      </table>
    </div>
  );
};

export default Table;

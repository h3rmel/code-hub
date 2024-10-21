const Cell = ({ cells, number, handleClick }) => {
  return (
    <div className="cell" onClick={() => handleClick(number)}>
      {cells[number]}
    </div>
  );
};

export default Cell;

import "./Card.css";
const Card = ({ src, title, description }) => {
  return (
    <div className="card">
      <img src={src} alt="property" />

      <div className="card-info">
        <h4>{title}</h4>
        <h4>{description}</h4>
      </div>
    </div>
  );
};

export default Card;



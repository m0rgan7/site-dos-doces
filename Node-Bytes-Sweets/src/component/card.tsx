import "./card.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export function Card({ title, description, imageUrl, price }: CardProps) {
    return (
        <div className="card">
            <img/>
            <h2></h2>
            <p></p>
        </div>
    )
}
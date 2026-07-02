import './App.css';
import { Card } from './component/card';
import { useFoodData } from './hooks/useFoodData';

function App() {
  const { data } = useFoodData();

  return (
    <div className="Page">
      <h1>Bem-vindo(a) ao mundinho Bytes & Sweets!</h1>
      <p>Aqui, nosso objetivo é adoçar a sua vida com delícias artesanais feitas com muito amor.</p>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card
          price={foodData.price}
          title={foodData.title}
          description={foodData.description}
          imageUrl={foodData.imageUrl}
          />
          )}
    </div>
    </div>
  )
}

export default App  
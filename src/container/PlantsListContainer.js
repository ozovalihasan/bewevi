import { useSelector } from 'react-redux';
import PlantsList from '../component/PlantsList';

const PlantsListContainer = () => {
  const plants = useSelector(state => state.plant.plants);
  return (
    <PlantsList plants={plants} />
  );
};

export default PlantsListContainer;

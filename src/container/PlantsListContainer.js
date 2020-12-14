import { useSelector } from 'react-redux';
import PlantList from '../component/PlantList';

const PlantListContainer = () => {
  const plants = useSelector(state => state.plant.plants);
  return (

    <PlantList plants={plants} />
  );
};

export default PlantListContainer;

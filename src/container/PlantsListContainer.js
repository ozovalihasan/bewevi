import { useSelector } from 'react-redux';
import PlantShortContainer from './PlantShortContainer';

const PlantListContainer = () => {
  const plants = useSelector(state => state.plant.plants);
  return (
    <>
      {plants.map(plant => (
        <PlantShortContainer
          key={plant.id}
          plant={{
            slug: plant.slug,
            commonName: plant.common_name,
            imageUrl: plant.image_url,
          }}
        />
      ))}
    </>
  );
};

export default PlantListContainer;

import { MainContainer, videoContainer,TextContainer } from './main.styles'
import Video from '../../assets/videobackground-two.mp4'
import Button , { BUTTON_TYPE_CLASSES }from '../button/button.component';
import { useNavigate } from 'react-router-dom';


const Main = () => {

  
  const navigate = useNavigate();

  const goToShop = () => {
    navigate('/shop')
  }

  return (
    <MainContainer>
      <video src={Video} autoPlay loop muted/>
      <TextContainer>
        <h1>Welcome</h1>
        <Button 
          onClick={goToShop}
          buttonType={ BUTTON_TYPE_CLASSES.inverted }
          >Shop</Button>
      </TextContainer>
    </MainContainer>
  );
};

export default Main;
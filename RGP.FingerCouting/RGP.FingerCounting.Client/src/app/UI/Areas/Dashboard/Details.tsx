import {
    Card,
    Title,
    Paragraph,
    List,
    Provider as PaperProvider,
    Button,
  } from 'react-native-paper';
import api from '../../../Services/api';

const DetailsScreen = () => {

  const callApi = async () =>{
    await api.get("https://localhost:7259/WeatherForecast").then(resp => console.log(resp.data));
  }
    return (
      <Button onPress={() => callApi()}>
        Call API
      </Button>
    );
  };

export default DetailsScreen;

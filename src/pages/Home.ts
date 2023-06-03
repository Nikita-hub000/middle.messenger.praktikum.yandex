import MainPage from '../layouts/main/main';
import registerHelpers from '../utils/RegisterHelpers';
import chats from '../constants/data';

registerHelpers();

const Home = new MainPage({
  current: {
    id: '0',
    name: '',
    messages: [],
  },
  chats: chats,
});

export default Home;

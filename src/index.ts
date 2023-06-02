import renderDOM from './utils/renderDOM';
import './types/hbs.d.ts';
import Home from './pages/Home';
import Login from './pages/Login';
import Error400 from './pages/Error-400';
import Registration from './pages/Registration';
import Error500 from './pages/Error-500';
import Profile from './pages/Profle';
import EditPassword from './pages/ProfileChangePassword';
import EditInfo from './pages/ProfileChangeInfo';

window.addEventListener('DOMContentLoaded', () => {
  switch (window.location.pathname) {
    case '/error-400': {
      renderDOM(Error400);
      break;
    }
    case '/error-500': {
      renderDOM(Error500);
      break;
    }
    case '/login': {
      renderDOM(Login);
      break;
    }
    case '/registration': {
      renderDOM(Registration);
      break;
    }
    case '/': {
      renderDOM(Home);
      break;
    }
    case '/profile': {
      renderDOM(Profile);
      break;
    }
    case '/profile/edit-password': {
      renderDOM(EditPassword);
      break;
    }
    case '/profile/edit-info': {
      renderDOM(EditInfo);
      break;
    }
    default:
      break;
  }
});

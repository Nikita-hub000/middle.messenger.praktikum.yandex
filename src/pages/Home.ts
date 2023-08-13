import MainPage from '../layouts/main/main';
import registerHelpers from '../utils/RegisterHelpers';
import { withStore } from '../utils/Store';
import { withRouter } from '../utils/withRouter';

registerHelpers();

function mapStateProps(state: any) {
  return { ...state.chats, ...state.messages, ...state.currentUser };
}

export default withRouter(withStore(mapStateProps)(MainPage));

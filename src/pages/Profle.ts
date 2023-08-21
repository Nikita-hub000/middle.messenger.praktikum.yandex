import ProfilePage from '../layouts/profile/profile';
import registerHelpers from '../utils/RegisterHelpers';
import { withStore } from '../utils/Store';
import { withRouter } from '../utils/withRouter';

registerHelpers();

function mapStateProps(state: any) {
  return { ...state.user };
}
export default withRouter(withStore(mapStateProps)(ProfilePage));

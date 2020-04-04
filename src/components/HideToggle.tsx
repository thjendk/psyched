import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import settingsReducer from 'redux/reducers/settings';

export interface HideToggleProps {}

const HideToggle: React.SFC<HideToggleProps> = () => {
  const dispatch = useDispatch();
  const shouldHide = useSelector((state: ReduxState) => state.settings.shouldHide);
  const user = useSelector((state: ReduxState) => state.auth.user);

  const handleToggle = () => {
    dispatch(settingsReducer.actions.toggleHide());
  };

  if (!user) return null;
  return (
    <Icon
      style={{ cursor: 'pointer', marginLeft: '5px' }}
      name={shouldHide ? 'eye slash outline' : 'eye'}
      onClick={handleToggle}
    />
  );
};

export default HideToggle;

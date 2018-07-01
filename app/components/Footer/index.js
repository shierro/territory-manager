import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Footer extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'none' }}>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

export default Footer;

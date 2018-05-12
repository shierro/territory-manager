/**
*
* Footer
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ display: 'none' }}>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Footer.propTypes = {

};

export default Footer;

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import NotFound from '@material-ui/icons/VoiceOverOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';

import styles from './styles';

class AddVisit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingVisit: false,
      note: '',
      visitState: '',
    };
    this.saveVisit = this.saveVisit.bind(this);
  }
  saveVisit() {
    const { visitState, note } = this.state;
    this.props.saveVisit({
      note,
      found: visitState === 'found',
    });
    this.setState({ addingVisit: false });
  }
  render() {
    const { classes, person } = this.props;
    const { addingVisit, visitState, note } = this.state;
    const visitTypes = [
      { name: 'found', icon: <CheckCircle color="secondary" /> },
      { name: 'notFound', icon: <NotFound color="error" /> },
    ];
    const count = {
      found: person.visits.filter(prsn => prsn.found).length,
      notFound: person.visits.filter(prsn => !prsn.found).length,
    };
    return (
      <div className={classes.container}>
        <h4 className={classes.visitLabel}>Visits: ({person.visits.length})</h4>
        {visitTypes.map(({ name, icon }, key) => (
          <div className={classes.column} key={`visit-icon-${key + 1}`}>
            <IconButton
              aria-label={name}
              onClick={() =>
                this.setState({ visitState: name, addingVisit: true })
              }
            >
              <Badge
                badgeContent={count[name]}
                classes={{
                  badge: `${classes.badge} ${visitState === name &&
                    classes.selected}`,
                }}
              >
                {icon}
              </Badge>
            </IconButton>
          </div>
        ))}
        <div style={{ display: addingVisit ? 'inline-block' : 'none' }}>
          <TextField
            value={note}
            onChange={({ target: { value } }) => this.setState({ note: value })}
            InputLabelProps={{ shrink: true }}
            label="Note"
            multiline
            rowsMax="4"
            fullWidth
          />
          <IconButton aria-label="Save" onClick={this.saveVisit}>
            <Save color="secondary" />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            onClick={() => this.setState({ addingVisit: false })}
          >
            <Cancel color="error" />
          </IconButton>
        </div>
      </div>
    );
  }
}

AddVisit.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  saveVisit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddVisit);

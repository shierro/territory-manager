import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import VoiceOverOff from '@material-ui/icons/VoiceOverOff';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './styles';

class AddVisit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      visitState: '',
    };
    this.saveVisit = this.saveVisit.bind(this);
    this.startVisitAdd = this.startVisitAdd.bind(this);
  }
  startVisitAdd(name) {
    this.setState({ visitState: name });
    if (!this.props.addingVisit) {
      this.props.toggleAddingVisit();
    }
  }
  saveVisit() {
    const { visitState, note } = this.state;
    const found = visitState === 'Found';
    this.props.saveVisit({ note, found });
    this.setState({ note: '', visitState: '' });
  }
  renderBadge(content, name, icon) {
    const { classes } = this.props;
    const { visitState } = this.state;
    const badge = `${classes.badge} ${visitState === name && classes.selected}`;
    return (
      <Badge badgeContent={content} classes={{ badge }}>
        {icon}
      </Badge>
    );
  }
  renderHeaderButtons(visitTypes, classes, count) {
    return visitTypes.map(({ name, icon }, key) => (
      <div className={classes.column} key={`visit-icon-${key + 1}`}>
        <Tooltip title={`Add visit - ${name}`} placement="top">
          <IconButton
            aria-label={name}
            onClick={() => this.startVisitAdd(name)}
          >
            {this.renderBadge(count[name], name, icon)}
          </IconButton>
        </Tooltip>
      </div>
    ));
  }
  renderHeader(classes, person) {
    const visitTypes = [
      { name: 'Found', icon: <CheckCircle color="secondary" /> },
      { name: 'NotFound', icon: <VoiceOverOff color="error" /> },
    ];
    const count = {
      Found: person.visits.filter(prsn => prsn.found).length,
      NotFound: person.visits.filter(prsn => !prsn.found).length,
    };
    return (
      <div>
        <h3 className={classes.visitLabel}>
          Total visits: ({person.visits.length})
        </h3>
        {this.props.addingVisit && (
          <h4>Add new visit ({this.state.visitState})</h4>
        )}
        {this.renderHeaderButtons(visitTypes, classes, count)}
      </div>
    );
  }
  renderActionButtons() {
    const saveDisabled = !this.state.note;
    const saveColor = saveDisabled ? 'disabled' : 'secondary';
    return (
      <div>
        <IconButton
          aria-label="Save"
          disabled={saveDisabled}
          onClick={this.saveVisit}
        >
          <Save color={saveColor} />
        </IconButton>
        <Tooltip title="Cancel" placement="top">
          <IconButton
            aria-label="Cancel"
            onClick={this.props.toggleAddingVisit}
          >
            <Cancel color="error" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  render() {
    const { classes, person, addingVisit } = this.props;
    const { note } = this.state;
    return (
      <div className={classes.container}>
        {this.renderHeader(classes, person)}
        <div style={{ display: addingVisit ? 'inline-block' : 'none' }}>
          <TextField
            className={classes.noteField}
            placeholder="Add some notes.."
            value={note}
            onChange={({ target: { value } }) => this.setState({ note: value })}
            InputLabelProps={{ shrink: true }}
            label="Note"
            multiline
            rowsMax="4"
            fullWidth
          />
          {this.renderActionButtons()}
        </div>
      </div>
    );
  }
}

AddVisit.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  saveVisit: PropTypes.func.isRequired,
  addingVisit: PropTypes.bool.isRequired,
  toggleAddingVisit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddVisit);

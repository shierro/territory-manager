import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class EnhancedTableHead extends React.PureComponent {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  renderCellContent(row) {
    const { order, orderBy } = this.props;
    return (
      <Tooltip
        title="Sort"
        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
        enterDelay={300}
      >
        <TableSortLabel
          active={orderBy === row.id}
          direction={order}
          onClick={this.createSortHandler(row.id)}
        >
          {row.label}
        </TableSortLabel>
      </Tooltip>
    );
  }

  render() {
    const { order, orderBy, columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(col => (
            <TableCell
              style={{ padding: '0 5px' }}
              key={col.id}
              numeric={col.numeric}
              sortDirection={orderBy === col.id ? order : false}
            >
              {this.renderCellContent(col)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
};

export default EnhancedTableHead;

import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const charts = {
  Line,
  Bar,
  Pie,
};

const dataSetMeta = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

class DynamicChart extends React.PureComponent {
  render() {
    const { type, data, options, labels } = this.props;
    const datasets = data.map(dt => ({
      ...dataSetMeta,
      ...dt.dataSetMeta,
      data: dt.values,
      label: dt.label,
    }));
    const Component = charts[type];
    return <Component data={{ labels, datasets }} options={options} />;
  }
}

DynamicChart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object,
  labels: PropTypes.array,
};

export default DynamicChart;

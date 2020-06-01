import RussianLangUtils from '../../Utils';

class FeedbacksChart {
  init({ $element, data, scale = 1 }) {
    if ($element.length !== 0) {
      this._$element = $element;
      this._data = [data[0], data[2], data[1], data[3]];
      this._buildDonut(scale);
      this._writeSummary();
    }
  }

  _buildDonut(scale) {
    const canvas = this._$element.find('.js-feedbacks-chart__donut')[0];
    const context = canvas.getContext('2d');

    const size = 120 * scale;
    const lineWidth = 5 * scale;
    const center = size / 2;
    const radius = center - lineWidth;

    canvas.width = size;
    canvas.height = size;

    this._calculateRadianPoints(this._data).forEach((item) => {
      const gradient = context.createLinearGradient(0, 0, 0, size);
      gradient.addColorStop(0, item.gradient[0]);
      gradient.addColorStop(1, item.gradient[1]);

      context.beginPath();
      context.arc(center, center, radius, item.start, item.end, false);
      context.lineWidth = lineWidth;

      context.strokeStyle = gradient;
      context.stroke();
    });
  }

  _calculateRadianPoints() {
    const gradients = [
      ['#FFE39C', '#FFBA9C'],
      ['#BC9CFF', '#8BA4F9'],
      ['#6FCF97', '#66D2EA'],
      ['#919191', '#3D4975'],
    ];
    let startPoint = Math.PI / 2;
    const gapWidth = Math.PI / 90;
    const freeSpace = 2 * Math.PI - gapWidth * this._data.filter((size) => size !== 0).length;
    const sum = this._data.reduce((a, b) => a + b, 0);
    const points = [];

    for (let i = 0; i < this._data.length; i += 1) {
      if (this._data[i] !== 0) {
        const endPoint = startPoint + (this._data[i] / sum) * freeSpace;
        points.push({
          start: startPoint,
          end: endPoint,
          gradient: gradients[i],
        });
        startPoint = endPoint + gapWidth;
      }
    }
    return points;
  }

  _writeSummary() {
    const [count, voice] = this._$element.find('.js-feedbacks-chart__summary').children();
    const voiceSum = this._data.reduce((a, b) => a + b, 0);
    count.innerText = voiceSum;
    voice.innerText = RussianLangUtils.selectWordByCount(
      voiceSum,
      ['голосов', 'голос', 'голоса', 'голосов'],
      {},
    );
  }

  static initDefault({ selector = '.js-feedbacks-chart', data = [0, 0, 0, 0] }) {
    new FeedbacksChart().init({ $element: $(selector), data });
  }
}

export default FeedbacksChart;

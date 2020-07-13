import '@blocks/bullet-list';
import '@blocks/iconed-list';
import CalculatorCard from '@blocks/calculator-card';
import Feedback from '@blocks/feedback';
import FeedbacksChart from '@blocks/feedbacks-chart';
import '../layout/layout';
import './room-details.scss';

FeedbacksChart.initDefault({ data: [130, 65, 65, 0] });
Feedback.initAll({});
CalculatorCard.initDefault({});

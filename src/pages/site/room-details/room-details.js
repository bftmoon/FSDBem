import './room-details.scss'
import '../layout/layout'
import '@blocks/iconed-list'
import '@blocks/bullet-list'
import FeedbacksChart from "@blocks/feedbacks-chart";
import Feedback from "@blocks/feedback";
import CalculatorCard from "../../../kit/blocks/calculator-card";

FeedbacksChart.initDefault({data: [130, 65, 65, 0]});
Feedback.initAll({});
CalculatorCard.initDefault({});

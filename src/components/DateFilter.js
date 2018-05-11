import React, {Component} from "react";
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css';
import { changeRange } from "../AC";
import { connect } from "react-redux";

class DateFilter extends Component {

    static defaultProps = {
        numberOfMonths: 2,
    };

    render() {
        const { from, to } = this.props.filters.dateRange;
        const modifiers = { start: from, end: to };
        return (
            <div>
                <p>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from &&
                to &&
                `Selected from ${from.toLocaleDateString()} to
                    ${to.toLocaleDateString()}`}{' '}
                {from &&
                to && (
                    <button className="link" onClick={this.handleResetClick}>
                    Reset
                    </button>
                )}
            </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
            </div>
          )
        }
        handleDayClick = (day) => {
            const range = DateUtils.addDayToRange(day, this.props.filters.dateRange);
            this.props.changeRange(range);
          }

       handleResetClick = () =>   this.props.changeRange(this.getInitialComponent());

        getInitialComponent() {
            return {
              from: null,
              to: null,
            };
          }
}

export default connect((state) => ({
    filters: state.filters
}), {changeRange})(DateFilter);
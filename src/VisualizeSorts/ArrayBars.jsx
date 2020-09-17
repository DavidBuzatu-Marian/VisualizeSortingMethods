import React, { Component } from "react";

const PRIMARY_COLOR = "#c2e8ce";
const SORTED_COLOR = "#f6ad7b";

export default class ArrayBars extends Component {
  constructor(props) {
    super(props);
    this.state = props.arrayInfo;
  }

  componentDidMount() {
    this.setState(this.props.arrayInfo);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState(props.arrayInfo);
  }
  render() {
    const { array, isSorted } = this.state.arrayInfo;
    const barWidth = array.length > 90 ? 3 : 10;
    return array.map((value, idx) => (
      <div
        className="array-bar"
        key={idx}
        name={value}
        style={{
          height: `${value}px`,
          width: `${barWidth}px`,
          backgroundColor: isSorted ? SORTED_COLOR : PRIMARY_COLOR
        }}
      ></div>
    ));
  }
}

import React, { Component } from "react";
import ArrayBars from "./ArrayBars";
import BinaryRep from "./BinaryRep";
import CharactersRep from "./CharactersRep";

export default class Visualizers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: props.arrayInfo.array,
      isSorted: props.arrayInfo.isSorted,
      sortingType: props.arrayInfo.sortingType
    };
  }

  renderSwitch(switchingParam) {
    switch (switchingParam) {
      case 0:
        return <ArrayBars arrayInfo={this.props}></ArrayBars>;
      case 1:
        return (
          <BinaryRep
            arrayInfo={this.props}
            binaryType={this.props.binaryType}
          ></BinaryRep>
        );
      case 2:
        return (
          <CharactersRep
            searchingAlgorithm={this.props.searchingAlgorithm}
          ></CharactersRep>
        );
      default:
        return <ArrayBars arrayInfo={this.props}></ArrayBars>;
    }
  }
  render() {
    return <div>{this.renderSwitch(this.props.arrayInfo.sortingType)}</div>;
  }
}

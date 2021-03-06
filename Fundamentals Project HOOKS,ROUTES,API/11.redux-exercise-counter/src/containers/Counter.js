import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../components/CounterControl/CounterControl";
import CounterOutput from "../components/CounterOutput/CounterOutput";

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 10" clicked={this.props.onAddCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubtractCounter}
        />
        <hr />
        <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
        <ul>
          {this.props.storedResults.map(storeResult=>(
          <li key={storeResult.id} onClick={()=>this.props.onDeleteStoreResult(storeResult.id)}>{storeResult.value}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ctr: state.ctr.counter,
    storedResults:state.res.results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    onAddCounter: () => dispatch({ type: "ADD", value: 10 }),
    onSubtractCounter: () => dispatch({ type: "SUBTRACT", value: 5 }),
    onStoreResult:(result) => dispatch({ type: "STORE_RESULT",result:result}),
    onDeleteStoreResult:(id) => dispatch({ type: "DELETE_RESULT", resultElId: id})

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

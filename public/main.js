var QueueControl = React.createClass({
  getInitialState: function(){
    return {data: ["one", "two", "three"]};
  },

  handleEnqueueSubmit: function(value){
    var queue = this.state.data;
    var newQueue = queue.concat(value);
    this.setState({data: newQueue});
  },

  handleDequeue: function(){
    var queue = this.state.data;
    queue.shift();
    this.setState({data: queue});
  },

  render: function() {
    return (
    <div>
    <h1>Queue</h1>
    <Queue data={this.state.data}/>
    <div className="controlStuff">
      <EnqueueForm onEnqueueSubmit={this.handleEnqueueSubmit}/>
      <DequeueButton onDequeueClick={this.handleDequeue}/> 
    </div>
    </div>
      );
  }
});

var Queue = React.createClass({
  render: function(){
    var queueItems = this.props.data.map(function(item){
      return (
        <li>{item}</li>
      )
    });
    return (
      <ul>
      {queueItems}
      </ul>      
      );
  }
});

var DequeueButton = React.createClass({
  handleDequeue: function(e){
    e.preventDefault();
    this.props.onDequeueClick();
    return;
  },
  render: function(){
    return (
      <button className="myButton" onClick={this.handleDequeue}>
      Dequeue
      </button>
      )
  }
});

var EnqueueForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    //TODO: Sanitize input
    var toAdd = this.refs.toAdd.getDOMNode().value.trim();
    if(!toAdd){
      return;
    }
    //TODO: Add thing to queue
    this.props.onEnqueueSubmit(toAdd);
    this.refs.toAdd.getDOMNode().value = '';
    return;
  },

  render: function(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Add to queue" ref="toAdd"/>
        <input type="submit" className="myButton" value="Enqueue"/>
      </form>
      );
  }
});

React.renderComponent(
<QueueControl/>, document.body
);
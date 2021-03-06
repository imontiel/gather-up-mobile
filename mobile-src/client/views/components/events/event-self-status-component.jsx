EventSelfStatusComponent = React.createClass({
  render() {
    // Checkbox if event is synced and all sign ins are synced
    var synced = true;

    if (this.props.event.synced !== true) {
      synced = false;
    }
    var $$message = '';

    if (synced) {
      $$message = (
        <i className="fa fa-check-circle green-text"></i>
      );
    } else {
      $$message = (
        <i className="fa fa-circle-o yellow-text"></i>
      );
    }

    return (
      <span className="event__list-item__badge">
        {$$message} Event Synced
      </span>
    );
  }
});
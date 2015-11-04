LinkedStateMixin = React.addons.LinkedStateMixin;

EventFormComponent = React.createClass({
  mixins: [LinkedStateMixin],
  /*
   * Purposely not reactive
   */
  getInitialState() {
    return Session.get('event') || {
      title: '',
      data: '',
      time: '',
      notes: ''
    };
  },
  handleClear(e) {
    Session.set('event', null);

    $('#event_title').val('');
    $('#event_date').val('');
    $('#event_time').val('');
    $('#event_notes').val('');
  },
  handleSubmit(e) {
    e.preventDefault();

    var title    = $('#event_title').val();
    var date     = $('#event_date').val();
    var time     = $('#event_time').val();
    var notes    = $('#event_notes').val();

    var error = 
      Validate.check(ValidateEventTitle, title) ||
      Validate.check(ValidateDateNotRequired, date) ||
      Validate.check(ValidateTimeNotRequired, time) ||
      Validate.check(ValidateEventNotes, notes) || true;

    if (error !== true) {
      this.setState({'error': error});
      return;
    }

    Session.set('event', {
      title: title,
      date: date,
      time: time,
      notes: notes
    });

    FlowRouter.go('/signup');
  },
  render() {
    var error = this.state.error;
    var $$error = '';

    if (error) {
      var $$error = (
        <div className="card-panel red lighten-1">
          <span className="white-text">
            {error}
          </span>
        </div>
      );
    }

    return (
      <form>
        <div className="row">
          {$$error}
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="large material-icons prefix">label</i>
            <input
                id="event_title"
                type="text"
                className="validate"
                defaultValue={this.state.title}
                required="required" />
            <label htmlFor="event_title">Event Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="large material-icons prefix">perm_contact_calendar</i>
            <label htmlFor="event_date">Date</label>
            <CalendarInputComponent inputId="event_date" defaultValue={this.state.date}/>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="large material-icons prefix">query_builder</i>
            <input id="event_time" type="time" className="validate" defaultValue={this.state.time} required />
            <label htmlFor="event_time" className="active">Time</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="large material-icons prefix">mode_edit</i>
            <textarea id="event_notes" className="materialize-textarea" defaultValue={this.state.notes}></textarea>
            <label htmlFor="event_notes">Notes</label>
          </div>
        </div>

        <div className="hide-on-med-and-up">
          <a className="waves-effect waves-light btn btn-block" href="#!" onClick={this.handleSubmit}>
            <i className="material-icons left">assignment</i>
            Start Gathering Sign Ups
          </a>
          &nbsp;
          <a className=" waves-effect waves-light btn btn-block grey lighten-1 black-text"
             href="#!"
             onClick={this.handleClear}>
            Clear Form
          </a>
        </div>
        <div className="hide-on-small-only">
          <a className=" waves-effect waves-light btn grey lighten-1 black-text"
             href="#!"
             onClick={this.handleClear}>
            Clear
          </a>
          &nbsp;
          <a className="waves-effect waves-light btn" href="#!" onClick={this.handleSubmit}>
            <i className="material-icons left">assignment</i>
            Start Gathering Sign Ups
          </a>
        </div>
      </form>
     
        
    );
  }
});
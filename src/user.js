import React, { Component } from 'react';
import './user.css'

class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      //tabel data using list of object to iterate through
      userData: [{
        id: '1',
        first: '',
        last: '',
        email: '',
        note: '',
      }],
    //local states to be used for error handeling
      first: '',
      last: '',
      email: '',
      note: '',
      firstErrorCss:'displayOff',
      lastErrorCss:'displayOff',
      emailErrorCss:'displayOff',
      noteErrorCss:'displayOff',
      emailCss:'displayOff'
    }
    this.firstRef = React.createRef()
    
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      userData: [...this.state.userData, {
        id: Date.now(),
        first: event.target.first.value,
        last: event.target.last.value,
        email: event.target.email.value,
        note: event.target.note.value,
      }]
    });

    event.target.first.value = '';
    event.target.last.value = '';
    event.target.email.value = '';
    event.target.note.value = '';
    this.setState({
      first:'',
      last:'',
      email:'',
      note:'',
    })
  }

  onFirstChange = evt => {
    this.setState({first: evt.target.value})
    this.firstError(evt.target.value)
  };
  onLastChange = evt => {
    this.setState({last: evt.target.value})
    this.lastError(evt.target.value)
  };
  onEmailChange = evt => {
    this.setState({email: evt.target.value})
    this.emailError(evt.target.value)
  };
  onNoteChange = evt => {
    this.setState({note: evt.target.value})
    this.noteError(evt.target.value)
  };

  isSubmitEnabled(){
    if(this.state.first.length > 0 && this.state.last.length > 0 && this.state.email.length > 0 && this.state.note.length > 0 ){
      return true
    }
    else return false
  }
  firstError(a){
    
    if(!a.trim() || a.length < 1)
    this.setState({firstErrorCss: 'displayOn'})
    else
    this.setState({firstErrorCss: 'displayOff'})
  }
  lastError(a){
    if(!a.trim())
    this.setState({lastErrorCss: 'displayOn'})
    else
    this.setState({lastErrorCss: 'displayOff'})

  }
  emailError(a){
    if(!a.trim())
    this.setState({emailErrorCss: 'displayOn'})
    else if(!/\S+@\S+\.\S+/.test(a && a.trim()))
    this.setState({emailCss: 'displayOn',emailErrorCss:'displayOff' })
    else if(/\S+@\S+\.\S+/.test(a))
    this.setState({emailCss: 'displayOff',emailErrorCss: 'displayOff'})
    else
    this.setState({emailErrorCss:'displayOff',emailCss:'displayOff'})
  }
  noteError(a){
    if(!a.trim())
    this.setState({noteErrorCss: 'displayOn'})
    else
    this.setState({noteErrorCss: 'displayOff'})

  }
 
  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      userData: this.state.userData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }
  componentDidMount(){
    this.firstRef.current.focus()
  }

  render() {
    const error ={
      first:'First name is required',
      last:'Last name is required',
      email:'email is required',
      note:'note is required', 
      emailSignature:'Email address is not valid' 
    }
    
    const isEnabled = this.isSubmitEnabled()
    const btncss = isEnabled ? 'btn btn-primary' : 'btn btn-danger'
    return (
      <div className='container'>
        <h1>App Challenge - Add User</h1>
        <div className = 'panel'>
        <form onSubmit={this.onSubmitHandle.bind(this)}>
        <div class="form-group">
            <label>First Name : </label>
          <input ref={this.firstRef} type="text" name="first" className="input" required placeholder="First Name" onChange={this.onFirstChange} value={this.state.first} />
    <span className={this.state.firstErrorCss} >{error.first}</span>
          </div>
          <div class="form-group">
            <label>Last Name : </label>
          <input type="text" name="last" className="input" placeholder="Last Name" onChange={this.onLastChange} required value={this.state.last}/>
          <span className={this.state.lastErrorCss} >{error.last}</span>
          </div>
          <div class="form-group">
            <label>Email : </label>
         
          <input type="email" name="email" className="input"  placeholder="email" onChange={this.onEmailChange} required value={this.state.email}/>
          <span className={this.state.emailErrorCss} >{error.email}</span>
          <span className={this.state.emailCss} >{error.emailSignature}</span>
          </div>
          <div class="form-group">
            <label>Note : </label>
          <input type="text" name="note" className="input" placeholder="Note" onChange={this.onNoteChange} required value={this.state.note}/>
          <span className={this.state.noteErrorCss} >{error.note}</span>
          </div>
          <button disabled = {!isEnabled} class={btncss}>Add User</button>
        </form>
        </div>
        <div className='panel'>
        <table className="table">
          <thead>
  <tr>
    <th scope="col">First name</th>
    <th scope="col">Last name</th>
    <th scope="col">Email</th>
    <th scope="col">Notes</th>
    <th scope="col">Action</th>
  </tr>
  </thead>
  <tbody>
  {this.state.userData.map(item => item.first !== '' ? (
    <tr key={item.id}>
      <td>{item.first}</td>
  <td>{item.last}</td>
  <td>{item.email}</td>
  <td>{item.note}</td>
  <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
    </tr>
  ):(''))}</tbody>
  </table>
  </div>
      </div>
    );
  }
}

export default User;

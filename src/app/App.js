// main component
import React, { Component } from 'react';
import { Mongoose } from 'mongoose';


export default class App extends Component{

    //set  constructor
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
    }

    //get data when component is rendered
    componentDidMount(){
        this.fetchTasks();       
    }

    // add/edit a task
    addTask(e)  {       
        
        if ( this.state._id ){

            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }

            })
            .then( res => res.json() )
            .then( data => {
                //una ventana de materialize 
                //podemos agregar cualquier mensaje  
                M.toast({html:"Task was updated"});
                this.setState({title: '', description:''});
                this.fetchTasks();            
            })
            .catch( err => console.error(err) );

        }
        else {
            fetch("/api/tasks", {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
            .then( res => res.json() )
            .then( data => {
                //una ventana de materialize 
                //podemos agregar cualquier mensaje  
                M.toast({html:"Task was saved"});
                this.setState({title: '', description:''});
                this.fetchTasks();            
            })
            .catch( err => console.error(err) );
        }
        e.preventDefault(); 
    }

    // get all tasks
    fetchTasks(){
        fetch('/api/tasks')
        .then( res => res.json())
        .then( data => {
            this.setState({
                tasks: data
            });
        });
    }

    // update state
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value       
        });
    }

    //delete task
    deleteTask( id ){

        if (confirm('Are you sure yu want to delete it?')){

            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
            .then( res => res.json() )
            .then( data => {
                M.toast({html:"Task was deleted"});
                this.fetchTasks();  
            });

        }       

    }

    //edit task
    editTask( id ) {
        fetch(`/api/tasks/${id}`)
        .then( res => res.json() )
        .then( data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }

    render(){
        return(
            <div>
                { /*navigation*/ }
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN</a>
                    </div>
                </nav>
                { /*aplication*/ }
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask.bind(this)}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input  name="title" 
                                                        type="text" 
                                                        placeholder="title" 
                                                        onChange={this.handleChange.bind(this)}
                                                        value= {this.state.title}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" 
                                                          className="materialize-textarea" 
                                                          placeholder="description"
                                                          onChange={this.handleChange.bind(this)}
                                                          value= {this.state.description}>
                                                </textarea>                                    
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>                                    
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map((task, i) =>{
                                            return (
                                                <tr key={i}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button 
                                                            className="btn light-blue darken-4"
                                                            onClick = {this.editTask.bind(this, task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button 
                                                            className="btn light-blue darken-4"
                                                            onClick = {this.deleteTask.bind(this, task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
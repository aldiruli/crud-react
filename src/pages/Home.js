import React, {Component} from "react";
import '../assets/style.css';
import axios from "axios";

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            members:[],
            first_name:'',
            last_name:'',
        }
    }
    componentDidMount(){
        axios.get("https://reqres.in/api/users")
        .then(Response =>{
            this.setState({members: Response.data.data})
        })
        .catch( error =>{
            console.log(error);
        });
    }
    inputOnchangehandler = (event) =>{
        this.setState({ [event.target.name]: event.target.value })
    }
    onSubmitchange = (e) =>{
        e.preventDefault()
        var payload = {
            first_name : this.state.first_name,
            last_name : this.state.last_name,
        };
    var url = 'https://reqres.in/api/users'
        axios.post(url, payload)
            .then(response => {
                var members = [...this.state.members]
                members.push(response.data)
                this.setState({members})
            })
            .catch(error => {
                console.log('error')
            })    
    }
    render(){
        return(
            <div className="container">
                <h1>Sistem Informasi Sekolah</h1>
                <div className="row">
                    <div className="col-md-6" style={{border: '1px solid black'}}>
                        <h2>Member</h2>
                        <div className="row">
                        {this.state.members.map((member, index) =>
                         <div className="col-md-6" key={member.id}>
                         <div className="card" style={{margin:10}}>
                             <div className="card-body">
                                 <h5 className="card-title">{member.id}</h5>
                                 <h5 className="card-title">{member.first_name}</h5>
                                 <h5 className="card-title">{member.last_name}</h5>
                                 <button className="btn btn-primary">Edit</button>
                                 <button className="btn btn-danger">Delete</button>
                             </div>
                         </div>
                     </div>   
                        )}
                        </div>
                    </div>
                    <div className="col-md-6" style={{border: '1px solid black'}}>
                        <h2>Form</h2>
                        <form onSubmit={this.onSubmitChange}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" name="first_name" value={this.state.first_name} 
                                onChange={this.inputOnchangehandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" name="last_name" value={this.state.last_name}
                                onChange={this.inputOnchangehandler}></input>
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;


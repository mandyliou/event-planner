import React from 'react';

class PresentationForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            company: "",
            title: "",
            synopsis: "",
            conferences: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
        this.handleConferenceChange = this.handleConferenceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.presenter_name = data.name;
        data.presenter_email = data.email;
        data.company_name = data.company;
        delete data.name;
        delete data.email;
        delete data.company
        delete data.conferences;
        console.log(data);

        const presentationUrl = `http://localhost:8000${data.conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }
          const response = await fetch(presentationUrl, fetchConfig);

          if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            const cleared = {
                name: "",
                email: "",
                company: "",
                title: "",
                synopsis: "",
                conference: "",

            }

            // this.setState({success: true});
            this.setState(cleared);

            }
        }

        handleNameChange(event) {
            const value = event.target.value;
            this.setState({name: value})
        }
        handleEmailChange(event) {
            const value = event.target.value;
            this.setState({email: value})
        }
        handleCompanyChange(event) {
            const value = event.target.value;
            this.setState({company: value})
        }
        handleTitleChange(event) {
            const value = event.target.value;
            this.setState({title: value})
        }
        handleSynopsisChange(event) {
            const value = event.target.value;
            this.setState({synopsis: value})
        }
        handleConferenceChange(event) {
            const value = event.target.value;
            this.setState({conference: value})
        }

        async componentDidMount() {
            const url = 'http://localhost:8000/api/conferences/';
            const response = await fetch(url);
            if (response.ok) {
            const data = await response.json();
            this.setState({conferences: data.conferences});

            }
            }

    render () {
        // let notSubmittedClass = "not submitted"
        // let successClass = "alert alert-success d-none mb-0"

        // if(this.state.success === true){
        //     notSubmittedClass = "not submitted d-none"
        //     successClass = "alert alert-success mb-0"

        // }
    return (
        <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit}   id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input  value={this.state.name} onChange={this.handleNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name"
                                    className="form-control"/>
                                <label htmlFor="presenter_name">Presenter Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.email} onChange={this.handleEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email"
                                    className="form-control"/>
                                <label htmlFor="presenter_email">Presenter Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.company} onChange={this.handleCompanyChange} placeholder="Company name" required type="text" name="company_name" id="company_name"
                                    className="form-control"/>
                                <label htmlFor="company_name">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title"
                                    className="form-control"/>
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.synopsis} onChange={this.handleSynopsisChange} placeholder="Synopsis" required type="text" name="synopsis" id="synopsis"
                                    className="form-control"/>
                                <label htmlFor="synopsis">Synopsis</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.conference}   onChange={this.handleConferenceChange} required name="conference" id="conference" className="form-select">
                                    <option  value="">Choose a conference</option>
                                    {this.state.conferences.map(conference => {
                                        return (
                                            <option key={conference.href} value={conference.href} >
                                                {conference.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        {/* <div className={successClass}  id="success-message"></div> */}
                    </div>
                </div>
            </div>
    )
    }
}

export default PresentationForm;

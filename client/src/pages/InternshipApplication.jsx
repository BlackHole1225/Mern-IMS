import React from "react";
import { createInternship } from "../store/actions";
import Sidenav from "../components/Sidenav";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios,{post} from 'axios';

class InternshipApplication extends React.Component {
  state = {
    startDate: new Date(),
    fileName:""
  };
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitFile=this.submitFile.bind(this);
  }
  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleUpload(id, labelId) {
    var fileName = document.getElementById(id).value.split("\\").pop();
    document.getElementById(labelId).classList.add("selected");
    document.getElementById(labelId).innerHTML = fileName;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const data = { application: {} };
    for (var [key, value] of formData.entries()) {
      data["application"][key] = value;
    }
    data["application"]["submittedDate"] = new Date().toUTCString();
    data["application"]["offerLetter"] = formData.get('offerLetter');
  
  
    const { createInternship } = this.props;

    createInternship(data).then(() => {
      this.props.history.push("/student");
    });
  }
  submitFile(event){
    let files=event.target.files;
    console.log(files[0])
    let reader=new FileReader();
    reader.readAsDataURL(files[0]);
    let formData = new FormData();
    formData.append('offerLetter', files[0]);

    axios.post("http://localhost:4002/api/internships/uploadDocument", formData)
    .then((response) => {
      console.log("done",response)
    });
  }
  render() {
    return (
      <div className="row no-gutters">
        <div className="col-sm-2 sidenav">
          <Sidenav activeComponent="3" />
        </div>
        <div className="col-sm-10">
          <div className="container-fluid">
            <h4 className="mt-2">Apply</h4>
            <div
              className="alert alert-secondary alert-dismissible fade show"
              role="alert"
            >
              <strong>P.S. </strong> Please complete your profile before
              applying.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              Internship Details:
              <hr />
              <div className="container-fluid">
                <div className="form-row my-2">
                  <div className="col-sm-6">
                    Company:
                    <input
                      type="text"
                      name="workplace"
                      id="workplace"
                      className="form-control"
                      placeholder="eg. Google"
                      required
                    />
                  </div>
                  <div className="col-sm-3">
                    Start Date:
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="form-control"
                    />
                  </div>
                  <div className="col-sm-3">
                    Duration:
                    <div className="input-group">
                      <input
                        type="number"
                        name="durationOfInternship"
                        id="durationOfInternship"
                        placeholder="eg. 1"
                        className="form-control"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">month(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row my-2">
                  <div className="col-sm-5">
                    Stipend:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependRs"
                        >
                          Rs.{" "}
                        </span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        id="stipend"
                        name="stipend"
                        placeholder="eg. 10000"
                        aria-describedby="inputGroupPrependRs"
                        required
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">/month</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    Reference:
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroupPrependSalutation"
                        >
                          Mr./Mrs.
                        </span>
                      </div>
                      <input
                        type="text"
                        name="reference"
                        id="reference"
                        aria-describedby="inputGroupPrependSalutation"
                        placeholder="eg. John Doe"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
               {/* <form method="post" encType="multipart/form-data" onSubmit="/internship/uploadDocument">
                <input type="file" name="offerLetter" />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
    </form>*/}
              <input type="file" name="offerLetter" onChange={this.submitFile} />
                </div>
              </div>
              <hr />
              <div className="text-right">
                <button className="btn border-dark mx-2" type="reset">
                  Reset
                </button>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>                        
                </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (store) => ({
      auth: store.auth,
      internships: store.internships,
    }),
    { createInternship }
  )(InternshipApplication)
);

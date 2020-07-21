import React, { Component } from "react";
import { getAllInternships } from "../store/actions";
import Admin_Sidenav from "../components/Admin_Sidenav";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { MdFileDownload, MdSearch } from "react-icons/md";
class StudentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internships: [],
      count: null,
      csvData: [],
    };
  }
  async componentDidMount() {
    const { getAllInternships } = this.props;
    getAllInternships().then(() => this.loadData(this.props.internships));
  }
  loadData(internship) {
    console.log(internship.length);
    this.setState({ internships: internship });
    this.setState({ count: internship.length });
    internship.forEach((element) => {
      let csv = {};
      let date = new Date(element.application.startDate);
      csv["StudentName"] =
        element.student.name.firstname + " " + element.student.name.lastname;
      csv["Workplace"] = element.application.workplace;
      csv["StartDate"] =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      csv["Duration"] = element.application.durationOfInternship;
      csv["Stipend"] = element.application.stipend;
      csv["Status"] = element.completionStatus;
      // console.log(csv)
      this.setState({ csvData: this.state.csvData.concat(csv) });
    });
    console.log(this.state.csvData);
  }
  renderRows() {
    return this.state.internships.map((internship) => {
      const { _id, application, student, completionStatus } = internship;
      let date = new Date(application.startDate);
      return (
        <tr key={_id} className="application">
          <td>{student.name.firstname + " " + student.name.lastname}</td>
          <td>{application.workplace}</td>
          <td>
            {date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate()}
          </td>
          <td>{application.durationOfInternship}</td>
          <td>{application.stipend}</td>
          <td>
            {completionStatus === "Approved" ? (
              <span className="text-success">{completionStatus}</span>
            ) : completionStatus === "Rejected" ? (
              <span className="text-danger">{completionStatus}</span>
            ) : (
              <span className="text-warning">{completionStatus}</span>
            )}
          </td>
        </tr>
      );
    });
  }
  filter(e) {
    var filter, cards, cardContent, i;
    filter = e.target.value.toUpperCase();
    cards = document.getElementsByClassName("application");
    for (i = 0; i < cards.length; i++) {
      if (cards[i].innerText.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
  render() {
    // console.log(this.state.csvData);
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            <Admin_Sidenav activeComponent="6" />
          </div>
          <div className="col-sm-10 of">
            <div className="container-fluid mt-2">
              <h4>Students' Internship Report</h4>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <strong>Total Applications: {this.state.count} </strong>
                </div>
                <div className="col-sm-5 offset-2">
                  <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputGroup-sizing-sm">
                        <MdSearch />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="filter"
                      id="filter"
                      className="form-control"
                      placeholder="Filter Internships"
                      onChange={this.filter}
                      aria-describedby="filtersearch"
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <CSVLink
                    data={this.state.csvData}
                    filename={"ApplicationsReport.csv"}
                    className="btn btn-primary btn-sm float-right"
                  >
                    <MdFileDownload style={{ margin: -2, padding: -2 }} />{" "}
                    Download Report
                  </CSVLink>
                </div>
              </div>
              <hr style={{ marginTop: -4 }} />
              <table className="table table-hover table-sm">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Workplace</th>
                    <th>Start Date</th>
                    <th>Duration</th>
                    <th>Stipend</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody class="applicationstable">{this.renderRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    internships: store.internships,
  }),
  {
    getAllInternships,
  }
)(StudentReport);

// import 'office-ui-fabric-react/dist/css/fabric.css';
// import '../App.css';
import Admin_Sidenav from "../components/Admin_Sidenav";
import AnalyticsCharts from "./AnalysisChart";
import React, { Component } from "react";
import SideNav_f from "../components/SideNav_f";
class Analytics extends Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="row no-gutters">
          <div className="col-sm-2 sidenav">
            {this.props.user === "admin" ? (
              <Admin_Sidenav activeComponent="6" />
            ) : (
              <SideNav_f activeComponent="7" />
            )}
          </div>
          <div className="col-sm-10 of">
            <AnalyticsCharts />
          </div>
        </div>
      </div>
    );
  }
}

export default Analytics;

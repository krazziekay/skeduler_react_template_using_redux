import React from 'react';
import CustomSelect from './CustomSelect';
import { connect } from 'react-redux';
import * as JobDetailsActions from '../actions/JobDetailsActions';
import { bindActionCreators } from 'redux';
import { ObjectGeneratorForCustomSelect } from '../helper/helper';


const JobStatusSelector = ({ jobDetails, jobDetailsAction }) => {

  const handleChange = (e) => {
    e.persist();
    jobDetailsAction.editJobStatus(e.target.value);
  };

  return (<div>
    <CustomSelect label="Job Status"
                  name="job_status"
                  styles={{ backgroundColor: '#fff' }}
                  selected={ObjectGeneratorForCustomSelect(jobDetails.job_status)}
                  small options={jobDetails.all_job_status}
                  selectAction={handleChange}
    />
  </div>);
};

export default connect(state => ({
  jobDetails: state.jobDetails.data
}), dispatch => ({
  jobDetailsAction: bindActionCreators(JobDetailsActions, dispatch)
}))(JobStatusSelector);

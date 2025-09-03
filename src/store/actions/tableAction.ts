import { AppDispatch } from '../store';
import * as API from '../serverApiAction/serverApis';
import {
  fetchTableStart,
  fetchTableSuccess,
  fetchTableFailure,
} from '../reducers/tableReducer';

export const fetchTableData = () => async (dispatch: AppDispatch) => {debugger
  dispatch(fetchTableStart());
  try {
    const response = await API.get("/project?status=active&page=1&limit=10&level=Project&operation=view&internal_user_id");
    if (response.data) {debugger
      dispatch(fetchTableSuccess(response.data));

    } else {
      dispatch(fetchTableFailure('No data found'));
    }
  } catch (error: any) {
    dispatch(fetchTableFailure(error.message || 'Failed to fetch'));
  }
};

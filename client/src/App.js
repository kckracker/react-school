import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import {UserSignUp } from './components/UserSignUp';
import { UserSignIn } from './components/UserSignIn';
import { Courses } from './components/Courses';
import { CourseDetail } from './components/CourseDetail';
import { CreateCourse } from './components/CreateCourse';
import { UpdateCourse } from './components/UpdateCourse';
import { UserSignOut } from './components/UserSignOut';
import { PrivateRoute } from './components/PrivateRoute';

import withContext from './Context';

const CourseswithContext = withContext(Courses);
const CourseDetailwithContext = withContext(CourseDetail);
const CreateCoursewithContext = withContext(CreateCourse);
const UpdateCoursewithContext = withContext(UpdateCourse);
const UserSignUpwithContext = withContext(UserSignUp);
const UserSignInwithContext = withContext(UserSignIn);
const UserSignOutwithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const PrivateRouteWithContext = withContext(PrivateRoute);


function App() {

  return (
    <Router>
      <div>
          <HeaderWithContext />
          <Switch>
              <Route path="/signup" component={UserSignUpwithContext} />             
              <Route path="/signin" component={UserSignInwithContext} />
              <Route path="/signout" component={UserSignOutwithContext} />
              <PrivateRouteWithContext path="/courses/:id/update">
                <UpdateCoursewithContext />
              </PrivateRouteWithContext>
              <Route path="/courses/:id" component={CourseDetailwithContext} />
              <PrivateRouteWithContext path="/createcourse" component={CreateCoursewithContext} />
              <Route path="/" component={CourseswithContext} />                
          </Switch>
      </div>
    </Router>
  );
}

export default App;

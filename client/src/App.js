import { Route, Switch } from 'react-router-dom';
import { Provider } from './Context';

import { Header } from './components/Header';
import {UserSignUp } from './components/UserSignUp';
import { UserSignIn } from './components/UserSignIn';
import { Courses } from './components/Courses';
import { CourseDetail } from './components/CourseDetail';
import { CreateCourse } from './components/CreateCourse';
import { UpdateCourse } from './components/UpdateCourse';
import { UserSignOut } from './components/UserSignOut';
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './components/NotFound';
import {UnhandledError} from './components/UnhandledError'

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
    <Provider>
      <div>
          <HeaderWithContext />
          <Switch>
              <Route path="/signup" component={UserSignUpwithContext} />             
              <Route path="/signin" component={UserSignInwithContext} />
              <Route path="/signout" component={UserSignOutwithContext} />
              <PrivateRouteWithContext path="/courses/create" component={CreateCoursewithContext} />
              <PrivateRouteWithContext path="/courses/:id/update" component={UpdateCoursewithContext}/>
              <Route path="/courses/:id" component={CourseDetailwithContext} />
              <Route path="/error" component={UnhandledError} />
              <Route exact path="/" component={CourseswithContext} />
              <Route component={NotFound} />                
          </Switch>
      </div>
    </Provider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './HeaderComponent/Header';
import QuoteOnlyComponent from './QuoteOnlyComponent/QuoteOnly';
import BirthdayComponent from './BirthdayComponent/Birthday';
import SidebarComponent from './SidebarComponent/Sidebar';
import ConvertComponent from './ConvertComponent/Convert';
import ConvertQuoteComponent from './QuoteConvertComponent/QuoteConvertComponent';

import { getTodaysBirthday } from '../services/birthdayApiService';
import AddBirthdayForm from './addingBirthdayComponent/addingBirthday';
import RegisterComponent from './registerComponent/register';
import LoginComponent from './loginComponent/login';
import ProtectedRoute from './protectedComponent/protectedPage';
import UnauthorizedPage from './unauthorizedComponent/unauthorized';

function App() {
  const colorsList = [
    '#DF80AC', // customPink
    '#579FF4', // customBlue
    '#FCB325', // customYellow
    '#098E27', // customGreen
  ];

  const [Birthdays, setBirthdays] = useState(false);
  const [CurrentBirthday, setCurrentBirthday] = useState();
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [CurrentColor, setCurrentColor] = useState(colorsList[0]);

  useEffect(() => {
    getTodaysBirthday()
      .then((result) => {
        let students_birthday = result.students_birthday
          ? result.students_birthday
          : [];
        let teachers_birthday = result.teachers_birthday
          ? result.teachers_birthday
          : [];

        let birthdaysList = [...students_birthday, ...teachers_birthday];

        return setBirthdays(birthdaysList);
      })
      .catch(() => {
        return setBirthdays({});
      });
  }, []);

  useEffect(() => {
    setCurrentColor(colorsList[CurrentIndex % (colorsList.length - 1)]);
    setCurrentBirthday({
      ...Birthdays[CurrentIndex],
      index: CurrentIndex,
    });
  }, [Birthdays]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let index = CurrentIndex === Birthdays?.length - 1 ? 0 : CurrentIndex + 1;

      setCurrentIndex(index);

      setCurrentColor(colorsList[index % (colorsList.length - 1)]);

      setCurrentBirthday({
        ...Birthdays[index],
        index: index,
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [Birthdays, CurrentIndex]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={   
    <div>
      <HeaderComponent />{' '}
      {Birthdays?.length > 0 && CurrentBirthday ? (
        <div className="h-screen w-screen flex">
          <BirthdayComponent
            currentBirthday={CurrentBirthday}
            currentColor={CurrentColor}
          />{' '}
          <SidebarComponent
            currentBirthday={CurrentBirthday}
            totalBirthdays={Birthdays?.length}
            currentColor={CurrentColor}
          />{' '}
        </div>
      ) : (
        <QuoteOnlyComponent currentColor={CurrentColor} />
      )}{' '}
    </div>
        }/>
    <Route path="/convert" element={<ConvertComponent />} />
    <Route path="/convert-quote" element={<ConvertQuoteComponent />} />
    <Route path="/add-birthday" element = {<ProtectedRoute  element={AddBirthdayForm}  roleRequired={0} />}/>
    <Route path="/register" element={<RegisterComponent />} />
    <Route path="/login" element={<LoginComponent/>} />
    <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
    </Routes>
    </Router>
  );
}

export default App;

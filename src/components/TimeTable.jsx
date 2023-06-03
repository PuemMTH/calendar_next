import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderRow from "./TimeTable/HeaderRow";
import AddButton from "./TimeTable/AddButton";
import DayRow from "./TimeTable/DayRow";
import { useLocalStorage } from "usehooks-ts";

const App = ({}) => {

  const headers = [ "Day/Time", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",];
  const orderedDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const initialData = {
    peroid_date: new Date(),
    course: [],
  };

  const [data, setData] = useLocalStorage("data", initialData);
  const [courses, setCourses] = useState(data.course);
  const [loading, setLoading] = useState(false);
  const [select, setSelected] = useState({});

  useEffect(() => {
    if (select.section_id) {
      toast.success("ลบรายวิชาเรียบร้อยแล้ว");
      const newData = data.course.filter(course => course.section_id !== select.section_id);
      setCourses(newData);
      setSelected({});
      setData({ ...data, course: newData });
    }
  }, [select]);

  return (
    <>
      <ToastContainer />
      {loading ? ( <div className='loader'>Loading...</div> ) : (
        <>
          <div className='overflow-x-auto border mx-1 rounded-lg'>
            <div className='overflow-x-hidden min-w-[75rem] table-w' id='table'>
              <HeaderRow headers={headers} />
              {orderedDate.map((date, dateIndex) => (<DayRow key={`date-${dateIndex}`} date={date} selectCourse={setSelected} courses={data.course} />))}
            </div>
          </div>
          <AddButton data={data} setData={setData}/>
        </>
      )}
    </>
  );
}

export default App;
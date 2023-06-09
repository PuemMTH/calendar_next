import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderRow from "./TimeTable/HeaderRow";
import AddButton from "./TimeTable/AddButton";
import DayRow from "./TimeTable/DayRow";
import { useLocalStorage } from "usehooks-ts";
import html2canvas from 'html2canvas';
import { useRef } from "react";

const App = ({data, setData}) => {
  const tableRef = useRef(null);

  const handleSaveAsImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'timetable.png';
    link.click();
  }
  const headers = [ "Day/Time", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
  const orderedDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const [courses, setCourses] = useState(data.course);
  const [loading, setLoading] = useState(false);
  const [select, setSelected] = useState({});

  // useEffect(() => {
  //   if (select.section_id) {
  //     toast.success("ลบรายวิชาเรียบร้อยแล้ว");
  //     const newData = data.course.filter(course => course.section_id !== select.section_id);
  //     setCourses(newData);
  //     setSelected({});
  //     setData({ ...data, course: newData });
  //   }
  // }, [select]);

  return (
    <>
      <ToastContainer />
      {loading ? ( <div className='loader'>Loading...</div> ) : (
        <>
          <div className='overflow-x-auto border mx-1 rounded-lg' >
            <div className='overflow-x-hidden min-w-[75rem] table-w' id='table'
              style={{backgroundColor: '#282c34',}}
              ref={tableRef}
            >
              <HeaderRow headers={headers} />
              {orderedDate.map((date, dateIndex) => (<DayRow key={`date-${dateIndex}`} date={date} selectCourse={setSelected} courses={data.course} />))}
            </div>
          </div>
          <div className='flex justify-end mt-2'>

          <span className="py-2 px-4  text-white">
            <span className='text-red-500'>*</span> 
            {data.course[0] ? data.course[0]['templateName'] === 'default' ? ' ไม่ได้เลือกเทมเพลต' : `${data.course[0]['templateName']}` : ' ไม่ได้เลือกเทมเพลต'}
          </span>
          
          <button
            onClick={handleSaveAsImage}
            className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
          >
            Save as Image
          </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
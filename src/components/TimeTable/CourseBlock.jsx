import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { memo } from "react";

const Modal = ({ isOpen, children }) => {
  return (
    <>
      {isOpen ? (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div className='inline-block align-bottom overflow-hidden  transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const CourseBlock = ({
  course,
  selectCourse,
  getColorByDate,
  date,
}) => {
  const [isCheck, setIsCheck] = useLocalStorage("isCheck", false);
  const [isOpen, setIsOpen] = useState(false);

  console.log("Render CourseBlock");

  return (
    <>
      <div
        className={`
    border p-2 md:px-3 md:py-2 rounded text-xs md:text-sm bg-opacity-60 flex flex-col justify-between hover:bg-opacity-70 overflow-hidden cursor-pointer dark:bg-opacity-100 dark:border-gray-700 my-col-start-${
      course.startCol
    } my-col-end-${course.endCol} ${getColorByDate(date)} 
    transform transition-all duration-500 ease-in-out 
    hover:scale-105 hover:rotate-1`}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <p className='flex flex-wrap justify-between mb-2'>
          <span>{course.subject_code} </span>
          <span>
            [{course.time_from} - {course.time_to}]
          </span>
        </p>
        <p>{isCheck ? course.subject_name_th : course.subject_name_th}</p>
        <div className='flex justify-between text-gray-700 text-xs'>
          <span>
            {isCheck
              ? `ROOM: ${course.room_name_th}`
              : `ห้อง: ${course.room_name_th}`}
          </span>
          <div className='text-right'>
            <span>
              {isCheck
                ? `SEC${course.section_code} ${course.section_type_th}`
                : `หมู่${course.section_code} ${course.section_type_th}`}
            </span>
          </div>
        </div>
      </div>

      {/* <Modal isOpen={isOpen}>
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
              <button onClick={() => { setIsOpen(false); }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">
                    Close modal
                  </span>
              </button>
              <div className="p-6 text-center">
                  <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this course?
                  </h3>
                  <button 
                  
                  onClick={() => { 
                    selectCourse(course);
                    setIsOpen(false); }}
                  type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                      Yes, I'm sure
                  </button>
                  <button onClick={() => { setIsOpen(false); }} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default memo(CourseBlock);

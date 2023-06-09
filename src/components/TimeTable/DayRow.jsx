import React, { useEffect, memo } from "react";
import CourseBlock from "./CourseBlock";

const DayRow = ({ date, selectCourse, courses }) => {
  const timeToCol = (timeString) => {
    const time = timeString?.split(":") || [];
    if (time.length !== 2) {
      return 0;
    }
    const remainder = +time[1] / 60;
    return (+time[0] + remainder) * 2 - 13;
  };
  
  const mappedCourses = courses.reduce((acc, course) => {
    const dayKey = course.day_w.trim();
    const mappedCourse = {
      startCol: timeToCol(course.time_from),
      endCol: timeToCol(course.time_to),
      ...course,
    };
    if (dayKey in acc) {
      // sord mappedCourse by startCol before insert because it's new row
      const index = acc[dayKey].findIndex(
        (course) => course.startCol > mappedCourse.startCol
      );
      if (index === -1) {
        acc[dayKey].push(mappedCourse);
      } else {
        acc[dayKey].splice(index, 0, mappedCourse);
      }
    }else acc[dayKey] = [mappedCourse];
    return acc;
  }, {});

  const getColorByDate = (date) => {
    const color = {
      MON: "bg-blue-400",
      TUE: "bg-green-400",
      WED: "bg-yellow-400",
      THU: "bg-red-400",
      FRI: "bg-purple-400",
      SAT: "bg-pink-400",
      SUN: "bg-gray-400",
    };
    return color[date];
  };
  return (
    <div className='grid grid-cols-26 min-h-16 md:min-h-24 border dark:border-gray-700'>
      <div
        className={`p-1 md:p-3 col-span-2 border-r-2 dark:border-gray-700 ${getColorByDate(
          date
        )}`}
      >
        <span className='font-semibold dark:text-gray-900'>{date}</span>
      </div>
      {mappedCourses[date] &&
        mappedCourses[date].map((course, courseIndex) => (
          <CourseBlock
            key={`course-${courseIndex}`}
            course={course}
            selectCourse={selectCourse}
            getColorByDate={getColorByDate}
            date={date}
          />
        ))}
    </div>
    
  );
};
export default memo(DayRow);

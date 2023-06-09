import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dataSearch from "../../assets/subject.json";
import { toast } from 'react-toastify';
import axios from "axios";
import Notiflix from "notiflix";

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
            <div className='inline-block align-bottom rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transhtmlForm transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const App = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [addData, setAddData] = useState({
    section_id: uuidv4(),
    subject_code: "",
    subject_name_th: "",
    time_from: "08:00",
    time_to: "10:00",
    room_name_th: "",
    section_code: "",
    section_type_th: "",
    day_w: "MON",
  });

  // search engine
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm !== "") {
      const selectedSubject = dataSearch.find(
        (value) => value.subject_name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (selectedSubject) {
        setAddData({
          ...addData,
          subject_name_th: selectedSubject.subject_name,
        });
        setAddData({ ...addData, subject_code: selectedSubject.sub_id });
      }
    }
  }, [searchTerm]);

  const handleChangeSearch = (event) => {
    setAddData({ ...addData, subject_name_th: event.target.value });
    setSearchTerm(event.target.value);
  };
  // end search engine

  const handleChange = (e) => {
    if (e.target.name === "section_type_th") {
      if (e.target.value === "lecture") {
        setAddData({
          ...addData,
          section_code: 700,
          [e.target.name]: e.target.value,
        });
      }
      if (e.target.value === "lab") {
        setAddData({
          ...addData,
          section_code: 800,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setAddData({
        ...addData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    setData({ ...data, course: [...data.course, addData] });
    setAddData({
      section_id: uuidv4(),
      subject_code: "",
      subject_name_th: "",
      time_from: "08:00",
      time_to: "10:00",
      room_name_th: "",
      section_code: "",
      section_type_th: "lecture",
      day_w: "MON",
    });
    setIsOpen(false);
  };

  const [templateName, setTemplateName] = useState("");
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [openLink, setOpenLink] = useState("");


  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    if (templateName.length > 3) {
      Notiflix.Loading.circle('Saving template...');
      await axios.post("/api/course/", {...data,templateName }, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data[0].group_id);
        console.log(res.data[0].templateName);
        // copy link to clipboard
        setTemplateName("");
        toast.success("Template saved");
        setIsCopyOpen(true)
        setOpenLink(`http://${window.location.hostname}/template/${res.data[0].group_id}`);
        Notiflix.Loading.remove();
      }).catch((err) => {
        console.log(err);
        toast.error("Template name already exists");
        Notiflix.Loading.remove();
      });
      setIsOpenShare(false);
    } else {
      toast.error("Template must have at least 4 courses");
    }

    
  }


  return (
    <div className='flex justify-end mt-2'>
      <div className="space-x-2">
        <button
          onClick={() => setIsOpen(true)}
          className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
        >
          Add
        </button>

        {/* shear */}
        <button
          onClick={() => setIsOpenShare(true)}
          className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
        >
          Share
        </button>
      </div>
      <Modal isOpen={isOpenShare}>
      <div className='px-6 py-6 lg:px-8 '>
          <div className='space-y-6'>
            <div className='grid md:gap-6'>
              <div className='relative z-0 w-full group'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Template
                </label>
                <input
                  type='text'
                  name='template_name'
                  id='template_name'
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                  placeholder='* Template name'
                />
              </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-6'>
          <div className='my-2'>
            <hr />
          </div>
          <div className='flex justify-end space-x-1'>
            <button
              onClick={() => setIsOpenShare(false)}
              type='button'
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              Close
            </button>
            <button
              onClick={handleSaveTemplate}
              type='button'
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              Share Now
            </button>
          </div>
        </div>
      </div>
      </Modal>

      <Modal isOpen={isOpen}>
        <div className='px-6 py-6 lg:px-8 '>
          <div className='space-y-6'>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='relative z-0 w-full group'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Subject Name
                </label>
                <input
                  type='text'
                  name='subject_name_th'
                  list='subjects'
                  value={addData.subject_name_th}
                  onChange={handleChangeSearch}
                  className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                  placeholder='* Computer Programming I'
                />
                <datalist id='subjects'>
                  {dataSearch
                    .filter((item, index) => index < 20)
                    .map((item, index) => (
                      <option key={index} value={item.subject_name} />
                    ))}
                </datalist>
              </div>
              <div className='relative z-0 w-full group'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Subject Code
                </label>
                <input
                  type='text'
                  name='subject_code'
                  value={addData.subject_code}
                  onChange={handleChange}
                  className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                  placeholder='* 01418223-60'
                />
              </div>
            </div>
            <div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Class Group
                  </label>
                  <select
                    name='section_type_th'
                    value={addData.section_type_th}
                    onChange={handleChange}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                  >
                    <option value='lecture'>Lecture</option>
                    <option value='lab'>Lab</option>
                    <option value='tutorial'>Tutorial</option>
                  </select>
                </div>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Section Code
                  </label>
                  <input
                    type='text'
                    name='section_code'
                    value={addData.section_code}
                    onChange={handleChange}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                    placeholder='* 700'
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Time From
                  </label>
                  <select
                    name='time_from'
                    onChange={handleChange}
                    selected={addData.time_from}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                    required
                  >
                    <option value='08:00'>08:00</option>
                    <option value='08:30'>08:30</option>
                    <option value='09:00'>09:00</option>
                    <option value='09:30'>09:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                  </select>
                </div>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Time To
                  </label>
                  <select
                    name='time_to'
                    onChange={handleChange}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                    selected={addData.time_to}
                    required
                  >
                    <option value='08:00'>08:00</option>
                    <option value='08:30'>08:30</option>
                    <option value='09:00'>09:00</option>
                    <option value='09:30'>09:30</option>
                    <option value='10:00'>10:00</option>
                    <option value='10:30'>10:30</option>
                    <option value='11:00'>11:00</option>
                    <option value='11:30'>11:30</option>
                    <option value='12:00'>12:00</option>
                    <option value='12:30'>12:30</option>
                    <option value='13:00'>13:00</option>
                    <option value='13:30'>13:30</option>
                    <option value='14:00'>14:00</option>
                    <option value='14:30'>14:30</option>
                    <option value='15:00'>15:00</option>
                    <option value='15:30'>15:30</option>
                    <option value='16:00'>16:00</option>
                    <option value='16:30'>16:30</option>
                    <option value='17:00'>17:00</option>
                    <option value='17:30'>17:30</option>
                    <option value='18:00'>18:00</option>
                    <option value='18:30'>18:30</option>
                    <option value='19:00'>19:00</option>
                    <option value='19:30'>19:30</option>
                    <option value='20:00'>20:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Day
                  </label>
                  <select
                    name='day_w'
                    onChange={handleChange}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                    selected={addData.day_w}
                    required
                  >
                    <option value='MON'>Monday</option>
                    <option value='TUE'>Tuesday</option>
                    <option value='WED'>Wednesday</option>
                    <option value='THU'>Thursday</option>
                    <option value='FRI'>Friday</option>
                    <option value='SAT'>Saturday</option>
                    <option value='SUN'>Sunday</option>
                  </select>
                </div>
                <div className='relative z-0 w-full group'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Location
                  </label>
                  <input
                    type='text'
                    name='room_name_th'
                    onChange={handleChange}
                    value={addData.room_name_th}
                    className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                    placeholder='Location'
                    required
                  />
                </div>
                </div>
            </div>

          </div>
        </div>
        <div className='mt-5 sm:mt-6'>
          <div className='my-2'>
            <hr />
          </div>
          <div className='flex justify-end space-x-1'>
            <button
              onClick={() => setIsOpen(false)}
              type='button'
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              Close
            </button>
            <button
              onClick={handleSave}
              type='button'
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCopyOpen}
      >
        <div className='mt-3 text-center sm:mt-5'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
            Copy Text
          </h3>
          <div className='mt-2'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {openLink}
            </p>
          </div>
        </div>
        <div className='mt-5 sm:mt-6'>
          <div className='my-2'>
            <hr />
          </div>
          <div className='flex justify-end space-x-1'>
            <button
              onClick={() => setIsCopyOpen(false)}
              type='button'
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              Close
            </button>
            <button
              type='button'
              // open link
              onClick={() => window.open(openLink, '_blank')}
              className='rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
            >
              open link
            </button>
          </div>
        </div>

        
      
      </Modal>

    </div>
  );
};

export default App;

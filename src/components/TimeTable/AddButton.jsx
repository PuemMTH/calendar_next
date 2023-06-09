import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import axios from "axios";
import Notiflix from "notiflix";
import SearchBox from './searchBox';

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

  useEffect(() => {
    console.log(addData);
  }, [addData]);

  // search engine
  // const [searchTerm, setSearchTerm] = useState("");
  // useEffect(() => {
  //   if (searchTerm !== "") {
  //     const selectedSubject = dataSearch.find(
  //       (value) => value.subject_name.toLowerCase() === searchTerm.toLowerCase()
  //     );
  //     if (selectedSubject) {
  //       setAddData({
  //         ...addData,
  //         subject_name_th: selectedSubject.subject_name,
  //       });
  //       setAddData({ ...addData, subject_code: selectedSubject.sub_id });
  //     }
  //   }
  // }, [searchTerm]);

  // const handleChangeSearch = (event) => {
  //   setAddData({ ...addData, subject_name_th: event.target.value });
  //   setSearchTerm(event.target.value);
  // };
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


  // new SearchBox
  const [subjects, setSubjects] = useState([
    { "sub_id": "01009102", "subject_name": "มนุษย์และทรัพยากรธรรมชาติ" },
    { "sub_id": "01101101", "subject_name": "เศรษฐศาสตร์ทั่วไปในกระแสโลกาภิวัตน์" },
    { "sub_id": "01174231", "subject_name": "นันทนาการเบื้องต้น" },
    { "sub_id": "01175111", "subject_name": "กรีฑาลู่-ลาน เพื่อสุขภาพ" },
    { "sub_id": "01175112", "subject_name": "แบดมินตันเพื่อสุขภาพ" },
    { "sub_id": "01175114", "subject_name": "เทเบิลเทนนิสเพื่อสุขภาพ" },
    { "sub_id": "01175121", "subject_name": "บาสเกตบอลเพื่อสุขภาพ" },
    { "sub_id": "01175123", "subject_name": "วอลเลย์บอลเพื่อสุขภาพ" },
    { "sub_id": "01175124", "subject_name": "แฮนด์บอลเพื่อสุขภาพ" },
    { "sub_id": "01175125", "subject_name": "ซอฟท์บอลเพื่อสุขภาพ" },
    { "sub_id": "01175126", "subject_name": "ตะกร้อเพื่อสุขภาพ" },
    { "sub_id": "01175129", "subject_name": "ฟุตซอลเพื่อสุขภาพ" },
    { "sub_id": "01175133", "subject_name": "กระโดดน้ำ" },
    { "sub_id": "01175143", "subject_name": "การเต้นลีลาศเพื่อสุขภาพ " },
    { "sub_id": "01175144", "subject_name": "รําไทยเพื่อสุขภาพ" },
    { "sub_id": "01175152", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบสากล" },
    { "sub_id": "01175153", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยไทย" },
    { "sub_id": "01175157", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยกระบี่กระบอง" },
    { "sub_id": "01175159", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยคาราเต้ " },
    { "sub_id": "01175162", "subject_name": "โบว์ลิ่งเพื่อสุขภาพ" },
    { "sub_id": "01175164", "subject_name": "จักรยานเพื่อสุขภาพ" },
    { "sub_id": "01175169", "subject_name": "การออกกำลังกายเพื่อพัฒนาสุขภาพแบบองค์รวม" },
    { "sub_id": "01175169", "subject_name": "การออกกําลังกายเพื่อพัฒนาสุขภาพแบบองค์รวม" },
    { "sub_id": "01176141", "subject_name": "การวางแผนเพื่ออาชีพสําหรับคนรุ่นใหม" },
    { "sub_id": "01177141", "subject_name": "การแสวงหาความรู้" },
    { "sub_id": "01240011", "subject_name": "การออกแบบในชีวิตประจําวัน" },
    { "sub_id": "01242001", "subject_name": "การออกแบบและธุรกิจผลิตภัณฑ์แนวสร้างสรรค์" },
    { "sub_id": "01255101", "subject_name": "มนุษย์กับทะเล" },
    { "sub_id": "01350101", "subject_name": "วิถีชีวิตและวัฒนธรรมในอาเซียน" },
    { "sub_id": "01350103", "subject_name": "ชีวิตยืดหยุ่นได" },
    { "sub_id": "01354101", "subject_name": "ภาษาเขมรเพื่อการสื่อสาร I" },
    { "sub_id": "01354103", "subject_name": "ภาษาเขมรเพื่อการสื่อสาร III" },
    { "sub_id": "01355103", "subject_name": "ภาษาอังกฤษเพื่อโอกาสในการทํางาน" },
    { "sub_id": "01355107", "subject_name": "ทักษะการเขียนภาษาอังกฤษที่จําเป็น" },
    { "sub_id": "01355108", "subject_name": "ภาษาอังกฤษและวัฒนธรรมจากเพลง" },
    { "sub_id": "01355119", "subject_name": "การอ่านภาษาอังกฤษเบื้องต้น" },
    { "sub_id": "01355119", "subject_name": "ทักษะการอ่านภาษาอังกฤษที่จําเป็น" },
    { "sub_id": "01355206", "subject_name": "ภาษาอังกฤษวิชาการ" },
    { "sub_id": "01355207", "subject_name": "การเขียนโต้ตอบภาษาอังกฤษ" },
    { "sub_id": "01355208", "subject_name": "ภาษาอังกฤษจากเพลง" },
    { "sub_id": "01355209", "subject_name": "ภาษาอังกฤษเพื่อการสื่อสารในงานอาชีพ" },
    { "sub_id": "01355303", "subject_name": "ภาษาอังกฤษเพื่อการสมัครงาน" },
    { "sub_id": "01356102", "subject_name": "ภาษาฝรั่งเศสเบื้องต้น II" },
    { "sub_id": "01356103", "subject_name": "ภาษาฝรั่งเศสเบื้องต้น III" },
    { "sub_id": "01357104", "subject_name": "ภาษาเยอรมันเบื้องต้น IV" },
    { "sub_id": "01357113", "subject_name": "ภาษาเยอรมันเบื้องต้น III" },
    { "sub_id": "01358101", "subject_name": "ภาษาญี่ปุ่นเบื้องต้น I" },
    { "sub_id": "01361101", "subject_name": "การใช้ภาษาไทยเบื้องต้น" },
    { "sub_id": "01361103", "subject_name": "การอ่านภาษาไทยเชิงวิจารณ์" },
    { "sub_id": "01362102", "subject_name": "ภาษาจีน II" },
    { "sub_id": "01362103", "subject_name": "ภาษาจีน III" },
    { "sub_id": "01367312", "subject_name": "ภาษาพม่า II" },
    { "sub_id": "01367411", "subject_name": "ภาษาพม่า III" },
    { "sub_id": "01373102", "subject_name": "วัฒนธรรมทัศนาการกับชีวิต" },
    { "sub_id": "01376101", "subject_name": "วรรณกรรมกับชีวิต" },
    { "sub_id": "01387105", "subject_name": "พุทธจริยศาสตร์ในการดําเนินธุรกิจ" },
    { "sub_id": "01390103", "subject_name": "การท่องเที่ยวเพื่อความผาสุก" },
    { "sub_id": "01395101", "subject_name": "ภาษาเกาหลีเพื่อการสื่อสาร I" },
    { "sub_id": "01005101", "subject_name": "เทคโนโลยีเกษตรสมัยใหม่" },
    { "sub_id": "01015202", "subject_name": "เกษตรวิถีไทย" },
    { "sub_id": "01174122", "subject_name": "การเรียนรู้เชิงนันทนาการโดยการเดินทางในตางประเทศแบบประหยัด" },
    { "sub_id": "01175113", "subject_name": "เทนนิสเพื่อสุขภาพ" },
    { "sub_id": "01175115", "subject_name": "ฝึกสมาธิด้วยกิจกรรมยิงปืน" },
    { "sub_id": "01175119", "subject_name": "เปตองเพื่อสุขภาพ" },
    { "sub_id": "01175128", "subject_name": "รักบี้ฟุตบอลเพื่อสุขภาพ" },
    { "sub_id": "01175142", "subject_name": "การเต้นรำพื้นเมืองตามวัฒนธรรมท้องถิ่นเพื่อสุขภาพ" },
    { "sub_id": "01175151", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบไทย" },
    { "sub_id": "01175156", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยไอกิโด" },
    { "sub_id": "01175163", "subject_name": "กอล์ฟเพื่อสุขภาพ" },
    { "sub_id": "01175165", "subject_name": "การฝึกด้วยน้ำหนักเพื่อสุขภาพ" },
    { "sub_id": "01200101", "subject_name": "การคิดเชิงนวัตกรรม" },
    { "sub_id": "01244101", "subject_name": "การออกแบบเพื่อความเป็นอยู่ที่ดี" },
    { "sub_id": "01301101", "subject_name": "การอนุรักษ์ทรัพยากรและสิ่งแวดล้อม" },
    { "sub_id": "01350104", "subject_name": "ศิลปะการอ่านคน" },
    { "sub_id": "01354411", "subject_name": "ภาษาเขมร III" },
    { "sub_id": "01355101", "subject_name": "ภาษาอังกฤษในชีวิตประจําวัน" },
    { "sub_id": "01355102", "subject_name": "ภาษาอังกฤษในมหาวิทยาลัย" },
    { "sub_id": "01355107", "subject_name": "การเขียนภาษาอังกฤษเบื้องต้น" },
    { "sub_id": "01355109", "subject_name": "การฟัง-การพูดภาษาอังกฤษเบื้องต้น" },
    { "sub_id": "01355121", "subject_name": "คําและการออกเสียงในภาษาอังกฤษ " },
    { "sub_id": "01355201", "subject_name": "การอ่านและเขียนภาษาอังกฤษอย่างมีวิจารณญาณ" },
    { "sub_id": "01355205", "subject_name": "การอ่านภาษาอังกฤษด้านสื่อสารมวลชน" },
    { "sub_id": "01357112", "subject_name": "ภาษาเยอรมันเบื้องต้น II" },
    { "sub_id": "01358103", "subject_name": "ภาษาญี่ปุ่นเบื้องต้น III" },
    { "sub_id": "01361102", "subject_name": "การเขียนภาษาไทยเชิงปฏิบัติ" },
    { "sub_id": "01362104", "subject_name": "ภาษาจีน IV" },
    { "sub_id": "01362105", "subject_name": "ภาษาจีน V" },
    { "sub_id": "01371111", "subject_name": "สื่อสารสนเทศเพื่อการเรียนรู้" },
    { "sub_id": "01387102", "subject_name": "ปรัชญาสําหรับโลกยุคใหม่" },
    { "sub_id": "01387102", "subject_name": "ปรัชญาสำหรับชีวิตยุคใหม่" },
    { "sub_id": "01387103", "subject_name": "ปรัชญาเศรษฐกิจพอเพียงกับพุทธศาสนา" },
    { "sub_id": "01387104", "subject_name": "ปรัชญาและศาสนาในประเทศอาเซียน" },
    { "sub_id": "01395103", "subject_name": "ภาษาเกาหลีเพื่อการสื่อสาร III" },
    { "sub_id": "01395105", "subject_name": "การอ่านและรายงานภาษาเกาหลี" },
    { "sub_id": "01398106", "subject_name": "การฟัง-พูดภาษามลายู" },
    { "sub_id": "01399101", "subject_name": "ภาษาเวียดนามเพื่อการสื่อสาร I" },
    { "sub_id": "01399105", "subject_name": "การอ่านภาษาเวียดนาม" },
    { "sub_id": "01402101", "subject_name": "การรู้เท่าทันผลิตภัณฑ์เสริมความงาม" },
    { "sub_id": "01417322", "subject_name": "พีชคณิตเชิงเส้นเบื้องต้น" },
    { "sub_id": "01418103", "subject_name": "สุขภาพและสังคมดิจิทัล" },
    { "sub_id": "01418105", "subject_name": "ศิลปะสร้างสรรค์ดิจิทัล" },
    { "sub_id": "01418111", "subject_name": "วิทยาการคอมพิวเตอร์เบื้องต้น" },
    { "sub_id": "01418112", "subject_name": "แนวคิดการโปรแกรมเบื้องต้น" },
    { "sub_id": "01418113", "subject_name": "การโปรแกรมคอมพิวเตอร์" },
    { "sub_id": "01418131", "subject_name": "การโปรแกรมทางสถิติ" },
    { "sub_id": "01418211", "subject_name": "การสร้างซอฟต์แวร์" },
    { "sub_id": "01418213", "subject_name": "การโปรแกรมภาษาโคบอล" },
    { "sub_id": "01418231", "subject_name": "โครงสร้างข้อมูลและขั้นตอนวิธี" },
    { "sub_id": "01418232", "subject_name": "การออกแบบและการวิเคราะห์ขั้นตอนวิธี" },
    { "sub_id": "01418233", "subject_name": "สถาปัตยกรรมคอมพิวเตอร" },
    { "sub_id": "01418234", "subject_name": "การโปรแกรมอินเทอร์เน็ตของสรรพสิ่ง" },
    { "sub_id": "01395104", "subject_name": "ภาษาเกาหลีเพื่อการสื่อสาร IV" },
    { "sub_id": "01398103", "subject_name": "ภาษามลายูเพื่อการสื่อสาร III" },
    { "sub_id": "01399104", "subject_name": "ภาษาเวียดนามเพื่อการสื่อสาร IV" },
    { "sub_id": "01401201", "subject_name": "พืช มนุษย์ และสิ่งแวดล้อม" },
    { "sub_id": "01401201", "subject_name": "พืชเพื่อการสร้างคุณค่าชีวิต" },
    { "sub_id": "01416101", "subject_name": "พันธุศาสตร์ในสื่อ" },
    { "sub_id": "01417112", "subject_name": "แคลคูลัส II" },
    { "sub_id": "01418214", "subject_name": "การฝึกปฏิบัติการพัฒนาซอฟต์แวร์" },
    { "sub_id": "01418215", "subject_name": "การโปรแกรมภาษาจาวา" },
    { "sub_id": "01418218", "subject_name": "การโปรแกรมภาษาโพรล็อก" },
    { "sub_id": "01418221", "subject_name": "ระบบฐานข้อมูลเบื้องต้น" },
    { "sub_id": "01418223", "subject_name": "วิทยาการข้อมูลและโปรแกรมประยุกต์" },
    { "sub_id": "01418231", "subject_name": "โครงสร้างข้อมูล" },
    { "sub_id": "01418233", "subject_name": "ภาษาแอสเซมบลีและสถาปัตยกรรมคอมพิวเตอร์" },
    { "sub_id": "01418236", "subject_name": "ระบบปฏิบัติการ" },
    { "sub_id": "01418311", "subject_name": "การโปรแกรมเชิงคํานวณแบบท้าทาย" },
    { "sub_id": "01418327", "subject_name": "ระบบสนับสนุนการตัดสินใจและอัจฉริยะทางธุรกิจ" },
    { "sub_id": "01418328", "subject_name": "ระบบบริหารจัดการสารสนเทศด้านทรัพยากรบุคคล" },
    { "sub_id": "01418331", "subject_name": "ทฤษฎีการคำนวณ" },
    { "sub_id": "01418334", "subject_name": "เทคนิคตัวแปลโปรแกรม" },
    { "sub_id": "01418341", "subject_name": "ทรัพย์สินทางปัญญาและจรรยาบรรณวิชาชีพ" },
    { "sub_id": "01418342", "subject_name": "การออกแบบและพัฒนาโปรแกรมประยุกต์สำหรับอุปกรณ์เคลื่อนที่" },
    { "sub_id": "01418343", "subject_name": "การคำนวณแบบขนานด้วยคูด้า" },
    { "sub_id": "01418351", "subject_name": "หลักการเครือข่ายคอมพิวเตอร์และการประมวลผลบนคลาวด์" },
    { "sub_id": "01418353", "subject_name": "ระบบแบบกระจายและระบบกลุ่มเมฆ" },
    { "sub_id": "01418353", "subject_name": "แนวคิดและบริการการคำนวณแบบคลาวด์" },
    { "sub_id": "01418361", "subject_name": "คอมพิวเตอร์วิทัศน์เบื้องต้น" },
    { "sub_id": "01418363", "subject_name": "การประมวลผลภาษาธรรมชาติ" },
    { "sub_id": "01418383", "subject_name": "การโปรแกรมเกม" },
    { "sub_id": "01418421", "subject_name": "อันตรกิริยาระหว่างมนุษย์และคอมพิวเตอร์" },
    { "sub_id": "01418421", "subject_name": "การออกแบบประสบการณ์และส่วนเชื่อมประสานผู้ใช้" },
    { "sub_id": "01418476", "subject_name": "การวัดซอฟต์แวร์" },
    { "sub_id": "01418496", "subject_name": "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์" },
    { "sub_id": "01418497", "subject_name": "สัมมนา" },
    { "sub_id": "01418499", "subject_name": "โครงงานวิทยาการคอมพิวเตอร์" },
    { "sub_id": "01420201", "subject_name": "อัญมณีและเครื่องประดับ" },
    { "sub_id": "01420246", "subject_name": "อิเล็กทรอนิกส์เชิงเลขเบื้องต้นภาคปฏิบัติการ" },
    { "sub_id": "01421201", "subject_name": "รังสี ชีวิต และสิ่งแวดล้อม" },
    { "sub_id": "01450101", "subject_name": "สังคมไทยกับประชาคมอาเซียนในโลกปัจจุบัน" },
    { "sub_id": "01459101", "subject_name": "จิตวิทยาเพื่อชีวิตสมัยใหม่ " },
    { "sub_id": "01459102", "subject_name": "จิตวิทยากับความหลากหลายของมนุษย์" },
    { "sub_id": "01999012", "subject_name": "สุขภาพเพื่อชีวิต" },
    { "sub_id": "01999013", "subject_name": "การจัดการสารสนเทศยุคใหม่ในชีวิตประจําวัน" },
    { "sub_id": "01999013", "subject_name": "พลเมืองดิจิทัล" },
    { "sub_id": "01999022", "subject_name": "ภาษาไทยในบริบทวัฒนธรรม" },
    { "sub_id": "01999023", "subject_name": "ทักษะความเข้าใจและใช้เทคโนโลยีดิจิทัล" },
    { "sub_id": "01999033", "subject_name": "ศิลปะการดำเนินชีวิต " },
    { "sub_id": "01999036", "subject_name": "ความสุขในพลวัตของชีวิต" },
    { "sub_id": "01999041", "subject_name": "เศรษฐศาสตร์เพื่อการดําเนินชีวิตที่ดี" },
    { "sub_id": "01999046", "subject_name": "การพัฒนาความมั่นคงแห่งชาติ" },
    { "sub_id": "01999111", "subject_name": "ศาสตร์แห่งแผ่นดิน" },
    { "sub_id": "02708102", "subject_name": "วรรณกรรมกับวิทยาศาสตร์" },
    { "sub_id": "02717011", "subject_name": "ตนและการพัฒนาตน" },
    { "sub_id": "02729102", "subject_name": "การประยุกต์คอมพิวเตอร์ในชีวิตประจําวัน" },
    { "sub_id": "02999037", "subject_name": "ศิลปะแห่งสุนทรียศาสตร์เพื่อความสุข " },
    { "sub_id": "01418235", "subject_name": "ระบบปฏิบัติการยูนิกซ์และการโปรแกรมเปลือกระบบ" },
    { "sub_id": "01418241", "subject_name": "เทคโนโลยีสารสนเทศการเงินและการธนาคาร" },
    { "sub_id": "01418323", "subject_name": "การจัดการคุณภาพข้อมูล" },
    { "sub_id": "01418332", "subject_name": "ความมั่นคงในระบบสารสนเทศ" },
    { "sub_id": "01418335", "subject_name": "การบีบอัดข้อมูล" },
    { "sub_id": "01418341", "subject_name": "การออกแบบและการพัฒนาระบบการวางแผนทรัพยากรองค์กร" },
    { "sub_id": "01418351", "subject_name": "หลักการการสื่อสารคอมพิวเตอร์และการประมวลผลบนคลาวด์" },
    { "sub_id": "01418352", "subject_name": "การสื่อสารข้อมูลและเครือข่าย" },
    { "sub_id": "01418371", "subject_name": "การบริหารโครงการและสตาร์ทอัพดิจิทัล" },
    { "sub_id": "01418382", "subject_name": "วิชวลเอฟเฟกส์" },
    { "sub_id": "01418383", "subject_name": "ความจริงขยาย" },
    { "sub_id": "01418385", "subject_name": "การประมวลผลภาพดิจิทัล" },
    { "sub_id": "01418390", "subject_name": "การเตรียมความพร้อมสหกิจศึกษา" },
    { "sub_id": "01418441", "subject_name": "เว็บเทคโนโลยีและเว็บบริการ" },
    { "sub_id": "01418471", "subject_name": "การออกแบบและพัฒนาซอฟต์แวร์" },
    { "sub_id": "01418490", "subject_name": "สหกิจศึกษา" },
    { "sub_id": "01422111", "subject_name": "หลักสถิต" },
    { "sub_id": "01453103", "subject_name": "กฎหมายสําหรับผู้ประกอบการใหม่" },
    { "sub_id": "01455101", "subject_name": "การเมืองโลกในชีวิตประจําวัน" },
    { "sub_id": "01999011", "subject_name": "อาหารเพื่อมนุษยชาติ" },
    { "sub_id": "01999021", "subject_name": "ภาษาไทยเพื่อการสื่อสาร" },
    { "sub_id": "01999032", "subject_name": "ไทยศึกษา" },
    { "sub_id": "01999033", "subject_name": "ศิลปะการดําเนินชีวิต" },
    { "sub_id": "01999034", "subject_name": "ศิลปวิจักษณ์" },
    { "sub_id": "01999035", "subject_name": "วัฒนธรรมดนตรีกับชีวิต" },
    { "sub_id": "01999043", "subject_name": "การคิดสร้างสรรค์เพื่อการจัดการคุณค่า" },
    { "sub_id": "01999048", "subject_name": "นวัตกรรมเพื่อสิ่งแวดล้อมและสุขภาวะ" },
    { "sub_id": "01999051", "subject_name": "การพัฒนาสมรรถนะหลักผ่านสุขภาพหนึ่งเดียว" },
    { "sub_id": "01999141", "subject_name": "มนุษย์กับสังคม" },
    { "sub_id": "01999213", "subject_name": "สิ่งแวดล้อม เทคโนโลยี และชีวิต" },
    { "sub_id": "02032303", "subject_name": "การเกษตรกับคุณภาพชีวิตที่ดี" },
    { "sub_id": "02032304", "subject_name": "เกษตรเพื่อโลกสีเขียว" },
    { "sub_id": "02714101", "subject_name": "การคิดเชิงวิพากษ์และการแก้ปัญหา" },
    { "sub_id": "02717112", "subject_name": "การเมืองไทยร่วมสมัย" },
    { "sub_id": "02721121", "subject_name": "การจัดการธุรกิจเพื่อสังคมที่ยั่งยืน" },
    { "sub_id": "02724011", "subject_name": "การสื่อสารระหว่างวัฒนธรรม" },
    { "sub_id": "02727101", "subject_name": "พืชเพื่อชีวิตที่ดีกว่า" },
    { "sub_id": "02727104", "subject_name": "สิ่งมีชีวิตกับภัยพิบัติทางธรรมชาติ" },
    { "sub_id": "02728102", "subject_name": "สารสีในงานศิลปะ" },
    { "sub_id": "02999037", "subject_name": "ศิลปะแห่งสุนทรียศาสตร์เพื่อความสุข" },
    { "sub_id": "02999038", "subject_name": "ความสุขในศตวรรษที่ 21" },
    { "sub_id": "03600013", "subject_name": "เครื่องมือและทักษะทางคอมพิวเตอร์ที่จําเป็น" },
    { "sub_id": "03654111", "subject_name": "สุนทรียศาสตร์ทางการกีฬา" },
    { "sub_id": "03654114", "subject_name": "โมบายแอปพลิเคชันสําหรับชีวิตยุคใหม" },
    { "sub_id": "03753111", "subject_name": "เศรษฐศาสตร์จุลภาค" },
    { "sub_id": "03754112", "subject_name": "ภาษาอังกฤษ II" },
    { "sub_id": "03754271", "subject_name": "ภาษาอังกฤษในงานอาชีพ" },
    { "sub_id": "03754371", "subject_name": "ภาษาอังกฤษสำหรับนักบัญชี" },
    { "sub_id": "03757122", "subject_name": "สถิติธุรกิจ" },
    { "sub_id": "03757335", "subject_name": "ธรรมาภิบาลในองค์กร" },
    { "sub_id": "03758343", "subject_name": "การจัดการการค้าปลีก" },
    { "sub_id": "03760332", "subject_name": "การบริหารต้นทุน" },
    { "sub_id": "03760341", "subject_name": "หลักการตรวจสอบและการควบคุมภายใน" },
    { "sub_id": "03760362", "subject_name": "โปรแกรมประยุกต์ในการบัญชี" },
    { "sub_id": "03760434", "subject_name": "การบัญชีบริหารเชิงกลยุทธ์" },
    { "sub_id": "03761111", "subject_name": "หลักการผลิตและดำเนินการ" },
    { "sub_id": "03768141", "subject_name": "นาฏศิลป์และลีลาศ" },
    { "sub_id": "02999044", "subject_name": "เศรษฐกิจพอเพียงเพื่อการดำรงชีวิต" },
    { "sub_id": "02999045", "subject_name": "การเพิ่มคุณค่าชีวิตด้วยวิถีชุมชนชนบท" },
    { "sub_id": "02999045", "subject_name": "การเพิ่มคุณค่าชีวิตด้วยวิถีชุมชน" },
    { "sub_id": "03600014", "subject_name": "การแก้ปัญหาเชิงสร้างสรรค์และทักษะการคิดเชิงวิพากษ์" },
    { "sub_id": "03654113", "subject_name": "กิจกรรมทางกายเพื่อชีวิตสมัยใหม่" },
    { "sub_id": "03751111", "subject_name": "มนุษย์กับสิ่งแวดล์อม" },
    { "sub_id": "03752111", "subject_name": "ทรัพยากรสารสนเทศเพื่อการค้นคว้า" },
    { "sub_id": "03753112", "subject_name": "เศรษฐศาสตร์มหภาค" },
    { "sub_id": "03754113", "subject_name": "ภาษาอังกฤษ III" },
    { "sub_id": "03754221", "subject_name": "การออกเสียงภาษาอังกฤษขั้นพื้นฐาน" },
    { "sub_id": "03754231", "subject_name": "การอ่านภาษาอังกฤษในชีวิตประจําวัน" },
    { "sub_id": "03754251", "subject_name": "การเขียนย่อหน้าภาษาอังกฤษ" },
    { "sub_id": "03757112", "subject_name": "องค์การและการจัดการ" },
    { "sub_id": "03757123", "subject_name": "คณิตศาสตร์สําหรับธุรกิจ" },
    { "sub_id": "03757222", "subject_name": "การวิเคาะห์เชิงปริมาณทางธุรกิจ" },
    { "sub_id": "03757344", "subject_name": "การจัดการค่าตอบแทน" },
    { "sub_id": "03757361", "subject_name": "การภาษีอากรธุรกิจ" },
    { "sub_id": "03758444", "subject_name": "การตลาดทางอินเทอร์เน็ต" },
    { "sub_id": "03759211", "subject_name": "การจัดการทางการเงิน I" },
    { "sub_id": "03760211", "subject_name": "หลักการบัญชีขั้นกลาง II" },
    { "sub_id": "03760323", "subject_name": "การบัญชีเพื่อการบริหารทรัพยากรมนุษย์" },
    { "sub_id": "03760461", "subject_name": "การรักษาความปลอดภัยของระบบสารสนเทศและการควบคุม" },
    { "sub_id": "03760491", "subject_name": "ระเบียบวิจัยทางการบัญชีบริหาร" },
    { "sub_id": "03760492", "subject_name": "สัมมนาการบัญชีการเงิน" },
    { "sub_id": "03760494", "subject_name": "สัมมนาการสอบบัญชีและการตรวจสอบภายใน" },
    { "sub_id": "03760495", "subject_name": "สัมมนาเทคโนโลยีและระบบสารสนเทศทางการบัญชี" },
    { "sub_id": "03768111", "subject_name": "เปตอง" },
    { "sub_id": "03768121", "subject_name": "บาสเกตบอล" },
    { "sub_id": "03768151", "subject_name": "กระบี่กระบอง" },
    { "sub_id": "04101302", "subject_name": "จิตอาสาเพื่อพัฒนาชุมชน" },
    { "sub_id": "04401112", "subject_name": "บุคลิกภาพและมารยาททางสังคมสำหรับการบริการชุมชน" },
    { "sub_id": "04804311", "subject_name": "ปรัชญาเศรษฐกิจพอเพียง" },
    { "sub_id": "04837111", "subject_name": "กีฬาเพื่อสุขภาพที่ดี" },
    { "sub_id": "01009102", "subject_name": "ทรัพยากรการเกษตรและสิ่งแวดล้อม" },
    { "sub_id": "01101102", "subject_name": "เศรษฐศาสตร์แนวพุทธเพื่อความเป็นอยู่ที่ดี" },
    { "sub_id": "01132101", "subject_name": "ผู้ประกอบการรุ่นใหม่" },
    { "sub_id": "01173151", "subject_name": "เอดส์ศึกษา" },
    { "sub_id": "01174123", "subject_name": "ค่ายพักแรมนันทนาการ" },
    { "sub_id": "01175117", "subject_name": "ฝึกสมาธิด้วยกิจกรรมยิงธนู" },
    { "sub_id": "01175127", "subject_name": "ฮอกกี้เพื่อสุขภาพ" },
    { "sub_id": "01175131", "subject_name": "ว่ายน้ำเพื่อสุขภาพ" },
    { "sub_id": "01175134", "subject_name": "โปโลน้ำ" },
    { "sub_id": "01175141", "subject_name": "การเต้นแอโรบิกเพื่อสุขภาพ" },
    { "sub_id": "01175144", "subject_name": "รำไทยเพื่อสุขภาพ" },
    { "sub_id": "01175154", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยสากล" },
    { "sub_id": "01175156", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยไอคิโด" },
    { "sub_id": "01175161", "subject_name": "ฝึกสมองด้วยการเล่นบริดจ์" },
    { "sub_id": "01175166", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยเทควันโด" },
    { "sub_id": "01175167", "subject_name": "โยคะเพื่อสุขภาพ" },
    { "sub_id": "01175168", "subject_name": "การวิ่งเหยาะเพื่อสุขภาพ" },
    { "sub_id": "01350102", "subject_name": "เล่าเรื่องด้วยภาพ" },
    { "sub_id": "01354102", "subject_name": "ภาษาเขมรเพื่อการสื่อสาร II" },
    { "sub_id": "01354312", "subject_name": "ภาษาเขมร II" },
    { "sub_id": "01355106", "subject_name": "การสื่อสารภาษาอังกฤษทางการแพทย์" },
    { "sub_id": "01355109", "subject_name": "ทักษะการฟัง-การพูดภาษาอังกฤษที่จําเป็น" },
    { "sub_id": "01355111", "subject_name": "ภาษาอังกฤษพื้นฐาน I" },
    { "sub_id": "01355112", "subject_name": "ภาษาอังกฤษพื้นฐาน II" },
    { "sub_id": "01355113", "subject_name": "ภาษาอังกฤษพื้นฐาน III" },
    { "sub_id": "01355114", "subject_name": "ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ I" },
    { "sub_id": "01355121", "subject_name": "คําและการออกเสียงในภาษาอังกฤษ" },
    { "sub_id": "01355202", "subject_name": "การเขียนรายงานภาษาอังกฤษ" },
    { "sub_id": "01355203", "subject_name": "โครงสร้างภาษาอังกฤษ" },
    { "sub_id": "01355204", "subject_name": "การนําเสนอโครงงานเป็นภาษาอังกฤษ" },
    { "sub_id": "01355206", "subject_name": "อังกฤษวิชาการ" },
    { "sub_id": "01355208", "subject_name": "การพัฒนาทักษะภาษาอังกฤษผ่านเกม" },
    { "sub_id": "01356104", "subject_name": "ภาษาฝรั่งเศสเบื้องต้น IV" },
    { "sub_id": "01357101", "subject_name": "ภาษาเยอรมันเบื้องต้น I" },
    { "sub_id": "01358104", "subject_name": "ภาษาญี่ปุ่นเบื้องต้น IV" },
    { "sub_id": "01362101", "subject_name": "ภาษาจีน I" },
    { "sub_id": "01367311", "subject_name": "ภาษาพม่า I" },
    { "sub_id": "01001317", "subject_name": "พระมหากษัตริย์และผู้นำประเทศกับการพัฒนาภาคการเกษตร" },
    { "sub_id": "01001317", "subject_name": "ผู้นำกับการพัฒนาภาคการเกษตร" },
    { "sub_id": "01007101", "subject_name": "พืชสวนเพื่อคุณภาพชีวิตและสิ่งแวดล้อม" },
    { "sub_id": "01131111", "subject_name": "การเงินสําหรับผู้ประกอบการ" },
    { "sub_id": "01131111", "subject_name": "การเงินสำหรับผู้ประกอบการ" },
    { "sub_id": "01175118", "subject_name": "แชร์บอลเพื่อสุขภาพ" },
    { "sub_id": "01175122", "subject_name": "ฟุตบอลเพื่อสุขภาพ" },
    { "sub_id": "01175142", "subject_name": "การเต้นรําพื้นเมืองเพื่อสุขภาพ" },
    { "sub_id": "01175143", "subject_name": "การเต้นลีลาศเพื่อสุขภาพ" },
    { "sub_id": "01175155", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยยูโด " },
    { "sub_id": "01175155", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยยูโด" },
    { "sub_id": "01175159", "subject_name": "ศิลปะการป้องกันตัวและการต่อสู้ด้วยคาราเต้" },
    { "sub_id": "01176141", "subject_name": "การวางแผนชีวิตและอาชีพสําหรับคนรุ่นใหม" },
    { "sub_id": "01308101", "subject_name": "การท่องเที่ยวทางธรรมชาติอย่างยั่งยืน" },
    { "sub_id": "01354311", "subject_name": "ภาษาเขมร I" },
    { "sub_id": "01355104", "subject_name": "ภาษาอังกฤษสําหรับนิสิตเตรียมแพทย์ I" },
    { "sub_id": "01355105", "subject_name": "ภาษาอังกฤษสําหรับนิสิตเตรียมแพทย์ II" },
    { "sub_id": "01355106", "subject_name": "ภาษาอังกฤษเพื่อการสื่อสารทางการแพทย์" },
    { "sub_id": "01355115", "subject_name": "ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ II" },
    { "sub_id": "01355203", "subject_name": "โครงสร้างภาษาอังกฤษเบื้องต้น" },
    { "sub_id": "01355307", "subject_name": "ทักษะรวมภาษาอังกฤษเพื่อการสื่อสาร" },
    { "sub_id": "01356101", "subject_name": "ภาษาฝรั่งเศสเบื้องต้น I" },
    { "sub_id": "01358101", "subject_name": "ภาษาญี่ปุ่นเบื้องต้น II" },
    { "sub_id": "01387101", "subject_name": "ศิลปะการอยู่ร่วมกับผู้อื่น" },
    { "sub_id": "01390102", "subject_name": "การท่องเที่ยวเชิงสร้างสรรค์" },
    { "sub_id": "01395102", "subject_name": "ภาษาเกาหลีเพื่อการสื่อสาร II" },
    { "sub_id": "01399102", "subject_name": "ภาษาเวียดนามเพื่อการสื่อสาร II" },
    { "sub_id": "01390104", "subject_name": "การพัฒนาบุคลิกภาพเพื่อการเป็นผู้ประกอบการสมัยใหม่" },
    { "sub_id": "01398101", "subject_name": "ภาษามลายูเพื่อการสื่อสาร I" },
    { "sub_id": "01398102", "subject_name": "ภาษามลายูเพื่อการสื่อสาร II" },
    { "sub_id": "01398104", "subject_name": "ภาษามลายูเพื่อการสื่อสาร IV" },
    { "sub_id": "01398105", "subject_name": "การอ่านภาษามลายู" },
    { "sub_id": "01399106", "subject_name": "การฟัง-พูดภาษาเวียดนาม" },
    { "sub_id": "01418101", "subject_name": "การใช้งานคอมพิวเตอร" },
    { "sub_id": "01418102", "subject_name": "เทคโนโลยีสารสนเทศเพื่อผู้ประกอบการ" },
    { "sub_id": "01418104", "subject_name": "รู้ทันไอที" },
    { "sub_id": "01418111", "subject_name": "การใช้งานคอมพิวเตอร์" },
    { "sub_id": "01418132", "subject_name": "หลักมูลการคณนา" },
    { "sub_id": "01418212", "subject_name": "การโปรแกรมภาษาซี" },
    { "sub_id": "01418217", "subject_name": "การโปรแกรมภาษาลิสป์" },
    { "sub_id": "01418281", "subject_name": "หลักการสร้างภาพเคลื่อนไหวด้วยคอมพิวเตอร์" },
    { "sub_id": "01418282", "subject_name": "การประมวลผลภาพและวีดิทัศน์" },
    { "sub_id": "01418311", "subject_name": "การโปรแกรมเชิงคำนวณแบบท้าทาย" },
    { "sub_id": "01418321", "subject_name": "การวิเคราะห์และการออกแบบระบบ" },
    { "sub_id": "01418322", "subject_name": "วิทยาการข้อมูลเบื้องต้น" },
    { "sub_id": "01418324", "subject_name": "การจัดการคุณภาพสารสนเทศ" },
    { "sub_id": "01418325", "subject_name": "สถาปัตยกรรมระบบจัดการฐานข้อมูล" },
    { "sub_id": "01418333", "subject_name": "ทฤษฎีออโตมาตา" },
    { "sub_id": "01418344", "subject_name": "การออกแบบและพัฒนาโปรแกรมประยุกต์สําหรับอุปกรณ์เคลื่อนที่" },
    { "sub_id": "01418344", "subject_name": "การจัดการมิติข้อมูลและรายงานทางธุรกิจ" },
    { "sub_id": "01418362", "subject_name": "การเรียนรู้ของเครื่องเบื้องต้น" },
    { "sub_id": "01418381", "subject_name": "คอมพิวเตอร์กราฟิกส์เชิงโต้ตอบเบื้องต้น" },
    { "sub_id": "01418462", "subject_name": "ปัญญาประดิษฐ์" },
    { "sub_id": "01418471", "subject_name": "วิศวกรรมซอฟต์แวร์เบื้องต้น" },
    { "sub_id": "01418473", "subject_name": "การควบคุมและการตรวจสอบงานคอมพิวเตอร์" },
    { "sub_id": "01418474", "subject_name": "การจัดการคุณภาพซอฟต์แวร์" },
    { "sub_id": "01418474", "subject_name": "การทดสอบและทวนสอบซอฟต์แวร์" },
    { "sub_id": "01418481", "subject_name": "ภาพเคลื่อนไหวหลายตัวละคร" },
    { "sub_id": "01453101", "subject_name": "สิทธิขั้นพื้นฐาน" },
    { "sub_id": "01453102", "subject_name": "กฎหมายในชีวิตประจําวัน" },
    { "sub_id": "01459101", "subject_name": "จิตวิทยาเพื่อชีวิตสมัยใหม่" },
    { "sub_id": "01999031", "subject_name": "มรดกอารยธรรมโลก" },
    { "sub_id": "01999041", "subject_name": "เศรษฐศาสตร์เพื่อการดําเนิน" },
    { "sub_id": "01999047", "subject_name": "การทหารเพื่อการพัฒนาประเทศ" },
    { "sub_id": "01999112", "subject_name": "แนวคิดเศรษฐกิจหมุนเวียนเพื่อความยั่งยืน" },
    { "sub_id": "02701011", "subject_name": "การใช้ภาษาไทยเพื่อธุรกิจวิทยาศาสตร์และเทคโนโลยี" },
    { "sub_id": "02727102", "subject_name": "พืชและมนุษย์" },
    { "sub_id": "01399103", "subject_name": "ภาษาเวียดนามเพื่อการสื่อสาร III" },
    { "sub_id": "01417111", "subject_name": "แคลคูลัส I" },
    { "sub_id": "01417322", "subject_name": "พีชคณิตเชิงเส้นพื้นฐาน" },
    { "sub_id": "01418106", "subject_name": "ทักษะเทคโนโลยีดิจิทัล" },
    { "sub_id": "01418131", "subject_name": "ตรรกศาสตร์ของดิจิทัลคอมพิวเตอร์" },
    { "sub_id": "01418214", "subject_name": "การโปรแกรมภาษาภาพ" },
    { "sub_id": "01418216", "subject_name": "หลักภาษาโปรแกรม" },
    { "sub_id": "01418222", "subject_name": "การประยุกต์อินเทอร์เน็ตเพื่อการพาณิชย์" },
    { "sub_id": "01418222", "subject_name": "ระบบสารสนเทศวิสาหกิจ" },
    { "sub_id": "01418232", "subject_name": "การออกแบบและวิเคราะห์ขั้นตอนวิธี" },
    { "sub_id": "01418261", "subject_name": "หลักพื้นฐานของปัญญาประดิษฐ" },
    { "sub_id": "01418322", "subject_name": "หลักระบบสารสนเทศ" },
    { "sub_id": "01418325", "subject_name": "ข้อมูลจินตทัศน์" },
    { "sub_id": "01418326", "subject_name": "ฐานข้อมูลสื่อประสม" },
    { "sub_id": "01418343", "subject_name": "การโปรแกรมคอมพิวเตอร์ทางธุรกิจ" },
    { "sub_id": "01418384", "subject_name": "การวิเคราะห์ภาพและคอมพิวเตอร์วิทัศน์" },
    { "sub_id": "01418451", "subject_name": "การออกแบบและการบริหารเครือข่าย" },
    { "sub_id": "01418461", "subject_name": "ระบบค้นคืนสารสนเทศ" },
    { "sub_id": "01418472", "subject_name": "การบริหารและการควบคุมโครงการ" },
    { "sub_id": "01418472", "subject_name": "การบูรณาการกระบวนการเชิงอไจล์และเดฟอ็อปส์" },
    { "sub_id": "01418482", "subject_name": "คอมพิวเตอร์กราฟิกส์" },
    { "sub_id": "01420245", "subject_name": "อิเล็กทรอนิกส์เชิงเลขเบื้องต้น" },
    { "sub_id": "01460101", "subject_name": "สังคมและวัฒนธรรมไทยร่วมสมัย" },
    { "sub_id": "01999023", "subject_name": "ทักษะจําเป็นทางคอมพิวเตอร์" },
    { "sub_id": "01999051", "subject_name": "การพัฒนาสมรรถนะหลักผานสุขภาพหนึ่งเดียว" },
    { "sub_id": "01999213", "subject_name": "สิ่งแวดล้อม เทคโนโลยีและชีวิต" },
    { "sub_id": "02701011", "subject_name": "การใช้ภาษาไทยเพื่อธุรกิจ วิทยาศาสตร์และเทคโนโลยี" },
    { "sub_id": "02714101", "subject_name": "การคิดเชิงวิพากษ์และสร้างสรรค์" },
    { "sub_id": "02724012", "subject_name": "การพัฒนาบุคลิกภาพ" },
    { "sub_id": "02728101", "subject_name": "เคมีในชีวิตสมัยใหม่" },
    { "sub_id": "02999042", "subject_name": "การพัฒนานิสิต" },
    { "sub_id": "03654112", "subject_name": "สมุนไพรไทยให้คุณ" },
    { "sub_id": "03751111", "subject_name": "มนุษย์กับสิ่งแวดล้อม" },
    { "sub_id": "03751112", "subject_name": "สังคมและการเมือง" },
    { "sub_id": "03754231", "subject_name": "โครงสร้างทางไวยากรณ์ภาษาอังกฤษ" },
    { "sub_id": "03754372", "subject_name": "ภาษาอังกฤษเพื่อผู้ประกอบวิชาชีพนักบัญชีระดับสากล" },
    { "sub_id": "03757231", "subject_name": "กฎหมายธุรกิจ" },
    { "sub_id": "03757321", "subject_name": "ระบบสารสนเทศเพื่อการจัดการ" },
    { "sub_id": "03758111", "subject_name": "หลักการตลาด" },
    { "sub_id": "03758341", "subject_name": "การจัดการทางการตลาด" },
    { "sub_id": "03760111", "subject_name": "หลักการบัญชีเบื้องต้น" },
    { "sub_id": "03760322", "subject_name": "การบัญชีเพื่อการบริหารความเสี่ยงเบื้องต้น" },
    { "sub_id": "03760331", "subject_name": "หลักการบัญชีต้นทุน II" },
    { "sub_id": "03760342", "subject_name": "การสอบบัญชี" },
    { "sub_id": "03760351", "subject_name": "หลักการบัญชีภาษีอากร" },
    { "sub_id": "03760433", "subject_name": "การบัญชีเพื่อการจัดการสิ่งแวดล้อม" },
    { "sub_id": "03760441", "subject_name": "การให้บริการความเชื่อมั่นเชิงวิชาชีพ" },
    { "sub_id": "03760442", "subject_name": "การบัญชีสืบสวนเบื้องต้น" },
    { "sub_id": "03760493", "subject_name": "สัมมนาการภาษีอากร" },
    { "sub_id": "03760496", "subject_name": "เรื่องเฉพาะทางการบัญชี" },
    { "sub_id": "03760499", "subject_name": "การฝึกงาน" },
    { "sub_id": "03764211", "subject_name": "การจัดการโลจิสติกส์และห่วงโซ่อุปทาน" },
    { "sub_id": "04355181", "subject_name": "กิจกรรมยามว่างเพื่อสุขภาพ" },
    { "sub_id": "04355185", "subject_name": "จานร่อนเพื่อสุขภาพ" },
    { "sub_id": "02999144", "subject_name": "ทักษะชีวิตการเป็นนิสิตมหาวิทยาลัย" },
    { "sub_id": "02999147", "subject_name": "ไทยในพลวัตอาเซียน" },
    { "sub_id": "03521101", "subject_name": "ทะเลกับชีวิต" },
    { "sub_id": "03600012", "subject_name": "เทคโนโลยีสีเขียว" },
    { "sub_id": "03754111", "subject_name": "ภาษาอังกฤษ I" },
    { "sub_id": "03754271", "subject_name": "ภาษาอังกฤษเพื่องานอาชีพ" },
    { "sub_id": "03759212", "subject_name": "การรายงานและการวิเคราะห์ทางการเงิน" },
    { "sub_id": "03759361", "subject_name": "การประกันภัย" },
    { "sub_id": "03759371", "subject_name": "การวางแผนทางการเงินบุคคล I" },
    { "sub_id": "03760112", "subject_name": "หลักการบัญชีขั้นกลาง I" },
    { "sub_id": "03760221", "subject_name": "หลักการบัญชีขั้นสูง I" },
    { "sub_id": "03760231", "subject_name": "หลักการบัญชีต้นทุน I" },
    { "sub_id": "03760321", "subject_name": "หลักการบัญชีขั้นสูง II" },
    { "sub_id": "03760324", "subject_name": "ระบบบัญชีระหว่างประเทศ" },
    { "sub_id": "03760361", "subject_name": "หลักเบื้องต้นของระบบสารสนเทศทางการบัญชี" },
    { "sub_id": "03760421", "subject_name": "นโยบายการบัญชีและมาตรฐานการบัญชี" },
    { "sub_id": "03760422", "subject_name": "การบัญชีกิจการเฉพาะ" },
    { "sub_id": "03760431", "subject_name": "การวางแผนและควบคุมกำไร" },
    { "sub_id": "03760498", "subject_name": "ปัญหาพิเศษ" },
    { "sub_id": "03762351", "subject_name": "การจัดการเพื่อการส่งออกและนำเข้า" },
    { "sub_id": "03768112", "subject_name": "การฝึกโดยการใช้น้ำหนัก" },
    { "sub_id": "04101201", "subject_name": "วิถีชีวิตเศรษฐกิจพอเพียง" },
    { "sub_id": "01418111-65", "subject_name": "Introduction to Computer Science 2", "credit_units": 2 },
    { "sub_id": "01418112-65", "subject_name": "Fundamental Programming Concepts", "credit_units": 3 },
    { "sub_id": "01418141-65", "subject_name": "Intellectual Properties and Professional Ethics", "credit_units": 3 },
    { "sub_id": "01418211-65", "subject_name": "Software Construction", "credit_units": 3 },
    { "sub_id": "01418212-60", "subject_name": "C Programming", "credit_units": 3 },
    { "sub_id": "01418215-60", "subject_name": "Java Programming", "credit_units": 3 },
    { "sub_id": "01418222-65", "subject_name": "Enterprise Information System", "credit_units": 3 },
    { "sub_id": "01418231-65", "subject_name": "Data Structures and Algorithms", "credit_units": 3 },
    { "sub_id": "01418233-65", "subject_name": "Computer Architecture", "credit_units": 3 },
    { "sub_id": "01418321-60", "subject_name": "System Analysis and Design", "credit_units": 3 },
    { "sub_id": "01418331-60", "subject_name": "Operating Systems", "credit_units": 4 },
    { "sub_id": "01418341-60", "subject_name": "Intellectual Properties and Professional Ethics", "credit_units": 3 },
    { "sub_id": "01418344-60", "subject_name": "Mobile Application Design and Development", "credit_units": 3 },
    { "sub_id": "01418383-60", "subject_name": "Game Programming", "credit_units": 3 },
    { "sub_id": "01418442-60", "subject_name": "Web Technology and Web Services", "credit_units": 3 },
    { "sub_id": "01418461-60", "subject_name": "Information Retrieval System", "credit_units": 3 },
    { "sub_id": "01418462-60", "subject_name": "Artificial Intelligence", "credit_units": 3 },
    { "sub_id": "01418475-60", "subject_name": "Software Testing and Verification", "credit_units": 3 },
    { "sub_id": "01418497-60", "subject_name": "Seminar", "credit_units": 1 },
    { "sub_id": "01418499-65", "subject_name": "Computer Science Project", "credit_units": 3  }
  ]);
  
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      setFilteredSubjects([]);
    } else {
      const lowerCasedTerm = searchTerm.toLowerCase();
      const filtered = subjects.filter(subject =>
        subject.subject_name.toLowerCase().includes(lowerCasedTerm)
      );
      setFilteredSubjects(filtered);
    }
    
    const subject = subjects.find(subject => subject.subject_name === searchTerm);
    setAddData({
      ...addData,
      subject_name_th: searchTerm,
      subject_code: subject ? subject.sub_id : ''
    })
    setActiveIndex(-1); // Reset the active index whenever the search term changes
  };

  const handleSelectSubject = (subject_name) => {
    setSearchTerm(subject_name);
    setFilteredSubjects([]);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        // Prevent the cursor from going to the start of the input
        event.preventDefault();
        setActiveIndex((prevActiveIndex) => Math.max(prevActiveIndex - 1, 0));
        break;
      case 'ArrowDown':
        setActiveIndex((prevActiveIndex) => Math.min(prevActiveIndex + 1, filteredSubjects.length - 1));
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          handleSelectSubject(filteredSubjects[activeIndex].subject_name);
        }
        break;
      default:
        break;
    }
  };
  // end new SearchBox

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
                <SearchBox 
                  onSearch={handleSearch} 
                  onKeyDown={handleKeyDown} 
                  searchTerm={searchTerm}
                />
                {filteredSubjects.length > 0 && (
                  <datalist id='subjects'>
                    {filteredSubjects.map((item, index) => (
                      <option key={index} value={item.subject_name} />
                    ))}
                  </datalist>
                )}
                {/* <input
                  type='text'
                  name='subject_name_th'
                  list='subjects'
                  value={addData.subject_name_th}
                  onChange={handleChangeSearch}
                  className='bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white'
                  placeholder='* Computer Programming I'
                /> */}
                {/* <datalist id='subjects'>
                  {dataSearch
                    .filter((item, index) => index < 20)
                    .map((item, index) => (
                      <option key={index} value={item.subject_name} />
                    ))}
                </datalist> */}
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
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
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
                    <option value='20:30'>20:30</option>
                    <option value='21:00'>21:00</option>
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

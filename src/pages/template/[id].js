import React from 'react';
import TimeTable from '../../components/TimeTableShare';
import '../../app/globals.css'
import { useRouter } from 'next/router';
import axios from 'axios';

const TemplatePage = () => {
  const [data, setData] = React.useState({
    period_date: '2021-01-01',
    course: []
  });
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`/api/course/${id}`);
      setData(result.data);
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div className="mx-auto container pt-7 pb-10">
      <TimeTable data={data} setData={setData} />
    </div>
  );
};

export default TemplatePage;

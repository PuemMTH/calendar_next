import Course from '../../../models/course_info';
import connectToDatabase from '../../../utils/connectToDatabase';

export default async function handler(req, res) {
    const { id } = req.query;
    await connectToDatabase();
    const courses = await Course.find({ group_id: id });
    let data = {
        period_date : courses[0].period_date,
        course : []
    }
    for (const courseObj of courses) {
        data.course.push({
            section_id: courseObj.section_id,
            subject_code: courseObj.subject_code,
            subject_name_th: courseObj.subject_name_th,
            time_from: courseObj.time_from,
            time_to: courseObj.time_to,
            room_name_th: courseObj.room_name_th,
            section_code: courseObj.section_code,
            section_type_th: courseObj.section_type_th,
            day_w: courseObj.day_w
        });
    }
    res.status(200).json(data);
}
  
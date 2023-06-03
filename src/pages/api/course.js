import { randomUUID } from 'crypto';
import Course from '../../models/course_info';
import connectToDatabase from '../../utils/connectToDatabase';

export default async function handler(req, res) {
//   if() method == GET
    if (req.method === 'POST') {
        try {
            await connectToDatabase();
            const { templateName, period_date, course } = req.body;
            console.log(templateName);
            const groupID = randomUUID();
            const savedCourses = [];
            for (const courseObj of course) {
                const newCourse = new Course({
                    templateName: templateName,
                    group_id: groupID,
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
                console.log(newCourse);
                const savedCourse = await newCourse.save();
                savedCourses.push(savedCourse);
            }
            res.status(200).json(savedCourses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while saving the courses.' });
        }
    }
    if(req.method === 'GET') {
        await connectToDatabase();
        // http://127.0.0.1:3000/api/course/9e5168bb-f917-43df-9e5f-6817e0d79dad
        const group_id = req.query.group_id;
        console.log(group_id);
        const courses = await Course.find({ group_id: group_id });
        res.status(200).json(courses);
    }
}

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  group_id: { type: String, required: true},
  period_date: { type: Date, default: Date.now },
  section_id: { type: String },
  subject_code: { type: String },
  subject_name_th: { type: String },
  time_from: { type: String },
  time_to: { type: String },
  room_name_th: { type: String },
  section_code: { type: String },
  section_type_th: { type: String },
  day_w: { type: String }
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;

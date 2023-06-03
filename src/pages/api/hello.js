// pages/api/subjectinfos.js
import SubjectInfo from '../../models/SubjectInfo';
import connectToDatabase from '../../utils/connectToDatabase';

export default async function handler(req, res) {
  await connectToDatabase();
  const subjectInfos = await SubjectInfo.find({});
  res.status(200).json(subjectInfos);
}

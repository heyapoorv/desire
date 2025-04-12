// backend/controllers/jobController.js
import prisma from '../utils/prisma.js';

export const postJob = async (req, res) => {
  const { title, company, location, description } = req.body;
  const job = await prisma.job.create({
    data: { title, company, location, description }
  });
  res.json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await prisma.job.findMany();
  res.json(jobs);
};

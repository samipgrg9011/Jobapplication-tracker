"use server"

import { error } from "console"
import { getSession } from "../auth/auth"
import connectDB from "../db"
import { Board, Column, JobApplication } from "../models"
import board from "../models/board"
import jobApplication from "../models/job-application"
import { revalidatePath } from "next/cache"

interface JobapplicationData {
    company?: string,
    position?: string,
    location?: string,
    notes?: string,
    salary?: string,
    jobUrl?: string,
    columnId?: string,
    boardId?: string,
    tags?: string[],
    description?: string,
}

export async function createJobApplication(data: JobapplicationData) {

    const session = await getSession()

    if (!session?.user) {
        return { error: "Unauthorized" }


    }
    await connectDB()


    const { company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        tags,
        description } = data;

    if (!company || !position || !columnId || !boardId) {
        return { error: "Missing required fields" }
    }

    //Verdifying board ownership
    const board = await Board.findOne({
        _id: boardId,
        userId: session.user.id


    })
    if (!board) {
        return { error: "Board was not found" }

    }
    //Verdifying column belongs to board
    const column = await Column.findOne({
        _id: columnId,
        boardId: boardId


    })
    if (!column) {
        return { error: "Column was not found" }

    }

    const maxOrder = (await JobApplication.findOne({columnId})
    .sort({order: -1 })
    .select("order")
    .lean()) as {order:number} || null 

    const jobApplication = await JobApplication.create({

        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        userId: session.user.id,
        tags: tags|| [],
        description,
        status: "applied",
        order: maxOrder ? maxOrder.order + 1:0

    })

    // await Column.findByIdAndUpdate(columnId,{
    //     $push: {jobApplications: jobApplication._id},
        
    // })

    
//     await Column.findByIdAndUpdate(columnId,
//     { $push: { jobApplications: jobApplication._id } },
//     { new: true, runValidators: true }
//   ).select("jobApplications").lean();

//     return{data: JSON.parse(JSON.stringify(jobApplication))}


const updated = await Column.findByIdAndUpdate(
  columnId,
  { $push: { jobApplications: jobApplication._id } },
  { new: true }           // ← return updated document
);


if (!updated) {
  console.error("Failed to update column – ID not found:", columnId);
  // You can return error to client here
  return { success: false, error: "Failed to add application to column" };
}

revalidatePath(`/dashboard`)

// If you got here → update succeeded
return { success: true, data: JSON.parse(JSON.stringify(jobApplication)) };

}
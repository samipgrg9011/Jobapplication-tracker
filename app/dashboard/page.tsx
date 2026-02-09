import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db"
import { Board } from "@/lib/models";
import KanbanBoard from "@/components/kanban-board";

import { redirect } from "next/navigation";


export default async function DashBoard() {

  const session = await  getSession();

  // if(session?.user){
  //   redirect("/sign-in")
  // }
 
  await connectDB();

  const boardDoc = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",

  }).populate({

    path: "columns"

  })

  // console.log(board);


  const board = boardDoc ? JSON.parse(JSON.stringify(boardDoc)) : null;

  

return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
          <p className="text-gray-600">Track your job applications</p>
        </div>

        <KanbanBoard board={board} userId={session?.user.id} />
      </div>
    </div>
  );
}

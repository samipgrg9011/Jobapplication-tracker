import connectDB from "./db";
import { Board, Column } from "./models"
import jobApplication from "./models/job-application";

const DEFAULT_COLUMNS = [
    {
        name: "Wish list",
        order: 0,
    },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "offer", order: 3 },
    { name: "Rejected", order: 4 },
]
export async function initialzeUserBoard(userId: string) {
    try {

        await connectDB()

        //check if board already exists

        const exisitngBoard = await Board.findOne({ userId, name: "Job Hunt" })
        if (exisitngBoard) {
            return exisitngBoard;
        }

        //create the board
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: []
        })

        //create default columns
        const columns = await Promise.all(
            DEFAULT_COLUMNS.map((col) => Column.create({
                name: col.name,
                order: col.order,
                boardId: board._id,
                jobApplication: []
            })
            )
        )  
        console.log("Columns created:", columns.length);

        //Update the board with the new column Ids  
        board.columns = columns.map((col=> col._id))

        await board.save();

        console.log("Board updated with columns");


        return board;

    } catch (err) {
        console.error("initializeUserBoard ERROR:", err);

        throw err;

    }
}
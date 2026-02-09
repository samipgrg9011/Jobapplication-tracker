"use client"

import { Column } from "@/lib/models/models.types";
import column from "@/lib/models/column";
import { Board } from "@/lib/models/models.types"
import { Award, Calendar, Calendar1, CheckCircle2, Mic, MoreHorizontal, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";

interface KanbanBoardProps {
    board: Board,
    userId?: string

}

interface ColConfig {
    color: string; icon: React.ReactNode

}

const COLUMN_CONFIG: Array<ColConfig> = [


    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4" />,

    },

    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4" />,

    },

    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4" />,

    },

    {
        color: "bg-yellow-500",
        icon: <Award className="h-4 w-4" />,

    },

    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4" />,

    },


]

function DroppableColumn({
    column,
    config,
    boardId
}: {
    column: Column;
    config: ColConfig;
    boardId: string
}) {
    console.log("this is after ",column)

    
    // return <Card>
    //     <CardHeader className={`${config.color}`}>
    //         <div>
    //             <div>
    //                 {config.icon}
    //                 <CardTitle>{column.name}</CardTitle>
    //             </div>

    //             <DropdownMenu>
    //                 <DropdownMenuTrigger>
    //                     <Button variant="ghost">
    //                         <MoreVertical />
    //                     </Button>

    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent>
    //                     <DropdownMenuItem><Trash2 />Delete Column</DropdownMenuItem>
    //                 </DropdownMenuContent>

    //             </DropdownMenu>
    //         </div>

    //     </CardHeader>
    // </Card>

      return (
    <Card className="min-w-[300px] flex-shrink-0 shadow-md p-0">
      <CardHeader
        className={`${config.color} text-white rounded-t-lg pb-3 pt-3`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-white text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="className={`space-y-2 pt-4 bg-gray-50/50 min-h-[400px] rounded-b-lg">
        <CreateJobApplicationDialog columnId={column._id} boardId={boardId}/>
      </CardContent>

    
    </Card>
  );

}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
    const columns = board.columns;

    console.log("this is columns before:", columns);
    


    return (

        <>
            <div>
                <div>
                    {columns.map((col, key) => {
                        const config = COLUMN_CONFIG[key] || {
                            color: "bg-gray-500",
                            icon: <Calendar className="h-4 w-4" />
                        }
                        return <DroppableColumn
                            key={key}
                            column={col}
                            config={config}
                            boardId={board._id} />
                            
                    })}
                    
                </div>
            </div>
            
            
        </>
        
    )
}

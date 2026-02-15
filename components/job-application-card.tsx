import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import column from "@/lib/models/column";



interface JobApplicationCardProps {
    job: JobApplication,
    columns: Column[]

}
export default function JobApplicationCard({
    job,
    columns
}: JobApplicationCardProps) {
    // return (
    //     <>
    //         <Card>
    //             <CardContent>
    //                 <div>
    //                     <div>
    //                         <h3>{job.position}</h3>
    //                         <p>{job.company}</p>
    //                         {job.description && <p>{job.description}</p>}
    //                         {job.tags && job.tags.length > 0 && (
    //                             <div>
    //                                 {job.tags.map((tag, key) => (
    //                                     <span key={key}>{tag}
    //                                     </span>
    //                                 ))}
    //                             </div>
    //                         )}   

    //                         {job.jobUrl && (
    //                             <a target="blank" 
    //                             href={job.jobUrl} 
    //                             onClick={(e) => e.stopPropagation()}>
    //                                 <ExternalLink/>
    //                             </a>
    //                         )}
    //                     </div>

    //                     <div>
    //                         <DropdownMenu>
    //                             <DropdownMenuTrigger>
    //                                 <Button variant="ghost" size="icon">
    //                                     <MoreVertical/>

    //                                 </Button>

    //                             </DropdownMenuTrigger>

    //                             <DropdownMenuContent align="end">
    //                                 <DropdownMenuItem>
    //                                     <Edit2>Edit</Edit2>

    //                                 </DropdownMenuItem>
    //                                 {columns.length > 1 &&(
    //                                     <>
    //                                     {columns.filter((c) => c._id !== job.columnId).map((column)=>(
    //                                         <DropdownMenuItem>
    //                                             Move to {column.name}

    //                                         </DropdownMenuItem>
    //                                     ))}
    //                                     </>

    //                                 )}



    //                                 <DropdownMenuItem>
    //                                     <Trash2/>
    //                                     Delete
    //                                 </DropdownMenuItem>
    //                             </DropdownMenuContent>

    //                         </DropdownMenu>
    //                     </div>
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </>

    // )
    return (
        <>
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-white border rounded-lg">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-base leading-tight mb-1 truncate">{job.position}</h3>
                            <p className="text-sm text-muted-foreground mb-2 truncate">{job.company}</p>
                            {job.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{job.description}</p>}
                            {job.tags && job.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {job.tags.map((tag, key) => (
                                        <span key={key} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}   

                            {job.jobUrl && (
                                <a 
                                    target="blank" 
                                    href={job.jobUrl} 
                                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 hover:underline mt-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    View job
                                </a>
                            )}
                        </div>

                        <div className="flex-shrink-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="min-w-[160px]">
                                    <DropdownMenuItem className="gap-2">
                                        <Edit2 className="h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    {columns.length > 1 &&(
                                        <>
                                        {columns.filter((c) => c._id !== job.columnId).map((column)=>(
                                            <DropdownMenuItem key={column._id} className="gap-2">
                                                Move to {column.name}
                                            </DropdownMenuItem>
                                        ))}
                                        </>
                                    )}

                                    <DropdownMenuItem className="text-destructive gap-2 focus:bg-destructive/10">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

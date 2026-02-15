"use client"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { createJobApplication } from "@/lib/actions/job-applications"

interface CreateJobApplicationDialogProps {
    columnId: string,
    boardId: string
}

const INITIAL_FORM_DATA ={
     company: "",
        position: "",
        location: "",
        notes: "",
        salary: "",
        jobUrl: "",
        columnId: "",
        boardId: "",
        tags: "",
        description: "",

}

export default function CreateJobApplicationDialog({
    columnId, boardId
}: CreateJobApplicationDialogProps) {


    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        try{
            const result = await createJobApplication({
                ...formData, 
                columnId,
                boardId,
            tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)})

            if(!result.error){
                setFormData(INITIAL_FORM_DATA);
                setOpen(false);



            }else{
                console.error("Failed to create job: ", result.error)

            }

        }catch(err){
            console.error(err)


        }


    }


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outline"
                    className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
                >
                    <Plus className="mr-2 h-4 w-4" />Add Job

                </Button>

            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle> Add job applicatoon</DialogTitle>
                    <DialogDescription>Track a new job application</DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company"> Company </Label>
                                <Input id="company" required
                                value={formData.company}
                                    onChange={(e) =>
                                        setFormData({ ...formData, company: e.target.value })} />

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position"> Position </Label>
                                <Input id="position" required
                                value={formData.position}

                                    onChange={(e) =>
                                        setFormData({ ...formData, position: e.target.value })} />


                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location"> Location </Label>
                                <Input id="location" required
                                value={formData.location}

                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })} />


                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary"> Salary </Label>
                                <Input id="salary" placeholder="e.g., $100k - $150k" required
                                value={formData.salary}

                                    onChange={(e) =>
                                        setFormData({ ...formData, salary: e.target.value })} />

                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobUrl"> JobUrl </Label>
                            <Input id="jobUrl" placeholder="https://..." required
                                value={formData.jobUrl}

                                onChange={(e) =>
                                    setFormData({ ...formData, jobUrl: e.target.value })} />

                        </div>
                        <div className="space-y-2">

                            <Label htmlFor="tags"> Tags (comma-seperated) </Label>
                            <Input id="tags" placeholder="React, Tailwind, High Pay" required
                                value={formData.tags}

                            
                                onChange={(e) =>
                                    setFormData({ ...formData, tags: e.target.value })} />

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="description"> Description</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                placeholder="Brief description of the role..."
                                required />

                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="notes"> Notes </Label>
                            <Textarea id="notes"
                                rows={4}/>

                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}> Cancel</Button>
                        <Button type="submit"> Add application</Button>


                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    )
}
